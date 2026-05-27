"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  Quote,
  ChevronDown,
} from "lucide-react";
import {
  fadeUp,
  viewFadeUp,
  stagger,
  staggerItem,
} from "@/lib/animations";

/* ─── Data ─────────────────────────────────────────────────────────── */

const stats = [
  { value: "2,000+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "R299", label: "Starting Price" },
  { value: "Free", label: "Delivery on 3+" },
];

const tickerItems = [
  "4.9★ Rated",
  "2,000+ Happy Customers",
  "Premium Imported Oils",
  "Free Delivery on 3+",
  "Ships to All 9 Provinces",
  "From R299",
  "8–12 Hour Longevity",
  "7-Day Guarantee",
];

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Oils",
    body: "Genuine imported fragrance oils in every bottle — never synthetic fillers or cheap substitutes.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    body: "We ship to every province. Major cities get orders in 2–3 business days with full tracking.",
  },
  {
    icon: Sparkles,
    title: "8–12 Hour Wear",
    body: "Our concentration is formulated for all-day performance. Most customers wear it from morning to midnight.",
  },
  {
    icon: Award,
    title: "7-Day Guarantee",
    body: "First-time buyer? If it's not what you expected, reach out within 7 days — we'll make it right.",
  },
];

const reviews = [
  {
    name: "Liyolatha H.",
    location: "East London",
    product: "Inspired by One Million",
    text: "I got stopped twice in one day asking what perfume I was wearing. My coworker literally said 'you smell like money.' I'm never going back to my old perfume.",
    rating: 5,
  },
  {
    name: "Chidi E.",
    location: "Johannesburg",
    product: "Inspired by Armani Black Oud",
    text: "I walked into a meeting and my boss said 'whoever is wearing that, good choice.' This fragrance commands respect. Period.",
    rating: 5,
  },
  {
    name: "Fatima A.",
    location: "Cape Town",
    product: "Inspired by Boss Orange",
    text: "Lasts from morning prayers to late evening events. My husband can't stop complimenting me. Absolutely divine.",
    rating: 5,
  },
  {
    name: "Sipho N.",
    location: "Pretoria",
    product: "Inspired by One Million",
    text: "My wife keeps stealing my perfume. That's when you know you've found something special. The Perfume Co Africa delivered exactly that.",
    rating: 5,
  },
  {
    name: "Zanele D.",
    location: "Johannesburg",
    product: "Inspired by Boss Orange",
    text: "I was sceptical about buying online but the scent arrived perfectly packaged and smells incredible. Already ordered my second bottle.",
    rating: 5,
  },
  {
    name: "Yusuf A.",
    location: "Cape Town",
    product: "Inspired by Armani Black Oud",
    text: "Strong enough to fill a room, but never overpowering. Exactly what I was looking for. Fast delivery — came in 2 days!",
    rating: 5,
  },
  {
    name: "Precious K.",
    location: "Durban",
    product: "Inspired by Gucci Oud",
    text: "Wore this to a family function and my aunties were asking where I got it all night. Absolutely in love with this scent.",
    rating: 5,
  },
];

/* ─── BrandHero ─────────────────────────────────────────────────────── */

