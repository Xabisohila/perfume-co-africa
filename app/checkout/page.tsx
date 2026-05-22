"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Lock, ChevronLeft, Loader2 } from "lucide-react";
import type { CartItem } from "@/lib/cartContext";

const SHIPPING_COST = 90;
const FREE_SHIPPING_AT = 3;
const STORAGE_KEY = "tpca_cart";

function fmt(n: number) {
  return `R${n.toLocaleString("en-ZA")}`;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Read cart from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const shipping = totalQty >= FREE_SHIPPING_AT ? 0 : SHIPPING_COST;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + shipping;

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0 && typeof window !== "undefined") {
      const t = setTimeout(() => (window.location.href = "/"), 1500);
      return () => clearTimeout(t);
    }
  }, [items]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim().includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/payfast/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: name, customerEmail: email, items, shipping }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create payment");
      }

      const { fields, action } = await res.json() as {
        fields: Record<string, string>;
        action: string;
        orderId: string;
      };

      // Auto-submit hidden form to PayFast
      const form = formRef.current!;
      form.action = action;
      form.method = "POST";

      // Clear old inputs and inject new ones
      form.innerHTML = "";
      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      // Clear cart before redirect
      localStorage.removeItem(STORAGE_KEY);

      form.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury flex items-center justify-center">
        <p className="font-inter text-text-secondary">Cart is empty — redirecting…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury">
      {/* Hidden form — PayFast redirect target */}
      <form ref={formRef} className="hidden" />

      {/* Navbar-like header */}
      <header className="bg-black/95 border-b border-gold/10 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex flex-col leading-none">
            <span className="font-playfair font-bold text-white tracking-[0.2em] text-sm">
              THE PERFUME CO.
            </span>
            <span className="text-gold tracking-[0.35em] font-inter font-medium text-[0.6rem]">
              AFRICA
            </span>
          </a>
          <div className="flex items-center gap-2 text-white/40 font-inter text-xs">
            <Lock className="w-3.5 h-3.5" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 lg:py-16">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary font-inter text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to shop
        </a>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10">

          {/* ── Left: Customer form ── */}
          <div>
            <h1 className="font-playfair text-text-primary text-3xl font-bold mb-8">
              Your Details
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-inter text-sm font-semibold text-text-primary mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full border border-black/12 rounded-xl px-4 py-3.5 font-inter text-sm text-text-primary bg-white placeholder:text-text-secondary/50 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                />
              </div>

              <div>
                <label className="block font-inter text-sm font-semibold text-text-primary mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                  className="w-full border border-black/12 rounded-xl px-4 py-3.5 font-inter text-sm text-text-primary bg-white placeholder:text-text-secondary/50 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                />
                <p className="text-text-secondary font-inter text-xs mt-1.5">
                  Your PayFast receipt will be sent here.
                </p>
              </div>

              {error && (
                <p className="text-red-600 font-inter text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                className="btn-gold-shimmer w-full text-black font-inter font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-3 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to secure payment…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay {fmt(total)} via PayFast
                  </>
                )}
              </motion.button>

              <p className="text-center text-text-secondary font-inter text-xs">
                You will be redirected to PayFast&apos;s secure payment page. We never store your card details.
              </p>
            </form>
          </div>

          {/* ── Right: Order summary ── */}
          <div className="bg-white rounded-3xl border border-black/6 p-6 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="w-4.5 h-4.5 text-gold" />
              <h2 className="font-playfair text-text-primary text-lg font-semibold">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-luxury flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter font-semibold text-text-primary text-sm truncate">
                      {item.name}
                    </p>
                    <p className="font-inter text-text-secondary text-xs">
                      {fmt(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-inter font-semibold text-text-primary text-sm flex-shrink-0">
                    {fmt(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-black/6 pt-4 space-y-2">
              <div className="flex justify-between font-inter text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between font-inter text-sm">
                <span className="text-text-secondary">Delivery</span>
                {shipping === 0 ? (
                  <span className="text-gold font-semibold">FREE</span>
                ) : (
                  <span className="text-text-primary">{fmt(shipping)}</span>
                )}
              </div>
              <div className="flex justify-between font-inter font-bold text-base pt-2 border-t border-black/6 mt-2">
                <span className="text-text-primary">Total</span>
                <span className="font-playfair text-text-primary text-xl">{fmt(total)}</span>
              </div>
            </div>

            {/* PayFast badge */}
            <div className="mt-6 pt-5 border-t border-black/6 flex items-center justify-center gap-2 text-text-secondary font-inter text-xs">
              <Lock className="w-3.5 h-3.5" />
              Secured by PayFast
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
