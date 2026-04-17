"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart on success
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 text-center rounded-sm shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-950 mb-4">
          Payment <br /> Confirmed.
        </h1>
        
        <p className="text-zinc-500 font-medium mb-10 leading-relaxed">
          Your order has been successfully archived. You will receive an email confirmation shortly with your tracking details.
        </p>

        <Link 
          href="/products"
          className="inline-block w-full py-4 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}
