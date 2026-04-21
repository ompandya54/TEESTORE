"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';

export default function LatestArrivals({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 text-[15vw] font-black text-zinc-50 uppercase tracking-tighter -z-0 pointer-events-none opacity-50 translate-y-20 select-none">
        Fresh Drops
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex justify-between items-end mb-16 border-b border-zinc-100 pb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Newly Archived</span>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-zinc-950">The Latest <span className="text-zinc-300">Releases</span></h2>
          </div>
          <Link href="/products" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-950 border-b-2 border-zinc-100 hover:border-zinc-950 pb-2 transition-all duration-300 hidden sm:block">
            View Archive
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group ${i % 2 !== 0 ? 'lg:translate-y-12' : ''}`}
            >
              <Link href={`/products/${product._id}`} className="block relative overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 border border-zinc-200 group-hover:border-zinc-400 transition-colors duration-500">
                  <Image
                    src={product.images[0] || "/placeholder-tshirt.png"}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/5 transition-colors duration-500" />

                  {/* Floating Price Tag */}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 shadow-xl shadow-black/5 transform -skew-x-12 translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                    <p className="text-xs font-black text-zinc-950">${product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6 px-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">{product.category}</p>
                    <div className="h-[1px] flex-1 bg-zinc-100 mx-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-zinc-950 group-hover:text-zinc-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center sm:hidden">
          <Link href="/products" className="text-xs font-bold uppercase tracking-widest border-b-2 border-zinc-950 pb-1">
            View All Pieces
          </Link>
        </div>

      </div>
    </section>
  );
}
