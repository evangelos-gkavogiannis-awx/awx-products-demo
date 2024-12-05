import React, { useEffect, useState } from 'react';
import { fetchGlobalAccounts, fetchAccountDetails } from '../apiService';
import { useNavigate } from 'react-router-dom';

const countryMapping = {
    AU: { name: 'Australia', flag: '🇦🇺' },
    DK: { name: 'Denmark', flag: '🇩🇰' },
    US: { name: 'United States of America', flag: '🇺🇸' },
    SG: { name: 'Singapore', flag: '🇸🇬' },
    HK: { name: 'Hong Kong SAR', flag: '🇭🇰' },
};

function GlobalAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [selectedRowOptions, setSelectedRowOptions] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const data = await fetchGlobalAccounts();
                setAccounts(data);
            } catch (err) {
                setError('Failed to fetch global accounts data.');
            }
        };

        loadAccounts();
    }, []);

    const toggleRowOptions = (accountId) => {
        setSelectedRowOptions(selectedRowOptions === accountId ? null : accountId);
    };

    const handleOptionClick = (action, account) => {
        setSelectedRowOptions(null);
        switch (action) {
            case 'details':
                navigate(`/global-account-details/${account.id}`);
                break;
            case 'close':
                console.log('Closing account:', account.id);
                break;
            case 'update':
                navigate('/update-global-account', {
                    state: {
                        accountNumber: account.account_number,
                        accountId: account.id,
                        currentNickname: account.nick_name || '',
                    },
                });
                break;
            case 'topUp':
                navigate('/top-up-global-account-form', { state: { account } });
                break;
            default:
                break;
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-50 min-h-screen" style={{ width: '100%' }}>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Global Accounts</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full min-w-[1500px] text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-2 py-1">Bank Location</th>
                            <th className="px-2 py-1">Supported Currencies</th>
                            <th className="px-1 py-1 w-1/5">Account Number</th>
                            <th className="px-1 py-1 w-1/6">Status</th>
                            <th className="px-1 py-1 w-1/10">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id} className="odd:bg-white even:bg-gray-50 border-b">
                                {/* Bank Location */}
                                <td className="px-2 py-1 flex items-center gap-2">
                                    <span>{countryMapping[account.country_code]?.flag}</span>
                                    <span className="text-gray-900 font-medium">
                                        {countryMapping[account.country_code]?.name}
                                    </span>
                                </td>

                                {/* Supported Currencies (wrapped into max two lines) */}
                                <td className="px-2 py-1">
                                    <div className="text-sm text-gray-700 space-y-1">
                                        {account.supported_features
                                            .map((feature) => feature.currency)
                                            .reduce((acc, curr, idx) => {
                                                const chunkIndex = Math.floor(idx / Math.ceil(account.supported_features.length / 2)); // Max 2 lines
                                                if (!acc[chunkIndex]) acc[chunkIndex] = [];
                                                acc[chunkIndex].push(curr);
                                                return acc;
                                            }, [])
                                            .slice(0, 2) // Limit to 2 lines
                                            .map((line, index) => (
                                                <div key={index} className="truncate">
                                                    {line.join(', ')}
                                                </div>
                                            ))}
                                    </div>
                                </td>

                                {/* Account Number */}
                                <td className="px-1 py-1">{account.account_number || 'Available Soon'}</td>

                                {/* Status */}
                                <td className="px-1 py-1">
                                    <span
                                        className={`px-2 py-1 rounded text-white font-semibold ${account.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                                            }`}
                                    >
                                        {account.status}
                                    </span>
                                </td>

                                {/* Actions (Three Dots Dropdown) */}
                                <td className="px-2 py-1 relative">
                                    <button
                                        onClick={() => toggleRowOptions(account.id)}
                                        className="text-gray-500 hover:text-gray-800"
                                    >
                                        &#x22EE;
                                    </button>
                                    {selectedRowOptions === account.id && (
                                        <div className="absolute top-8 right-0 bg-white border rounded shadow-lg z-10 w-48">
                                            <button
                                                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-gray-700"
                                                onClick={() => handleOptionClick('details', account)}
                                            >
                                                Get Account Details
                                            </button>
                                            <button
                                                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-gray-700"
                                                onClick={() => handleOptionClick('close', account)}
                                            >
                                                Close Account
                                            </button>
                                            <button
                                                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-gray-700"
                                                onClick={() => handleOptionClick('update', account)}
                                            >
                                                Update Account
                                            </button>
                                            <button
                                                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-gray-700"
                                                onClick={() => handleOptionClick('topUp', account)}
                                            >
                                                Top Up Account
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GlobalAccounts;
