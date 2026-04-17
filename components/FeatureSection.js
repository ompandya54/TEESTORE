"use client";

import { motion } from "framer-motion";

export default function FeatureSection() {
  const features = [
    {
      title: "Texture",
      desc: "Brushed 240GSM organic cotton for a skin-sensitive, luxurious hand-feel.",
      id: "01"
    },
    {
      title: "Structure",
      desc: "Double-needle stitching and high-density collars that never lose their form.",
      id: "02"
    },
    {
      title: "Ethos",
      desc: "Carbon-neutral certified manufacturing from field to finish.",
      id: "03"
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              Built <span className="text-zinc-600">Different.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-zinc-400 max-w-sm text-sm font-medium tracking-wide leading-relaxed"
          >
            We don't just follow trends. We architect garments that serve as the foundation of your digital and physical identity.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="group relative p-8 border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900 hover:border-zinc-800 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-5xl font-black text-zinc-800 group-hover:text-zinc-100 transition-colors duration-500 opacity-20 group-hover:opacity-100">{f.id}</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{f.desc}</p>
              
              {/* Decorative tilted line */}
              <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-zinc-700 -rotate-45 translate-x-10 translate-y-10" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
