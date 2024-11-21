import React, { useState, useEffect } from 'react';
import { createConnectedAccountTransfer } from '../apiService'; // Import the API service function
import './ConnectedAccountTransfer.css'; // Add CSS for styling

const ConnectedAccountTransfer = () => {
    const [formData, setFormData] = useState({
        amount: '',
        currency: 'USD',
        destination: '',
        reason: 'travel',
    });
    const [reference, setReference] = useState('');
    const [requestId, setRequestId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Generate random strings for reference and request_id
    const generateRandomStrings = () => {
        const randomString = () => Math.random().toString(36).substring(2, 15);
        setReference(randomString());
        setRequestId(randomString());
    };

    // Initialize random values when the page loads
    useEffect(() => {
        generateRandomStrings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            reference,
            request_id: requestId,
        };

        try {
            const response = await createConnectedAccountTransfer(payload);
            setSuccessMessage('Transfer successful!');
            setErrorMessage('');
            console.log('Transfer Successful:', response);
        } catch (error) {
            setErrorMessage('Transfer failed. Please try again.');
            setSuccessMessage('');
            console.error('Transfer Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="container">
            <h1>Connected Account Transfer</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Currency</label>
                    <input
                        type="text"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Connected Account ID</label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Reason</label>
                    <select name="reason" value={formData.reason} onChange={handleChange} required>
                        <option value="wages_salary">Wages/Salary</option>
                        <option value="donation_charitable_contribution">Donation/Charitable Contribution</option>
                        <option value="personal_remittance">Personal Remittance</option>
                        <option value="transfer_to_own_account">Transfer to Own Account</option>
                        <option value="pension">Pension</option>
                        <option value="family_support">Family Support</option>
                        <option value="living_expenses">Living Expenses</option>
                        <option value="education_training">Education/Training</option>
                        <option value="travel">Travel</option>
                        <option value="investment_proceeds">Investment Proceeds</option>
                        <option value="investment_capital">Investment Capital</option>
                    </select>
                </div>
                <div>
                    <label>Reference (Auto-Generated)</label>
                    <input type="text" value={reference} readOnly />
                </div>
                <div>
                    <label>Request ID (Auto-Generated)</label>
                    <input type="text" value={requestId} readOnly />
                </div>
                <button type="submit">Send Transfer</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default ConnectedAccountTransfer;
