"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('tee-store-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
  }, []);

  // Save to local storage on cart change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('tee-store-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (product, tempDetails) => {
    setCartItems(prev => {
      // Check if exact same product variant (id + size + color) exists
      const existingItemIndex = prev.findIndex(item => 
        item.product._id === product._id && 
        item.selectedSize === tempDetails.size &&
        item.selectedColor === tempDetails.color
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }
      
      return [...prev, { 
        product, 
        selectedSize: tempDetails.size, 
        selectedColor: tempDetails.color,
        quantity: 1 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const updateQuantity = (index, delta) => {
    setCartItems(prev => {
      const newCart = [...prev];
      const newQty = newCart[index].quantity + delta;
      if (newQty > 0) {
        newCart[index].quantity = newQty;
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal,
      cartCount,
      isMounted
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
