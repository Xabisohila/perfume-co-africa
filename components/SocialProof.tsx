"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { viewFadeUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Liyolatha Hila",
    location: "East London, South Africa",
    rating: 5,
    text: "I got stopped twice in one day asking what perfume I was wearing. My coworker literally said 'you smell like money.' I'm never going back to my old perfume.",
    product: "Vanilla Ray",
    avatar: "AO",
    avatarBg: "from-amber-600 to-amber-800",
  },
  {
    name: "Chidi Eze",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "Midnight Oud is INSANE. I walked into a meeting and my boss said 'whoever is wearing that, good choice.' This fragrance commands respect. Period.",
    product: "Midnight Oud",
    avatar: "CE",
    avatarBg: "from-stone-600 to-stone-800",
  },
  {
    name: "Fatima Al-Hassan",
    location: "Kano, Nigeria",
    rating: 5,
    text: "Royal Amber is my forever scent. It lasts from morning prayers to late evening events. My husband can't stop complimenting me. Absolutely divine.",
    product: "Royal Amber",
    avatar: "FA",
    avatarBg: "from-rose-600 to-rose-900",
  },
  {
    name: "Kuhle Sizi",
    location: "East London, South Africa",
    rating: 5,
    text: "This smells exactly like a fragrance I tried at a designer store in London that cost 10× more. Unbelievable value. I've ordered for my whole family.",
    product: "Noir Intense",
    avatar: "KA",
    avatarBg: "from-emerald-700 to-emerald-900",
  },
  {
    name: "Yonela Nduku",
    location: "East London, South Africa",
    rating: 5,
    text: "Bought it as a gift for my husband. He called from work to say 'babe, the guys at the office won't stop asking about my perfume.' Best gift decision ever.",
    product: "Midnight Oud",
    avatar: "NW",
    avatarBg: "from-purple-700 to-purple-900",
  },
  {
    name: "Simanye Jojo",
    location: "Gqebera, South Africa",
    rating: 4,
    text: "Premium packaging, fast delivery, and the scent opened the box smelling amazing. I ordered 2 more bottles before I even finished the first.",
    product: "Vanilla Ray",
    avatar: "EO",
    avatarBg: "from-teal-600 to-teal-900",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="relative flex-shrink-0 w-[320px] sm:w-[360px] glass-card-dark rounded-2xl p-6 mx-2">
      {/* Quote watermark */}
      <Quote className="absolute top-5 right-5 w-9 h-9 text-gold/10 fill-gold/8" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < t.rating ? "fill-gold text-gold" : "fill-white/15 text-white/15"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/80 font-inter text-sm leading-[1.7] mb-4 italic">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Verified tag */}
      <span className="inline-block text-[10px] font-inter font-bold tracking-[0.2em] uppercase text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full mb-4">
        Verified · {t.product}
      </span>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white text-xs font-inter font-bold flex-shrink-0`}>
          {t.avatar}
        </div>
        <div>
          <p className="text-white font-inter font-semibold text-sm leading-tight">{t.name}</p>
          <p className="text-white/40 font-inter text-xs">{t.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

  return (
    <section id="reviews" className="bg-[#070707] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...viewFadeUp(0)} className="mb-5">
          <SectionHeader
            dark
            eyebrow="Real Customers. Real Reactions."
            title={
              <>
                They Said It Better
                <br />
                <em className="not-italic text-gold">Than We Ever Could.</em>
              </>
            }
            align="center"
          />
        </motion.div>

        {/* Aggregate rating */}
        <motion.div
          {...viewFadeUp(0.15)}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
          <span className="font-playfair text-white text-2xl font-bold">4.9</span>
          <span className="text-white/40 font-inter text-sm">from 2,000+ verified reviews</span>
        </motion.div>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div className="relative mb-4 overflow-hidden">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070707] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070707] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {row1.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070707] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070707] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
          {row2.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...viewFadeUp(0.2)}
          className="text-center mt-14"
        >
          <p className="text-white/35 font-inter text-sm mb-6">
            Join 2,000+ customers who smell extraordinary every day
          </p>
          <motion.a
            href="#collection"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold-shimmer inline-block text-black font-inter font-bold text-base px-10 py-4 rounded-full"
          >
            Get Yours Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
