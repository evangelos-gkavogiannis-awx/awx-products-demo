import React, { useState } from 'react';
import {
    createBatchTransfer,
    addItemToBatch,
    listBatchItems,
    submitBatch,
} from '../apiService';
//import { useRequestLogger } from '../context/RequestLoggerContext';


const CreateBatchPayout = () => {
    const [batchId, setBatchId] = useState(null);
    //const { logRequest } = useRequestLogger();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isItemList, setIsItemList] = useState(false); // To distinguish between different modal types
    const [itemData, setItemData] = useState({
        transfer_amount: '',
        reference: '',
        currency: 'USD',
        bank_country_code: 'US',
        account_number: '',
    });

    const handleCreateBatch = async () => {
        const requestData = {
            funding_source: { deposit_type: 'DIRECT_DEBIT' },
            name: `Batch_${Math.random().toString(36).substr(2, 5)}`,
            remarks: 'Random string for batch creation',
            request_id: `req_${Math.random().toString(36).substr(2, 10)}`,
            transfer_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };

        try {
            const data = await createBatchTransfer(requestData);
            setBatchId(data.id);
            setSuccessMessage(`Batch Payout created with ID: ${data.id}`);
        } catch (error) {
            setErrorMessage('Failed to create batch payout. Please try again.');
        }
    };

    const handleAddItem = async () => {
        const requestData = {
            items: [
                {
                    beneficiary: {
                        address: {
                            city: 'NYC',
                            country_code: 'GB',
                            postcode: 'N656GH',
                            state: 'Washington',
                            street_address: '412 5',
                        },
                        bank_details: {
                            account_currency: 'USD',
                            account_name: 'John Walker',
                            account_number: itemData.account_number,
                            bank_country_code: itemData.bank_country_code,
                            swift_code: 'USBKUS44223',
                        },
                        company_name: 'Complete Concrete Pty Ltd',
                        entity_type: 'COMPANY',
                    },
                    fee_paid_by: 'PAYER',
                    reason: 'transfer_to_own_account',
                    reference: itemData.reference,
                    request_id: `item_${Math.random().toString(36).substr(2, 10)}`,
                    source_currency: itemData.currency,
                    transfer_amount: parseFloat(itemData.transfer_amount),
                    transfer_currency: itemData.currency,
                    transfer_date: new Date().toISOString().split('T')[0],
                    transfer_method: 'SWIFT',
                },
            ],
        };

        try {
            await addItemToBatch(batchId, requestData);
            setSuccessMessage('Item added to batch payout successfully!');
        } catch (error) {
            setErrorMessage('Failed to add item to batch payout.');
        }
    };

    const handleListItems = async () => {
        try {
            const data = await listBatchItems(batchId);
            const items = data.items.map((item) => ({
                account_currency: item.beneficiary.bank_details.account_currency,
                transfer_amount: item.transfer_amount,
                swift_code: item.beneficiary.bank_details.swift_code,
                transfer_date: item.transfer_date,
            }));
            setModalContent(items);
            setIsItemList(true);
            setShowModal(true);
        } catch (error) {
            setErrorMessage('Failed to fetch batch items.');
        }
    };

    const handleSubmitBatch = async () => {
        try {
            const data = await submitBatch(batchId);
            const responseData = {
                status: data.funding?.status,
                batch_name: data.name,
                valid_items: data.valid_item_count,
                reference_id: data.short_reference_id,
            };
            setModalContent(responseData);
            setIsItemList(false);
            setShowModal(true);
        } catch (error) {
            setErrorMessage('Failed to submit batch payout.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };


    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Batch Payout</h1>

                {successMessage && (
                    <p className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded mb-4">
                        {successMessage}
                    </p>
                )}
                {errorMessage && (
                    <p className="bg-red-100 text-red-800 border border-red-400 px-4 py-2 rounded mb-4">
                        {errorMessage}
                    </p>
                )}

                {!batchId ? (
                    <button
                        onClick={handleCreateBatch}
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300 w-full"
                    >
                        Create Batch Payout
                    </button>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mt-4 mb-6 text-gray-700 text-center">
                            Batch ID: <span className="font-normal text-gray-800">{batchId}</span>
                        </h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Transfer Amount:</label>
                            <input
                                type="number"
                                value={itemData.transfer_amount}
                                onChange={(e) =>
                                    setItemData({ ...itemData, transfer_amount: e.target.value })
                                }
                                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Reference:</label>
                            <input
                                type="text"
                                value={itemData.reference}
                                onChange={(e) =>
                                    setItemData({ ...itemData, reference: e.target.value })
                                }
                                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                Beneficiary Bank Country Code:
                            </label>
                            <input
                                type="text"
                                value={itemData.bank_country_code}
                                onChange={(e) =>
                                    setItemData({ ...itemData, bank_country_code: e.target.value })
                                }
                                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                Beneficiary Account Number:
                            </label>
                            <input
                                type="text"
                                value={itemData.account_number}
                                onChange={(e) =>
                                    setItemData({ ...itemData, account_number: e.target.value })
                                }
                                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleAddItem}
                                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
                            >
                                Add Beneficiary to Batch Payout
                            </button>
                            <button
                                onClick={handleListItems}
                                className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-300"
                            >
                                List Items of Batch
                            </button>
                            <button
                                onClick={handleSubmitBatch}
                                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-300"
                            >
                                Submit Batch
                            </button>
                        </div>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                            {isItemList ? (
                                <div className="max-h-60 overflow-y-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3">Account Currency</th>
                                                <th className="px-6 py-3">Amount</th>
                                                <th className="px-6 py-3">SWIFT Code</th>
                                                <th className="px-6 py-3">Transfer Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modalContent.map((item, index) => (
                                                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                                                    <td className="px-6 py-4">{item.account_currency}</td>
                                                    <td className="px-6 py-4">{item.transfer_amount}</td>
                                                    <td className="px-6 py-4">{item.swift_code}</td>
                                                    <td className="px-6 py-4">{item.transfer_date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <ul className="list-disc pl-6">
                                    <li><strong>Status:</strong> {modalContent.status}</li>
                                    <li><strong>Batch Name:</strong> {modalContent.batch_name}</li>
                                    <li><strong>Valid Items:</strong> {modalContent.valid_items}</li>
                                    <li><strong>Reference ID:</strong> {modalContent.reference_id}</li>
                                </ul>
                            )}
                            <button
                                onClick={closeModal}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
};

export default CreateBatchPayout;