import React, { useState } from "react";
import { createPaymentLink } from "../apiService";

const CreateQuote = () => {
    const [formData, setFormData] = useState({
        amount: "",
        currency: "EUR",
        description: "",
        expires_at: "",
        reference: "",
        reusable: "false",
        title: "",
        sent_to: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const formattedDate = new Date(formData.expires_at).toISOString(); // Format the date to ISO 8601

            const payload = {
                amount: parseFloat(formData.amount),
                currency: formData.currency,
                description: formData.description,
                expires_at: formattedDate, // Use formatted date
                reference: formData.reference,
                reusable: formData.reusable === "true",
                title: formData.title,
            };

            const response = await createPaymentLink(payload);

            if (response.url) {
                const emailBody = `
          Hello,

          Here are the details of your quote:

          - Amount: ${formData.currency} ${formData.amount}
          - Description: ${formData.description}
          - Expires At: ${formattedDate}
          - Reference: ${formData.reference}

          Click the button below to pay:

          [Pay](${response.url})

          Thank you!
        `;
                console.log("Email sent to:", formData.sent_to);
                console.log("Email body:", emailBody);
                alert("Quote created and email sent!");

                // Call the send-email endpoint
                const emailResponse = await fetch("http://localhost:5000/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        to: formData.sent_to,
                        subject: "Your quote details",
                        body: emailBody,
                    }),
                });

                if (emailResponse.ok) {
                    alert("Quote created and email sent!");
                } else {
                    alert("Quote created, but email failed to send.");
                }
            }
        } catch (error) {
            console.error("Error creating quote:", error);
            alert("Failed to create quote. Please try again.");
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Quote</h1>

            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Currency:</label>
                    <select
                        name="currency"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description:</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Expires At:</label>
                    <input
                        type="datetime-local"
                        name="expires_at"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Reference:</label>
                    <input
                        type="text"
                        name="reference"
                        placeholder="Reference"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Reusable:</label>
                    <select
                        name="reusable"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Sent To:</label>
                    <input
                        type="email"
                        name="sent_to"
                        placeholder="Sent To"
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="button"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
                    onClick={handleSubmit}
                >
                    Create and Send Quote
                </button>
            </form>
        </div>

    );
};

export default CreateQuote;
