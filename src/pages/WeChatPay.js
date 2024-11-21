import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPaymentIntent, confirmPaymentIntent } from '../apiService';
import QRCode from 'qrcode';


function WeChatPay() {
    const navigate = useNavigate();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [paymentLink, setPaymentLink] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handlePay = async () => {
        try {
            // Step 1: Create Payment Intent
            const createIntentData = {
                request_id: `req_${Date.now()}`,
                amount: 333.60, // Replace with dynamic amount
                currency: 'CNY',
                merchant_order_id: `order_${Date.now()}`,
            };
            const createIntentResponse = await createPaymentIntent(createIntentData);
            const paymentIntentId = createIntentResponse.id;

            // Step 2: Confirm Payment Intent
            const confirmIntentData = {
                request_id: `req_${Date.now()}`,
                payment_method: {
                    type: 'wechatpay',
                    wechatpay: {
                        flow: 'qrcode',
                    },
                },
            };
            const confirmIntentResponse = await confirmPaymentIntent(paymentIntentId, confirmIntentData);

            // Handle the response (e.g., display the QR code)
            const nextAction = confirmIntentResponse.next_action;
            if (nextAction && nextAction.qrcode) {
                const qrCodeDataUrl = await QRCode.toDataURL(nextAction.qrcode); // Generate Base64 QR Code
                setQrCodeUrl(qrCodeDataUrl); // Set QR code URL
                setPaymentLink(nextAction.qrcode_url); // Set payment link
                setIsPopupVisible(true); // Show popup window
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Review Your Order</h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Make sure everything looks good before you pay.
                </p>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center mb-4">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s"
                            alt="Annual Tailwind UI Subscription"
                            className="w-16 h-16 rounded-lg border"
                        />
                        <div className="ml-4 flex-grow">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Annual Tailwind UI Subscription
                            </h2>
                            <p className="text-sm text-gray-500">¥249.00</p>
                        </div>
                    </div>

                    <div className="flex items-center mb-4">
                        <img
                            src="https://miro.medium.com/v2/resize:fit:1400/0*SGbxc-dbU0gyaVWm.jpg"
                            alt="Monthly Visual Studio Code Subscription"
                            className="w-16 h-16 rounded-lg border"
                        />
                        <div className="ml-4 flex-grow">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Monthly Visual Studio Code Subscription
                            </h2>
                            <p className="text-sm text-gray-500">¥29.00</p>
                        </div>
                    </div>
                </div>

                {/* Total Summary */}
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Subtotal:</span>
                        <span>¥278.00</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Tax (20%):</span>
                        <span>¥55.60</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-900 text-lg">
                        <span>Total:</span>
                        <span>¥333.60</span>
                    </div>
                </div>

                {/* Pay Button */}
                <button
                    onClick={handlePay}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
                >
                    Pay with WeChat Pay
                </button>
            </div>

            {/* QR Code Popup */}
            {isPopupVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"> {/* Change max-w-md to max-w-lg */}
                        <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">Scan QR Code to Pay</h2>
                        <img
                            src={qrCodeUrl}
                            alt="WeChat Pay QR Code"
                            className="mb-4 mx-auto w-48 h-48"
                        />
                        <p className="text-gray-600 text-sm text-center mb-4 break-words">
                            Or alternatively pay using this link:
                            <br />
                            <a
                                href={paymentLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline break-words"
                            >
                                {paymentLink}
                            </a>
                        </p>
                        <button
                            onClick={() => setIsPopupVisible(false)}
                            className="mt-4 w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeChatPay;
