// src/pages/UpdateGlobalAccount.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateGlobalAccountNickname } from '../apiService';

function UpdateGlobalAccount() {
    const { state } = useLocation();
    const { accountNumber, accountId, currentNickname } = state;
    const [nickname, setNickname] = useState(currentNickname || '');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const payload = { nick_name: nickname }; // Correct payload as JSON object
        try {
            await updateGlobalAccountNickname(accountId, payload);
            // Redirect to confirmation page with account data
            navigate('/global-account-update-confirmation', {
                state: {
                    accountData: {
                        account_name: `Account with Account Number: ${accountNumber}`,
                        account_number: accountNumber,
                        status: 'UPDATED', // Assuming "UPDATED" status
                        swift_code: 'N/A', // Assuming we don't have swift_code in response, so adding placeholder
                        required_features: [{ currency: 'N/A', transfer_method: 'N/A' }] // Placeholder for this example
                    },
                },
            });
        } catch (error) {
            alert('Failed to update account. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Updating Global Account with Account Number: {accountNumber}
            </h1>
            <p className="text-gray-700 mb-6 text-center">
                Here you can update your global account information.
            </p>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nickname:</label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Enter new nickname"
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>
        </div>

    );
}

export default UpdateGlobalAccount;
