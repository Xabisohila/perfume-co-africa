"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { viewFadeUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does the fragrance last?",
    a: "Our fragrances are formulated with premium imported oils for exceptional longevity. Most customers report 8–12 hours of noticeable scent on skin, with fabric holding the fragrance even longer. Skin type and humidity can affect individual longevity.",
  },
  {
    q: "Are these designer-inspired fragrances?",
    a: "Yes — our perfumes are crafted to evoke the essence of world-class designer fragrances using premium imported fragrance oils. We don't copy or counterfeit — we interpret and create our own unique compositions inspired by global luxury trends.",
  },
  {
    q: "How long does delivery take?",
    a: "Within Lagos: 1–2 business days. Other Nigerian states: 2–4 business days. International orders (Ghana, Kenya, South Africa): 5–10 business days. You'll receive a tracking number as soon as your order ships.",
  },
  {
    q: "What is your refund policy?",
    a: "We stand behind every bottle. If you receive a damaged or incorrect item, we replace it immediately at no cost. For first-time buyers, we offer a 7-day satisfaction guarantee — if it's not what you expected, reach out on WhatsApp.",
  },
  {
    q: "Are the fragrances unisex?",
    a: "Several of our fragrances are perfectly unisex — Vanilla Ray and Royal Amber especially. Midnight Oud leans masculine while Noir Intense is loved by all genders. We label each product with a recommendation, but ultimately wear what makes you feel powerful.",
  },
  {
    q: "What sizes do the bottles come in?",
    a: "All our fragrances are available in 50ml and 100ml spray bottles. The 100ml is our best-value option and most popular choice — it typically lasts 4–6 months with daily use.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 lg:py-36">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...viewFadeUp(0)} className="mb-14">
          <SectionHeader
            eyebrow="Questions"
            title={
              <>
                Everything You
                <br />
                <em className="not-italic text-gold">Need to Know</em>
              </>
            }
            align="center"
          />
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                {...viewFadeUp(i * 0.06)}
                className={cn(
                  "rounded-2xl border overflow-hidden transition-all duration-300",
                  isOpen
                    ? "border-gold/35 shadow-lg shadow-gold/5"
                    : "border-black/6 hover:border-black/12"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-inter font-semibold text-sm sm:text-[0.95rem] leading-snug pr-6 transition-colors duration-200",
                      isOpen ? "text-text-primary" : "text-text-primary/80"
                    )}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      "w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300",
                      isOpen ? "bg-gold text-black" : "bg-luxury text-text-secondary"
                    )}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-text-secondary font-inter text-sm leading-[1.75]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions */}
        <motion.div
          {...viewFadeUp(0.4)}
          className="mt-12 bg-luxury rounded-3xl p-8 text-center"
        >
          <p className="font-playfair text-text-primary text-xl font-semibold mb-2">
            Still have questions?
          </p>
          <p className="text-text-secondary font-inter text-sm mb-5">
            Our team is available 9am–9pm WAT, 7 days a week.
          </p>
          <a
            href="https://wa.me/2348000000000?text=Hi%2C%20I%20have%20a%20question%20about%20The%20Perfume%20Co.%20Africa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-inter font-semibold text-sm px-7 py-3 rounded-full hover:bg-[#1ebb59] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
