import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlatformHeader.css";

const PlatformHeader = ({ setIsPlatformView }) => {
  const navigate = useNavigate();

  const handleSwitchToMain = () => {
    setIsPlatformView(false); // Switch back to the main view
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="platform-header">
      <div className="tabs">
        <button>Connected Accounts</button>
        <button>Settlements</button>
        <button>Financial Reports</button>
        <button>Financial Transactions</button>
      </div>
      <button className="switch-button" onClick={handleSwitchToMain}>
        Switch to Connected Accounts
      </button>
    </div>
  );
};

export default PlatformHeader;
