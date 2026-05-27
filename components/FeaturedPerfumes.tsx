"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { stagger, staggerItem, viewFadeUp } from "@/lib/animations";
import { cn, fmt } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCart } from "@/lib/cartContext";

const products = [
  {
    id: 1,
    name: "Inspired by One Million",
    tagline: "Fresh · Spicy · Magnetic",
    description:
      "Gold dust and desire. Warm grapefruit, cinnamon, and leathery amber — the scent that turns heads and opens doors.",
    price: 299,
    originalPrice: 599,
    rating: 4.9,
    reviews: 312,
    image: "/product.jpg",
    badge: "Most Popular",
    badgeStyle: "bg-gold text-black",
    gender: "For Him",
    notes: ["Grapefruit", "Cinnamon", "Leather"],
  },
  {
    id: 2,
    name: "Inspired by Armani Black Oud",
    tagline: "Dark · Mysterious · Commanding",
    description:
      "Pure Arabian oud, smoked leather, and dark patchouli. Power in a bottle for those who leave a mark.",
    price: 299,
    originalPrice: 599,
    rating: 4.8,
    reviews: 198,
    image: "/product.jpg",
    badge: "Best for Him",
    badgeStyle: "bg-gold/90 text-black",
    gender: "For Her",
    notes: ["Oud", "Leather", "Patchouli"],
  },
  {
    id: 3,
    name: "Inspired by Boss Orange",
    tagline: "Warm · Vibrant · Effortless",
    description:
      "Orange blossom, peach, and sun-warmed woods. A radiant aura for those who live in full colour.",
    price: 299,
    originalPrice: 599,
    rating: 4.9,
    reviews: 247,
    image: "/product.jpg",
    badge: "Bestseller",
    badgeStyle: "bg-gold/90 text-black",
    gender: "Unisex",
    notes: ["Orange", "Peach", "Sandalwood"],
  },
  {
    id: 4,
    name: "Inspired by Gucci Oud",
    tagline: "Bold · Floral · Timeless",
    description:
      "Rose, iris, and rich oud in perfect balance. A fragrance that carries the weight of pure elegance.",
    price: 299,
    originalPrice: 599,
    rating: 4.7,
    reviews: 163,
    image: "/product.jpg",
    badge: "New Arrival",
    badgeStyle: "bg-gold/90 text-black",
    gender: "Unisex",
    notes: ["Rose", "Iris", "Oud"],
  },
];

function ProductCard({ p }: { p: (typeof products)[0] }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { dispatch } = useCart();

  const discount = Math.round((1 - p.price / p.originalPrice) * 100);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: { id: String(p.id), name: p.name, price: p.price, image: p.image },
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <motion.div
      variants={staggerItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-dark-card rounded-2xl overflow-hidden flex flex-col border border-gold/15 hover:border-gold/45 transition-all duration-500 hover:shadow-[0_12px_60px_rgba(200,169,107,0.13)]"
    >
      {/* ── Image ── */}
      <div className="relative h-72 overflow-hidden flex-shrink-0 bg-[#0d0d0d]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105 p-5"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Bottom gradient fade into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />

        {/* Badge */}
        <span
          className={cn(
            "absolute top-4 left-4 z-10 text-[10px] font-inter font-bold tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm",
            p.badgeStyle
          )}
        >
          {p.badge}
        </span>

        {/* Discount chip */}
        <span className="absolute top-4 right-4 z-10 text-[11px] font-inter font-extrabold text-black bg-gold px-2.5 py-1 rounded-full">
          −{discount}%
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Gender eyebrow */}
        <p className="text-[9px] font-inter font-bold tracking-[0.25em] uppercase text-gold/55 mb-1.5">
          {p.gender}
        </p>

        {/* Name */}
        <h3 className="font-playfair text-[1.1rem] font-bold text-white leading-tight mb-1">
          {p.name}
        </h3>

        {/* Tagline */}
        <p className="text-gold/65 text-[11px] font-inter italic tracking-wide mb-3">
          {p.tagline}
        </p>

        {/* Animated gold shimmer divider */}
        <div className="h-px bg-white/8 mb-3 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: hovered ? "0%" : "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Scent notes */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {p.notes.map((note) => (
            <span
              key={note}
              className="text-[9px] font-inter font-semibold uppercase tracking-[0.15em] text-gold/75 bg-gold/8 border border-gold/15 px-2.5 py-1 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-white/40 text-xs font-inter leading-relaxed mb-4 flex-1">
          {p.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, si) => (
              <Star
                key={si}
                className={cn(
                  "w-3 h-3",
                  si < Math.floor(p.rating)
                    ? "fill-gold text-gold"
                    : "fill-white/10 text-white/10"
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-white/35 font-inter">
            {p.rating} ({p.reviews})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-playfair text-[1.6rem] font-bold text-white">
            {fmt(p.price)}
          </span>
          <span className="text-white/25 text-sm line-through font-inter">
            {fmt(p.originalPrice)}
          </span>
        </div>

        {/* Qty + Add to Cart */}
        <div className="flex items-center gap-2">
          {/* Stepper */}
          <div className="flex items-center border border-gold/20 rounded-xl overflow-hidden bg-white/5">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-10 flex items-center justify-center text-white/40 hover:text-gold hover:bg-gold/10 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-inter font-semibold text-white text-sm">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-9 h-10 flex items-center justify-center text-white/40 hover:text-gold hover:bg-gold/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* CTA button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-inter font-bold text-sm transition-all duration-300",
              added
                ? "bg-green-500 text-white"
                : "bg-gold text-black hover:bg-gold-light"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "added" : "add"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedPerfumes() {
  return (
    <section
      id="collection"
      className="relative bg-dark py-24 lg:py-36 overflow-hidden"
    >
      {/* Ambient radial gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[700px] h-[400px] bg-gold/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...viewFadeUp(0)} className="mb-16">
          <SectionHeader
            eyebrow="The Collection"
            dark
            title={
              <>
                Find Your{" "}
                <em className="not-italic text-gold">Signature Scent</em>
              </>
            }
            subtitle="Each fragrance is a world of its own — crafted to move you, define you, and follow you."
            align="center"
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </motion.div>

        {/* View all */}
        <motion.div {...viewFadeUp(0.3)} className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-white/35 hover:text-gold transition-colors group"
          >
            View Full Collection
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
