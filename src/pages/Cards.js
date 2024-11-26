import React, { useEffect, useState } from 'react';
import { fetchCards, createPanToken } from '../apiService';

function Cards() {
    const [cards, setCards] = useState([]);
    const [iframeSrc, setIframeSrc] = useState(null); // State to store iframe source
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const loadCards = async () => {
            try {
                const data = await fetchCards();
                setCards(data);
            } catch (error) {
                console.error('Error loading cards:', error);
            }
        };

        loadCards();
    }, []);

    const handleGetSensitiveData = async (cardId) => {
        try {
            // Step 1: Call API to create the token
            const response = await createPanToken(cardId);
            console.log("token is: ", response.token)

            // Step 2: Generate hash for iframe
            const hash = {
                token: response.token,
                rules: {
                    '.details': { fontSize: '18px', color: '#333' },
                },
                langKey: 'en',
            };

            const hashURI = encodeURIComponent(JSON.stringify(hash));
            console.log("hashURI is : ", hashURI)

            // Step 3: Embed iframe for card details
            const iframeUrl = `https://demo.airwallex.com/issuing/pci/v2/${cardId}/details#${hashURI}`;
            console.log("iframe url is : ", iframeUrl)
            setIframeSrc(iframeUrl);
            setError(null);
        } catch (err) {
            console.error('Error fetching sensitive data:', err);
            setError('Unable to fetch sensitive data. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Cards</h1>

            {error && (
                <div className="mb-4 text-red-600 text-center">
                    {error}
                </div>
            )}

            <table className="table-auto w-full border-collapse shadow-md text-left text-gray-700">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Scheme</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Card Number</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Status</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Created At</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => (
                        <tr key={card.card_id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                            <td className="px-4 py-2 border border-gray-300">{card.brand}</td>
                            <td className="px-4 py-2 border border-gray-300">{card.card_number}</td>
                            <td className="px-4 py-2 border border-gray-300">
                                <span
                                    className={`px-2 py-1 rounded ${card.card_status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {card.card_status}
                                </span>
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                {new Date(card.created_at).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => handleGetSensitiveData(card.card_id)}
                                >
                                    Get Sensitive Data
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display iframe if iframeSrc is available */}
            {iframeSrc && (
                <div className="mt-6">
                    <iframe
                        src={iframeSrc}
                        title="Card Details"
                        className="w-full h-96 border rounded-md"
                    />
                </div>
            )}
        </div>
    );
}

export default Cards;
