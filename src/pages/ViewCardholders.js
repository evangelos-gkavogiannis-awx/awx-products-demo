// src/pages/ViewCardholders.js
import React, { useState, useEffect } from 'react';
import { fetchCardholders } from '../apiService'; // API call to fetch cardholders


function ViewCardholders() {
    const [cardholders, setCardholders] = useState([]);
    const [selectedCardholder, setSelectedCardholder] = useState(null);

    useEffect(() => {
        const loadCardholders = async () => {
            try {
                const data = await fetchCardholders();
                setCardholders(data);
            } catch (error) {
                console.error('Error fetching cardholders:', error);
            }
        };

        loadCardholders();
    }, []);

    const handleViewDetails = (cardholder) => {
        setSelectedCardholder(cardholder);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">View Cardholders</h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse shadow-md bg-white rounded-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-800">
                            <th className="px-4 py-2 border text-left text-sm font-semibold">First Name</th>
                            <th className="px-4 py-2 border text-left text-sm font-semibold">Last Name</th>
                            <th className="px-4 py-2 border text-left text-sm font-semibold">Name on Card</th>
                            <th className="px-4 py-2 border text-left text-sm font-semibold">Mobile Number</th>
                            <th className="px-4 py-2 border text-left text-sm font-semibold">Email</th>
                            <th className="px-4 py-2 border text-center text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cardholders.map((cardholder) => (
                            <tr
                                key={cardholder.cardholder_id}
                                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                            >
                                <td className="px-4 py-2 border text-gray-700">
                                    {cardholder.individual.name.first_name}
                                </td>
                                <td className="px-4 py-2 border text-gray-700">
                                    {cardholder.individual.name.last_name}
                                </td>
                                <td className="px-4 py-2 border text-gray-700">
                                    {cardholder.individual.name.name_on_card}
                                </td>
                                <td className="px-4 py-2 border text-gray-700">{cardholder.mobile_number}</td>
                                <td className="px-4 py-2 border text-gray-700">{cardholder.email}</td>
                                <td className="px-4 py-2 border text-center">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        onClick={() => handleViewDetails(cardholder)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Selected Cardholder Details */}
            {selectedCardholder && (
                <div className="mt-6 p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Cardholder Details</h2>
                    <p>
                        <strong>Name:</strong>{' '}
                        {`${selectedCardholder.individual.name.first_name} ${selectedCardholder.individual.name.last_name}`}
                    </p>
                    <p>
                        <strong>Name on Card:</strong>{' '}
                        {selectedCardholder.individual.name.name_on_card}
                    </p>
                    <p>
                        <strong>Email:</strong> {selectedCardholder.email}
                    </p>
                    <p>
                        <strong>Mobile Number:</strong> {selectedCardholder.mobile_number}
                    </p>
                    <p>
                        <strong>Address:</strong>{' '}
                        {`${selectedCardholder.postal_address.line1}, ${selectedCardholder.postal_address.city}, ${selectedCardholder.postal_address.state}, ${selectedCardholder.postal_address.country}`}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ViewCardholders;
