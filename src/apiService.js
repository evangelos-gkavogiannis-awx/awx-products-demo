// src/apiService.js
import axios from 'axios';
import { config } from './config'; // Import the config file

const AIRWALLEX_API_URL = process.env.REACT_APP_AIRWALLEX_API_URL;
const CLIENT_ID = process.env.REACT_APP_AIRWALLEX_CLIENT_ID;
const API_SECRET = process.env.REACT_APP_AIRWALLEX_API_SECRET;


let token = null;
let token_payment_link = null

// Login and retrieve token
const login = async () => {
    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/authentication/login`, '', {
            headers: {
                'x-client-id': CLIENT_ID,
                'x-api-key': API_SECRET,
            },
        });
        token = response.data.token;
        return token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Utility function to get headers for requests
const getHeaders = () => ({
    Authorization: `Bearer ${token}`,
    'x-on-behalf-of': config.onBehalfOfAccountId,
    'Content-Type': 'application/json',
    'x-api-version': '2024-09-27'
});


// Fetch global accounts data, including login if token is not yet set
export const fetchGlobalAccounts = async () => {
    if (!token) {
        await login(); // Ensure token is set
    }

    try {
        console.log(token)
        console.log(config.onBehalfOfAccountId)
        const response = await axios.get(`${AIRWALLEX_API_URL}api/v1/global_accounts`, {
            headers: getHeaders(),
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching global accounts:', error);
        throw error;
    }
};


// Fetch account details by ID
export const fetchAccountDetails = async (accountId) => {
    await login(); // Ensure token is obtained before making the call
    const response = await axios.get(`${AIRWALLEX_API_URL}api/v1/global_accounts/${accountId}`, {
        headers: getHeaders(),
    });
    return response.data;
};

// Create a global account
export const createGlobalAccount = async (data) => {
    if (!token) {
        await login(); // Ensure token is set
    }

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/global_accounts/create`, data, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating global account:', error);
        throw error;
    }
};

// Update global account nickname
export const updateGlobalAccountNickname = async (accountId, data) => {
    if (!token) {
        await login();
    }

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/global_accounts/${accountId}/update`, data, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating global account:', error);
        throw error;
    }
};

// Fetch cards data
export const fetchCards = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/issuing/cards');
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error.message);
        throw error;
    }
};

// Fetch cardholders
/*
because of CORS policy I start a server and call the /issuing/cardholders from the backend
*/
const AIRWALLEX_PROXY_API = 'http://localhost:5000';
export const fetchCardholders = async () => {
    try {
        const response = await axios.get(`${AIRWALLEX_PROXY_API}/api/v1/issuing/cardholders`);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching cardholders:', error.message);
        throw error;
    }
};

//create pan token for secure iframe
export const createPanToken = async (cardId) => {
    try {
        console.log(AIRWALLEX_PROXY_API)
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/api/v1/issuing/pantokens/create`, {
            card_id: cardId, // Send card_id in the request body
        });
        return response.data; // Return the response data directly
    } catch (error) {
        console.error('Error creating PAN token:', error.message);
        throw error; // Throw the error to handle it in the calling component
    }
};

// Fetch current balances from the backend API
export const fetchCurrentBalancesFromBackend = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/balances/current');  // Call backend API
        return response.data;  // Return the current balances data
    } catch (error) {
        console.error('Error fetching current balances from backend:', error.message);
        throw error;
    }
};

// Fetch Balance History from Backend
export const fetchBalanceHistoryFromBackend = async (currency) => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/balances/history', {
            params: { currency }, // Pass the currency as a query parameter
        });
        return response.data; // Return the balance history data
    } catch (error) {
        console.error('Error fetching balance history from backend:', error.message);
        throw error;
    }
};

//Issue card
export const issueCard = async (data) => {
    try {
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/api/issuing/cards/create`, data);
        return response.data;
    } catch (error) {
        console.error('Error issuing card:', error);
        throw error;
    }
};


//Create cardholder
export const createCardholder = async (data) => {
    try {
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/api/issuing/cardholders/create`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating cardholder:', error);
        throw error;
    }
};

// Function to create a payment intent via the server
export const createPaymentIntent = async (data) => {
    try {
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/payments/intent/create`, data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        throw error;
    }
};

// Function to confirm a payment intent via the server
export const confirmPaymentIntent = async (paymentIntentId, data) => {
    try {
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/payments/intent/${paymentIntentId}/confirm`, data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error confirming payment intent:', error.message);
        throw error;
    }
};

//crate charge and charge CA
export const createCharge = async (data) => {
    try {
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/api/charges/create`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating charge:', error);
        throw error;
    }
};

//create funds transfer to connnected account 
export const createConnectedAccountTransfer = async (data) => {
    try {
    const response = await axios.post(`${AIRWALLEX_PROXY_API}/api/connected-account-transfer`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating connected account transfer:', error);
      throw error;
    }
  };
  

//make deposit
export const makeDeposit = async (data) => {
    try {
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/api/simulation/deposit/create`, data);
        return response.data;
    } catch (error) {
        console.error('Error issuing card:', error);
        throw error;
    }
};

