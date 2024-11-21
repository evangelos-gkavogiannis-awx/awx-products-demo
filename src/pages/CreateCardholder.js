import React, { useState } from 'react';
import { createCardholder } from '../apiService'; // Import the API call from apiService

function CardholderForm() {
    const [formData, setFormData] = useState({
        addressCity: '',
        postalCode: '',
        firstName: '',
        lastName: '',
        nationality: '',
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const uniqueId = Date.now(); // Use current timestamp to ensure uniqueness
        const uniqueEmail = `user${uniqueId}@example.com`;
        const uniqueMobileNumber = `61${Math.floor(100000000 + Math.random() * 900000000)}`; // Random 9-digit mobile number starting with '61'

        const requestData = {
            email: uniqueEmail,
            individual: {
                address: {
                    city: formData.addressCity,
                    country: 'AU',
                    line1: '44 Gillespie St',
                    line2: 'Unit 2',
                    postcode: formData.postalCode,
                    state: 'VIC',
                },
                date_of_birth: '1982-11-02',
                express_consent_obtained: 'yes',
                name: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    middle_name: 'Fitzgerald',
                    title: 'Mr',
                },
                nationality: formData.nationality,
            },
            mobile_number: uniqueMobileNumber,
            postal_address: {
                city: formData.addressCity,
                country: 'AU',
                line1: '44 Gillespie St',
                line2: 'Unit 2',
                postcode: formData.postalCode,
                state: 'VIC',
            },
            type: 'INDIVIDUAL',
        };

        try {
            await createCardholder(requestData);
            setMessage(
                `Cardholder created successfully! Email: ${uniqueEmail}, Mobile: ${uniqueMobileNumber}`
            );
        } catch (error) {
            console.error('Error creating cardholder:', error);
            setMessage('Failed to create cardholder. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Cardholder</h1>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Address City:</label>
                <input
                    type="text"
                    name="addressCity"
                    value={formData.addressCity}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Postal Code:</label>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nationality:</label>
                <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
            >
                Create Cardholder
            </button>

            {message && (
                <div className="mt-4 text-center bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded">
                    {message}
                </div>
            )}
        </div>

    );
}

export default CardholderForm;
