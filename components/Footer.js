"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header / Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-zinc-900 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">
              Join the <br /> <span className="text-zinc-700">Inner Circle.</span>
            </h2>
            <p className="text-zinc-500 text-sm font-medium tracking-wide max-w-sm leading-relaxed">
              Get notified about secret drops, warehouse archives, and upcoming collection previews. No spam, just pure identity.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <form className="relative group max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors peer"
              />
              <button 
                type="submit"
                className="absolute right-0 bottom-4 px-6 py-2 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors opacity-0 group-focus-within:opacity-100 translate-y-2 group-focus-within:translate-y-0 duration-300"
              >
                Join
              </button>
            </form>
            <p className="mt-4 text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">By joining you accept our privacy policy.</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Shop</h4>
            <div className="flex flex-col gap-4 text-sm font-bold tracking-tight text-zinc-400">
              <Link href="/products" className="hover:text-white transition-colors">All Pieces</Link>
              <Link href="/products?category=Unisex" className="hover:text-white transition-colors">Unisex Drops</Link>
              <Link href="/products?category=Limited" className="hover:text-white transition-colors">Limited Edition</Link>
              <Link href="#" className="hover:text-white transition-colors">Archive</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Company</h4>
            <div className="flex flex-col gap-4 text-sm font-bold tracking-tight text-zinc-400">
              <Link href="/our-story" className="hover:text-white transition-colors">Our Story</Link>
              <Link href="#" className="hover:text-white transition-colors">Sustainability</Link>
              <Link href="#" className="hover:text-white transition-colors">Manufactory</Link>
              <Link href="#" className="hover:text-white transition-colors">Press</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Support</h4>
            <div className="flex flex-col gap-4 text-sm font-bold tracking-tight text-zinc-400">
              <Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link>
              <Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link>
              <Link href="#" className="hover:text-white transition-colors">Care Instructions</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Social</h4>
            <div className="flex flex-col gap-4 text-sm font-bold tracking-tight text-zinc-400">
              <Link href="https://instagram.com/om_h_pandya" target="_blank" className="hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-white transition-colors">Twitter (X)</Link>
              <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
              <Link href="#" className="hover:text-white transition-colors">TikTok</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Huge Typo */}
        <div className="relative pt-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-900">
          <div className="z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
               © {new Date().getFullYear()} TeeStore Archive. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex gap-8 z-10">
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Terms of Service</Link>
          </div>

          {/* Huge background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.02] uppercase italic tracking-tighter select-none pointer-events-none whitespace-nowrap">
            TEE STORE ARCHIVE
          </div>
        </div>

      </div>
    </footer>
  );
}
