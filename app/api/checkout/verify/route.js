import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = process.env.RAZORPAY_MOCK === "true"
      ? razorpay_signature === "mock_signature"
      : expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await dbConnect();

      // Update the order in the database
      const updatedOrder = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          status: "paid",
          razorpayPaymentId: razorpay_payment_id
        },
        { new: true }
      );

      return NextResponse.json({ 
        success: true, 
        message: "Payment verified successfully",
        order: updatedOrder
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Payment verification failed" 
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
