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
    name: "Vanilla Ray",
    tagline: "Warm · Sensual · Irresistible",
    description:
      "Madagascar vanilla, warm sandalwood, and amber — the scent that makes rooms fall silent.",
    price: 299,
    originalPrice: 599,
    rating: 4.9,
    reviews: 312,
    image: "/product.png",
    badge: "Most Popular",
    badgeStyle: "bg-gold text-black",
    gender: "Unisex",
    notes: ["Vanilla", "Sandalwood", "Amber"],
  },
  {
    id: 2,
    name: "Midnight Oud",
    tagline: "Dark · Mysterious · Commanding",
    description:
      "Pure Arabian oud, smoked leather, and dark patchouli. Power in a bottle for those who leave a mark.",
    price: 299,
    originalPrice: 599,
    rating: 4.8,
    reviews: 198,
    image: "/product.png",
    badge: "Best for Him",
    badgeStyle: "bg-black text-gold border border-gold/30",
    gender: "For Him",
    notes: ["Oud", "Leather", "Patchouli"],
  },
  {
    id: 3,
    name: "Royal Amber",
    tagline: "Rich · Elegant · Opulent",
    description:
      "Liquid gold. A regal amber heart with rose absolute and white musk — timeless for every occasion.",
    price: 299,
    originalPrice: 599,
    rating: 4.9,
    reviews: 247,
    image: "/product.png",
    badge: "Bestseller",
    badgeStyle: "bg-gold/90 text-black",
    gender: "Unisex",
    notes: ["Amber", "Rose", "White Musk"],
  },
  {
    id: 4,
    name: "Noir Intense",
    tagline: "Bold · Fresh · Unapologetic",
    description:
      "Bergamot and black pepper open, settling into a magnetic woody base. Confidence distilled.",
    price: 299,
    originalPrice: 599,
    rating: 4.7,
    reviews: 163,
    image: "/product.png",
    badge: "New Arrival",
    badgeStyle: "bg-white text-black border border-black/10",
    gender: "For Her",
    notes: ["Bergamot", "Pepper", "Cedar"],
  },
];


function ProductCard({ p }: { p: (typeof products)[0] }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
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
      className="group relative bg-white rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-black/5 hover:border-gold/15"
    >
      {/* ── Image area ── */}
      <div className="relative h-72 overflow-hidden bg-luxury/60 flex-shrink-0">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105 p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Hover dark veil */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-all duration-500" />

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={cn("text-[10px] font-inter font-bold tracking-wider uppercase px-3 py-1.5 rounded-full", p.badgeStyle)}>
            {p.badge}
          </span>
        </div>

        {/* Gender chip */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="text-[10px] font-inter font-bold tracking-widest uppercase text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {p.gender}
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name + tagline */}
        <h3 className="font-playfair text-[1.2rem] font-bold text-text-primary leading-tight mb-1">
          {p.name}
        </h3>
        <p className="text-gold/75 text-xs font-inter italic mb-3 tracking-wide">{p.tagline}</p>

        {/* Scent notes */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {p.notes.map((note) => (
            <span
              key={note}
              className="text-[10px] font-inter font-semibold uppercase tracking-widest text-text-secondary bg-luxury px-2.5 py-1 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        <p className="text-text-secondary text-xs font-inter leading-relaxed mb-5 flex-1">
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
                  si < Math.floor(p.rating) ? "fill-gold text-gold" : "fill-black/10 text-black/10"
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-text-secondary font-inter">
            {p.rating} ({p.reviews} reviews)
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="font-playfair text-2xl font-bold text-text-primary">
              {fmt(p.price)}
            </span>
            <span className="text-text-secondary text-sm line-through font-inter">
              {fmt(p.originalPrice)}
            </span>
          </div>
          <span className="text-xs font-inter font-bold text-white bg-green-600 px-2.5 py-1 rounded-full">
            −{discount}%
          </span>
        </div>

        {/* Qty + Add to cart */}
        <div className="flex items-center gap-2">
          {/* Quantity stepper */}
          <div className="flex items-center border border-black/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-luxury transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-inter font-semibold text-text-primary text-sm">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-9 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-luxury transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to cart */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-inter font-bold text-sm transition-all duration-300",
              added
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gold hover:text-black"
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
                  <><Check className="w-4 h-4" /> Added!</>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
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
    <section id="collection" className="bg-[#f9f7f4] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...viewFadeUp(0)} className="mb-16">
          <SectionHeader
            eyebrow="The Collection"
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

        {/* View all link */}
        <motion.div {...viewFadeUp(0.3)} className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-text-secondary hover:text-gold transition-colors group"
          >
            View Full Collection
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
