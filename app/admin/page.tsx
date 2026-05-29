"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Copy, Check, ExternalLink, LayoutList } from "lucide-react";
import { fmt } from "@/lib/utils";

const PRODUCTS = [
  { id: "1-50ml", name: "Inspired by One Million (50ml)", price: 299, image: "/product.jpg" },
  { id: "2-50ml", name: "Inspired by Armani Black Oud (50ml)", price: 599, image: "/product.jpg" },
  { id: "3-50ml", name: "Inspired by Boss Orange (50ml)", price: 299, image: "/product.jpg" },
  { id: "4-50ml", name: "Inspired by Gucci Oud (50ml)", price: 599, image: "/product.jpg" },
];

const SHIPPING_COST = 90;
const FREE_SHIPPING_AT = 3;

type Item = { id: string; name: string; price: number; quantity: number; image: string };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [items, setItems] = useState<Item[]>([{ ...PRODUCTS[0], quantity: 1 }]);
  const [freeShipping, setFreeShipping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ orderId: string; trackingUrl: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const autoFreeShipping = totalQty >= FREE_SHIPPING_AT;
  const shipping = freeShipping || autoFreeShipping ? 0 : SHIPPING_COST;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + shipping;

  function addItem() {
    setItems([...items, { ...PRODUCTS[0], quantity: 1 }]);
  }

  function removeItem(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
  }

  function updateItem(idx: number, productId: string) {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    setItems(items.map((item, i) => (i === idx ? { ...product, quantity: item.quantity } : item)));
  }

  function updateQty(idx: number, qty: number) {
    if (qty < 1) return;
    setItems(items.map((item, i) => (i === idx ? { ...item, quantity: qty } : item)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, customerName, customerEmail, items, shipping }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult(data);
        setCustomerName("");
        setCustomerEmail("");
        setItems([{ ...PRODUCTS[0], quantity: 1 }]);
        setFreeShipping(false);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyUrl() {
    if (!result) return;
    navigator.clipboard.writeText(result.trackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-luxury py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="font-inter text-xs text-text-secondary uppercase tracking-widest mb-1">Admin</p>
            <h1 className="font-playfair text-text-primary text-3xl font-bold">New WhatsApp Order</h1>
          </div>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 border border-black/12 rounded-xl px-4 py-2.5 font-inter text-sm text-text-secondary hover:text-text-primary hover:border-black/25 bg-white transition-all whitespace-nowrap"
          >
            <LayoutList className="w-4 h-4" />
            View Orders
          </Link>
        </div>

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
            <p className="font-inter font-semibold text-green-700 text-sm mb-1">Order created!</p>
            <p className="font-inter text-green-600 text-xs mb-3">
              Reference: <span className="font-mono font-bold">{result.orderId}</span>
            </p>
            <div className="flex items-center gap-2">
              <p className="font-inter text-green-700 text-xs flex-1 truncate">{result.trackingUrl}</p>
              <button
                onClick={copyUrl}
                className="flex items-center gap-1.5 text-xs font-inter font-semibold text-green-700 hover:text-green-900 transition-colors flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <a
                href={result.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:text-green-900 transition-colors flex-shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-black/6 p-6 space-y-5">
          {/* Password */}
          <div>
            <label className="block font-inter text-sm font-semibold text-text-primary mb-1.5">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-black/12 rounded-xl px-4 py-3 font-inter text-sm text-text-primary bg-white focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
            />
          </div>

          {/* Customer */}
          <div className="border-t border-black/6 pt-5 space-y-4">
            <p className="font-inter text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Customer
            </p>
            <div>
              <label className="block font-inter text-sm font-semibold text-text-primary mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full border border-black/12 rounded-xl px-4 py-3 font-inter text-sm text-text-primary bg-white focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
              />
            </div>
            <div>
              <label className="block font-inter text-sm font-semibold text-text-primary mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="jane@example.com"
                required
                className="w-full border border-black/12 rounded-xl px-4 py-3 font-inter text-sm text-text-primary bg-white focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
              />
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-black/6 pt-5">
            <p className="font-inter text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
              Items
            </p>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <select
                    value={item.id}
                    onChange={(e) => updateItem(idx, e.target.value)}
                    className="flex-1 border border-black/12 rounded-xl px-3 py-2.5 font-inter text-sm text-text-primary bg-white focus:outline-none focus:border-gold/50 transition-all"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {fmt(p.price)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQty(idx, parseInt(e.target.value) || 1)}
                    className="w-16 border border-black/12 rounded-xl px-3 py-2.5 font-inter text-sm text-center text-text-primary bg-white focus:outline-none focus:border-gold/50 transition-all"
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-text-secondary hover:text-red-500 transition-colors p-1 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-3 flex items-center gap-1.5 font-inter text-sm text-gold hover:text-gold-light transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add item
            </button>
          </div>

          {/* Shipping */}
          <div className="border-t border-black/6 pt-5">
            <p className="font-inter text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3">
              Shipping
            </p>
            {autoFreeShipping ? (
              <p className="font-inter text-sm text-green-600 font-semibold">Free (3+ items)</p>
            ) : (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeShipping}
                  onChange={(e) => setFreeShipping(e.target.checked)}
                  className="accent-gold"
                />
                <span className="font-inter text-sm text-text-primary">Override to free shipping</span>
              </label>
            )}
          </div>

          {/* Totals */}
          <div className="border-t border-black/6 pt-5 space-y-2">
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
            <div className="flex justify-between font-inter font-bold text-base pt-2 border-t border-black/6">
              <span className="text-text-primary">Total</span>
              <span className="font-playfair text-text-primary text-xl">{fmt(total)}</span>
            </div>
          </div>

          {error && (
            <p className="text-red-600 font-inter text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold-shimmer w-full text-black font-inter font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating order…" : "Create Order & Get Tracking Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
