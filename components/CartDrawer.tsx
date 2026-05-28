"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag, MapPin, Mail, Package, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { fmt } from "@/lib/utils";

const SHIPPING_COST = 90;
const FREE_SHIPPING_AT = 3;

export default function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const { items, isOpen } = state;

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const close = () => {
    dispatch({ type: "CLOSE" });
    setShowAddressForm(false);
    setAddress("");
    setEmail("");
  };

  const hasFreeShippingItem = items.some((i) => i.price >= 599);
  const shipping = totalItems >= FREE_SHIPPING_AT || hasFreeShippingItem ? 0 : SHIPPING_COST;
  const orderTotal = totalPrice + shipping;
  const bottlesUntilFree = FREE_SHIPPING_AT - totalItems;

  const sendWhatsApp = () => {
    if (items.length === 0) return;
    const lines = items.map(
      (i) => `• ${i.name} × ${i.quantity} = ${fmt(i.price * i.quantity)}`
    );
    const shippingLine = shipping === 0 ? "Delivery: FREE" : `Delivery: ${fmt(shipping)}`;
    const msg = [
      "Hi! I'd like to order:",
      ...lines,
      "",
      shippingLine,
      `Total: ${fmt(orderTotal)}`,
      "",
      `Shipping address:`,
      address.trim(),
      "",
      `Email for tracking: ${email.trim()}`,
    ].join("\n");
    window.open(`https://wa.me/27640713844?text=${encodeURIComponent(msg)}`, "_blank");
    setShowAddressForm(false);
    setAddress("");
    setEmail("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm"
          />

          {/* ── Drawer panel ── */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-[420px] flex flex-col bg-[#0c0c0c] border-l border-gold/10 shadow-[−8px_0_48px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <span className="font-playfair text-white text-lg font-semibold">
                  Your Cart
                </span>
                {totalItems > 0 && (
                  <span className="bg-gold text-black text-[10px] font-inter font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={close}
                className="text-white/30 hover:text-white transition-colors duration-200 p-1.5 hover:bg-white/8 rounded-lg"
                aria-label="Close cart"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-white/4 flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-white/15" />
                  </div>
                  <div>
                    <p className="font-playfair text-white/50 text-xl mb-1">Cart is empty</p>
                    <p className="text-white/25 font-inter text-sm">
                      Add a fragrance to get started
                    </p>
                  </div>
                  <button
                    onClick={close}
                    className="btn-gold-shimmer text-black font-inter font-bold text-sm px-8 py-3 rounded-full mt-2"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.18 } }}
                      className="flex gap-4 bg-white/[0.04] rounded-2xl p-4 border border-white/5"
                    >
                      {/* Thumbnail */}
                      <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={72}
                          height={72}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-white font-semibold text-sm leading-snug mb-0.5 truncate">
                          {item.name}
                        </p>
                        <p className="text-gold/70 font-inter text-xs mb-3">
                          {fmt(item.price)} each
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Qty stepper */}
                          <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "UPDATE_QTY",
                                  payload: { id: item.id, delta: -1 },
                                })
                              }
                              className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-white font-inter font-semibold text-sm select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "UPDATE_QTY",
                                  payload: { id: item.id, delta: 1 },
                                })
                              }
                              className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-playfair text-white font-bold text-sm">
                              {fmt(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() =>
                                dispatch({ type: "REMOVE_ITEM", payload: item.id })
                              }
                              className="text-white/20 hover:text-red-400 transition-colors p-1"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer — only shown when cart has items */}
            {items.length > 0 && (
              <div className="border-t border-white/8 px-6 py-6 flex-shrink-0">
                <AnimatePresence mode="wait" initial={false}>

                  {/* ── Address form ── */}
                  {showAddressForm ? (
                    <motion.div
                      key="address-form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gold" />
                        <p className="font-inter text-white font-semibold text-sm">
                          Where should we deliver?
                        </p>
                      </div>

                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={"Street address, suburb\nCity, postal code\nProvince"}
                        rows={3}
                        autoFocus
                        className="w-full bg-white/[0.06] border border-white/10 focus:border-gold/50 rounded-xl px-4 py-3 text-white font-inter text-sm placeholder:text-white/20 resize-none outline-none transition-colors duration-200"
                      />

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-gold" />
                          <p className="font-inter text-white font-semibold text-sm">
                            Email for order tracking
                          </p>
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@example.com"
                          className="w-full bg-white/[0.06] border border-white/10 focus:border-gold/50 rounded-xl px-4 py-3 text-white font-inter text-sm placeholder:text-white/20 outline-none transition-colors duration-200"
                        />
                        <p className="text-white/25 font-inter text-xs mt-1.5">
                          We&apos;ll send your tracking link here once your order is placed.
                        </p>
                      </div>

                      <motion.button
                        onClick={sendWhatsApp}
                        disabled={!address.trim() || !email.trim().includes("@")}
                        whileHover={address.trim() && email.trim().includes("@") ? { scale: 1.02, y: -1 } : {}}
                        whileTap={address.trim() && email.trim().includes("@") ? { scale: 0.97 } : {}}
                        className="w-full bg-[#25D366] hover:bg-[#20bc5a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-inter font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Send Order via WhatsApp
                      </motion.button>

                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="w-full flex items-center justify-center gap-1.5 text-white/25 hover:text-white/50 font-inter text-xs transition-colors py-1"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        Back to cart
                      </button>
                    </motion.div>

                  ) : (

                  /* ── Normal footer ── */
                    <motion.div
                      key="cart-footer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-4"
                    >
                      {/* Free shipping nudge */}
                      {shipping > 0 ? (
                        <div className="bg-white/[0.04] rounded-xl px-4 py-3 space-y-2">
                          <p className="text-white/55 font-inter text-xs">
                            Add{" "}
                            <span className="text-gold font-semibold">
                              {bottlesUntilFree} more bottle{bottlesUntilFree > 1 ? "s" : ""}
                            </span>{" "}
                            to unlock free delivery — or choose a R599 fragrance
                          </p>
                          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-gold/70 to-gold rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(totalItems / FREE_SHIPPING_AT) * 100}%` }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gold/8 border border-gold/20 rounded-xl px-4 py-3 flex items-center gap-2">
                          <span className="text-base">🎉</span>
                          <p className="text-gold font-inter text-xs font-semibold">
                            {hasFreeShippingItem
                              ? "Free delivery included with your R599 fragrance!"
                              : "You've unlocked free delivery!"}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-inter">
                          <span className="text-white/40">Subtotal</span>
                          <span className="text-white/70">{fmt(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-inter">
                          <span className="text-white/40">Delivery</span>
                          {shipping === 0 ? (
                            <span className="text-gold font-semibold">FREE</span>
                          ) : (
                            <span className="text-white/70">{fmt(shipping)}</span>
                          )}
                        </div>
                      </div>

                      <div className="h-px bg-white/8" />

                      <div className="flex items-center justify-between">
                        <span className="font-inter text-white/55 text-sm">Total</span>
                        <span className="font-playfair text-white text-2xl font-bold">
                          {fmt(orderTotal)}
                        </span>
                      </div>

                      {/* Primary CTA — WhatsApp */}
                      <motion.button
                        onClick={() => setShowAddressForm(true)}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-[#25D366] hover:bg-[#20bc5a] text-white font-inter font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Order via WhatsApp — {fmt(orderTotal)}
                      </motion.button>

                      {/* Secondary — PayFast */}
                      <motion.a
                        href="/checkout"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-gold/30 text-white/40 hover:text-white/70 font-inter text-sm font-semibold py-3 rounded-2xl transition-all duration-200"
                      >
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Pay online via PayFast
                      </motion.a>

                      <button
                        onClick={() => dispatch({ type: "CLEAR_CART" })}
                        className="w-full text-white/15 hover:text-white/35 font-inter text-xs text-center transition-colors py-0.5"
                      >
                        Clear cart
                      </button>

                      <div className="h-px bg-white/8" />

                      <a
                        href="/orders/track"
                        onClick={close}
                        className="w-full flex items-center justify-center gap-2 text-white/30 hover:text-white/60 font-inter text-xs text-center transition-colors py-0.5"
                      >
                        <Package className="w-3.5 h-3.5" />
                        Track an existing order
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
