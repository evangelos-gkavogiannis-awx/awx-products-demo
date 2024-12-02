import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements';
import { createPaymentIntent } from '../apiService';

function HostedPaymentPage() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [error, setError] = useState('');

    const handlePayNow = async () => {
        if (!amount || !currency) {
            setError('Please enter both amount and currency.');
            return;
        }

        try {
            // Initialize Airwallex
            await loadAirwallex({
                env: 'demo', // Change to 'prod' in production
                origin: window.location.origin,
            });

            // Create a unique request_id
            const requestId = crypto.randomUUID();

            // Create PaymentIntent using the existing function
            const paymentIntentData = {
                amount: parseFloat(amount),
                currency: currency.toUpperCase(),
                merchant_order_id: `order_${Date.now()}`,
                return_url: window.location.href,
                request_id: requestId,
            };

            const { id, client_secret } = await createPaymentIntent(paymentIntentData);

            // Redirect to Airwallex Hosted Payment Page
            redirectToCheckout({
                env: 'demo',
                intent_id: id,
                client_secret: client_secret,
                currency: currency.toUpperCase(),
                successUrl: `${window.location.origin}/payment-success`,
                failUrl: `${window.location.origin}/payment-fail`,
                /*
                Use the following to add ApplePay 
                ApplePay is only visible in Safari
                */
                applePayRequestOptions: {
                    countryCode: 'UK',
                    buttonType: 'buy', // Indicate the type of button you want displayed on your payments form. Like 'buy'
                    buttonColor: 'white-with-line', // Indicate the color of the button. Default value is 'black' 
                },
                //Control what payment methods are displayed using the following one:
                methods: [
                    'card',         // Visa, Mastercard, etc.
                    'googlepay', 
                    'applepay',   // Google Pay
                    'wechatpay',    // WeChat Pay
                    'bacs_direct_debit'  // Example for Direct Debit
                ]
            });
        } catch (error) {
            console.error('Error during payment process:', error);
            setError('An error occurred during the payment process. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Test Airwallex Hosted Payments Page</h1>
                <p className="text-center mb-6">
                    Enter the amount and currency to test the Airwallex Hosted Payments Page.
                    You can learn more{' '}
                    <a
                        href="https://www.airwallex.com/docs/payments__hosted-payment-page"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        here
                    </a>
                    .
                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter amount"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Currency</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter currency (e.g., USD)"
                    />
                </div>
                <button
                    onClick={handlePayNow}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}

export default HostedPaymentPage;
