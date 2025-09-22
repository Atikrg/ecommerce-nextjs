"use client";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // load razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      handlePayment(); // 👈 open on page load
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // call backend to create Razorpay order
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, userId: 1 }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My Shop",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          // verify on backend
          await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          alert("Payment Successful!");
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      // @ts-ignore
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? <p>Opening Razorpay...</p> : <p>Redirecting to payment...</p>}
    </div>
  );
}
