// src/pages/ListPayouts.js
import React, { useEffect, useState } from 'react';
import { getTransfers } from '../apiService'; // Import API service

const ListPayouts = () => {
    const [payouts, setPayouts] = useState([]);

    useEffect(() => {
        const fetchPayouts = async () => {
            try {
                const response = await getTransfers();
                // Sort by created_at and get the 7 most recent entries
                const recentPayouts = response.items
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 7);
                setPayouts(recentPayouts);
            } catch (error) {
                console.error('Error fetching payouts:', error);
            }
        };

        fetchPayouts();
    }, []);

    return (
        <div>
            <h1>List of Payouts</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Beneficiary Received</th>
                        <th>Payer Paid</th>
                        <th>Fee</th>
                        <th>Reference</th>
                        <th>Status</th>
                        <th>Transfer Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payouts.map((payout, index) => (
                        <tr key={index}>
                            <td>{payout.amount_beneficiary_receives}</td>
                            <td>{payout.amount_payer_pays}</td>
                            <td>{payout.fee_amount}</td>
                            <td>{payout.reference}</td>
                            <td>{payout.status}</td>
                            <td>{payout.transfer_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPayouts;
