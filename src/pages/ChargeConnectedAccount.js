// src/pages/ChargeConnectedAccount.js
import React, { useState } from 'react';
import { createCharge } from '../apiService';
import './ChargeConnectedAccount.css'

const ChargeConnectedAccount = () => {
    const [formData, setFormData] = useState({
        amount: '',
        currency: 'USD',
        reason: 'wages_salary',
        source: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reference = `PMT${Math.floor(1000000 + Math.random() * 9000000)}`;
        const requestId = crypto.randomUUID();

        const payload = {
            ...formData,
            reference,
            request_id: requestId,
        };

        try {
            const response = await createCharge(payload);
            alert('Charge created successfully');
            console.log(response);
        } catch (error) {
            alert('Error creating charge');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Charge a Connected Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Currency:</label>
                    <select name="currency" value={formData.currency} onChange={handleInputChange}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        {/* Add other currencies as needed */}
                    </select>
                </div>
                <div>
                    <label>Reason:</label>
                    <select name="reason" value={formData.reason} onChange={handleInputChange}>
                        <option value="wages_salary">Wages/Salary</option>
                        <option value="donation_charitable_contribution">Donation</option>
                        <option value="personal_remittance">Personal Remittance</option>
                        <option value="transfer_to_own_account">Transfer to Own Account</option>
                        <option value="education_training">Education/Training</option>
                        <option value="travel">Travel</option>
                        {/* Add other reasons */}
                    </select>
                </div>
                <div>
                    <label>Connected Account ID:</label>
                    <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ChargeConnectedAccount;
