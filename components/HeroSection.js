"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Tilted Element (Luxury Motif) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50 -skew-x-[20deg] origin-top translate-x-20 -z-0 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[.3em] mb-6">
                2026 Collection
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-950 leading-[0.9] uppercase italic mb-8">
                The New <br />
                <span className="text-zinc-400 not-italic">Standard.</span>
              </h1>
              <p className="text-lg text-zinc-500 max-w-md font-medium leading-relaxed mb-10">
                Architectural silhouettes meet conscious craftsmanship. 
                Experience the finest organic cotton t-shirts ever engineered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="group relative px-10 py-5 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-[1.02] active:scale-95">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  Explore Pieces
                </Link>
                <Link href="/products?category=Unisex" className="px-10 py-5 border border-zinc-200 text-zinc-950 text-xs font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors">
                  Minimalism
                </Link>
              </div>
            </motion.div>

            {/* Subtle Stat Line */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1, duration: 1 }}
               className="mt-16 flex gap-12 border-t border-zinc-100 pt-8"
            >
              <div>
                <p className="text-2xl font-black text-zinc-950">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Organic Cotton</p>
              </div>
              <div>
                <p className="text-2xl font-black text-zinc-950">Ethical</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Manufactured</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Art */}
          <div className="mt-16 lg:mt-0 relative">
            <motion.div
              initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[3/4] w-full max-w-lg mx-auto"
            >
              {/* Tilted frame around the image */}
              <div className="absolute inset-0 border-[16px] border-zinc-950 -skew-x-2 translate-x-4 translate-y-4 -z-10" />
              
              <div className="relative h-full w-full overflow-hidden shadow-2xl">
                <Image
                  src="/assets/hero_tshirt.png"
                  alt="Premium T-Shirt"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
                
                {/* Floating "LOCKED" tag like premium brands */}
                <div className="absolute bottom-10 right-0 bg-white px-6 py-4 shadow-xl translate-x-6">
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Status</p>
                   <p className="text-sm font-black uppercase text-zinc-950">Limited Release</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
