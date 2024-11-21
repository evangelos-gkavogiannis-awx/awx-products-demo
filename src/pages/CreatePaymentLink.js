import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPaymentLink } from "../apiService"; // Ensure this is implemented 
import axios from 'axios';
import './CreatePaymentLink.css';

const CreatePaymentLink = () => {
    const { invoiceNumber } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        amount: "",
        currency: "EUR",
        description: "",
        expires_at: "",
        reference: invoiceNumber,
        reusable: false,
        title: `Order #${invoiceNumber}`,
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentLink, setPaymentLink] = useState(null); // Holds the payment link data
    const [isPopupVisible, setIsPopupVisible] = useState(false); // Controls the popup visibility
    const [paymentLinkUrl, setPaymentLinkUrl] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await createPaymentLink(formData);
            setSuccessMessage("Payment link created successfully!");
            console.log("Payment Link Response:", response);
            setPaymentLinkUrl(response.url);
            //setTimeout(() => navigate("/send-invoice"), 2000); // Navigate back to the invoice list
        } catch (error) {
            console.error("Error creating payment link:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.message || "Failed to create payment link.");
        }
    };



    const handleAttachPaymentLink = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/attach-payment-link',
                {
                    invoiceNumber,
                    paymentLinkUrl,
                }
            );
            console.log('Payment link attached:', response.data);
            alert(`Payment link attached successfully to invoice ${invoiceNumber}`);
            navigate('/send-invoice');
        } catch (error) {
            console.error(
                'Error attaching payment link:',
                error.response?.data || error.message
            );
            alert('Failed to attach the payment link. Please try again.');
        }
    };

    return (
        <div className="create-payment-link-container">
            <h2>Create Payment Link and attach it to the invoice {invoiceNumber}</h2>
    
            <form>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Currency:</label>
                    <input
                        type="text"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Expires At:</label>
                    <input
                        type="datetime-local"
                        name="expires_at"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                expires_at: new Date(e.target.value).toISOString(),
                            })
                        }
                    />
                </div>
                <div>
                    <label>Reusable:</label>
                    <select
                        name="reusable"
                        value={formData.reusable}
                        onChange={(e) =>
                            setFormData({ ...formData, reusable: e.target.value === "true" })
                        }
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Create Payment Link
                </button>
            </form>
    
            {successMessage && (
            <div>
                <p style={{ color: 'green' }}>{successMessage}</p>
                <p>
                    Payment link URL: <a href={paymentLinkUrl} target="_blank" rel="noopener noreferrer">{paymentLinkUrl}</a>
                </p>
                <button onClick={handleAttachPaymentLink}>
                    Attach the Payment Link to the Invoice
                </button>
            </div>
        )}

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
    
};

export default CreatePaymentLink;
