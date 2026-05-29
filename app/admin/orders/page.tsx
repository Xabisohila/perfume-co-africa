"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RefreshCw,
  Plus,
} from "lucide-react";
import { fmt } from "@/lib/utils";

type OrderStatus =
  | "pending_payment" | "paid" | "order_confirmed"
  | "processing" | "in_transit" | "delivered"
  | "failed" | "cancelled";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: OrderItem[];
  pfPaymentId: string | null;
};

const STATUS_CFG: Record<OrderStatus, { label: string; textCls: string; bgCls: string; Icon: React.ElementType }> = {
  pending_payment: { label: "Pending Payment", textCls: "text-amber-700",   bgCls: "bg-amber-50 border-amber-200",     Icon: Clock },
  paid:            { label: "Paid",            textCls: "text-emerald-700", bgCls: "bg-emerald-50 border-emerald-200", Icon: CheckCircle },
  order_confirmed: { label: "Order Confirmed", textCls: "text-blue-700",    bgCls: "bg-blue-50 border-blue-200",       Icon: CheckCircle },
  processing:      { label: "Processing",      textCls: "text-purple-700",  bgCls: "bg-purple-50 border-purple-200",   Icon: Package },
  in_transit:      { label: "In Transit",      textCls: "text-indigo-700",  bgCls: "bg-indigo-50 border-indigo-200",   Icon: Package },
  delivered:       { label: "Delivered",       textCls: "text-teal-700",    bgCls: "bg-teal-50 border-teal-200",       Icon: CheckCircle },
  failed:          { label: "Failed",          textCls: "text-red-600",     bgCls: "bg-red-50 border-red-200",         Icon: XCircle },
  cancelled:       { label: "Cancelled",       textCls: "text-gray-500",    bgCls: "bg-gray-50 border-gray-200",       Icon: AlertCircle },
};

