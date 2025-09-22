import { NextResponse } from "next/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
const razorpay_secret = process.env.RAZORPAY_KEY_SECRET;


export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();
      revalidatePath("/");
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", razorpay_secret!)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return NextResponse.json({ success: true, message: "Payment verified" });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
