"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

const channels = [
  { id: "01", title: "Email Us", value: "ompandya54@gmail.com", sub: "Response within 24 hours", href: "mailto:ompandya54@gmail.com" },
  { id: "02", title: "Instagram", value: "@om_h_pandya", sub: "DMs open for quick queries", href: "https://instagram.com/om_h_pandya" },
  { id: "03", title: "WhatsApp", value: "+91 98765 43210", sub: "Mon–Sat, 10am–6pm IST", href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("loading");
    // Simulate send — wire up to your email API (Resend / Nodemailer) later
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative py-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-black uppercase italic text-white/[0.03] whitespace-nowrap">Contact</span>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-zinc-900 -skew-x-[20deg] origin-top translate-x-20 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="inline-block px-4 py-1.5 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-[.3em] mb-6">
              Get In Touch
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase italic mb-6">
              Let's <br />
              <span className="text-zinc-500 not-italic">Talk.</span>
            </h1>
            <p className="text-zinc-400 max-w-lg text-base font-medium leading-relaxed">
              Order issues, fit questions, wholesale enquiries — we read every message and reply to all of them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CHANNELS + FORM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Left — Contact Channels */}
            <div>
              <motion.div {...fadeUp} className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-[.4em] text-zinc-400">Reach Us</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-zinc-950 mt-2">
                  Other <span className="text-zinc-300">Channels.</span>
                </h2>
              </motion.div>

              <div className="space-y-4">
                {channels.map((c, i) => (
                  <motion.a
                    key={c.id}
                    href={c.href}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6 }}
                    className="group flex items-center gap-6 p-6 border border-zinc-100 hover:border-zinc-950 hover:bg-zinc-950 transition-all duration-500 block"
                  >
                    <span className="text-3xl font-black text-zinc-100 group-hover:text-zinc-800 transition-colors min-w-[3rem]">{c.id}</span>
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500 mb-1">{c.title}</p>
                      <p className="text-sm font-black text-zinc-950 group-hover:text-white transition-colors">{c.value}</p>
                      <p className="text-xs text-zinc-400 group-hover:text-zinc-500 mt-0.5">{c.sub}</p>
                    </div>
                    <svg className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors -translate-x-2 group-hover:translate-x-0 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Hours */}
              <motion.div {...fadeUp} className="mt-12 p-8 bg-zinc-950 border border-zinc-900">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">Support Hours</h3>
                <div className="space-y-3">
                  {[["Monday – Friday", "10:00 AM – 7:00 PM IST"], ["Saturday", "11:00 AM – 5:00 PM IST"], ["Sunday", "Closed"]].map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center border-b border-zinc-900 pb-3 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{day}</span>
                      <span className="text-xs font-black text-white">{time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Form */}
            <motion.div {...fadeUp}>
              <div className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-[.4em] text-zinc-400">Send a Message</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-zinc-950 mt-2">
                  Drop Us <span className="text-zinc-300">a Line.</span>
                </h2>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 bg-zinc-950 border border-zinc-800 text-center"
                >
                  <div className="w-16 h-16 bg-white flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-3">Message Sent.</h3>
                  <p className="text-zinc-400 text-sm">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white border-b border-zinc-700 hover:border-white pb-1 transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Name</label>
                      <input
                        required name="name" value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-transparent border-b-2 border-zinc-200 focus:border-zinc-950 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-300 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Email</label>
                      <input
                        required type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-transparent border-b-2 border-zinc-200 focus:border-zinc-950 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-300 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Subject</label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full bg-transparent border-b-2 border-zinc-200 focus:border-zinc-950 py-3 text-sm font-medium text-zinc-950 focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a topic</option>
                      <option>Order Issue</option>
                      <option>Size / Fit Question</option>
                      <option>Return or Exchange</option>
                      <option>Wholesale Enquiry</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Message</label>
                    <textarea
                      required name="message" value={form.message} onChange={handleChange}
                      rows={5} placeholder="Tell us what's on your mind..."
                      className="w-full bg-transparent border-b-2 border-zinc-200 focus:border-zinc-950 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-300 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : "Send Message"}
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
