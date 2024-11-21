import React from "react";
import { useNavigate } from "react-router-dom";

const SendInvoice = () => {
    const navigate = useNavigate();

    // Sample invoice data
    const invoices = [
        {
            invoiceNumber: "INV001",
            date: "2024-11-17",
            total: 120.0,
            file: "/invoices/INV001.pdf", // Path to the PDF file
        },
        {
            invoiceNumber: "INV002",
            date: "2024-11-17",
            total: 85.0,
            file: "/invoices/INV002.pdf", // Path to the PDF file
        },
    ];

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Send Invoice</h2>

            <p className="text-gray-700 mb-6 text-center">
                This flow simulates the case in which your customer wants to enable payment acceptance/acquiring, process payments, and get paid for their invoices. They can initially create payment links leveraging Airwallex and then attach the payment link to their invoice.
            </p>

            <table className="table-auto w-full border-collapse shadow-md text-left text-gray-700">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Invoice Number</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Date</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Total Amount (€)</th>
                        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.invoiceNumber} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                            <td className="px-4 py-2 border border-gray-300">{invoice.invoiceNumber}</td>
                            <td className="px-4 py-2 border border-gray-300">{invoice.date}</td>
                            <td className="px-4 py-2 border border-gray-300">{invoice.total.toFixed(2)}</td>
                            <td className="px-4 py-2 border border-gray-300 flex gap-4 justify-center">
                                <button
                                    onClick={() => window.open(invoice.file, "_blank")}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 text-sm"
                                >
                                    View Invoice
                                </button>
                                <button
                                    onClick={() => navigate(`/create-payment-link/${invoice.invoiceNumber}`)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 text-sm"
                                >
                                    Create Payment Link
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default SendInvoice;
