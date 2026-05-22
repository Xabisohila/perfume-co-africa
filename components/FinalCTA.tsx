"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
import { viewFadeUp } from "@/lib/animations";

type Particle = { s: number; top: string; left?: string; right?: string; d: number };
const particles: Particle[] = [
  { s: 5, top: "18%", left: "8%", d: 0 },
  { s: 4, top: "65%", left: "5%", d: 2.2 },
  { s: 6, top: "28%", right: "7%", d: 1.1 },
  { s: 3, top: "72%", right: "12%", d: 3 },
  { s: 7, top: "50%", left: "15%", d: 1.8 },
];

const guarantees = [
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: RefreshCw, label: "7-Day Returns" },
];

export default function FinalCTA() {
  return (
    <section className="relative bg-[#060606] py-24 lg:py-40 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(200,169,107,0.08)_0%,transparent_65%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/15"
          style={{ width: p.s, height: p.s, top: p.top, left: p.left, right: p.right }}
          animate={{ y: [0, -16, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 6 + i, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stars */}
        <motion.div {...viewFadeUp(0)} className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-gold text-gold" />
          ))}
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          {...viewFadeUp(0.08)}
          className="text-gold font-inter text-xs tracking-[0.35em] uppercase font-semibold mb-7"
        >
          Your Journey Starts Here
        </motion.p>

        {/* Main headline */}
        <motion.h2
          {...viewFadeUp(0.16)}
          className="font-playfair text-white leading-[1.08] mb-8 text-[clamp(2.8rem,6.5vw,5rem)]"
        >
          Your Signature Scent
          <br />
          <em className="not-italic text-gold">Starts Here.</em>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          {...viewFadeUp(0.24)}
          className="text-white/45 font-inter leading-[1.85] max-w-lg mx-auto mb-12 text-[clamp(0.95rem,1.6vw,1.08rem)]"
        >
          Stop settling for ordinary. The world notices the person who smells
          extraordinary. Your new signature scent — the one that turns heads,
          opens doors, and defines you — is one click away.
        </motion.p>

        {/* CTA button */}
        <motion.a
          {...viewFadeUp(0.32)}
          href="#collection"
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="btn-gold-shimmer glow-pulse inline-flex items-center gap-3 text-black font-inter font-bold text-lg px-14 py-5 rounded-full mb-10"
        >
          <ShoppingBag className="w-5 h-5" />
          Order Yours Today
        </motion.a>

        {/* Guarantee row */}
        <motion.div
          {...viewFadeUp(0.4)}
          className="flex flex-wrap items-center justify-center gap-7 mb-16"
        >
          {guarantees.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/35 text-xs font-inter">
              <Icon className="w-4 h-4 text-gold/50" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-14" />

        {/* Brand sign-off */}
        <motion.div {...viewFadeUp(0.44)}>
          <p className="font-playfair text-white/25 italic text-sm mb-3">
            &ldquo;Crafted for those who refuse to blend in.&rdquo;
          </p>
          <p className="font-inter text-gold/45 tracking-[0.5em] text-[10px] uppercase font-semibold">
            The Perfume Co. Africa
          </p>
        </motion.div>
      </div>
    </section>
  );
}
