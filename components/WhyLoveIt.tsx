"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Clock, Crown, Banknote, MessageCircleHeart, Droplets } from "lucide-react";
import { stagger, staggerItem, viewFadeUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

function CountUp({ to, suffix = "", decimals = 0, locale = false }: {
  to: number; suffix?: string; decimals?: number; locale?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent =
          (decimals > 0 ? v.toFixed(decimals) : locale ? Math.round(v).toLocaleString() : String(Math.round(v))) +
          suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals, locale]);
  return <span ref={ref}>0{suffix}</span>;
}

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

                {/* Icon — spring bounce on scroll */}
                <motion.div
                  initial={{ scale: 0.3, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.15 + i * 0.08 }}
                  className="relative z-10 w-11 h-11 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-400"
                >
                  <Icon className="w-5 h-5 text-gold group-hover:text-black transition-colors duration-400" />
                </motion.div>

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
            { label: "Happy Customers", countTo: 2000, suffix: "+", locale: true },
            { label: "Average Rating",  countTo: 4.9,  suffix: "★", decimals: 1 },
            { label: "Scent Longevity", static: "8–12h" },
            { label: "Satisfaction Rate", countTo: 100, suffix: "%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-6 text-center">
              <p className="font-playfair text-2xl lg:text-3xl font-bold text-text-primary mb-1">
                {"countTo" in stat ? (
                  <CountUp to={stat.countTo!} suffix={stat.suffix} decimals={stat.decimals} locale={stat.locale} />
                ) : (
                  stat.static
                )}
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
