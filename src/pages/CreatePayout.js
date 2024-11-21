import React, { useState, useEffect } from 'react';
import { createQuote, createConversion, createTransfer } from '../apiService';

const CreatePayout = () => {
    const [sourceAmount, setSourceAmount] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState('USD');
    const [recipientAmount, setRecipientAmount] = useState('');
    const [quoteId, setQuoteId] = useState('');
    const [fxRate, setFxRate] = useState(null); // To store the FX client rate
    const [lastRefreshed, setLastRefreshed] = useState(null); // To store the last refreshed time
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAmountChange = async () => {
        setError(null);

        if (!sourceAmount || !sourceCurrency) {
            setRecipientAmount('');
            setFxRate(null);
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create Quote
            const quoteData = {
                sell_amount: parseFloat(sourceAmount),
                sell_currency: sourceCurrency,
                buy_currency: 'EUR',
                validity: 'HR_8',
            };
            const quoteResponse = await createQuote(quoteData);

            setQuoteId(quoteResponse.id);

            // Extract FX client rate and set it
            const clientRate = quoteResponse.rate_details.find((detail) => detail.level === 'CLIENT')?.rate;
            setFxRate(clientRate);
            setLastRefreshed(new Date().toLocaleTimeString());

            // Step 2: Fetch Conversion using Quote ID
            const conversionData = {
                sell_amount: parseFloat(sourceAmount),
                sell_currency: sourceCurrency,
                buy_currency: 'EUR',
                reason: 'For settling a payment',
                request_id: Math.random().toString(36).substr(2, 12),
                term_agreement: true,
                quote_id: quoteResponse.id,
            };
            const conversionResponse = await createConversion(conversionData);
            setRecipientAmount(conversionResponse.buy_amount || '');
        } catch (err) {
            console.error(err);
            setError('Failed to calculate conversion. Please try again.');
            setRecipientAmount('');
            setFxRate(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleAmountChange();
    }, [sourceAmount, sourceCurrency]);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        try {
            const transferData = {
                beneficiary: {
                    address: {
                        city: 'Dublin',
                        country_code: 'IE',
                        postcode: 'D02AF30',
                        street_address: '4 Merrion Road',
                    },
                    bank_details: {
                        account_currency: 'EUR',
                        account_name: 'John Walker',
                        bank_country_code: 'IE',
                        iban: 'IE82BOFI90001720611511',
                    },
                    company_name: 'BG TEX NOVA Ltd.',
                    entity_type: 'PERSONAL',
                    first_name: 'Test',
                    last_name: 'L test',
                },
                client_data: '8f60c65e-8fa4-4c2a-b30b-0bf0f33cc6f1',
                fee_paid_by: 'PAYER',
                quote_id: quoteId,
                reason: 'transfer_to_own_account',
                reference: 'Test123',
                remarks: 'Test remarks',
                request_id: Math.random().toString(36).substr(2, 12),
                source_currency: sourceCurrency,
                source_amount: parseFloat(sourceAmount),
                transfer_currency: 'EUR',
                transfer_method: 'SWIFT',
            };

            const transferResponse = await createTransfer(transferData);
            console.log('Transfer created successfully:', transferResponse);
            alert('Payout created successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to create payout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Introductory Text */}
            <div className="mb-4">
                <p className="text-gray-700 mb-2">
                    For simplicity, we keep the recipient currency always <strong>EUR</strong>.
                </p>
                <p className="text-gray-700">
                    Interested in knowing more about <strong>transfers (payouts), quotes,</strong> and <strong>conversion</strong>?
                    Follow our guides <a
                        href="https://www.airwallex.com/docs/payouts__create-a-transfer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        here
                    </a>.
                </p>
                <p className="text-gray-700">
                    We also provide a <strong>Payout Embedded Component</strong>. 
                    Learn more <a
                        href="https://www.airwallex.com/docs/payouts__embedded-transfer-component"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        here
                    </a>.
                </p>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a Payout</h1>


            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* You Pay Section */}
                <div className="mb-4">
                    <label htmlFor="sourceAmount" className="block text-gray-700 font-medium mb-2">
                        You Pay
                    </label>
                    <div className="flex items-center">
                        <input
                            id="sourceAmount"
                            type="number"
                            value={sourceAmount}
                            onChange={(e) => setSourceAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <select
                            value={sourceCurrency}
                            onChange={(e) => setSourceCurrency(e.target.value)}
                            className="border border-gray-300 bg-gray-100 px-4 py-2 rounded-r focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="USD">USD</option>
                            <option value="CAD">CAD</option>
                            <option value="EUR">EUR</option>
                            <option value="AUD">AUD</option>
                            <option value="GBP">GBP</option>
                            <option value="CHF">CHF</option>
                            <option value="JPY">JPY</option>
                            <option value="CNY">CNY</option>
                            <option value="INR">INR</option>
                            <option value="ZAR">ZAR</option>
                        </select>
                    </div>
                </div>

                {/* FX Rate Section */}
                {fxRate && (
                    <div className="mb-4 flex items-center text-gray-700">
                        <p className="text-lg font-medium">
                            1 {sourceCurrency} = {fxRate} EUR
                        </p>
                        <p className="ml-4 text-sm text-gray-500">
                            Refreshed at {lastRefreshed}
                        </p>
                    </div>
                )}

                {/* Recipient Receives Section */}
                <div className="mb-4">
                    <label htmlFor="recipientAmount" className="block text-gray-700 font-medium mb-2">
                        Recipient Receives
                    </label>
                    <div className="flex items-center">
                        <input
                            id="recipientAmount"
                            type="text"
                            value={recipientAmount}
                            readOnly
                            className="border border-gray-300 rounded-l px-4 py-2 w-full bg-gray-100 focus:outline-none"
                        />
                        <span className="border border-gray-300 bg-gray-100 px-4 py-2 rounded-r">EUR</span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition duration-300 ${loading && 'opacity-50 cursor-not-allowed'
                        }`}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 text-red-500 text-sm font-medium">
                    Error: {error}
                </div>
            )}
        </div>
    );
};

export default CreatePayout;
