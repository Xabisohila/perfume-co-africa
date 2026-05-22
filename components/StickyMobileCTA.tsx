"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="sticky-mobile-cta md:hidden"
        >
          <a
            href="#collection"
            className="btn-gold-shimmer flex items-center justify-center gap-3 w-full text-black font-inter font-bold text-base py-4 rounded-xl"
          >
            <ShoppingBag className="w-5 h-5" />
            Get Yours — From ₦8,000
          </a>
          <p className="text-white/30 text-[10px] font-inter text-center mt-2">
            Free shipping · Secure checkout
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
