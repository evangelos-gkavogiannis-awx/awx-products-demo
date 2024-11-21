import React, { useState } from "react";
import { activateAccount } from "../apiService";
import "./ActivateAccount.css";

const ActivateAccount = () => {
    const [accountId, setAccountId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleActivate = async () => {
        if (!accountId) {
            alert("Please enter an Account ID.");
            return;
        }

        setLoading(true);

        try {
            // Use the activateAccount method from apiService
            const response = await activateAccount(accountId);
            alert("Connected Account activated successfully!");
            console.log("Activation Response:", response);
        } catch (error) {
            console.error("Error activating account:", error);
            alert("Failed to activate the account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="activate-account">
            <h2>Activate Account</h2>
            <div className="form-group">
                <label>Account ID:</label>
                <input
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="Enter Account ID"
                />
            </div>
            <button onClick={handleActivate} disabled={loading}>
                {loading ? "Activating..." : "Activate"}
            </button>
        </div>
    );
};

export default ActivateAccount;
