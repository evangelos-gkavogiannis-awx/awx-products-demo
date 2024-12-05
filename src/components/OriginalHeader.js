// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/airwallex-logo.png'

function Header({ selectedTabs }) {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [isSwitchToPlatform, setIsSwitchToPlatform] = useState(true); // Button state
    const [isIssuingHovered, setIsIssuingHovered] = useState(false);
    const [isPayoutsHovered, setIsPayoutsHovered] = useState(false);
    const [isBeneficiariesHovered, setIsBeneficiariesHovered] = useState(false);
    const [isPaymentHovered, setIsPaymentHovered] = useState(false);
    const [isBalancesHovered, setIsBalancesHovered] = useState(false);
    const [isPaymentMethodHovered, setIsPaymentMethodHovered] = useState(false); // State for Balances hover

    const tabLinks = {
        'global-accounts': { path: '/home-global-accounts', label: 'Global Accounts' },
        wallet: { path: '/wallet', label: 'Wallet' },
        'linked-accounts': { path: '/linked-accounts', label: 'Linked Accounts' },
        beneficiaries: { path: '/beneficiaries', label: 'Beneficiaries' },
        payouts: { path: '/payouts', label: 'Payouts' },
        issuing: { path: '/issuing', label: 'Issuing' },
        finance: { path: '/finance', label: 'Finance' },
        'payment-acceptance': { path: '/payment-acceptance', label: 'Payment Acceptance' },
        'payment-methods': { path: '/payment-methods', label: 'Payment Methods' },
    };

    const handleSwitchClick = () => {
        if (isSwitchToPlatform) {
            // Navigate to Platform view
            setIsSwitchToPlatform(true);
            navigate("/platform");
        } else {
            // Navigate back to Connected Accounts view
            setIsSwitchToPlatform(false);
            navigate("/");
        }
        setIsSwitchToPlatform(!isSwitchToPlatform); // Toggle button state
    };

    return (
        <div className="header">
            {/* Add the logo */}
            <img src={Logo} alt="Logo" className="header-logo w-32 h-auto" />
            <Link to="/home-global-accounts" className="nav-item">Global Accounts</Link>

            {selectedTabs.map((tabId) => (
                <Link key={tabId} to={tabLinks[tabId].path} className="nav-item">
                    {tabLinks[tabId].label}
                </Link>
            ))}

            {/* Balances Tab */}
            <div
                className="nav-item balances-tab"
                onMouseEnter={() => setIsBalancesHovered(true)}
                onMouseLeave={() => setIsBalancesHovered(false)} // Hover state for Balances
            >
                Wallet
                {isBalancesHovered && (
                    <div className="balances-dropdown">
                        <Link to="/view-current-balances" className="dropdown-item">View current balances</Link>
                        <Link to="/view-balance-history" className="dropdown-item">View balance history</Link>
                    </div>
                )}
            </div>

            <Link to="/linked-accounts" className="nav-item">Linked Accounts</Link>

            {/* Beneficiaries Tab */}
            <div
                className="nav-item beneficiaries-tab"
                onMouseEnter={() => setIsBeneficiariesHovered(true)}
                onMouseLeave={() => setIsBeneficiariesHovered(false)}
            >
                Beneficiaries
                {isBeneficiariesHovered && (
                    <div className="beneficiaries-dropdown">
                        <Link to="/retrieve-beneficiaries" className="dropdown-item">Retrieve Beneficiaries</Link>
                        <Link to="/create-beneficiary" className="dropdown-item">Create a Beneficiary</Link>
                    </div>
                )}
            </div>

            {/* Payouts Tab */}
            <div
                className="nav-item payouts-tab"
                onMouseEnter={() => setIsPayoutsHovered(true)}
                onMouseLeave={() => setIsPayoutsHovered(false)}
            >
                Payouts
                {isPayoutsHovered && (
                    <div className="payouts-dropdown">
                        <Link to="/create-payout" className="dropdown-item">Create a payout</Link>
                        <Link to="/create-payout-beneficiary" className="dropdown-item">Create a payout to beneficiary</Link>
                        <Link to="/create-batch-payout" className="dropdown-item">Create batch payout</Link>
                        <Link to="/list-payouts" className="dropdown-item">Get list of payouts</Link>
                        <Link to="/invoice-payout" className="dropdown-item">Invoice Payout</Link>
                    </div>
                )}
            </div>

            {/* Issuing Tab */}
            <div
                className="nav-item issuing-tab"
                onMouseEnter={() => setIsIssuingHovered(true)}
                onMouseLeave={() => setIsIssuingHovered(false)}
            >
                Issuing
                {isIssuingHovered && (
                    <div className="issuing-dropdown">
                        <Link to="/cards" className="dropdown-item">View your active cards</Link>
                        <Link to="/issue-card" className="dropdown-item">Issue a card</Link>
                        <Link to="/batch-issuing" className="dropdown-item">Batch Issuing</Link>
                        <Link to="/view-cardholders" className="dropdown-item">View cardholders</Link>
                        <Link to="/create-cardholder" className="dropdown-item">Create a cardholder</Link>
                        <Link to="/card-authorisations" className="dropdown-item">Card authorisations</Link>
                        <Link to="/issuing-configuration" className="dropdown-item">Issuing configuration</Link>
                    </div>
                )}
            </div>

            <Link to="/finance" className="nav-item">Finance</Link>

            {/* Payment Acceptance Tab */}
            <div
                className="nav-item payment-acceptance-tab"
                onMouseEnter={() => setIsPaymentHovered(true)}
                onMouseLeave={() => setIsPaymentHovered(false)}
            >
                Payment Acceptance
                {isPaymentHovered && (
                    <div className="payment-dropdown">
                        <Link to="/send-invoice" className="dropdown-item">Send Invoice</Link>
                        <Link to="/create-quote" className="dropdown-item">Create Quote</Link>
                    </div>
                )}
            </div>

            <div
                className="nav-item payment-acceptance-tab"
                onMouseEnter={() => setIsPaymentMethodHovered(true)}
                onMouseLeave={() => setIsPaymentMethodHovered(false)}
            >
                Payment Methods
                {isPaymentMethodHovered && (
                    <div className="payment-dropdown">
                        <Link to="/wechat-pay" className="dropdown-item">WeChat Pay</Link>
                        <Link to="/hosted-payment-page" className="dropdown-item">Airwallex HPP</Link>
                    </div>
                    
                )}
            </div>

            {/* Switch to Platform Button */}
            <button className="switch-to-platform-btn" onClick={handleSwitchClick}>
                {isSwitchToPlatform ? "Switch to Platform" : "Switch to Connected Accounts"}
            </button>
        </div>

    );
}

export default Header;
