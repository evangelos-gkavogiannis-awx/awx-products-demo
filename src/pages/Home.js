import React, { useState } from 'react';

function Home({ availableTabs, selectedTabs, onFeatureSelect, onSubmit }) {
    const capabilityDetails = {
        'global-accounts': {
            description:
                'Global Accounts enable you to receive bank transfers into and authorize direct debit payouts from the Wallet.',
            apiLink: 'https://www.airwallex.com/docs/global-treasury__global-accounts', // Placeholder for API documentation link
            icon: '🌍', // Placeholder icon
        },
        wallet: {
            description: 'Check your wallet balances and convert wallet balances.',
            apiLink: 'https://www.airwallex.com/uk/global-business-account?utm_medium=paid_search&utm_source=google&utm_term=air%20wallex&utm_campaign=uk_ao-prod-brand_generic_low_global-accounts&gad_source=1&gclid=CjwKCAiA9IC6BhA3EiwAsbltOPcjQRLH-IPoTSq7RtLD3ktKyysnp3K1k0qcWRdLGA4ciJ5iEcrGgxoCRxUQAvD_BwE',
            icon: '💰',
        },
        'linked-accounts': {
            description:
                'Create verified external financial account (such as a bank account, credit/debit card, or e-wallet account) that is bound to your Airwallex account.',
            apiLink: 'https://www.airwallex.com/docs/global-treasury__linked-accounts',
            icon: '🔗',
        },
        beneficiaries: {
            description: 'Create and manage beneficiaries (personal and business).',
            apiLink: 'https://www.airwallex.com/docs/payouts__create-beneficiaries',
            icon: '👤',
        },
        payouts: {
            description:
                'Programmatically make cost-effective, fast and secure payouts across the globe.',
            apiLink: 'https://www.airwallex.com/docs/payouts__create-a-transfer',
            icon: '💸',
        },
        issuing: {
            description:
                'Issue and manage multi-currency cards at scale, while reducing international transaction and FX fees.',
            apiLink: 'https://www.airwallex.com/docs/issuing__overview',
            icon: '💳',
        },
        finance: {
            description:
                'https://www.airwallex.com/docs/api#/Finance/Financial_Reports/',
            apiLink: '#',
            icon: '📊',
        },
        'payment-acceptance': {
            description:
                'Accept payments from your customers around the world with cards and 160+ alternative payment methods.',
            apiLink: 'https://www.airwallex.com/docs/payments__overview',
            icon: '✅',
        },
        'payment-methods': {
            description: 'Process and test E2E APM and local payment methods.',
            apiLink: 'https://www.airwallex.com/docs/payments__payment-methods-overview',
            icon: '🛒',
        },
    };

    const [showOptions, setShowOptions] = useState(true); // State to toggle visibility

    const handleSubmit = () => {
        setShowOptions(false); // Hide options after clicking submit
        onSubmit(); // Trigger the parent submit action
    };

    return (
        <div className="home-container text-center pt-6">
            <h1 className="text-lg font-bold mb-1 text-gray-800">Welcome to Airwallex Portal</h1>
            <p className="mb-1 text-xs text-gray-600">Select the features you want to explore</p>

            {showOptions ? (
                <div className="feature-selection space-y-1">
                    {availableTabs.map((tab, index) => {
                        const { description, apiLink, icon } = capabilityDetails[tab.id];

                        return (
                            <div
                                key={tab.id}
                                className={`flex items-center space-x-4 text-left pb-2 ${index !== availableTabs.length - 1 ? 'border-b border-gray-200' : ''
                                    }`}
                            >
                                {/* Icon */}
                                <div className="text-lg flex-shrink-0">{icon}</div>

                                {/* Details and Toggle */}
                                <div className="flex flex-grow items-center justify-between">
                                    {/* Details */}
                                    <div className="flex-grow">
                                        <span className="font-medium text-gray-700 text-sm">
                                            {tab.label}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">{description}</p>
                                        <a
                                            href={apiLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline text-xs"
                                        >
                                            Learn More
                                        </a>
                                    </div>

                                    {/* Toggle */}
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={selectedTabs.includes(tab.id)}
                                            onChange={() => onFeatureSelect(tab.id)}
                                        />
                                        {/* Toggle Bar */}
                                        <div className="w-11 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                                        {/* Toggle Circle */}
                                        <div className="absolute top-0.5 left-0.4 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-7"></div>
                                    </label>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-gray-700 mt-3">
                    Thank you! Your selected features are being loaded...
                </p>
            )}

            {showOptions && (
                <button
                    onClick={handleSubmit}
                    className="mt-3 px-3 py-1 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            )}
        </div>

    );
}

export default Home;
