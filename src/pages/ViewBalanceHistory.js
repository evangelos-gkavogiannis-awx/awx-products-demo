import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewBalanceHistory = () => {
  const [currency, setCurrency] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currency) {
      navigate(`/balance-history?currency=${currency}`);
    } else {
      alert('Please enter a valid ISO3 currency code.');
    }
  };

  return (
    <div>
      <h1>Enter the currency you want to see the Balance History</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter currency (e.g., DKK)"
          value={currency}
          onChange={(e) => setCurrency(e.target.value.toUpperCase())}
          required
        />
        <button type="submit">View</button>
      </form>
    </div>
  );
};

export default ViewBalanceHistory;
