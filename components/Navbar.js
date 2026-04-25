"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home',       href: '/' },
  { name: 'Shop',       href: '/products' },
  { name: 'Our Story',  href: '/our-story' },
  { name: 'Size Guide', href: '/size-guide' },
  { name: 'Contact',    href: '/contact' },
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-40 px-4 sm:px-10 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto relative w-full max-w-5xl px-6 sm:px-10 py-3 flex justify-between items-center transition-all group">

          {/* Tilted background */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.1)] skew-x-[20deg] -z-10 transition-transform duration-500 ease-out group-hover:skew-x-[15deg]" />

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pl-2 sm:pl-4">
            <Link href="/" className="text-xl font-black text-black tracking-widest uppercase italic">
              TeeStore<span className="text-gray-400 not-italic">.</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center space-x-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all overflow-hidden group/link
                  ${pathname === link.href ? 'text-white shadow-lg' : 'text-gray-900 hover:text-white'}`}
              >
                <div className={`absolute inset-0 skew-x-[20deg] -z-10 transition-colors ${pathname === link.href ? 'bg-black' : 'bg-transparent group-hover/link:bg-gray-900'}`} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side — cart + hamburger */}
          <div className="flex items-center gap-2 pr-2 sm:pr-4">
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group/cart p-3 transition-all flex items-center justify-center h-12 w-12"
            >
              <div className="absolute inset-0 bg-black skew-x-[20deg] shadow-lg transition-transform group-hover/cart:scale-110" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white relative z-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black h-6 w-6 flex items-center justify-center shadow-lg border-2 border-white skew-x-[20deg] z-20">
                  <span className="-skew-x-[20deg] block">{cartCount}</span>
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="sm:hidden relative flex items-center justify-center h-12 w-12 group/menu"
            >
              <div className="absolute inset-0 bg-zinc-950 skew-x-[20deg] shadow-lg transition-transform group-hover/menu:scale-110" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white relative z-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-72 bg-zinc-950 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-zinc-900">
                <span className="text-sm font-black uppercase italic tracking-widest text-white">
                  TeeStore<span className="text-zinc-600">.</span>
                </span>
                <button onClick={() => setMenuOpen(false)} className="text-zinc-500 hover:text-white transition-colors p-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between py-4 border-b border-zinc-900 text-sm font-black uppercase tracking-widest transition-colors
                        ${pathname === link.href ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
                    >
                      {link.name}
                      {pathname === link.href && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-6 py-6 border-t border-zinc-900">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  © {new Date().getFullYear()} TeeStore Archive
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartSidebar />
    </>
  );
}
