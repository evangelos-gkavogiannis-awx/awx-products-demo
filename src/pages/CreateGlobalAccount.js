import React, { useState } from 'react';
//import './CreateGlobalAccount.css';
import { useNavigate } from 'react-router-dom';

const countries = [
    {
        code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currencies: ['AED'], capabilities: [
            'Create an account in minutes',
            'Create accounts in the name of your business',
            'No transaction limits',
            'Domestic Bank Transfers',
            'IPI: 0-1 day',
            'RTGS: 0-1 day',
        ],
    },
    {
        code: 'AU', name: 'Australia', flag: '🇦🇺', currencies: ['AUD'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'Payout via Direct Debit',
            'No transaction limits',
        ],
    },
    {
        code: 'CA', name: 'Canada', flag: '🇨🇦', currencies: ['CAD'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'No transaction limits',
            'No additional industry limits',
            'Domestic Bank Transfers',
            'EFT: 0-1 day',
            'Interac e-Transfer: 0-1 day',
        ],
    },
    {
        code: 'DK', name: 'Denmark', flag: '🇩🇰', currencies: ['DKK', 'CHF', 'CZK', 'GBP', 'HUF', 'MXN', 'NOK', 'PLN', 'RON', 'SEK', 'ZAR', 'ILS', 'AUD', 'CAD', 'CNY', 'HKD', 'JPY', 'NZD', 'SGD', 'USD'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'No transaction limits',
            'Domestic Bank Transfers',
            'Intradayclearing: 0-1 day',
            'KRONOS2: 0-1 day',
            'International SWIFT Transfers: 0-3 days',
        ],
    },
    {
        code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currencies: ['GBP'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'Settle deposits instantly',
            'Payout via Direct Debit',
            'No transaction limits',
            'Domestic Bank Transfers',
            'Faster Payments: Instant',
            'BACS: 1-2 days',
            'CHAPS: 0-1 day',
        ],
    },
    {
        code: 'HK', name: 'Hong Kong SAR', flag: '🇭🇰', currencies: ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'HKD', 'JPY', 'NZD', 'SGD', 'USD'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'No transaction limits',
            'Domestic Bank Transfers',
            'ACH: 1-2 days',
            'RTGS: 0-1 day',
            'FPS: Instant',
            'International SWIFT Transfers: 0-3 days',
        ],
    },
    {
        code: 'ID', name: 'Indonesia', flag: '🇮🇩', currencies: ['IDR'], capabilities: [
            'Create accounts instantly',
            'Settle deposits instantly',
            'No transaction limits',
            'Domestic Bank Transfers',
            'RTGS: 0-1 day',
            'SKN: 0-1 day',
            'BI-FAST: 0-1 day',
        ],
    },
    {
        code: 'MX', name: 'Mexico', flag: '🇲🇽', currencies: ['MXN'], capabilities: [
            'Create accounts instantly',
            'Settle deposits instantly',
            'No transaction limits',
            'Domestic Bank Transfers',
            'RTGS: 0-1 day',
            'SKN: 0-1 day',
            'BI-FAST: 0-1 day',
        ],
    },
    {
        code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currencies: ['NZD'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'No transaction limits',
            'Domestic Bank Transfers: 0-1 day',
        ],
    },
    {
        code: 'PL', name: 'Poland', flag: '🇵🇱', currencies: ['PLN'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'Settle deposits instantly',
            'No transaction limits',
            'Domestic Bank Transfers',
            'Express Elixir: 0-1 day',
            'Elixir: 0-1 day',
            'Sorbnet: 0-1 day',
        ],
    },
    {
        code: 'SG', name: 'Singapore', flag: '🇸🇬', currencies: ['SGD', 'AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'HKD', 'JPY', 'NOK', 'NZD', 'SEK', 'USD'], capabilities: [
            'Create accounts instantly',
            'No transaction limits',
            'Domestic Bank Transfers',
            'GIRO: 0-1 day',
            'MEPS: Instant',
            'FAST: Instant',
            'International SWIFT Transfers: 0-3 days',
        ],
    },
    {
        code: 'US', name: 'United States of America', flag: '🇺🇸', currencies: ['USD'], capabilities: [
            'Create accounts instantly',
            'Create accounts in the name of your business',
            'Payout via Direct Debit',
            'No additional industry limits',
            'Domestic Bank Transfers',
            'ACH: 1-2 days',
            'Fedwire: 0-1 day',
            'International SWIFT Transfers: 0-3 days',
        ],
    },
];

function CreateGlobalAccount() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const navigate = useNavigate();

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setSelectedCurrency(country.currencies[0]);
    };

    const handleCreateAccount = () => {
        if (selectedCountry) {
            navigate('/global-account-creation', { state: { country: selectedCountry, selectedCurrency } });
        }
    };

    return (
        <div className="create-global-account w-full mx-auto max-w-screen-3xl p-6 lg:p-12">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Where do you want to open your Global Account?
            </h1>
            <p className="text-gray-600 text-center mb-8">
                Select from a wide range of account locations to receive funds or payout via Direct Debit.
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Part: Locations */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-4">Select Account Location</h2>
                    <div className="space-y-4">
                        {countries.map((country) => (
                            <label
                                key={country.code}
                                className={`flex items-center justify-between border rounded-lg p-1 hover:bg-gray-50 ${selectedCountry?.code === country.code
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="country"
                                        value={country.code}
                                        checked={selectedCountry?.code === country.code}
                                        onChange={() => handleCountryChange(country)}
                                        className="form-radio text-blue-500"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {country.flag} {country.name} ({country.currencies[0]})
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {country.currencies.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Right Part: Capabilities */}
                <div className="w-full lg:w-1/2">
                    {selectedCountry ? (
                        <>
                            <h2 className="text-xl font-semibold mb-4">Account Capabilities</h2>
                            <div className="space-y-2">
                                {selectedCountry.capabilities.map((capability, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50"
                                    >
                                        <span className="text-green-500 font-bold">✔</span>
                                        <span className="text-gray-700">{capability}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 w-full"
                                onClick={handleCreateAccount}
                            >
                                Create Global Account
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-500">Please select a location to view account capabilities.</p>
                    )}
                </div>
            </div>
        </div>
    );

}

export default CreateGlobalAccount;
