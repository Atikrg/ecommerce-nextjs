import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
interface PaymentActionParams {
  amount: number;
  userId: number;
}

export async function paymentAction({ amount, userId }: PaymentActionParams) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  const transaction = await prisma.transactions.create({
    data: {
      user_id: userId,
      currency: "INR",
      amount,
      payment_type: "RAZORPAY",
      total_amount: amount,
      orderIds: {
        create: [{ orderIds: [order.id] }], // store as string array
      },
    },
    include: { orderIds: true },
  });

  return { order, transaction };
}
