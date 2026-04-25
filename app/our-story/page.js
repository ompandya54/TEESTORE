"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" },
};

const milestones = [
  { year: "2020", title: "The Idea", desc: "Born out of frustration with fast fashion — we wanted a t-shirt that actually lasted. One fabric, one silhouette, zero compromise." },
  { year: "2022", title: "First Stitch", desc: "Partnered with a family-run mill in Coimbatore to source 240GSM organic cotton. Every thread traceable, every process transparent." },
  { year: "2024", title: "The Archive", desc: "Launched our first collection of 12 pieces. Sold out in 72 hours. The archive was born." },
  { year: "2026", title: "Now", desc: "Shipping across India. Still the same obsession — build the perfect t-shirt, nothing more." },
];

const values = [
  { id: "01", title: "No Noise", desc: "We don't do seasonal drops, influencer collabs, or trend chasing. We make what we believe in and let the fabric speak." },
  { id: "02", title: "Radical Transparency", desc: "Our cost breakdown is public. Our factory partners are named. You know exactly what you're paying for." },
  { id: "03", title: "Built to Last", desc: "Every piece is stress-tested for 200+ washes. If it fades or shrinks, we replace it. No questions." },
];

export default function OurStoryPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-zinc-950">
        {/* Background text watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-black uppercase italic text-white/[0.03] whitespace-nowrap">
            Our Story
          </span>
        </div>

        {/* Skew accent */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-zinc-900 -skew-x-[20deg] origin-top translate-x-20 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-[.3em] mb-6">
              Est. 2020
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase italic mb-8">
              We Build <br />
              <span className="text-zinc-500 not-italic">Not Sell.</span>
            </h1>
            <p className="text-zinc-400 max-w-lg text-lg font-medium leading-relaxed">
              TeeStore started as a single question — why does every t-shirt fall apart after six months? Four years later, we're still answering it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="border-l-4 border-zinc-950 pl-10">
            <p className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-950 leading-tight uppercase italic">
              "The best t-shirt is the one you forget you're wearing — until someone asks where you got it."
            </p>
            <p className="mt-6 text-zinc-400 text-sm font-bold uppercase tracking-widest">— Founder, TeeStore</p>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-20">
            <span className="text-[10px] font-black uppercase tracking-[.4em] text-zinc-500">How We Got Here</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mt-2">
              The <span className="text-zinc-600">Timeline.</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2 hidden md:block" />

            <div className="space-y-16">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-16 items-center ${i % 2 !== 0 ? "md:[direction:rtl]" : ""}`}
                >
                  {/* Dot on timeline */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-zinc-950 z-10" />

                  <div className={`p-8 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 transition-colors duration-500 ${i % 2 !== 0 ? "md:[direction:ltr]" : ""}`}>
                    <span className="text-5xl font-black text-zinc-700 block mb-4">{m.year}</span>
                    <h3 className="text-xl font-black uppercase tracking-widest text-white mb-3">{m.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[.4em] text-zinc-400">What We Stand For</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-zinc-950 mt-2">
                Our <span className="text-zinc-300">Values.</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
              Three principles that haven't changed since day one — and never will.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group p-8 border border-zinc-100 hover:border-zinc-950 hover:bg-zinc-950 transition-all duration-500"
              >
                <span className="text-5xl font-black text-zinc-100 group-hover:text-zinc-800 transition-colors duration-500 block mb-6">{v.id}</span>
                <h3 className="text-lg font-black uppercase tracking-widest text-zinc-950 group-hover:text-white mb-4 transition-colors">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "100%", label: "Organic Cotton" },
              { num: "200+", label: "Wash Guarantee" },
              { num: "0", label: "Middlemen" },
              { num: "∞", label: "Obsession" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <p className="text-4xl md:text-6xl font-black text-white tracking-tighter">{s.num}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03]">
          <div className="text-[15vw] font-black text-black uppercase italic leading-none">ARCHIVE ARCHIVE</div>
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-zinc-950 mb-8 leading-none">
              Wear the <br /><span className="text-zinc-300">Archive.</span>
            </h2>
            <Link
              href="/products"
              className="inline-block px-12 py-6 bg-zinc-950 text-white text-xs font-black uppercase tracking-[.3em] hover:bg-black transition-all hover:scale-105 shadow-2xl"
            >
              Shop the Collection
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
