"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, CheckCircle2, XCircle, Clock, ShoppingBag } from "lucide-react";
import { fmt } from "@/lib/utils";

type OrderStatus = "pending_payment" | "paid" | "failed" | "cancelled";

type TrackedOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: Array<{ id: string; name: string; price: number; quantity: number; image: string }>;
};

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending_payment: {
    label: "Awaiting Payment",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    icon: <Clock className="w-4 h-4" />,
  },
  paid: {
    label: "Order Confirmed",
    color: "text-green-600 bg-green-50 border-green-200",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  failed: {
    label: "Payment Failed",
    color: "text-red-600 bg-red-50 border-red-200",
    icon: <XCircle className="w-4 h-4" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-gray-500 bg-gray-50 border-gray-200",
    icon: <XCircle className="w-4 h-4" />,
  },
};

function TrackForm() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("id") ?? "");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/orders/${encodeURIComponent(orderId.trim())}?email=${encodeURIComponent(email.trim().toLowerCase())}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Order not found. Please check your details.");
      } else {
        setOrder(data);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const status = order ? STATUS_CONFIG[order.status] : null;

  return (
    <div className="max-w-lg w-full">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-black/6 p-6 mb-6">
        <h2 className="font-playfair text-text-primary text-xl font-semibold mb-5">
          Find your order
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-inter text-sm font-semibold text-text-primary mb-1.5">
              Order Reference
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. c1a2b3c4d5"
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
              placeholder="The email you used at checkout"
              required
              className="w-full border border-black/12 rounded-xl px-4 py-3.5 font-inter text-sm text-text-primary bg-white placeholder:text-text-secondary/50 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-600 font-inter text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold-shimmer w-full text-black font-inter font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4" />
            {loading ? "Searching…" : "Track Order"}
          </button>
        </div>
      </form>

      {order && status && (
        <div className="bg-white rounded-3xl border border-black/6 p-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-inter text-sm font-semibold mb-5 ${status.color}`}>
            {status.icon}
            {status.label}
          </div>

          <div className="mb-5">
            <p className="font-playfair text-text-primary text-lg font-semibold mb-1">
              {order.customerName}
            </p>
            <p className="font-inter text-text-secondary text-xs">
              Order #{order.id} &middot;{" "}
              {new Date(order.createdAt).toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-y-3 border-t border-black/6 pt-5 mb-5">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-luxury flex-shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-inter font-semibold text-text-primary text-sm truncate">{item.name}</p>
                  <p className="font-inter text-text-secondary text-xs">{fmt(item.price)} × {item.quantity}</p>
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
              <span className="text-text-primary">{fmt(order.subtotal)}</span>
            </div>
            <div className="flex justify-between font-inter text-sm">
              <span className="text-text-secondary">Delivery</span>
              {order.shipping === 0 ? (
                <span className="text-gold font-semibold">FREE</span>
              ) : (
                <span className="text-text-primary">{fmt(order.shipping)}</span>
              )}
            </div>
            <div className="flex justify-between font-inter font-bold text-base pt-2 border-t border-black/6">
              <span className="text-text-primary">Total</span>
              <span className="font-playfair text-text-primary text-xl">{fmt(order.total)}</span>
            </div>
          </div>

          {order.status === "paid" && (
            <div className="mt-5 pt-4 border-t border-black/6">
              <p className="font-inter text-text-secondary text-xs leading-relaxed">
                Your order is confirmed. Expect a WhatsApp message with your courier tracking number within 1–2 business days.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-luxury">
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
          <a
            href="/"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary font-inter text-xs transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Back to shop
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 lg:py-16 flex flex-col items-center">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
            <Package className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-playfair text-text-primary text-3xl font-bold mb-2">
            Track Your Order
          </h1>
          <p className="text-text-secondary font-inter text-sm">
            Enter your order reference and email to check your order status.
          </p>
        </div>

        <Suspense fallback={null}>
          <TrackForm />
        </Suspense>
      </main>
    </div>
  );
}
