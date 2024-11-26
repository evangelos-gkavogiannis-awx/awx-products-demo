// src/pages/IssueCard.js
import React, { useState, useEffect } from 'react';
import { fetchCardholders, issueCard } from '../apiService'; // Import issueCard
import './IssueCard.css';
import cardImage from '../assets/visa-airwallex-card.jpg'; // Assuming you've saved the card image locally
import airwallexLogo from '../assets/airwallex-logo.png';
import visaLogo from '../assets/visa-logo.png';
import awxLogo from '../assets/airwallex.png'


function IssueCard() {
    const [cardholders, setCardholders] = useState([]);
    const [formData, setFormData] = useState({
        allowedCurrencies: '',
        allowedMCC: '',
        allowedTransactionCount: '',
        use: 'SINGLE', // Default to SINGLE
        cashWithdrawalLimits: '',
        transactionLimit: '',
        cardHolder: '',
        brand: 'VISA', // Fixed value
        createdBy: '',
        formFactor: 'PHYSICAL',
        isPersonalized: 'YES',
        requestId: '',
    });


    const [cardDetails, setCardDetails] = useState(null); // For card overlay details
    const [showOverlay, setShowOverlay] = useState(false); // For controlling overlay visibility

    useEffect(() => {
        const loadCardholders = async () => {
            try {
                const data = await fetchCardholders();
                setCardholders(data);
            } catch (error) {
                console.error('Error loading cardholders:', error);
            }
        };

        loadCardholders();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to generate JSON request object
    const generateRequestData = () => ({
        authorization_controls: {
            allowed_transaction_count: formData.allowedTransactionCount,
            transaction_limits: {
                cash_withdrawal_limits: [
                    {
                        amount: parseFloat(formData.cashWithdrawalLimits) || 0,
                        interval: "PER_TRANSACTION"
                    }
                ],
                currency: formData.allowedCurrencies.split(',')[0] || 'USD', // Using the first currency
                limits: [
                    {
                        amount: parseFloat(formData.transactionLimit) || 0,
                        interval: "PER_TRANSACTION"
                    }
                ]
            }
        },
        brand: formData.brand,
        cardholder_id: formData.cardHolder,
        created_by: formData.createdBy,
        form_factor: formData.formFactor,
        is_personalized: formData.isPersonalized === 'YES',
        issue_to: "INDIVIDUAL",
        request_id: formData.requestId,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            authorization_controls: {
                allowed_transaction_count: formData.use,
                transaction_limits: {
                    cash_withdrawal_limits: [
                        {
                            amount: parseFloat(formData.cashWithdrawalLimits),
                            interval: 'PER_TRANSACTION',
                        },
                    ],
                    currency: formData.allowedCurrencies.split(',')[0], // Taking the first currency
                    limits: [
                        {
                            amount: parseFloat(formData.transactionLimit),
                            interval: 'PER_TRANSACTION',
                        },
                    ],
                },
            },
            brand: 'VISA',
            cardholder_id: formData.cardHolder,
            created_by: formData.createdBy,
            form_factor: formData.formFactor,
            is_personalized: formData.personalized === 'YES',
            issue_to: 'INDIVIDUAL',
            request_id: formData.requestId,
        };

        try {
            const response = await issueCard(requestData);
            setCardDetails({
                companyName: 'Awx', // Static company name placeholder
                nameOnCard: response.name_on_card,
            });
            setShowOverlay(true);
        } catch (error) {
            console.error('Error issuing card:', error);
        }
    };

    return (
        <div className="issue-card-container">
            <h1>Issue a New Card</h1>
            <form onSubmit={handleSubmit} className="form-grid">
                {/* Form fields */}
                <div className="form-field">
                    <label>Allowed Currencies</label>
                    <input
                        type="text"
                        name="allowedCurrencies"
                        value={formData.allowedCurrencies}
                        onChange={handleInputChange}
                        placeholder="e.g., USD,EUR"
                    />
                </div>
                <div className="form-field">
                    <label>Allowed MCC</label>
                    <input
                        type="text"
                        name="allowedMCC"
                        value={formData.allowedMCC}
                        onChange={handleInputChange}
                        placeholder="e.g., 5411,5812"
                    />
                </div>
                <div className="form-field">
                    <label>Use</label>
                    <select
                        name="allowedTransactionCount"
                        value={formData.allowedTransactionCount}
                        onChange={handleInputChange}
                    >
                        <option value="SINGLE">SINGLE</option>
                        <option value="MULTIPLE">MULTIPLE</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Cash Withdrawal Limits</label>
                    <input
                        type="number"
                        name="cashWithdrawalLimits"
                        value={formData.cashWithdrawalLimits}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label>Transaction Limit</label>
                    <input
                        type="number"
                        name="transactionLimit"
                        value={formData.transactionLimit}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label>Brand</label>
                    <input type="text" value="VISA" readOnly />
                </div>
                <div className="form-field">
                    <label>Card Holder</label>
                    <select
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a Cardholder</option>
                        {cardholders.map((holder) => (
                            <option
                                key={holder.cardholder_id}
                                value={holder.cardholder_id}
                            >
                                {`${holder.individual.name.first_name} ${holder.individual.name.last_name} - ${holder.email}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="form-field">
                    <label>Card Holder</label>
                    <input
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="Enter Card Holder ID"
                    />
                </div> */}
                <div className="form-field">
                    <label>Created By</label>
                    <input
                        type="text"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label>Form of Card</label>
                    <select
                        name="formFactor"
                        value={formData.formFactor}
                        onChange={handleInputChange}
                    >
                        <option value="PHYSICAL">PHYSICAL</option>
                        <option value="VIRTUAL">VIRTUAL</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Personalized</label>
                    <select
                        name="isPersonalized"
                        value={formData.isPersonalized}
                        onChange={handleInputChange}
                    >
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Request ID</label>
                    <input
                        type="text"
                        name="requestId"
                        value={formData.requestId}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="submit-button">Issue Card</button>

                {/* JSON Preview */}
                <div className="json-preview">
                    <h2>JSON Preview</h2>
                    <pre>{JSON.stringify(generateRequestData(), null, 2)}</pre>
                </div>
            </form>

            {/* Overlay for Card Issuance Confirmation */}
            {showOverlay && (
                <div className="overlay">
                    <h2>New Visa Card Issued</h2>
                    <div className="credit-card">
                        <div className="top-section">
                            <img
                                src={awxLogo} // Replace `awxLogo`
                                alt="Awx Logo"
                                className="awx-logo"
                            />
                            <img
                                src={airwallexLogo} // Replace `airwallexLogo` with the actual import for the Airwallex logo image
                                alt="Airwallex Logo"
                                className="airwallex-logo"
                            />
                        </div>
                        <div className="card-number">4242 4242 4242 4242</div>

                        <div className="expiration-and-name">
                            <div className="expiration-date">09/2029</div>
                            <div className="cardholder-name">Mr John Smith</div>
                        </div>
                        <div className="bottom-section">
                            <img
                                src={visaLogo} // Replace `visaLogo` with the actual import for the Visa logo image
                                alt="Visa Logo"
                                className="visa-logo"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default IssueCard;
