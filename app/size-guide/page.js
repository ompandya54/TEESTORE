"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

const measurements = {
  cm: [
    { size: "S",   chest: "86–91",  waist: "71–76",  length: "68",  shoulder: "42" },
    { size: "M",   chest: "96–101", waist: "81–86",  length: "71",  shoulder: "44" },
    { size: "L",   chest: "106–111",waist: "91–96",  length: "74",  shoulder: "47" },
    { size: "XL",  chest: "116–121",waist: "101–106",length: "77",  shoulder: "50" },
    { size: "XXL", chest: "126–131",waist: "111–116",length: "80",  shoulder: "53" },
  ],
  in: [
    { size: "S",   chest: "34–36",  waist: "28–30",  length: "27",  shoulder: "16.5" },
    { size: "M",   chest: "38–40",  waist: "32–34",  length: "28",  shoulder: "17.5" },
    { size: "L",   chest: "42–44",  waist: "36–38",  length: "29",  shoulder: "18.5" },
    { size: "XL",  chest: "46–48",  waist: "40–42",  length: "30",  shoulder: "19.5" },
    { size: "XXL", chest: "50–52",  waist: "44–46",  length: "31",  shoulder: "21"   },
  ],
};

const tips = [
  { id: "01", title: "Measure Chest", desc: "Wrap the tape around the fullest part of your chest, keeping it parallel to the ground. Don't pull tight." },
  { id: "02", title: "Measure Waist", desc: "Measure around your natural waistline — the narrowest part of your torso, usually just above the belly button." },
  { id: "03", title: "Measure Length", desc: "From the highest point of the shoulder seam straight down to the hem. Lay the garment flat for accuracy." },
  { id: "04", title: "When In Doubt", desc: "Size up. Our cuts are slim but structured. If you're between sizes, the larger will give a more relaxed, premium drape." },
];

export default function SizeGuidePage() {
  const [unit, setUnit] = useState("cm");

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative py-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-black uppercase italic text-white/[0.03] whitespace-nowrap">
            Size Guide
          </span>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-zinc-900 -skew-x-[20deg] origin-top translate-x-20 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-[.3em] mb-6">
              Fit Reference
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase italic mb-6">
              Find Your <br />
              <span className="text-zinc-500 not-italic">Perfect Fit.</span>
            </h1>
            <p className="text-zinc-400 max-w-lg text-base font-medium leading-relaxed">
              Our cuts are engineered for structure. Use the chart below to find your size — measured against the garment, not your body.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SIZE TABLE ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Unit Toggle */}
          <motion.div {...fadeUp} className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">
              Garment Measurements
            </h2>
            <div className="flex border border-zinc-800 overflow-hidden">
              {["cm", "in"].map(u => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-colors ${unit === u ? "bg-white text-zinc-950" : "bg-transparent text-zinc-500 hover:text-white"}`}
                >
                  {u}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Table */}
          <motion.div {...fadeUp} className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  {["Size", `Chest (${unit})`, `Waist (${unit})`, `Length (${unit})`, `Shoulder (${unit})`].map(h => (
                    <th key={h} className="py-4 px-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500 first:pl-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {measurements[unit].map((row, i) => (
                  <motion.tr
                    key={row.size}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors group"
                  >
                    <td className="py-5 px-4 pl-0">
                      <span className="inline-flex items-center justify-center w-10 h-10 border border-zinc-700 group-hover:border-white group-hover:bg-white group-hover:text-zinc-950 text-white text-xs font-black uppercase tracking-widest transition-all">
                        {row.size}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-zinc-300 font-medium">{row.chest}</td>
                    <td className="py-5 px-4 text-zinc-300 font-medium">{row.waist}</td>
                    <td className="py-5 px-4 text-zinc-300 font-medium">{row.length}</td>
                    <td className="py-5 px-4 text-zinc-300 font-medium">{row.shoulder}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p {...fadeUp} className="mt-6 text-[11px] text-zinc-600 font-medium uppercase tracking-widest">
            * All measurements are of the garment laid flat. Actual body measurements will be slightly larger.
          </motion.p>
        </div>
      </section>

      {/* ── HOW TO MEASURE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[.4em] text-zinc-400">Step by Step</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-zinc-950 mt-2">
              How to <span className="text-zinc-300">Measure.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group p-8 border border-zinc-100 hover:border-zinc-950 hover:bg-zinc-950 transition-all duration-500"
              >
                <span className="text-5xl font-black text-zinc-100 group-hover:text-zinc-800 transition-colors block mb-6">{tip.id}</span>
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950 group-hover:text-white mb-3 transition-colors">{tip.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIT NOTE ── */}
      <section className="py-20 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="border-l-4 border-white pl-10">
            <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white mb-4">
              Our Fit Philosophy
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed max-w-2xl">
              TeeStore cuts are <span className="text-white font-bold">slim-structured</span> — not boxy, not skin-tight. The shoulder seam sits exactly at the edge of your shoulder. The body tapers slightly through the torso. It's designed to look intentional, not accidental.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              {[["Slim Structured", "Our default cut"], ["True to Size", "No vanity sizing"], ["Pre-Shrunk", "Wash-safe from day one"]].map(([label, sub]) => (
                <div key={label} className="border border-zinc-800 px-6 py-4">
                  <p className="text-white text-xs font-black uppercase tracking-widest">{label}</p>
                  <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
