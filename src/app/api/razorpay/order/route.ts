import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    revalidatePath("/");

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,   // 👈 server-side key
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    revalidatePath("/");

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("Order creation failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
