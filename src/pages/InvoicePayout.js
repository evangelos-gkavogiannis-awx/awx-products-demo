import React from "react";
import { useNavigate } from "react-router-dom";

const InvoicePayout = () => {
    const invoices = [
        { number: "INV001", date: "2024-11-01", total: 120.0, currency: "USD" },
        { number: "INV002", date: "2024-11-05", total: 85.0, currency: "USD" },
    ];

    const navigate = useNavigate();

    const handlePayoutClick = (invoice) => {
        navigate("/payout-invoice", { state: { invoice } });
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl text-center">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Invoice Payout</h2>

  <p className="text-gray-700 mb-6">
    With Airwallex Payout API, you can automate invoice payouts. Match the invoice beneficiary details to the <a 
      href="https://www.airwallex.com/docs/api#/Payouts/Transfers/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-500 hover:underline"
    >
        Airwallex Transfer API 
    </a> and programmatically pay your invoices.
  </p>

  <table className="table-auto w-full border-collapse shadow-md text-left text-gray-700">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Invoice Number</th>
        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Date</th>
        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Total Amount</th>
        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Status</th>
        <th className="px-4 py-2 border border-gray-300 text-sm uppercase font-semibold">Actions</th>
      </tr>
    </thead>
    <tbody>
      {invoices.map((invoice) => (
        <tr key={invoice.number} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
          <td className="px-4 py-2 border border-gray-300">{invoice.number}</td>
          <td className="px-4 py-2 border border-gray-300">{invoice.date}</td>
          <td className="px-4 py-2 border border-gray-300">${invoice.total.toFixed(2)}</td>
          <td className="px-4 py-2 border border-gray-300">
            <span
              className={`px-2 py-1 rounded ${
                invoice.status === "Paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {invoice.status}
            </span>
          </td>
          <td className="px-4 py-2 border border-gray-300 flex gap-4 justify-center">
            <a
              href={`/invoices/${invoice.number}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 text-sm"
            >
              View Invoice
            </a>
            <button
              onClick={() => handlePayoutClick(invoice)}
              disabled={invoice.status === "Paid"}
              className={`px-4 py-2 rounded text-sm ${
                invoice.status === "Paid"
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              } transition duration-300`}
            >
              Payout Invoice
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    );
};

export default InvoicePayout;
