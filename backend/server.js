const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const PORT = 5000;
const cors = require('cors'); // Import the CORS middleware
const nodemailer = require("nodemailer");
const { onBehalfOfAccountId } = require('./config'); // Import the account ID from config



const { PDFDocument, rgb } = require('pdf-lib'); // Include `rgb` from pdf-lib
const fs = require('fs');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

let token = null //cache the token
const AIRWALLEX_API_URL = 'https://api-demo.airwallex.com/';
const CLIENT_ID_PAYMENT_LINK = 'jDsFAvk3T0u9wIxQ02ZMBA';
const API_SECRET_PAYMENT_LINK = '601c98034375db871d7812e8817c92ad6ca6a7d1ba2f850f529ff46301b9f00ee307ad7c099c45487e9d095385560cd0';

let token_payment_link = null;


// Use CORS to allow requests from the frontend
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your React app
    methods: ['GET', 'POST'], // Allow specific HTTP methods
}));

app.use(express.json()); // Middleware to parse JSON

//send quote with email 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP provider
    port: 587, // Replace with your SMTP port
    secure: false,
    auth: {
        user: "", // Your email address
        pass: "",   // Your email password
    },
});

app.post("/send-email", async (req, res) => {
    const { to, subject, body } = req.body;

    try {
        await transporter.sendMail({
            from: '"Your Company" <your-email@example.com>',
            to,
            subject,
            html: body,
        });

        res.status(200).send({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({ error: "Failed to send email" });
    }
});


//attach payment link to invoice
app.post('/api/attach-payment-link', async (req, res) => {
    const { invoiceNumber, paymentLinkUrl } = req.body;

    try {
        // Locate the invoice PDF in the "invoices" folder
        const invoicePath = path.join(__dirname, 'invoices', `${invoiceNumber}.pdf`);

        if (!fs.existsSync(invoicePath)) {
            return res.status(404).json({ error: `Invoice ${invoiceNumber} not found.` });
        }

        // Read the existing PDF
        const pdfBytes = fs.readFileSync(invoicePath);

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Get the first page
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Add the payment link to the footer of the first page
        firstPage.drawText(`Payment Link: ${paymentLinkUrl}`, {
            x: 50,
            y: 50, // Adjust position for better display
            size: 12,
            color: rgb(0, 0, 1),
        });

        // Save the modified PDF
        const modifiedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(invoicePath, modifiedPdfBytes);

        res.json({ success: true, message: `Payment link attached to invoice ${invoiceNumber}` });
    } catch (error) {
        console.error('Error attaching payment link:', error);
        res.status(500).json({ error: 'Failed to attach payment link.' });
    }
});


// Middleware to fetch and cache the token
const getToken = async () => {
    if (token) {
        return token;
    }

    try {
        const response = await axios.post(
            `${process.env.AIRWALLEX_API_URL}/api/v1/authentication/login`,
            '',
            {
                headers: {
                    'x-client-id': process.env.CLIENT_ID,
                    'x-api-key': process.env.AIRWALLEX_API_SECRET,
                },
            }
        );
        console.log('Token Response:', response.data); // Log the full response for debugging
        token = response.data.token;
        return token;
    } catch (error) {
        console.error('Error generating token:', error.response?.data || error.message);
        throw new Error('Failed to generate token');
    }
};

// Middleware to fetch and cache the token for payment links
const getTokenPaymentLink = async () => {
    if (token_payment_link) {
        return token_payment_link;
    }

    try {
        const response = await axios.post(
            `${process.env.AIRWALLEX_API_URL}/api/v1/authentication/login`,
            '',
            {
                headers: {
                    'x-client-id': CLIENT_ID_PAYMENT_LINK,
                    'x-api-key': API_SECRET_PAYMENT_LINK,
                },
            }
        );
        console.log('Token Response:', response.data); // Log the full response for debugging
        token_payment_link = response.data.token;
        return token_payment_link;
    } catch (error) {
        console.error('Error generating token:', error.response?.data || error.message);
        throw new Error('Failed to generate token');
    }
};

// Middleware to attach token
const authenticate = async (req, res, next) => {
    try {
        req.token = await getToken();
        console.log('Token fetched successfully:', req.token); // Log the token
        next();
    } catch (error) {
        console.error('Error in authenticate middleware:', error.message);
        res.status(500).json({ error: 'Authentication failed' });
    }
};

// Middleware to attach token for payment links
const authenticate_payment_link = async (req, res, next) => {
    try {
        req.token_payment_link = await getTokenPaymentLink();
        console.log('Token fetched successfully:', req.token_payment_link); // Log the token
        next();
    } catch (error) {
        console.error('Error in authenticate middleware:', error.message);
        res.status(500).json({ error: 'Authentication failed' });
    }
};


// Fetch cardholders
app.get('/api/v1/issuing/cardholders', authenticate, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.AIRWALLEX_API_URL}/api/v1/issuing/cardholders`, {
            headers: {
                Authorization: `Bearer ${req.token}`,
                'x-on-behalf-of': onBehalfOfAccountId,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching cardholders:', error.message);
        res.status(500).json({ error: 'Failed to fetch cardholders' });
    }
});

app.post('/api/issuing/cards/create', authenticate, async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AIRWALLEX_API_URL}/api/v1/issuing/cards/create`,
            req.body,
            {
                headers: {
                    'Authorization': `Bearer ${req.token}`, // Use req.token from the middleware
                    'x-on-behalf-of': onBehalfOfAccountId,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error creating card:', error.response?.data || error.message);
        res.status(error.response?.status || 500).send('Error creating card');
    }
});

//simulate deposit
app.post('/api/simulation/deposit/create', authenticate, async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AIRWALLEX_API_URL}/api/v1/simulation/deposit/create`,
            req.body,
            {
                headers: {
                    'Authorization': `Bearer ${req.token}`, // Use req.token from the middleware
                    'x-on-behalf-of': onBehalfOfAccountId,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error creating card:', error.response?.data || error.message);
        res.status(error.response?.status || 500).send('Error create deposit');
    }
});

app.post('/api/activate-account', authenticate, async (req, res) => {
    const { accountId } = req.body; // Account ID comes from the frontend
    if (!accountId) {
        return res.status(400).json({ message: 'Account ID is required' });
    }

    const payload = {
        force: true,
        next_status: 'ACTIVE',
    };

    try {
        const response = await axios.post(
            `https://api-demo.airwallex.com/api/v1/simulation/accounts/${accountId}/update_status`,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${req.token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json({ message: 'Account activated successfully', data: response.data });
    } catch (error) {
        console.error('Error activating account:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: 'Error activating account',
            error: error.response?.data || error.message,
        });
    }
});

