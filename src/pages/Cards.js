import React, { useEffect, useState } from 'react';
import { fetchCards, createPanToken } from '../apiService';

function Cards() {
    const [cards, setCards] = useState([]);
    const [iframeSrc, setIframeSrc] = useState(null); // State to store iframe source
    const [iframePinSrc, setIframePinSrc] = useState(null);
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
                    '.details': {
                        backgroundColor: '#2a2a2a',
                        color: 'white',
                        borderRadius: '20px',
                        fontFamily: 'Arial',
                    },
                    '.details__row': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px',
                    },
                    '.details__label': {
                        width: '100px',
                        fontWeight: 'bold',
                    },
                    '.details__content': { display: 'flex' },
                    '.details__button svg': { color: 'white' },
                },
                langKey: 'en',
            };

            const hashURI = encodeURIComponent(JSON.stringify(hash));
            console.log("hashURI is : ", hashURI)

            // Step 3: Embed iframe for card details
            const iframeUrl = `https://demo.airwallex.com/issuing/pci/v2/${cardId}/details#${hashURI}`;

            console.log('Iframe URL:', iframeUrl);
            console.log('Hash:', hash);
            console.log('Token:', response.token);

            console.log("iframe url is : ", iframeUrl)
            setIframeSrc(iframeUrl);
            setError(null);
        } catch (err) {
            console.error('Error fetching sensitive data:', err);
            setError('Unable to fetch sensitive data. Please try again later.');
        }
    };

    const handleGetPin = async (cardId) => {
        try {
            const response = await createPanToken(cardId);
            const hash = {
                token: response.token,
                rules: {
                    '.pin': {
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        borderRadius: '12px',
                        fontFamily: 'Arial',
                        padding: '20px'
                    },
                    '.pin__value': {
                        fontSize: '24px',
                        fontWeight: 'bold',
                        letterSpacing: '4px'
                    }
                }
            };

            const hashURI = encodeURIComponent(JSON.stringify(hash));
            const iframeUrl = `https://demo.airwallex.com/issuing/pci/v2/${cardId}/pin#${hashURI}`;

            console.log('Iframe URL:', iframeUrl);
            console.log('Hash:', hash);
            console.log('Token:', response.token);

            setIframePinSrc(iframeUrl);
            setIframeSrc(null); // hide card details iframe
            setError(null);
        } catch (err) {
            console.error('Error fetching PIN:', err);
            setError('Unable to fetch card PIN. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Cards</h1>
            <p className="text-center text-gray-600 mb-6">
                You can retrieve sensitive card details like card numbers and expiry dates even if you are not PCI compliant by implementing the secure iframe.
                <a
                    href="https://www.airwallex.com/docs/issuing__retrieve-sensitive-card-details__secure-iframes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Learn more
                </a>
            </p>

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

                                <button
                                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 w-full"
                                    onClick={() => handleGetPin(card.card_id)}
                                >
                                    View PIN
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

            {/* Display PIN iframe */}
            {iframePinSrc && (
                <div className="mt-6">
                    <iframe
                        src={iframePinSrc}
                        title="Card PIN"
                        className="w-full h-96 border rounded-md"
                    />
                </div>
            )}
        </div>
    );
}

export default Cards;
