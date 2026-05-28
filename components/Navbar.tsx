"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cartContext";

const navLinks = [
  { href: "#collection", label: "Collection" },
  { href: "#why-us", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { totalItems, dispatch } = useCart();
  const openCart = () => dispatch({ type: "OPEN" });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/96 backdrop-blur-xl shadow-[0_1px_0_rgba(200,169,107,0.1)]"
            : "bg-transparent"
        )}
      >
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
          <motion.div
            className="h-full origin-left"
            style={{
              width: `${scrollProgress}%`,
              background:
                "linear-gradient(90deg, #C8A96B, #E2C98A, #C8A96B)",
            }}
            transition={{ type: "tween", ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="group flex flex-col leading-none">
              <span className="font-playfair font-bold text-white tracking-[0.2em] text-[0.8rem] sm:text-[0.85rem] group-hover:text-gold transition-colors duration-300">
                THE PERFUME
              </span>
              <span className="text-gold tracking-[0.35em] font-inter font-medium text-[0.6rem] sm:text-[0.65rem]">
                CO.
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-white/60 hover:text-white font-inter text-sm tracking-wide transition-colors duration-300 group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-400" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/orders/track"
                className="flex items-center gap-1.5 text-white/50 hover:text-gold font-inter text-sm tracking-wide transition-colors duration-300 group py-1 border border-white/10 hover:border-gold/30 px-3.5 rounded-full"
              >
                <Package className="w-3.5 h-3.5" />
                Track Order
              </a>
              <button
                onClick={openCart}
                className="relative text-white/60 hover:text-gold transition-colors duration-300 p-1"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[9px] font-inter font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
              <motion.a
                href="#collection"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold-shimmer text-black font-inter font-bold text-sm px-6 py-2.5 rounded-full tracking-wide"
              >
                Shop Now
              </motion.a>
            </div>

            {/* Mobile icons */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={openCart}
                className="relative text-white/70 hover:text-gold transition-colors p-1"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[9px] font-inter font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.92 }}
                className="text-white p-1"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={menuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — slides in from top */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="fixed inset-x-0 top-16 z-40 bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-gold/15 md:hidden"
            >
              <div className="px-6 pt-6 pb-8 flex flex-col gap-0">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white/70 hover:text-gold text-lg font-inter tracking-wide border-b border-white/8 py-4 transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/orders/track"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2 text-gold/80 hover:text-gold text-lg font-inter tracking-wide border-b border-white/8 py-4 transition-colors duration-200"
                >
                  <Package className="w-5 h-5" />
                  Track Order
                </motion.a>
                <motion.a
                  href="#collection"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="btn-gold-shimmer text-black font-bold text-base px-8 py-4 rounded-full text-center mt-6"
                >
                  Shop Now
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
