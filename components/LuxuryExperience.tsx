"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gift, Package, Sparkles } from "lucide-react";
import { viewFadeUp, viewSlideLeft, viewSlideRight } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

const highlights = [
  {
    icon: Gift,
    title: "Gift-Worthy Packaging",
    text: "Every bottle arrives in an elegantly designed magnetic box — ready to gift, ready to impress.",
  },
  {
    icon: Package,
    title: "Premium Bottle Design",
    text: "Heavy glass, precision caps, and a flawless finish. These bottles belong on a shelf, not hidden away.",
  },
  {
    icon: Sparkles,
    title: "The Unboxing Ritual",
    text: "The experience begins before the first spray. Every detail — tissue, ribbon, card — is intentional.",
  },
];

export default function LuxuryExperience() {
  return (
    <section className="bg-luxury py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Row 1: Image left, text right ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-36">
          {/* Image */}
          <motion.div {...viewSlideLeft(0)} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl bg-white">
              <Image
                src="/product.png"
                alt="The Perfume Co. Africa — luxury fragrance bottles"
                fill
                className="object-contain p-8 transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              {...viewFadeUp(0.4)}
              className="absolute -bottom-7 -right-4 lg:-right-10 bg-white rounded-2xl p-5 shadow-2xl border border-black/5"
            >
              <p className="font-playfair text-4xl font-bold text-text-primary leading-none">2K+</p>
              <p className="text-text-secondary font-inter text-xs mt-1.5 max-w-[140px] leading-snug">
                Happy customers across Africa
              </p>
              <div className="flex -space-x-2 mt-3">
                {["A", "K", "F", "N", "C"].map((l, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/60 to-gold border-2 border-white flex items-center justify-center text-[9px] font-inter font-bold text-black"
                  >
                    {l}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div {...viewSlideRight(0.1)}>
            <SectionHeader
              eyebrow="The Experience"
              title={
                <>
                  Opening the Box Is
                  <br />
                  <em className="not-italic text-gold">Half the Pleasure.</em>
                </>
              }
              align="left"
              className="mb-7"
            />
            <p className="text-text-secondary font-inter leading-[1.85] mb-9 text-[0.95rem]">
              We believe luxury isn&apos;t just in the scent — it&apos;s in every detail of
              the experience. From the weight of the bottle in your hand to the
              magnetic click of the box, every element is designed to feel
              expensive, intentional, and worthy of the person wearing it.
            </p>

            <div className="space-y-7">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={h.title}
                    {...viewFadeUp(0.1 + i * 0.12)}
                    className="flex gap-4 items-start group"
                  >
                    <div className="w-10 h-10 bg-black group-hover:bg-gold rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-gold group-hover:text-black transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-text-primary font-semibold text-lg mb-1 leading-tight">
                        {h.title}
                      </h3>
                      <p className="text-text-secondary font-inter text-sm leading-relaxed">
                        {h.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Brand statement banner (light-themed, product-centered) ── */}
        <motion.div
          {...viewFadeUp(0)}
          className="relative rounded-3xl overflow-hidden bg-black"
        >
          <div className="grid lg:grid-cols-2 min-h-[420px]">
            {/* Left — copy */}
            <div className="flex flex-col justify-center px-10 py-14 lg:px-16">
              <motion.p
                {...viewFadeUp(0.15)}
                className="text-gold font-inter text-xs tracking-[0.35em] uppercase font-semibold mb-5"
              >
                Crafted for Africa
              </motion.p>
              <motion.h3
                {...viewFadeUp(0.25)}
                className="font-playfair text-white leading-[1.1] mb-7"
                style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
              >
                Your Confidence.
                <br />
                <em className="not-italic text-gold">Bottled.</em>
              </motion.h3>
              <motion.p
                {...viewFadeUp(0.32)}
                className="text-white/50 font-inter text-sm leading-[1.75] mb-8 max-w-sm"
              >
                Premium fragrances built for African skin, climate, and ambition.
                Long-lasting. Gift-ready. Undeniably yours.
              </motion.p>
              <motion.a
                {...viewFadeUp(0.4)}
                href="#collection"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold-shimmer self-start inline-block text-black font-inter font-bold text-sm px-8 py-3.5 rounded-full"
              >
                Shop the Collection
              </motion.a>
            </div>

            {/* Right — product image */}
            <motion.div
              {...viewSlideRight(0.2)}
              className="relative flex items-center justify-center bg-white/5 overflow-hidden"
            >
              {/* Subtle glow behind product */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(200,169,107,0.08)_0%,transparent_70%)]" />
              <div className="relative w-full h-full min-h-[280px]">
                <Image
                  src="/product.png"
                  alt="The Perfume Co. Africa luxury bottles"
                  fill
                  className="object-contain p-8 lg:p-10 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
