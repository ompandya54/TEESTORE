"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AddToCartForm({ product }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    
    setStatus("loading");

    // Luxury Artificial Delay: Makes the action feel robust, secure, and deliberate.
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setStatus("success");
    addToCart(product, { size: selectedSize, color: selectedColor });

    // Reset button state gracefully
    setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="mt-8 flex flex-col gap-8">
      
      {/* 🔹 COLOR SELECTOR */}
      <div className="border-t border-zinc-800 pt-8">
        <h2 className="text-xs font-bold tracking-widest text-zinc-100 uppercase mb-4 flex items-center justify-between">
          <span>Target Color</span>
          <span className="text-zinc-500 font-medium">{selectedColor}</span>
        </h2>
        <div className="flex items-center space-x-4">
          {product.colors?.map(color => {
            const isSelected = selectedColor === color;
            return (
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                key={color} 
                onClick={() => setSelectedColor(color)}
                className="relative p-1 rounded-full flex items-center justify-center cursor-pointer focus:outline-none group"
              >
                {/* Expanding Outer Ring Animation */}
                <motion.div 
                   initial={false}
                   animate={{ 
                     opacity: isSelected ? 1 : 0, 
                     scale: isSelected ? 1 : 0.8 
                   }}
                   className="absolute inset-0 border-2 border-zinc-100 rounded-full"
                />
                <span className="sr-only">{color}</span>
                <span 
                  className={`h-8 w-8 rounded-full block relative z-10 ${color.toLowerCase() === 'white' ? 'border border-zinc-300' : 'border border-black'}`} 
                  style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                >
                  {/* Subtle inner core shadow for depth */}
                  <div className="absolute inset-0 rounded-full shadow-inner opacity-50 bg-black/10"></div>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* 🔹 SIZE SELECTOR */}
      <div>
        <h2 className="text-xs font-bold tracking-widest text-zinc-100 uppercase mb-4 flex justify-between">
          <span>Dimensions</span>
          <span className="text-zinc-500 font-medium">{selectedSize}</span>
        </h2>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-3">
          {product.sizes?.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={size} 
                onClick={() => setSelectedSize(size)}
                className={`border py-3 px-1 flex items-center justify-center text-sm font-bold uppercase transition-colors relative overflow-hidden
                  ${isSelected 
                    ? 'bg-zinc-100 text-zinc-950 border-zinc-100' 
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-zinc-200'}`}
              >
                  {isSelected && (
                     <motion.div layoutId="size-indicator" className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] z-0" />
                  )}
                  <span className="relative z-10">{size}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* 🔹 LUXURY ADD TO BAG BUTTON */}
      <div className="mt-8 relative h-16 w-full">
        <motion.button
          whileHover={isOutOfStock || status !== 'idle' ? {} : { scale: 1.01 }}
          whileTap={isOutOfStock || status !== 'idle' ? {} : { scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isOutOfStock || status !== 'idle'}
          className={`absolute inset-0 w-full flex items-center justify-center text-sm uppercase tracking-widest font-black transition-all overflow-hidden border
            ${isOutOfStock 
              ? 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed' 
              : 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_35px_rgba(255,255,255,0.25)]'}`}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.span 
                key="idle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
                {!isOutOfStock && (
                  <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                )}
              </motion.span>
            )}

            {status === "loading" && (
              <motion.span 
                key="loading"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {/* Minimalist Spinner */}
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="opacity-80">Authorizing...</span>
              </motion.span>
            )}

            {status === "success" && (
              <motion.span 
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2 text-green-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span>Bagged</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
