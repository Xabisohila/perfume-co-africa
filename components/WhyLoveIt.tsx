"use client";

import { motion } from "framer-motion";
import { Clock, Crown, Banknote, MessageCircleHeart, Droplets } from "lucide-react";
import { stagger, staggerItem, viewFadeUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Clock,
    number: "01",
    title: "All-Day Lasting",
    description:
      "8–12 hours of rich, evolving scent on skin. One spray in the morning — compliments all evening.",
  },
  {
    icon: Crown,
    number: "02",
    title: "Luxury-Inspired",
    description:
      "Crafted to rival the world's top designer houses. Same sophistication, without the designer markup.",
  },
  {
    icon: Banknote,
    number: "03",
    title: "Affordable Premium",
    description:
      "Smell like a million rand without spending it. Luxury is no longer reserved for a few.",
  },
  {
    icon: MessageCircleHeart,
    number: "04",
    title: "Compliment Magnet",
    description:
      "Formulated to draw reactions. Our customers get stopped and asked \"what are you wearing?\" within hours.",
  },
  {
    icon: Droplets,
    number: "05",
    title: "Imported Oils",
    description:
      "Rare fragrance oils sourced from France, UAE, and beyond. Every bottle is a story of global craft.",
  },
];

export default function WhyLoveIt() {
  return (
    <section id="why-us" className="bg-luxury py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...viewFadeUp(0)} className="mb-16 lg:mb-20">
          <SectionHeader
            eyebrow="Why Customers Love Us"
            title={
              <>
                Not Just a Perfume.
                <br />
                <em className="not-italic text-gold">An Experience.</em>
              </>
            }
            subtitle="We blend the art of world-class perfumery with the bold spirit of Africa — warm, confident, unforgettable."
            align="center"
          />
        </motion.div>

        {/* Feature grid — 3 top, 2 bottom centered */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            const isBottomRow = i >= 3;
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group relative bg-white rounded-3xl p-7 overflow-hidden border border-transparent hover:border-gold/15 shadow-sm hover:shadow-2xl transition-all duration-500 ${
                  isBottomRow ? "lg:col-start-auto" : ""
                } ${i === 3 ? "lg:col-start-1 xl:col-start-auto" : ""}`}
              >
                {/* Hover bg glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gold/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Number watermark */}
                <span className="absolute top-5 right-6 font-playfair text-5xl font-bold text-black/4 select-none leading-none">
                  {f.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-11 h-11 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-400">
                  <Icon className="w-5 h-5 text-gold group-hover:text-black transition-colors duration-400" />
                </div>

                <h3 className="relative z-10 font-playfair text-text-primary text-xl font-semibold mb-3 leading-tight">
                  {f.title}
                </h3>
                <p className="relative z-10 text-text-secondary font-inter text-sm leading-relaxed">
                  {f.description}
                </p>

                {/* Gold line accent — bottom */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-600" />
              </motion.div>
            );
          })}

          {/* Bottom 2 cards centered on large screens */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:w-2/3 lg:mx-auto gap-5 sm:col-span-2 hidden">
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          {...viewFadeUp(0.3)}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 rounded-2xl overflow-hidden"
        >
          {[
            { value: "2,000+", label: "Happy Customers" },
            { value: "4.9★", label: "Average Rating" },
            { value: "8–12h", label: "Scent Longevity" },
            { value: "100%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-6 text-center">
              <p className="font-playfair text-2xl lg:text-3xl font-bold text-text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-text-secondary font-inter text-xs tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
