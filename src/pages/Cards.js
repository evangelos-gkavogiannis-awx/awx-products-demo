import React, { useEffect, useState } from 'react';
import { fetchCards } from '../apiService';

function Cards() {
    const [cards, setCards] = useState([]);

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

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Cards</h1>

            <table className="table-auto w-full border-collapse shadow-md text-left text-gray-700">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Scheme</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Card Number</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Status</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Created At</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default Cards;