//activate account
export const activateAccount = async (accountId) => {
    const payload = {
        force: true,
        next_status: "ACTIVE",
    };

    try {
        const response = await axios.post(
            `${AIRWALLEX_PROXY_API}/api/activate-account`,
            { accountId, ...payload }
        );
        return response.data;
    } catch (error) {
        console.error('Error activating account:', error.response?.data || error.message);
        throw error;
    }
};

//GET beneficiaries
export const fetchBeneficiaries = async () => {
    if (!token) {
        await login(); // Ensure token is set
    }

    try {
        const response = await axios.get(`${AIRWALLEX_API_URL}api/v1/beneficiaries`, {
            headers: getHeaders(),
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        throw error;
    }
};

//get beneficiary details
export const fetchBeneficiaryDetails = async (beneficiaryId) => {

    if (!token) {
        await login(); // Ensure token is set
    }

    try {
        const response = await axios.get(`${AIRWALLEX_API_URL}api/v1/beneficiaries/${beneficiaryId}`, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching beneficiary details:', error);
        throw error;
    }
};

//create beneficiary
export const createBeneficiary = async (beneficiaryData) => {
    if (!token) {
        await login(); // Ensure token is set
    }

    try {
        console.log(beneficiaryData)
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/beneficiaries/create`, beneficiaryData, {
            headers: getHeaders(),
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating beneficiary:', error);
        throw error;
    }
};

// Create a transfer
export const createTransfer = async (transferData) => {
    if (!token) {
        await login(); // Ensure token is set
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-on-behalf-of': 'acct_eDWgRsz1PB2U4_TcLsKTzw',
            'Content-Type': 'application/json',
            'x-api-version': '2024-09-27'
        }
    };

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/transfers/create`, transferData, config);
        console.log("Transfer Response:", response.data); // Debug log for response
        return response.data;
    } catch (error) {
        console.error('Error creating transfer:', error.response?.data || error.message);
        throw error;
    }
};

//create conversion
export const createConversion = async (conversionData) => {
    if (!token) {
        await login();
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/fx/conversions/create`, conversionData, config);
        console.log('Conversion Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating conversion:', error.response?.data || error.message);
        throw error;
    }
};

//get quote
export const createQuote = async (quoteData) => {
    if (!token) {
        await login();
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/fx/quotes/create`, quoteData, config);
        console.log('Quote Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating quote:', error.response?.data || error.message);
        throw error;
    }
};

//GET all tranfers
export const getTransfers = async () => {
    if (!token) {
        // Add logic to fetch token if required
        throw new Error('Authorization token is missing');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-on-behalf-of': 'acct_eDWgRsz1PB2U4_TcLsKTzw',
            'Content-Type': 'application/json',
            'x-api-version': '2024-09-27',
        },
    };

    try {
        const response = await axios.get(`${AIRWALLEX_API_URL}api/v1/transfers`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching transfers:', error.response?.data || error.message);
        throw error;
    }
};

// Create a batch transfer
export const createBatchTransfer = async (batchTransferData) => {
    if (!token) {
        await login(); // Ensure token is set
    }

    const config = {
        headers: getHeaders(),
    };

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/batch_transfers/create`, batchTransferData, config);
        console.log("Transfer Response:", response.data); // Debug log for response
        return response.data;
    } catch (error) {
        console.error('Error creating transfer:', error.response?.data || error.message);
        throw error;
    }
};

//add items to batch
export const addItemToBatch = async (batchId, addItemsData) => {
    if (!token) {
        await login(); // Ensure token is set
    }

    const config = {
        headers: getHeaders(),
    };

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}api/v1/batch_transfers/${batchId}/add_items`, addItemsData, config);
        console.log("Add Items response:", response.data); // Debug log for response
        return response.data;
    } catch (error) {
        console.error('Error creating transfer:', error.response?.data || error.message);
        throw error;
    }
};

//confirm batch transfer
export const submitBatch = async (batchId) => {
    if (!token) {
        await login(); // Ensure token is set
    }

    const config = {
        headers: getHeaders(),
    };

    try {
        const response = await axios.post(`${AIRWALLEX_API_URL}/api/v1/batch_transfers/${batchId}/submit`, {}, config);
        console.log(`Submit Batch Transfer ${batchId} Response:`, response.data); // Debug log for response
        return response.data;
    } catch (error) {
        console.error('Error submitting batch transfer:', error.response?.data || error.message);
        throw error;
    }
};

//List items batch transfer
export const listBatchItems = async (batchId) => {

    if (!token) {
        await login(); // Ensure token is set
    }

    try {
        const response = await axios.get(`${AIRWALLEX_API_URL}api/v1/batch_transfers/${batchId}/items`, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching beneficiary details:', error);
        throw error;
    }
};

//create Payment link
export const createPaymentLink = async (data) => {
    try {
        const response = await axios.post(`${AIRWALLEX_PROXY_API}/api/payment_links/create`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating payment link:', error.response?.data || error.message);
        throw error;
    }
};



