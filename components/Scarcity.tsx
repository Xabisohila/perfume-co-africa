"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ShoppingBag, Clock, Users } from "lucide-react";
import { viewFadeUp } from "@/lib/animations";

function makeGetTime(hours: number) {
  return () => {
    const now = new Date();
    const target = new Date(now);
    target.setHours(now.getHours() + hours, 59, 59, 0);
    const diff = Math.max(0, target.getTime() - now.getTime());
    return {
      h: Math.floor(diff / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  };
}

function useCountdown(hours: number) {
  const [time, setTime] = useState({ h: hours, m: 59, s: 59 });
  useEffect(() => {
    const get = makeGetTime(hours);
    setTime(get());
    const id = setInterval(() => setTime(get()), 1_000);
    return () => clearInterval(id);
  }, [hours]);
  return time;
}

function FlipDigit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[76px] sm:w-[88px]">
        {/* Card top half */}
        <div className="relative bg-[#141414] border border-gold/20 rounded-t-xl h-[54px] sm:h-[62px] flex items-end justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/4 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.span
              key={str}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 font-playfair text-gold text-4xl sm:text-5xl font-bold leading-none pb-1.5"
            >
              {str}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Fold line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/60 z-20" />
        {/* Card bottom half */}
        <div className="bg-[#0f0f0f] border-x border-b border-gold/20 rounded-b-xl h-[54px] sm:h-[62px] flex items-start justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/3 to-transparent" />
          <span className="font-playfair text-gold/60 text-4xl sm:text-5xl font-bold leading-none pt-1.5">
            {str}
          </span>
        </div>
      </div>
      <span className="text-white/35 font-inter text-[9px] tracking-[0.3em] uppercase mt-2.5">
        {label}
      </span>
    </div>
  );
}

export default function Scarcity() {
  const time = useCountdown(4);

  return (
    <section className="relative bg-[#0a0800] py-20 lg:py-28 overflow-hidden">
      {/* Gold atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(200,169,107,0.1)_0%,transparent_65%)]" />

      {/* Top/bottom decorative lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <motion.div {...viewFadeUp(0)} className="flex justify-center mb-7">
          <span className="inline-flex items-center gap-2.5 bg-gold/8 border border-gold/25 text-gold text-[11px] font-inter font-bold tracking-[0.25em] uppercase px-5 py-2.5 rounded-full">
            <Flame className="w-3.5 h-3.5" />
            Selling Fast · Limited Stock
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...viewFadeUp(0.1)}
          className="font-playfair text-white leading-[1.1] mb-4 text-[clamp(2rem,4.5vw,3.2rem)]"
        >
          Don&apos;t Miss Out.
          <br />
          <em className="not-italic text-gold">This Offer Ends Soon.</em>
        </motion.h2>

        {/* Stock copy */}
        <motion.p {...viewFadeUp(0.18)} className="text-white/55 font-inter mb-10 max-w-md mx-auto text-[0.95rem] leading-relaxed">
          Only <strong className="text-gold font-semibold">23 bottles</strong> remaining at this price.
          Once they&apos;re gone, prices return to normal.
        </motion.p>

        {/* Live viewers */}
        <motion.div
          {...viewFadeUp(0.24)}
          className="inline-flex items-center gap-2 text-white/40 text-xs font-inter mb-10 bg-white/4 border border-white/8 rounded-full px-4 py-2"
        >
          <Users className="w-3.5 h-3.5" />
          <span><strong className="text-white/70">14 people</strong> are viewing this right now</span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          {...viewFadeUp(0.3)}
          className="flex items-center justify-center gap-2 sm:gap-4 mb-10"
        >
          <Clock className="w-4 h-4 text-gold/50 hidden sm:block" />
          <FlipDigit value={time.h} label="Hours" />
          <span className="text-gold/50 text-3xl font-playfair mb-4 select-none">:</span>
          <FlipDigit value={time.m} label="Minutes" />
          <span className="text-gold/50 text-3xl font-playfair mb-4 select-none">:</span>
          <FlipDigit value={time.s} label="Seconds" />
        </motion.div>

        {/* Stock progress */}
        <motion.div {...viewFadeUp(0.38)} className="max-w-xs mx-auto mb-10">
          <div className="flex justify-between text-[11px] font-inter text-white/35 mb-2">
            <span>477 sold</span>
            <span>23 remaining</span>
          </div>
          <div className="h-2 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "95%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.a
          {...viewFadeUp(0.44)}
          href="#collection"
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="btn-gold-shimmer glow-pulse inline-flex items-center gap-3 text-black font-inter font-bold text-lg px-12 py-5 rounded-full"
        >
          <ShoppingBag className="w-5 h-5" />
          Claim Your Bottle Now
        </motion.a>

        <p className="text-white/25 font-inter text-xs mt-5 tracking-wide">
          Free shipping · Secure checkout · 7-day returns
        </p>
      </div>
    </section>
  );
}
