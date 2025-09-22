'use client';

import { useState } from 'react';
import Script from 'next/script';

const PaymentButton = ({ amount, currency = 'INR', productName = 'Product' }) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createOrder = async (amount, currency) => {
    const response = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // Create order
      const order = await createOrder(amount, currency);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: `Payment for ${productName}`,
        order_id: order.id,
        handler: async function (response) {
          // Payment successful
          console.log('Payment successful:', response);
          
          // Verify payment on your server
          const verificationResponse = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verificationResult = await verificationResponse.json();

          if (verificationResult.success) {
            alert('Payment verified successfully!');
            // Handle successful payment (update database, etc.)
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Customer Address',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
      });

      razorpayInstance.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </>
  );
};

export default PaymentButton;