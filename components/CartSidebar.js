"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, isMounted } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  if (!isMounted) return null;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      // Don't load if already loaded
      if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      // 1. Load Razorpay Script
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      // 2. Create Order on Server
      const result = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          items: cartItems,
        }),
      });

      const contentType = result.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await result.text();
        console.error("Server returned non-JSON response:", text);
        throw new Error("Server error (Invalid Response). Please check if your Razorpay keys are correct in .env.local.");
      }

      const orderData = await result.json();

      if (!result.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // 3. Open Razorpay Checkout
      if (orderData.order_id.startsWith("mock_order_")) {
        const verifyRes = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.order_id,
            razorpay_payment_id: "mock_payment_" + Date.now(),
            razorpay_signature: "mock_signature",
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) { clearCart(); setIsCartOpen(false); router.push("/order-success"); }
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "TeeStore Archive",
        description: "Premium T-shirt Purchase",
        order_id: orderData.order_id,
        handler: async function (response) {
          // 4. Verify Payment on Server
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            clearCart();
            setIsCartOpen(false);
            router.push("/order-success");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#000000",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setIsProcessing(false);
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Something went wrong during checkout.");
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Background Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Premium Dark Cart Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-900">
              <h2 className="text-sm font-black tracking-widest text-zinc-100 uppercase">Shopping Bag</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-zinc-500 hover:text-zinc-100 transition-colors p-2"
              >
                <span className="sr-only">Close panel</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-zinc-600"
                >
                  <svg className="h-12 w-12 mb-6 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-xs uppercase tracking-widest font-bold">Your bag is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 border-b border-zinc-600 text-zinc-400 hover:text-zinc-100 hover:border-zinc-100 transition-all font-medium pb-1"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <ul role="list" className="-my-6 divide-y divide-zinc-900">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.li 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={`${item.product._id}-${index}`} 
                        className="flex py-8 group"
                      >
                        <div className="w-20 lg:w-24 flex-shrink-0 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900 border border-zinc-800">
                          <img
                            src={item.product.images[0] || "/placeholder-tshirt.png"}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="ml-5 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-zinc-100">
                              <h3 className="text-sm font-bold tracking-tight uppercase"><a href={`/products/${item.product._id}`}>{item.product.name}</a></h3>
                              <p className="ml-4 font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="mt-2 flex gap-3 text-xs text-zinc-500 font-medium">
                              <p>Color: <span className="text-zinc-300">{item.selectedColor}</span></p>
                              <span className="text-zinc-800">|</span>
                              <p>Size: <span className="text-zinc-300">{item.selectedSize}</span></p>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between text-sm mt-4">
                            <div className="flex items-center border border-zinc-800 rounded-sm bg-zinc-950 text-zinc-100">
                              <button 
                                onClick={() => updateQuantity(index, -1)}
                                className="px-3 py-1 hover:bg-zinc-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                &minus;
                              </button>
                              <span className="px-2 font-bold text-xs">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(index, 1)}
                                className="px-3 py-1 hover:bg-zinc-900 hover:text-white transition-colors"
                              >
                                &#43;
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => removeFromCart(index)}
                                className="text-xs uppercase tracking-widest font-bold text-red-900 hover:text-red-600 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer / Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-zinc-950 border-t border-zinc-900 border-t border-zinc-800">
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-zinc-100 mb-2">
                  <p>Subtotal</p>
                  <p className="text-lg">${cartTotal.toFixed(2)}</p>
                </div>
                <p className="text-xs text-zinc-600 mb-6 font-medium">Secure payment via Razorpay. All cards accepted.</p>
                <motion.button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  whileHover={!isProcessing ? { scale: 1.02 } : {}}
                  whileTap={!isProcessing ? { scale: 0.98 } : {}}
                  className={`w-full flex items-center justify-center bg-zinc-100 border border-transparent py-4 px-4 text-sm tracking-widest uppercase font-black text-zinc-950 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </div>
                  ) : "Complete Purchase"}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
