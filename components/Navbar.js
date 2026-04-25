"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  return (
    <>
      {/* Floating Wrapper: Increased gap with px-10 for a more "floating" look */}
      <div className="fixed top-6 left-0 right-0 z-40 px-10 flex justify-center pointer-events-none">

        {/* The Navbar Container */}
        <nav className="pointer-events-auto relative w-full max-w-5xl px-10 py-3 flex justify-between items-center transition-all group">

          {/* TILTED RECTANGLE BACKGROUND: Sharper tilt (20 degrees) and cleaner white glass */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.1)] skew-x-[20deg] -z-10 transition-transform duration-500 ease-out group-hover:skew-x-[15deg]"></div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pl-4">
            <Link href="/" className="text-xl font-black text-black tracking-widest uppercase italic">
              TeeStore<span className="text-gray-400 not-italic">.</span>
            </Link>
          </div>

          {/* Links Center */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              href="/"
              className={`relative px-8 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all overflow-hidden group/link
                ${pathname === '/' ? 'text-white shadow-lg' : 'text-gray-900 hover:text-white'}`}
            >
              <div className={`absolute inset-0 skew-x-[20deg] -z-10 transition-colors ${pathname === '/' ? 'bg-black' : 'bg-transparent group-hover/link:bg-gray-900'}`}></div>
              Home
            </Link>
            <Link
              href="/products"
              className={`relative px-8 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all overflow-hidden group/link
                ${pathname === '/products' ? 'text-white shadow-lg' : 'text-gray-900 hover:text-white'}`}
            >
              <div className={`absolute inset-0 skew-x-[20deg] -z-10 transition-colors ${pathname === '/products' ? 'bg-black' : 'bg-transparent group-hover/link:bg-gray-900'}`}></div>
              Shop
            </Link>
            <Link
              href="/our-story"
              className={`relative px-8 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all overflow-hidden group/link
                ${pathname === '/our-story' ? 'text-white shadow-lg' : 'text-gray-900 hover:text-white'}`}
            >
              <div className={`absolute inset-0 skew-x-[20deg] -z-10 transition-colors ${pathname === '/our-story' ? 'bg-black' : 'bg-transparent group-hover/link:bg-gray-900'}`}></div>
              Our Story
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center pr-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group/cart p-3 transition-all flex items-center justify-center h-12 w-12"
            >
              <div className="absolute inset-0 bg-black skew-x-[20deg] shadow-lg transition-transform group-hover/cart:scale-110" />

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white relative z-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black h-6 w-6 flex items-center justify-center shadow-lg border-2 border-white block skew-x-[20deg] z-20">
                  <span className="-skew-x-[20deg] block">{cartCount}</span>
                </span>
              )}
            </button>
          </div>
        </nav>

      </div>

      {/* Sidebar rendered here globally */}
      <CartSidebar />
    </>
  );
}
