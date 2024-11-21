import React, { useState, useEffect } from 'react';
import { fetchBeneficiaries } from '../apiService';
import { Link } from 'react-router-dom';


const Beneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const retrieveBeneficiaries = async () => {
            try {
                const data = await fetchBeneficiaries();
                const mappedBeneficiaries = data.map(item => ({
                    id: item.id,
                    country: item.beneficiary.address.country_code,
                    accountCurrency: item.beneficiary.bank_details.account_currency,
                    iban: item.beneficiary.bank_details.iban,
                    transferMethod: item.transfer_methods.join(', '),
                    entityType: item.beneficiary.entity_type,
                }));
                setBeneficiaries(mappedBeneficiaries);
            } catch (err) {
                setError('Failed to retrieve beneficiaries');
                console.error(err);
            }
        };
        retrieveBeneficiaries();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Beneficiaries</h2>
            <p className="text-gray-600 mb-4">
                Here is the list of beneficiaries that can be used for Payouts and Batch Payouts. 
                Want to know more about beneficiaries?{' '}
                <a
                    href="https://www.airwallex.com/docs/payouts__create-beneficiaries"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Check out our public documentation here.
                </a>
            </p>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Beneficiaries Table */}
            {beneficiaries.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Country</th>
                                <th className="px-6 py-3">Account Currency</th>
                                <th className="px-6 py-3">IBAN</th>
                                <th className="px-6 py-3">Transfer Method</th>
                                <th className="px-6 py-3">Entity Type</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beneficiaries.map((beneficiary, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-white even:bg-gray-50 border-b"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {beneficiary.country}
                                    </td>
                                    <td className="px-6 py-4">{beneficiary.accountCurrency}</td>
                                    <td className="px-6 py-4">{beneficiary.iban}</td>
                                    <td className="px-6 py-4">{beneficiary.transferMethod}</td>
                                    <td className="px-6 py-4">{beneficiary.entityType}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/beneficiary-details/${beneficiary.id}`}>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                                                View Beneficiary Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No beneficiaries found.</p>
            )}
        </div>

    );
};

export default Beneficiaries;