export function BrandHero() {
  return (
    <section className="relative min-h-screen bg-dark overflow-hidden flex flex-col">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#0c0c0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_65%_40%,rgba(200,169,107,0.09)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_15%_70%,rgba(200,169,107,0.04)_0%,transparent_60%)]" />
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent hidden xl:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent hidden xl:block" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center w-full">

          {/* ── Left: Copy ── */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div {...fadeUp(0.05)} className="mb-6">
              <span className="inline-flex items-center gap-2.5 bg-gold/8 border border-gold/25 text-gold text-[11px] font-inter font-bold tracking-[0.25em] uppercase px-5 py-2.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
                South Africa's Luxury Fragrance Brand
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.14)}
              className="font-playfair text-white leading-[1.04] mb-5"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
            >
              The Perfume Co{" "}
              <em className="not-italic text-gold-gradient block sm:inline">
                Africa
              </em>
            </motion.h1>

            <motion.p
              {...fadeUp(0.26)}
              className="text-white/50 font-inter font-light leading-[1.8] mb-9 max-w-[500px]"
              style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)" }}
            >
              Designer-inspired fragrances crafted from premium imported oils — long-lasting luxury scents delivered to every corner of South Africa from just{" "}
              <span className="text-white/80 font-normal">R299</span>.
            </motion.p>

            {/* Stats 2×2 */}
            <motion.div
              {...fadeUp(0.36)}
              className="grid grid-cols-2 gap-x-10 gap-y-6 mb-10 w-full max-w-[320px] lg:max-w-none"
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="text-left">
                  <p
                    className="font-playfair text-gold font-bold leading-none mb-1"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)" }}
                  >
                    {value}
                  </p>
                  <p className="text-white/30 text-[10px] font-inter uppercase tracking-[0.18em]">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.a
              {...fadeUp(0.46)}
              href="#collection"
              className="btn-gold-shimmer glow-pulse text-black font-inter font-bold text-base px-10 py-4 rounded-full tracking-wide"
            >
              Shop The Collection →
            </motion.a>

            {/* Trust micro-row */}
            <motion.div
              {...fadeUp(0.54)}
              className="flex items-center gap-5 mt-7"
            >
              {[
                { icon: ShieldCheck, text: "Secure Checkout" },
                { icon: Truck, text: "Fast Delivery" },
                { icon: Award, text: "7-Day Guarantee" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-white/30 text-[11px] font-inter">
                  <Icon className="w-3.5 h-3.5 text-gold/50 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Product images ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-[220px] sm:w-[270px] lg:w-[340px]">
              {/* Main bottle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-dark-card border border-gold/12"
                style={{
                  boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 50px rgba(200,169,107,0.08)",
                }}
              >
                <Image
                  src="/product.jpg"
                  alt="The Perfume Co Africa — luxury fragrance"
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 270px, 340px"
                />
                {/* Inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_80%,rgba(200,169,107,0.06)_0%,transparent_70%)]" />
              </motion.div>

              {/* Secondary bottle — peeking bottom-left */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                className="absolute -bottom-6 -left-12 sm:-left-16 w-[110px] sm:w-[130px] rounded-2xl overflow-hidden border border-gold/15 bg-dark-card"
                style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
              >
                <div className="aspect-[3/4]">
                  <div className="relative w-full h-full">
                    <Image
                      src="/product 2.png"
                      alt="The Perfume Co Africa — second fragrance"
                      fill
                      className="object-contain p-4"
                      sizes="130px"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Rating badge — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl px-4 py-3 shadow-2xl border border-black/5"
              >
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-inter font-bold text-text-primary text-xs leading-none">4.9 / 5</p>
                <p className="text-text-secondary text-[10px] font-inter mt-0.5">900+ reviews</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll caret */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 pb-8 flex justify-center"
      >
        <ChevronDown className="w-5 h-5 text-gold/35" />
      </motion.div>
    </section>
  );
}

/* ─── TickerStrip ────────────────────────────────────────────────────── */

export function TickerStrip() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="bg-[#0e0e0e] border-y border-gold/12 py-3.5 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 mx-7 text-gold/70 text-[11px] font-inter font-semibold tracking-[0.2em] uppercase"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-gold/30 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── TrustPillars ───────────────────────────────────────────────────── */

export function TrustPillars() {
  return (
    <section id="why-us" className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...viewFadeUp(0)} viewport={{ once: false, margin: "-60px" }} className="text-center mb-14">
          <p className="text-[10px] font-inter font-bold tracking-[0.3em] uppercase text-gold mb-3">
            Our Promise
          </p>
          <h2
            className="font-playfair text-text-primary leading-[1.1]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
          >
            Why Choose{" "}
            <em className="not-italic text-gold">The Perfume Co Africa</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trustPillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              className="group relative bg-luxury rounded-2xl p-7 border border-transparent hover:border-gold/20 transition-all duration-400 hover:shadow-lg hover:shadow-gold/5 overflow-hidden"
            >
              {/* Hover gold accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div className="w-12 h-12 rounded-2xl bg-white border border-gold/15 flex items-center justify-center mb-5 group-hover:border-gold/35 transition-colors duration-300 shadow-sm">
                <p.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-inter font-semibold text-text-primary mb-2 text-sm">
                {p.title}
              </h3>
              <p className="text-text-secondary font-inter text-sm leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Google G icon ─────────────────────────────────────────────────── */

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ─── ReviewCard ─────────────────────────────────────────────────────── */

function ReviewCard({ r }: { r: (typeof reviews)[0] }) {
  return (
    <div className="w-[300px] flex-shrink-0 bg-white rounded-2xl p-6 border border-black/6 shadow-sm flex flex-col select-none">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-0.5">
          {[...Array(r.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <GoogleG />
          <span className="text-[10px] font-inter text-text-secondary/60">Google</span>
        </div>
      </div>
      <Quote className="w-5 h-5 text-gold/20 mb-2" />
      <p className="text-text-secondary font-inter text-sm leading-relaxed flex-1 mb-5">
        {r.text}
      </p>
      <div className="flex items-end justify-between border-t border-black/5 pt-4">
        <div>
          <p className="font-inter font-semibold text-text-primary text-sm leading-none mb-0.5">{r.name}</p>
          <p className="text-text-secondary text-xs font-inter">{r.location}</p>
        </div>
        <span className="text-[9px] font-inter font-semibold uppercase tracking-[0.12em] text-gold/70 bg-gold/8 border border-gold/15 px-2 py-1 rounded-full whitespace-nowrap ml-3">
          {r.product}
        </span>
      </div>
    </div>
  );
}

/* ─── Reviews ────────────────────────────────────────────────────────── */

export function Reviews() {
  const row1 = [...reviews, ...reviews];
  const row2 = [...[...reviews].reverse(), ...[...reviews].reverse()];

  return (
    <section id="reviews" className="bg-luxury py-20 lg:py-28 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          {...viewFadeUp(0)}
          viewport={{ once: false, margin: "-60px" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-[10px] font-inter font-bold tracking-[0.3em] uppercase text-gold mb-3">
              Real Customers
            </p>
            <h2
              className="font-playfair text-text-primary leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Why Customers Love{" "}
              <em className="not-italic text-gold">The Perfume Co Africa</em>
            </h2>
          </div>

          {/* Badges row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Google badge */}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 shadow-sm border border-black/5">
              <GoogleG />
              <div>
                <p className="font-inter font-bold text-text-primary text-xs leading-none mb-1">Google Reviews</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div className="h-8 w-px bg-black/8" />
              <div>
                <p className="font-playfair text-text-primary font-bold text-xl leading-none">4.9</p>
                <p className="text-text-secondary text-[10px] font-inter mt-0.5">900+ reviews</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="group overflow-hidden mb-4">
        <div
          className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "55s" }}
        >
          {row1.map((r, i) => <ReviewCard key={i} r={r} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="group overflow-hidden">
        <div
          className="flex gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "50s" }}
        >
          {row2.map((r, i) => <ReviewCard key={i} r={r} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── BrandCTA ───────────────────────────────────────────────────────── */

export function BrandCTA() {
  return (
    <section className="relative bg-dark py-28 lg:py-36 overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(200,169,107,0.09)_0%,transparent_70%)]" />

      {/* Floating product images */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] lg:w-[280px] opacity-[0.07] hidden md:block"
      >
        <div className="relative aspect-[3/4]">
          <Image src="/product.jpg" alt="" fill className="object-contain" sizes="280px" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] lg:w-[280px] opacity-[0.07] hidden md:block"
      >
        <div className="relative aspect-[3/4]">
          <Image src="/product 2.png" alt="" fill className="object-contain" sizes="280px" />
        </div>
      </div>

      {/* Decorative gold lines */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-gold/20" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent to-gold/20" />

      <div className="relative z-10 max-w-xl mx-auto px-4 text-center">
        <motion.p
          {...viewFadeUp(0)}
          viewport={{ once: false, margin: "-60px" }}
          className="text-[10px] font-inter font-bold tracking-[0.3em] uppercase text-gold mb-5"
        >
          Ready to smell expensive?
        </motion.p>

        <motion.h2
          {...viewFadeUp(0.1)}
          viewport={{ once: false, margin: "-60px" }}
          className="font-playfair text-white leading-[1.06] mb-5"
          style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}
        >
          Shop The Perfume Co Africa{" "}
          <em className="not-italic text-gold">Collection</em>
        </motion.h2>

        <motion.p
          {...viewFadeUp(0.2)}
          viewport={{ once: false, margin: "-60px" }}
          className="text-white/40 font-inter text-sm leading-[1.8] mb-10 max-w-[400px] mx-auto"
        >
          Join 2,000+ South Africans who've made The Perfume Co Africa their signature. Premium scents from R299 — free delivery on 3 or more bottles.
        </motion.p>

        <motion.div {...viewFadeUp(0.3)} viewport={{ once: false, margin: "-60px" }} className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#collection"
            className="btn-gold-shimmer glow-pulse text-black font-inter font-bold text-base px-12 py-4 rounded-full tracking-wide"
          >
            Shop Now →
          </a>
          <a
            href="https://wa.me/27640713844?text=Hi%2C%20I%27d%20like%20to%20order%20from%20The%20Perfume%20Co%20Africa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 border border-white/15 text-white/60 font-inter text-sm px-8 py-4 rounded-full hover:border-[#25D366]/40 hover:text-[#25D366] transition-all duration-350"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