/* Which status buttons appear for each current status */
const NEXT_ACTIONS: Partial<Record<OrderStatus, { status: OrderStatus; label: string; cls: string }[]>> = {
  pending_payment: [
    { status: "paid",            label: "Mark as Paid",        cls: "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100" },
    { status: "cancelled",       label: "Cancel Order",        cls: "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100" },
  ],
  paid: [
    { status: "order_confirmed", label: "Confirm Order",       cls: "text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { status: "cancelled",       label: "Cancel Order",        cls: "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100" },
  ],
  order_confirmed: [
    { status: "processing",      label: "Mark Processing",     cls: "text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { status: "cancelled",       label: "Cancel Order",        cls: "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100" },
  ],
  processing: [
    { status: "in_transit",      label: "Mark In Transit",     cls: "text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
    { status: "cancelled",       label: "Cancel Order",        cls: "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100" },
  ],
  in_transit: [
    { status: "delivered",       label: "Mark Delivered",      cls: "text-teal-700 bg-teal-50 border-teal-200 hover:bg-teal-100" },
  ],
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, textCls, bgCls, Icon } = STATUS_CFG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-inter font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${textCls} ${bgCls}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

type FilterKey = "all" | OrderStatus;

export default function AdminOrdersPage() {
  const [password, setPassword]     = useState("");
  const [authedPwd, setAuthedPwd]   = useState("");
  const [orders, setOrders]         = useState<Order[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [filter, setFilter]         = useState<FilterKey>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId]     = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const isAuthed = authedPwd !== "";

  async function fetchOrders(pwd: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to load orders.");
      } else {
        setOrders(data.orders);
        setAuthedPwd(pwd);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId: string, newStatus: OrderStatus) {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: authedPwd, orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  function copyTracking(orderId: string) {
    navigator.clipboard.writeText(`${window.location.origin}/orders/track?id=${orderId}`);
    setCopiedId(orderId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const counts = {
    paid:            orders.filter(o => o.status === "paid").length,
    order_confirmed: orders.filter(o => o.status === "order_confirmed").length,
    processing:      orders.filter(o => o.status === "processing").length,
    in_transit:      orders.filter(o => o.status === "in_transit").length,
    delivered:       orders.filter(o => o.status === "delivered").length,
    pending:         orders.filter(o => o.status === "pending_payment").length,
    failed:          orders.filter(o => o.status === "failed").length,
    cancelled:       orders.filter(o => o.status === "cancelled").length,
  };
  const revenue = orders
    .filter(o => !["pending_payment", "failed", "cancelled"].includes(o.status))
    .reduce((s, o) => s + o.total, 0);
  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  /* ── Password gate ─────────────────────────────────────────────────── */
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-luxury flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <p className="font-inter text-xs text-text-secondary uppercase tracking-widest mb-1">Admin</p>
            <h1 className="font-playfair text-text-primary text-3xl font-bold">Order Dashboard</h1>
          </div>
          <form
            onSubmit={e => { e.preventDefault(); fetchOrders(password); }}
            className="bg-white rounded-3xl border border-black/6 p-6 space-y-4 shadow-sm"
          >
            <div>
              <label className="block font-inter text-sm font-semibold text-text-primary mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
                className="w-full border border-black/12 rounded-xl px-4 py-3 font-inter text-sm text-text-primary bg-white focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
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
              className="btn-gold-shimmer w-full text-black font-inter font-bold py-3.5 rounded-2xl disabled:opacity-70"
            >
              {loading ? "Loading…" : "View Orders →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Dashboard ─────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-luxury">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="font-inter text-xs text-text-secondary uppercase tracking-widest mb-1">Admin</p>
            <h1 className="font-playfair text-text-primary text-3xl font-bold">Order Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchOrders(authedPwd)}
              disabled={loading}
              className="flex items-center gap-2 border border-black/12 rounded-xl px-4 py-2.5 font-inter text-sm text-text-secondary hover:text-text-primary hover:border-black/25 bg-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-2 btn-gold-shimmer text-black font-inter font-bold text-sm px-5 py-2.5 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              New Order
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { Icon: Package,     label: "Total Orders",    value: orders.length,    cls: "text-text-primary" },
            { Icon: CheckCircle, label: "Paid",            value: counts.paid,      cls: "text-emerald-600" },
            { Icon: Clock,       label: "Pending Payment", value: counts.pending,   cls: "text-amber-600" },
            { Icon: TrendingUp,  label: "Revenue (Paid)",  value: fmt(revenue),     cls: "text-text-primary" },
          ].map(({ Icon, label, value, cls }) => (
            <div key={label} className="bg-white rounded-2xl border border-black/6 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${cls} opacity-60`} />
                <p className="font-inter text-[10px] text-text-secondary uppercase tracking-widest leading-none">{label}</p>
              </div>
              <p className={`font-playfair text-2xl font-bold ${cls}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 flex-wrap mb-5">
          {([
            { key: "all",             label: `All (${orders.length})` },
            { key: "pending_payment", label: `Pending (${counts.pending})` },
            { key: "paid",            label: `Paid (${counts.paid})` },
            { key: "order_confirmed", label: `Confirmed (${counts.order_confirmed})` },
            { key: "processing",      label: `Processing (${counts.processing})` },
            { key: "in_transit",      label: `In Transit (${counts.in_transit})` },
            { key: "delivered",       label: `Delivered (${counts.delivered})` },
            { key: "failed",          label: `Failed (${counts.failed})` },
            { key: "cancelled",       label: `Cancelled (${counts.cancelled})` },
          ] as { key: FilterKey; label: string }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`font-inter text-sm px-4 py-2 rounded-xl border transition-all ${
                filter === tab.key
                  ? "bg-[#111] text-white border-[#111]"
                  : "bg-white text-text-secondary border-black/10 hover:border-black/25 hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-black/6 p-16 text-center shadow-sm">
            <Package className="w-10 h-10 text-black/15 mx-auto mb-3" />
            <p className="font-inter text-text-secondary text-sm">No orders in this category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => {
              const isExpanded  = expandedId === order.id;
              const isUpdating  = updatingId === order.id;
              const shortName   = (n: string) => n.replace("Inspired by ", "");

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-sm">

                  {/* Summary row */}
                  <div className="px-5 py-4 flex items-start gap-4">
                    {/* Status + date */}
                    <div className="flex-shrink-0 pt-0.5">
                      <StatusBadge status={order.status} />
                      <p className="text-[10px] font-inter text-text-secondary/70 mt-1.5 whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    {/* Customer + items */}
                    <div className="flex-1 min-w-0">
                      <p className="font-inter font-semibold text-text-primary text-sm leading-tight mb-0.5 truncate">
                        {order.customerName}
                      </p>
                      <p className="text-text-secondary font-inter text-xs truncate mb-1">
                        {order.customerEmail}
                      </p>
                      <p className="text-text-secondary font-inter text-xs truncate">
                        {order.items.map(i => `${shortName(i.name)} ×${i.quantity}`).join("  ·  ")}
                      </p>
                    </div>

                    {/* Total + action buttons */}
                    <div className="flex-shrink-0 text-right flex flex-col items-end gap-3">
                      <p className="font-playfair font-bold text-text-primary text-xl leading-none">
                        {fmt(order.total)}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => copyTracking(order.id)}
                          title="Copy tracking link"
                          className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg hover:border-gold/40 hover:text-gold transition-all text-text-secondary"
                        >
                          {copiedId === order.id
                            ? <Check className="w-3.5 h-3.5 text-emerald-600" />
                            : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <a
                          href={`/orders/track?id=${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open tracking page"
                          className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg hover:border-gold/40 hover:text-gold transition-all text-text-secondary"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : order.id)}
                          className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg hover:border-black/25 transition-all text-text-secondary"
                        >
                          {isExpanded
                            ? <ChevronUp className="w-3.5 h-3.5" />
                            : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded detail panel */}
                  {isExpanded && (
                    <div className="border-t border-black/5 bg-[#faf9f7] px-5 py-4 space-y-4">

                      {/* Ref row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="font-inter text-xs text-text-secondary">
                          Ref: <code className="font-mono bg-black/6 px-1.5 py-0.5 rounded text-text-primary">{order.id}</code>
                        </span>
                        {order.pfPaymentId && (
                          <span className="font-inter text-xs text-text-secondary">
                            PayFast ID: <code className="font-mono bg-black/6 px-1.5 py-0.5 rounded text-text-primary">{order.pfPaymentId}</code>
                          </span>
                        )}
                      </div>

                      {/* Items table */}
                      <div className="rounded-xl overflow-hidden border border-black/8">
                        <table className="w-full font-inter text-sm">
                          <thead>
                            <tr className="bg-black/4 text-left">
                              <th className="px-4 py-2.5 text-[10px] font-semibold text-text-secondary uppercase tracking-widest">Item</th>
                              <th className="px-4 py-2.5 text-[10px] font-semibold text-text-secondary uppercase tracking-widest text-center w-16">Qty</th>
                              <th className="px-4 py-2.5 text-[10px] font-semibold text-text-secondary uppercase tracking-widest text-right w-24">Unit</th>
                              <th className="px-4 py-2.5 text-[10px] font-semibold text-text-secondary uppercase tracking-widest text-right w-28">Line Total</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-black/4">
                            {order.items.map((item, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-2.5 text-text-primary">{item.name}</td>
                                <td className="px-4 py-2.5 text-center text-text-secondary">{item.quantity}</td>
                                <td className="px-4 py-2.5 text-right text-text-secondary">{fmt(item.price)}</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-text-primary">{fmt(item.price * item.quantity)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="border-t border-black/8">
                            <tr className="bg-black/2">
                              <td colSpan={3} className="px-4 py-2 text-right text-[10px] font-semibold text-text-secondary uppercase tracking-widest">Subtotal</td>
                              <td className="px-4 py-2 text-right font-semibold text-text-primary">{fmt(order.subtotal)}</td>
                            </tr>
                            <tr className="bg-black/2">
                              <td colSpan={3} className="px-4 py-2 text-right text-[10px] font-semibold text-text-secondary uppercase tracking-widest">Delivery</td>
                              <td className="px-4 py-2 text-right font-semibold">
                                {order.shipping === 0
                                  ? <span className="text-emerald-600">FREE</span>
                                  : <span className="text-text-primary">{fmt(order.shipping)}</span>}
                              </td>
                            </tr>
                            <tr className="bg-black/3">
                              <td colSpan={3} className="px-4 py-2.5 text-right text-xs font-bold text-text-primary uppercase tracking-widest">Total</td>
                              <td className="px-4 py-2.5 text-right font-playfair font-bold text-text-primary text-base">{fmt(order.total)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {/* Status actions */}
                      {NEXT_ACTIONS[order.status] && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-inter text-xs text-text-secondary">Update status:</span>
                          {NEXT_ACTIONS[order.status]!.map(action => {
                            const { Icon } = STATUS_CFG[action.status];
                            return (
                              <button
                                key={action.status}
                                onClick={() => updateStatus(order.id, action.status)}
                                disabled={isUpdating}
                                className={`flex items-center gap-1.5 text-xs font-inter font-semibold border px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${action.cls}`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {action.label}
                              </button>
                            );
                          })}
                          {isUpdating && (
                            <span className="text-xs text-text-secondary font-inter">Updating…</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
