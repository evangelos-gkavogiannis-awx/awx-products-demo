import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlatformPage.css";

const PlatformPage = () => {
    const navigate = useNavigate();

    return (
        <div className="platform-page">
            <div className="platform-tabs">
                <div className="platform-tab-dropdown">
                    <button className="platform-tab">Connected Accounts</button>
                    <div className="dropdown-content">
                        <button onClick={() => navigate("/activate-account")}>
                            Activate Account
                        </button>
                        <button onClick={() => navigate("/connected-account-transfer")}>
                            Connected account transfers
                        </button>
                    </div>
                </div>
                <div className="platform-tab-dropdown">
                    <button className="platform-tab">Charges</button>
                    <div className="dropdown-content">
                        <button onClick={() => navigate("/charge-connected-account")}>
                            Charge a connected Acount
                        </button>
                    </div>
                </div>
                <button className="platform-tab">Settlements</button>
                <button className="platform-tab">Financial Reports</button>
                <button className="platform-tab">Financial Transactions</button>
            </div>
            <div className="platform-content">
                <p>Select a tab to view its content.</p>
            </div>
        </div>
    );
};

export default PlatformPage;
