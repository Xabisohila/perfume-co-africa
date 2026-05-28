"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Truck, Sparkles, Star } from "lucide-react";
import { fadeUp } from "@/lib/animations";

type Particle = { size: number; top: string; left?: string; right?: string; delay: number };
const particles: Particle[] = [
  { size: 5, top: "18%", left: "7%", delay: 0 },
  { size: 3, top: "35%", left: "14%", delay: 1.8 },
  { size: 7, top: "62%", left: "6%", delay: 3.2 },
  { size: 4, top: "80%", left: "22%", delay: 0.6 },
  { size: 6, top: "22%", right: "9%", delay: 2.2 },
  { size: 3, top: "55%", right: "7%", delay: 1.1 },
  { size: 5, top: "76%", right: "16%", delay: 2.8 },
];

const tickerItems = [
  "Long-Lasting Formula",
  "Imported Fragrance Oils",
  "Premium Packaging",
  "4.9 ★ Rated",
  "2,000+ Happy Customers",
  "Free Nationwide Shipping",
  "Designer-Inspired Scents",
  "7-Day Returns",
];

const trustBadges = [
  { icon: ShieldCheck, label: "Secure Checkout" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: Sparkles, label: "Premium Quality" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#060606] overflow-hidden flex flex-col">
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#0d0d0d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(200,169,107,0.09)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_5%_60%,rgba(200,169,107,0.05)_0%,transparent_55%)]" />
      {/* Grain texture — adds luxury tactile depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Decorative vertical rule lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent hidden xl:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent hidden xl:block" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/25"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left, right: p.right }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 6 + i * 0.8, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[calc(100vh-7rem)]">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow badge */}
            <motion.div {...fadeUp(0.05)} className="mb-7 inline-flex">
              <span className="inline-flex items-center gap-2.5 bg-gold/8 border border-gold/25 text-gold text-[11px] font-inter font-bold tracking-[0.25em] uppercase px-5 py-2.5 rounded-full">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
                </span>
                Limited Stock · Order Today
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.18)}
              className="font-playfair text-white leading-[1.08] mb-7"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)" }}
            >
              <span className="block font-inter text-white/35 tracking-[0.35em] uppercase font-medium mb-4" style={{ fontSize: "0.7rem" }}>
                Luxury Fragrances · South Africa
              </span>
              Smell Expensive.
              <br />
              <em className="not-italic text-gold-gradient">Be Unforgettable.</em>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-white/55 font-inter font-light leading-[1.75] mb-8 max-w-[520px]"
              style={{ fontSize: "clamp(0.98rem, 1.6vw, 1.1rem)" }}
            >
              Designer-inspired fragrances crafted from imported oils — scents
              that turn heads, spark conversations, and stay all day.{" "}
              <span className="text-white/80 font-normal">Premium luxury. Real African value.</span>
            </motion.p>

            {/* Rating row */}
            <motion.div {...fadeUp(0.42)} className="flex items-center gap-3 mb-9">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="h-4 w-px bg-white/15" />
              <span className="text-white/70 font-inter text-sm">
                <strong className="text-gold font-semibold">4.9</strong>
                {" "}rating ·{" "}
                <strong className="text-white font-semibold">2,000+</strong> customers
              </span>
            </motion.div>

            {/* CTA pair */}
            <motion.div {...fadeUp(0.54)} className="flex flex-col sm:flex-row gap-3.5 mb-10">
              <motion.a
                href="#collection"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold-shimmer glow-pulse text-black font-inter font-bold text-base px-10 py-4 rounded-full text-center tracking-wide"
              >
                Shop Now →
              </motion.a>
              <motion.a
                href="#why-us"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/20 text-white/75 font-inter text-base px-10 py-4 rounded-full text-center tracking-wide hover:border-gold/45 hover:text-gold transition-all duration-350"
              >
                Discover More
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div {...fadeUp(0.66)} className="flex flex-wrap gap-6">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/40 text-xs font-inter">
                  <Icon className="w-3.5 h-3.5 text-gold/60" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Product visual ── */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 pt-6 lg:pt-0">
            {/* Atmospheric glow blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[320px] lg:w-[440px] lg:h-[440px] rounded-full bg-gold/6 blur-[80px]" />
            </div>

            {/* Orbiting rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] border border-gold/8 rounded-full"
            />
            <div className="absolute w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] border border-gold/5 rounded-full float-animation" />

            {/* Product bottle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative z-10 float-animation"
            >
              <div className="relative rounded-3xl overflow-hidden"
                style={{
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(200,169,107,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src="/product 2.png"
                  alt="The Perfume Co. Africa — luxury fragrance bottles"
                  width={420}
                  height={520}
                  className="object-cover"
                  priority
                  style={{ maxHeight: "72vh", width: "auto", display: "block" }}
                />
                {/* Vignette to blend white bg into dark hero on all edges */}
                <div className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse at center, transparent 55%, rgba(6,6,6,0.55) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#060606]/80 to-transparent" />
              </div>
            </motion.div>

            {/* Floating review card — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[10%] -left-2 lg:-left-8 z-20"
            >
              <div
                className="rounded-2xl px-4 py-3.5 max-w-[210px]"
                style={{
                  background: "rgba(6,6,6,0.75)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  border: "1px solid rgba(200,169,107,0.22)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(200,169,107,0.1)",
                }}
              >
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-white/90 text-xs font-inter leading-snug">
                  &ldquo;I got stopped 3 times asking what I&apos;m wearing!&rdquo;
                </p>
                <p className="text-gold/70 text-[10px] mt-2 font-inter font-medium tracking-wide">— Amara K., Lagos</p>
              </div>
            </motion.div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[14%] -right-1 lg:right-2 z-20"
            >
              <div
                className="rounded-2xl px-4 py-3"
                style={{
                  background: "rgba(6,6,6,0.75)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  border: "1px solid rgba(200,169,107,0.22)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(200,169,107,0.1)",
                }}
              >
                <p className="text-gold text-xs font-inter font-bold tracking-wide">🏆 Best Seller</p>
                <p className="text-white/55 text-[10px] font-inter mt-0.5 tracking-wide">2,000+ bottles sold</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom ticker marquee ── */}
      <div
        className="relative z-10 border-t border-white/6 py-4 overflow-hidden bg-black/20 backdrop-blur-sm mt-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex gap-0 w-max animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-0 text-white/25 text-[11px] font-inter tracking-[0.2em] uppercase px-8"
            >
              {item}
              <span className="ml-8 text-gold/30">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-luxury to-transparent pointer-events-none" />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/25 text-[9px] font-inter tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
