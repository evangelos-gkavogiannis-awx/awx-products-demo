// src/pages/GlobalAccountCreationConfirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalAccountCreationImage from '../assets/global_account_confrim.png'; // Update the path as necessary


function GlobalAccountCreationConfirmation() {
  const { state } = useLocation();
  const { accountData } = state;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Rocket Icon */}
      <div className="flex justify-center mb-6">
        <img
          src={GlobalAccountCreationImage}
          alt="Global Accounts"
          className="w-2/3 h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        You’ve created a Global Account
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Use this account to start receiving funds.
      </p>

      {/* Account Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Global Account nickname
          </h2>
          <span className="text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
            {accountData?.status || 'Active'}
          </span>
        </div>
        <p className="text-gray-800 mb-6">{accountData?.account_name || 'Demo-Evangelos'}</p>

        <div className="divide-y divide-gray-200">
          <div className="py-3 flex justify-between">
            <span className="text-gray-600">Account name</span>
            <span className="text-gray-800">{accountData?.account_name || 'Demo-Evangelos'}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-gray-600">Bank account number</span>
            <span className="text-gray-800">{accountData?.account_number || '612358751'}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-gray-600">Bank name</span>
            <span className="text-gray-800">
              {accountData?.bank_name || 'Australia and New Zealand Banking Group Limited'}
            </span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-gray-600">Account location</span>
            <span className="text-gray-800">{accountData?.account_location || 'Australia'}</span>
          </div>
        </div>
      </div>

      {/* Account Capabilities */}
      <div className="bg-white rounded-lg shadow-md mt-6 p-4 w-full max-w-3xl">
        <h2 className="text-lg font-semibold text-gray-800">Account capabilities</h2>
        <div className="mt-2">
          <select className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>{accountData?.required_features[0]?.currency || 'AUD'}</option>
          </select>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate('/global-accounts')}
        className="mt-6 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700"
      >
        View your Global Accounts
      </button>
    </div>
  );
}

export default GlobalAccountCreationConfirmation;
