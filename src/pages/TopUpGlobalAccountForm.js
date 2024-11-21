// src/pages/TopUpGlobalAccountForm.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeDeposit } from '../apiService'; // Ensure this function exists in apiService
import GlobalApiInfo from '../components/GlobalApiInfo'; // Import the component


function TopUpGlobalAccountForm() {
    const { state } = useLocation();
    const { account } = state; // Get selected account from navigation state
    const [amount, setAmount] = useState('');
    const [payerBankName, setPayerBankName] = useState('');
    const [reference, setReference] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleDeposit = async () => {
        const depositData = {
            amount: parseFloat(amount), // Ensure it's a number
            global_account_id: account.id, // Use the selected account's ID
            payer_bankname: payerBankName,
            reference,
        };

        try {
            const response = await makeDeposit(depositData); // Call the makeDeposit function from apiService
            const currency = account.required_features.currency || 'Currency not available'; // Retrieve the currency from required_features
            setMessage('You deposit was successful');
        } catch (error) {
            console.error("Error making deposit:", error);
            setMessage('Failed to deposit. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Top Up Global Account</h1>
      
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
      
          <div>
            <label className="block text-gray-700 font-medium mb-2">Payer Bank Name</label>
            <input
              type="text"
              value={payerBankName}
              onChange={(e) => setPayerBankName(e.target.value)}
              placeholder="Enter payer bank name"
              required
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
      
          <div>
            <label className="block text-gray-700 font-medium mb-2">Reference</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter reference"
              required
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
      
          <button
            type="button"
            onClick={handleDeposit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
          >
            Deposit
          </button>
        </form>
      
        <div className="mt-6">
          <GlobalApiInfo
            endpoint="http://localhost:5000/api/simulation/deposit/create"
            jsonResponse={{
              amount,
              global_account_id: account.id,
              payer_bankname: payerBankName,
              reference,
            }}
          />
        </div>
      
        {message && (
          <div className="mt-4 bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded text-center">
            {message}
          </div>
        )}
      </div>
      
    );
}

export default TopUpGlobalAccountForm;
