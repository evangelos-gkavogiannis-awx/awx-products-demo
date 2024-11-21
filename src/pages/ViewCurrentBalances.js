import React, { useEffect, useState } from 'react';
import { fetchCurrentBalancesFromBackend } from '../apiService';  // Import the API service
//import './ViewCurrentBalances.css';

function ViewCurrentBalances() {
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch balances from the backend API
    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const response = await fetchCurrentBalancesFromBackend();

                // If there are valid balances, set them to state
                setBalances(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch balances. Please try again later.');
                setLoading(false);
            }
        };

        fetchBalances();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Current Balances</h1>

            {/* Loading State */}
            {loading && <p className="text-gray-500 mb-4">Loading...</p>}

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* No Balances */}
            {balances.length === 0 ? (
                <p className="text-gray-500">No available balances to display.</p>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Currency</th>
                                <th className="px-6 py-3">Available Amount</th>
                                <th className="px-6 py-3">Pending Amount</th>
                                <th className="px-6 py-3">Reserved Amount</th>
                                <th className="px-6 py-3">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {balances.map((balance) => (
                                <tr
                                    key={balance.currency}
                                    className="odd:bg-white even:bg-gray-50 border-b"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {balance.currency}
                                    </td>
                                    <td className="px-6 py-4">{balance.available_amount}</td>
                                    <td className="px-6 py-4">{balance.pending_amount}</td>
                                    <td className="px-6 py-4">{balance.reserved_amount}</td>
                                    <td className="px-6 py-4">{balance.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
}

export default ViewCurrentBalances;