app.get('/api/issuing/cards', authenticate, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.AIRWALLEX_API_URL}/api/v1/issuing/cards`, {
            headers: {
                Authorization: `Bearer ${req.token}`,
                'x-on-behalf-of': onBehalfOfAccountId,
            },
        });
        res.json(response.data.items);
    } catch (error) {
        console.error('Error fetching cards:', error.response?.data || error.message);
        res.status(error.response?.status || 500).send('Error fetching cards');
    }
});

//Create cardholder
app.post('/api/issuing/cardholders/create', authenticate, async (req, res) => {
    try {
      const response = await axios.post(
        `${process.env.AIRWALLEX_API_URL}/api/v1/issuing/cardholders/create`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
            'x-on-behalf-of': onBehalfOfAccountId, // Use the account ID dynamically
            'Content-Type': 'application/json',
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error creating cardholder:', error.response?.data || error.message);
      res.status(error.response?.status || 500).send('Error creating cardholder');
    }
  });

  app.post('/api/charges/create', authenticate, async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AIRWALLEX_API_URL}/api/v1/charges/create`,
            req.body,
            {
                headers: {
                   Authorization: `Bearer ${req.token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error creating charge:', error.response?.data || error.message);
        res.status(error.response?.status || 500).send('Error creating charge');
    }
});

app.post('/api/connected-account-transfer', authenticate, async (req, res) => {
    try {
      const response = await axios.post(
        'https://api-demo.airwallex.com/api/v1/connected_account_transfers/create',
        req.body,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error creating connected account transfer:', error.response?.data || error.message);
      res.status(error.response?.status || 500).send('Error creating connected account transfer');
    }
  });
  

// New route for fetching current balances from Airwallex API
app.get('/api/v1/balances/current', authenticate, async (req, res) => {
    try {
        const response = await axios.get(`${AIRWALLEX_API_URL}api/v1/balances/current`, {
            headers: {
                Authorization: `Bearer ${req.token}`,
                'x-on-behalf-of': onBehalfOfAccountId,
            },
        });

        // Filter balances to only show those with available amounts > 0
        const validBalances = response.data.filter(balance => balance.available_amount > 0);

        res.json(validBalances);  // Send filtered balances back to the frontend
    } catch (error) {
        console.error('Error fetching current balances:', error.message);
        res.status(500).json({ error: 'Failed to fetch current balances' });
    }
});

app.get('/api/v1/balances/history', authenticate, async (req, res) => {
    console.log('Currency Query:', req.query.currency); // Log the currency parameter

    const { currency } = req.query;
    if (!currency) {
        return res.status(400).json({ error: 'Currency is required' });
    }

    try {
        const response = await axios.get(`${AIRWALLEX_API_URL}/api/v1/balances/history`, {
            params: { currency },
            headers: {
                Authorization: `Bearer ${req.token}`,
                'x-on-behalf-of': onBehalfOfAccountId,
                'Content-Type': 'application/json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching balance history:', error.message);
        res.status(500).json({ error: 'Failed to fetch balance history' });
    }
});

// Login and retrieve token for payment links
const loginForPaymentLinks = async () => {
    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/authentication/login`, '', {
            headers: {
                'x-client-id': CLIENT_ID,
                'x-api-key': API_SECRET,
            },
        });
        token_payment_link = response.data.token;
        return token_payment_link;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};

// Create Payment Link endpoint
app.post('/api/payment_links/create', authenticate_payment_link, async (req, res) => {
    const { amount, currency, description, expires_at, reference, reusable, title } = req.body;

    const paymentLinkData = {
        amount,
        currency,
        description,
        expires_at,
        reference,
        reusable,
        title,
    };

    try {
        const response = await axios.post(`${process.env.AIRWALLEX_API_URL}/api/v1/pa/payment_links/create`, paymentLinkData, {
            headers: {
                Authorization: `Bearer ${req.token_payment_link}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Payment link created:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment link:', error.response?.data || error.message);
        res.status(error.response?.status || 500).send(error.response?.data || 'Error creating payment link');
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
