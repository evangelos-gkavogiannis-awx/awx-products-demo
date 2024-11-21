// src/pages/GlobalAccountCreationConfirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GlobalAccountCreationConfirmation.css';

function GlobalAccountCreationConfirmation() {
  const { state } = useLocation();
  const { accountData } = state;
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <h1>Global Account Created Successfully</h1>
      <p><strong>Account Name:</strong> {accountData.account_name}</p>
      <p><strong>Account Number:</strong> {accountData.account_number}</p>
      <p><strong>Status:</strong> {accountData.status}</p>
      <p><strong>Swift Code:</strong> {accountData.swift_code}</p>
      <p><strong>Currency:</strong> {accountData.required_features[0].currency}</p>
      <p><strong>Transfer Method:</strong> {accountData.required_features[0].transfer_method}</p>
      <button onClick={() => navigate('/global-accounts')}>Display all your global accounts</button>
    </div>
  );
}

export default GlobalAccountCreationConfirmation;
