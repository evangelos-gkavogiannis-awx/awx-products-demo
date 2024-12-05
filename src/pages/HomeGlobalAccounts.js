import React from 'react';
import GlobalAccountsImage from '../assets/home-global-accounts.png'; // Update the path as necessary

function HomeGlobalAccounts() {
    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-semibold mb-4 shadow-md">
                        Global Account Management
                    </h1>
                    <p className="text-lg mb-6">
                        Global Accounts enable you to receive bank transfers into and authorize direct debit payouts from the Wallet.
                    </p>
                    <div className="space-y-2">
                        <a
                            href="/create-global-account"
                            className="text-white font-medium hover:underline hover:text-blue-300 transition-all duration-200"
                        >
                            Create a new Global account
                        </a>
                        <p>or</p>
                        <a
                            href="/global-accounts"
                            className="text-white font-medium hover:underline hover:text-blue-300 transition-all duration-200"
                        >
                            Get a list of your current Global accounts
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Image Section */}
                <div className="lg:w-1/2">
                    <img
                        src={GlobalAccountsImage}
                        alt="Global Accounts"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                {/* Text Section */}
                <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Hassle-free international business payments with local bank details
                    </h2>
                    <p className="text-gray-600">
                        Skip the queues and tedious paperwork usually involved in setting up local currency accounts around the world. Open a business account online and collect international payments from global customers in their preferred currency.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <span className="text-green-600 text-xl">✔</span>
                            <span>Save on unnecessary bank charges with Airwallex's low-cost local payment network.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-green-600 text-xl">✔</span>
                            <span>Streamline your global cash management by converting held balances to different currencies in a few clicks.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-green-600 text-xl">✔</span>
                            <span>Know your funds are safe and secure with end-to-end encryption and bank-level security.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-green-600 text-xl">✔</span>
                            <span>Avoid costly conversion fees by receiving payments in the same currencies as your customers pay in.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomeGlobalAccounts;
