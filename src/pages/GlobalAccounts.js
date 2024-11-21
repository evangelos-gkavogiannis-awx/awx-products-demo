import React, { useEffect, useState } from 'react';
import { fetchGlobalAccounts, fetchAccountDetails } from '../apiService';
import { useNavigate } from 'react-router-dom';

function GlobalAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountDetails, setAccountDetails] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const data = await fetchGlobalAccounts();
                setAccounts(data);
            } catch (err) {
                setError("Failed to fetch global accounts data.");
            }
        };

        loadAccounts();
    }, []);

    const handleSelectAccount = (account) => {
        setSelectedAccount(selectedAccount === account ? null : account);
        setAccountDetails(null);
    };

    const handleGetAccountDetails = async () => {
        if (selectedAccount) {
            try {
                const details = await fetchAccountDetails(selectedAccount.id);
                setAccountDetails(details);
            } catch (error) {
                console.error("Error fetching account details:", error);
                setError("Failed to fetch account details.");
            }
        }
    };

    const handleCreateAccount = () => {
        navigate("/create-global-account");
    };

    const handleUpdateClick = (account) => {
        navigate('/update-global-account', {
            state: {
                accountNumber: account.account_number,
                accountId: account.id,
                currentNickname: account.nick_name || '',
            },
        });
    };

    const handleTopUpClick = () => {
        navigate('/top-up-global-account-form', { state: { account: selectedAccount } });
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Global Accounts</h1>

            <p className="text-gray-600 mb-4">
                Want to learn more about Global Accounts and how they differ from your Airwallex Wallet?{' '}
                <a
                    href="https://help.airwallex.com/hc/en-gb/articles/900001756246-What-is-a-Global-Account-and-how-is-it-different-from-my-Airwallex-Wallet#:~:text=Global%20Accounts%20will%20collect%20the,Global%20Accounts%20across%20various%20geographies"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Check out our detailed guide here.
                </a>
            </p>

            {/* Create Global Account Button */}
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mb-6"
                    onClick={handleCreateAccount}
                >
                    Create Global Account
                </button>
            </div>


            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Responsive Table Container */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Select</th>
                            <th className="px-6 py-3">Account Name</th>
                            <th className="px-6 py-3">Account Number</th>

                            <th className="px-6 py-3">Supported Features</th>
                            <th className="px-6 py-3">Currency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr
                                key={account.id}
                                className="odd:bg-white even:bg-gray-50 border-b"
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="radio"
                                        name="accountSelect"
                                        className="form-radio text-blue-500"
                                        checked={selectedAccount === account}
                                        onChange={() => handleSelectAccount(account)}
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {account.account_name}
                                </td>
                                <td className="px-6 py-4">{account.account_number}</td>

                                <td className="px-6 py-4">
                                    {account.required_features
                                        .map((feature) => feature.transfer_method)
                                        .join(', ')}
                                </td>
                                <td className="px-6 py-4">
                                    {account.required_features
                                        .map((feature) => feature.currency)
                                        .join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons for Selected Account */}
            {selectedAccount && (
                <div className="mt-6 flex gap-4 justify-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        onClick={handleGetAccountDetails}
                    >
                        Get Account Details
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        onClick={() => console.log("Close Account")}
                    >
                        Close Account
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        onClick={() => handleUpdateClick(selectedAccount)}
                    >
                        Update Account
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        onClick={handleTopUpClick}
                    >
                        Top Up Account
                    </button>
                </div>
            )}

            {/* Account Details Section */}
            {accountDetails && (
                <div className="mt-6 bg-gray-100 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                    <pre className="text-sm text-gray-800">{JSON.stringify(accountDetails, null, 2)}</pre>
                </div>
            )}
        </div>

    );

}

export default GlobalAccounts;
