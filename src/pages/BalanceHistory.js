import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBalanceHistoryFromBackend } from '../apiService';

const BalanceHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currency = queryParams.get('currency');

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    const fetchBalanceHistory = async () => {
      try {
        const response = await fetchBalanceHistoryFromBackend(currency);
        setItems(response.items);
      } catch (error) {
        setError('Failed to fetch balance history. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (currency) {
      setLoading(true);
      fetchBalanceHistory();
    }
  }, [currency]);

  if (!currency) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <p className="text-gray-500">Invalid request. No currency specified.</p>
        <button
          onClick={() => navigate('/view-balance-history')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <p className="text-gray-500">Loading balance history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Balance History for {currency}
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500">No transactions available to display.</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">New Balance</th>
                <th className="px-6 py-3">Transaction Amount</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Transaction Type</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-b"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.balance}
                  </td>
                  <td className="px-6 py-4">{item.amount}</td>
                  <td className="px-6 py-4">{item.source_type}</td>
                  <td className="px-6 py-4">{item.transaction_type}</td>
                  <td className="px-6 py-4">
                    {new Date(item.posted_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {items.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 mx-1 text-sm font-medium rounded shadow ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span className="mx-2 text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 mx-1 text-sm font-medium rounded shadow ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BalanceHistory;
