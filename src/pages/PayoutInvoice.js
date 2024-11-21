import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTransfer } from "../apiService"; // Import the function from apiService.js

const PayoutInvoice = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState(null); // State to manage popup data

    // Get invoice data from state
    const { invoice } = location.state || {};

    if (!invoice) {
        return <p>No invoice selected for payout.</p>;
    }

    const handlePayInvoice = async () => {
        try {
            // Calculate transfer_date as 3 days from the current date
            const currentDate = new Date();
            const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 3));

            // Construct the payout payload
            const payload = {
                beneficiary: {
                    address: {
                        city: "NYC",
                        country_code: "GB",
                        postcode: "N656GH",
                        state: "Washington",
                        street_address: "412 5th Avenue",
                    },
                    bank_details: {
                        account_currency: "USD",
                        account_name: "John Walker",
                        account_number: "50001121",
                        bank_country_code: "US",
                        swift_code: "USBKUS44222",
                    },
                    company_name: "Complete Concrete Pty Ltd",
                    entity_type: "COMPANY",
                },
                fee_paid_by: "PAYER",
                reason: "transfer_to_own_account",
                reference: invoice.number, // Invoice number mapped to reference
                request_id: `req_${new Date().getTime()}`, // Unique request ID
                source_currency: invoice.currency, // Use invoice currency
                transfer_amount: invoice.total, // Use invoice total amount
                transfer_currency: invoice.currency,
                transfer_date: futureDate.toISOString().split("T")[0], // Current date + 3 days
                transfer_method: "SWIFT",
            };

            // Use the createTransfer function from apiService
            const response = await createTransfer(payload);

            // On success, show popup with response details
            setPopupData({
                header: `Payout successful for invoice ${invoice.number}!`,
                status: response.status,
                transferMethod: response.transfer_method,
                referenceId: response.short_reference_id,
                reference: response.reference,
                amount: response.source_amount,
                currency: response.source_currency

            });

        } catch (error) {
            // Handle errors
            console.error("Error making payout:", error.message || error.response?.data);
            alert("Failed to make payout. Please try again.");
        }
    };

    const closePopup = () => {
        setPopupData(null); // Close the popup
        navigate("/invoice-payout"); // Navigate back to the invoice payout list
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Payout Invoice</h2>

            <div className="bg-gray-100 border border-gray-300 rounded shadow-md p-4">
                {/* PDF Viewer */}
                <iframe
                    src={`http://localhost:3000/invoices/${invoice.number}.pdf`}
                    width="100%"
                    height="600px"
                    title={`Invoice ${invoice.number}`}
                    className="rounded border border-gray-300 shadow-sm"
                ></iframe>
            </div>

            <button
                className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
                onClick={handlePayInvoice}
            >
                Pay Invoice
            </button>

            {/* Popup Modal */}
            {popupData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded shadow-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">{popupData.header}</h3>
                        <p className="text-gray-700 mb-2">
                            <strong>Status:</strong> {popupData.status}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Transfer Method:</strong> {popupData.transferMethod}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Reference:</strong> {popupData.reference}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Reference ID:</strong> {popupData.referenceId}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Amount:</strong> {popupData.amount}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Currency:</strong> {popupData.currency}
                        </p>
                        <button
                            className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-300"
                            onClick={closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default PayoutInvoice;
