import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createGlobalAccount } from '../apiService';
import './GlobalAccountCreationForm.css';
// import '../App.css'

function GlobalAccountCreationForm() {
    const { state } = useLocation();
    const { country, selectedCurrency } = state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        countryCode: country.code,
        nickname: '',
        requestId: '',
        currency: selectedCurrency,
        transferMethod: 'Local',
        depositConversionCurrency: '', // For Canada and Indonesia
        email: '' // For Canada
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.countryCode ||
            !formData.requestId ||
            !formData.currency ||
            !formData.transferMethod ||
            (country.code === 'CA' && !formData.email)
        ) {
            setError("Please complete all the required fields");
            return;
        }

        setError('');

        const requestPayload = {
            country_code: formData.countryCode,
            nick_name: formData.nickname || undefined,
            request_id: formData.requestId,
            required_features: [
                {
                    currency: formData.currency,
                    transfer_method: formData.transferMethod.toUpperCase()
                }
            ]
        };

        if (country.code === 'ID' || country.code === 'CA') {
            requestPayload.deposit_conversion_currency = formData.depositConversionCurrency;
        }

        if (country.code === 'CA') {
            requestPayload.email = formData.email;
        }

        console.log(requestPayload)
        try {
            const accountData = await createGlobalAccount(requestPayload);
            navigate('/global-account-confirmation', { state: { accountData } });
        } catch (error) {
            console.error("Error creating global account:", error);
            setError("Failed to create the global account. Please try again.");
        }
    };

    const renderFields = () => {
        const fields = [

            <div key="countryCode" className="form-field">
                <label>Country Code</label>
                <input type="text" value={formData.countryCode} readOnly />
            </div>,
            <div key="nickname" className="form-field">
                <label>Nick Name (optional)</label>
                <input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} />
            </div>,
            <div key="requestId" className="form-field">
                <label>Request ID</label>
                <input type="text" name="requestId" value={formData.requestId} onChange={handleInputChange} />
            </div>,
            <div key="currency" className="form-field">
                <label>Currency</label>
                <select name="currency" value={formData.currency} onChange={handleInputChange}>
                    {country.currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>,
            <div key="transferMethod" className="form-field">
                <label>Transfer Method</label>
                <select name="transferMethod" value={formData.transferMethod} onChange={handleInputChange}>
                    <option value="Local">Local</option>
                    <option value="SWIFT">SWIFT</option>
                </select>
            </div>
        ];

        if (country.code === 'ID') {
            fields.splice(1, 0, (
                <div key="depositConversionCurrency" className="form-field">
                    <label>Deposit Conversion Currency</label>
                    <input
                        type="text"
                        name="depositConversionCurrency"
                        value={formData.depositConversionCurrency}
                        onChange={handleInputChange}
                    />
                </div>
            ));
        }

        if (country.code === 'CA') {
            fields.splice(0, 0, (
                <div key="email" className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
            ));
            fields.splice(2, 0, (
                <div key="depositConversionCurrency" className="form-field">
                    <label>Deposit Conversion Currency</label>
                    <input
                        type="text"
                        name="depositConversionCurrency"
                        value={formData.depositConversionCurrency}
                        onChange={handleInputChange}
                    />
                </div>
            ));
        }

        return fields;
    };

    return (
        <div className="global-account-creation-form">
            <h1 className="form-title">Create Global Account in {country.name}</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                {renderFields()}
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default GlobalAccountCreationForm;
