import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBeneficiaryDetails } from '../apiService';

const BeneficiaryDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [beneficiaryDetails, setBeneficiaryDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBeneficiaryDetails = async () => {
            try {
                const data = await fetchBeneficiaryDetails(id);
                setBeneficiaryDetails(data); // Save the entire response
            } catch (err) {
                setError('Failed to load beneficiary details');
                console.error(err);
            }
        };
        getBeneficiaryDetails();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!beneficiaryDetails) {
        return <p>Loading...</p>;
    }

    const { beneficiary, transfer_methods } = beneficiaryDetails;

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Beneficiary Details</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Field</th>
                            <th className="px-6 py-3">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">City</td>
                            <td className="px-6 py-4">{beneficiary?.address?.city || 'N/A'}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">Postcode</td>
                            <td className="px-6 py-4">{beneficiary?.address?.postcode || 'N/A'}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">Street Address</td>
                            <td className="px-6 py-4">{beneficiary?.address?.street_address || 'N/A'}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">Account Currency</td>
                            <td className="px-6 py-4">{beneficiary?.bank_details?.account_currency || 'N/A'}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">Account Number</td>
                            <td className="px-6 py-4">{beneficiary?.bank_details?.account_number || 'N/A'}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">Bank Name</td>
                            <td className="px-6 py-4">{beneficiary?.bank_details?.bank_name || 'N/A'}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">IBAN</td>
                            <td className="px-6 py-4">{beneficiary?.bank_details?.iban || 'N/A'}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">Transfer Methods</td>
                            <td className="px-6 py-4">{transfer_methods?.join(', ') || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default BeneficiaryDetails;
