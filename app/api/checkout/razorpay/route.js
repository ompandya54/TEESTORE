import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { amount, items } = await req.json();

    if (!amount || !items || items.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const receipt = `receipt_${Date.now()}`;

    // Run DB connect and Razorpay order creation in parallel
    const [razorpayOrder] = await Promise.all([
      process.env.RAZORPAY_MOCK === "true"
        ? Promise.resolve({ id: `mock_order_${Date.now()}`, currency: "INR", amount: Math.round(amount * 100) })
        : razorpay.orders.create({ amount: Math.round(amount * 100), currency: "INR", receipt }),
      dbConnect(),
    ]);

    await Order.create({
      orderId: receipt,
      razorpayOrderId: razorpayOrder.id,
      items: items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })),
      amount,
      status: "pending",
    });

    return NextResponse.json({
      order_id: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({
      error: "Failed to create order",
      detail: error?.message || JSON.stringify(error, Object.getOwnPropertyNames(error)),
    }, { status: 500 });
  }
}
