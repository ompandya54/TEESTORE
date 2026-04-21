"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function StackedShowcase({ products }) {
  const containerRef = useRef(null);

  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress for a "gliding" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70, // Slightly less stiff for heavier feel
    damping: 40,   // More dampening to slow down the bounce
    restDelta: 0.001
  });

  // Use the top 4 products
  const featured = products.slice(0, 4);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-zinc-950">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden">

        {/* Background Typography (Parallax & Smooth Fade) */}
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], [150, -150]),
            opacity: useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.05, 0.05, 0])
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <h2 className="text-[35vw] font-black text-white uppercase italic tracking-tighter leading-none opacity-20">VAULT</h2>
        </motion.div>

        {/* LEFT SIDE: Pinned Information */}
        <div className="w-full md:w-1/2 p-8 md:p-24 z-20 pointer-events-none h-full flex flex-col justify-center">
          <div className="max-w-md">
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.1], [0, 1]),
                y: useTransform(smoothProgress, [0, 0.1], [20, 0])
              }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600 mb-6 block">Premium Dossier</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.8] mb-10">
                The <br /> <span className="text-zinc-800">Archive</span>
              </h2>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs border-l-2 border-zinc-800 pl-6">
                Curated by architects of style. These pieces represent our highest standard of structural cotton engineering.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE: Stacking Cards */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center relative p-8 md:p-0">
          {featured.map((product, i) => {
            const start = i * 0.15;
            const end = (i + 1) * 0.15;

            // 🚀 SMOOTH GLIDE PHYSICS
            // Card slides from right-bottom into center
            const y = useTransform(smoothProgress, [start, start + 0.15], [800, 0]);
            const x = useTransform(smoothProgress, [start, start + 0.15], [200, 0]);
            const rotate = useTransform(smoothProgress, [start, start + 0.15], [15, i % 2 === 0 ? -3 : 3]);

            // 💎 DEPTH EFFECT: When the NEXT card comes, the current card shrinks and dims
            const nextStart = (i + 1) * 0.2;
            const scale = useTransform(smoothProgress, [start + 0.15, nextStart], [1, 0.85]);
            const opacity = useTransform(smoothProgress, [Math.max(0, start - 0.05), start, nextStart], [0, 1, 0.4]);
            const blur = useTransform(smoothProgress, [start + 0.15, nextStart], ["blur(0px)", "blur(12px)"]);
            const isFocal = useTransform(smoothProgress, [start, start + 0.15, nextStart], [0, 1, 0]);

            return (
              <motion.div
                key={product._id}
                style={{
                  y,
                  x,
                  rotate,
                  scale,
                  opacity,
                  filter: blur,
                  zIndex: 30 + i
                }}
                className="absolute w-full max-w-[300px] md:max-w-[420px] aspect-[3/4] group cursor-pointer"
              >
                <Link href={`/products/${product._id}`} className="block h-full w-full">
                  <div className="relative h-full w-full bg-zinc-900 border border-zinc-800/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden group-hover:border-zinc-400 transition-colors duration-700 rounded-sm">
                    <motion.div
                      style={{
                        filter: useTransform(isFocal, [0, 1], ["grayscale(1) brightness(0.5)", "grayscale(0) brightness(1)"])
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={product.images[0] || "/placeholder-tshirt.png"}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 300px, 420px"
                      />
                    </motion.div>

                    {/* Information Reveal on Card Front */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent">
                      <motion.div
                        className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                      >
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-2">{product.category}</p>
                        <h3 className="text-2xl font-black uppercase text-white tracking-tighter leading-none mb-3">{product.name}</h3>
                        <div className="flex items-center gap-4">
                          <p className="text-white font-black text-xl">${product.price.toFixed(2)}</p>
                          <span className="h-[1px] flex-1 bg-zinc-800" />
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Details</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Corner Tag */}
                    <div className="absolute top-0 right-0 p-4">
                      <div className="bg-zinc-100 text-zinc-950 px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                        Archived
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
