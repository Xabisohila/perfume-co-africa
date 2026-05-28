import { CheckCircle2, ShoppingBag, Package } from "lucide-react";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id } = await searchParams;

  return (
    <div className="min-h-screen bg-luxury flex flex-col items-center justify-center px-4 text-center">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 bg-black/95 border-b border-gold/10 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <a href="/" className="flex flex-col leading-none w-fit">
            <span className="font-playfair font-bold text-white tracking-[0.2em] text-sm">
              THE PERFUME CO.
            </span>
            <span className="text-gold tracking-[0.35em] font-inter font-medium text-[0.6rem]">
              AFRICA
            </span>
          </a>
        </div>
      </header>

      <div className="max-w-md w-full">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="font-playfair text-text-primary text-3xl font-bold mb-3">
          Payment Received!
        </h1>
        <p className="text-text-secondary font-inter leading-relaxed mb-2">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <p className="text-text-secondary font-inter text-sm mb-6">
          You&apos;ll receive a confirmation email shortly. Your order will be dispatched within 1–2 business days.
        </p>

        {/* Order reference */}
        {order_id && (
          <div className="bg-gold/8 border border-gold/20 rounded-2xl p-4 mb-4 text-left">
            <p className="font-inter text-xs text-text-secondary mb-1">Order Reference</p>
            <p className="font-inter font-bold text-text-primary text-sm font-mono tracking-wider">{order_id}</p>
            <p className="font-inter text-xs text-text-secondary mt-1">Save this — you&apos;ll need it to track your order.</p>
          </div>
        )}

        {/* What happens next */}
        <div className="bg-gold/8 border border-gold/20 rounded-2xl p-5 mb-8 text-left">
          <p className="font-inter text-sm text-text-primary font-semibold mb-1">
            What happens next?
          </p>
          <ul className="text-text-secondary font-inter text-sm space-y-1.5">
            <li>✓ PayFast will email your payment receipt</li>
            <li>✓ We&apos;ll send your tracking number via WhatsApp</li>
            <li>✓ Standard delivery: 1–5 business days</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {order_id && (
            <a
              href={`/orders/track?id=${order_id}`}
              className="inline-flex items-center justify-center gap-2 border border-gold/30 text-text-primary font-inter font-semibold px-6 py-3.5 rounded-full hover:border-gold/60 transition-colors text-sm"
            >
              <Package className="w-4 h-4" />
              Track Order
            </a>
          )}
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 btn-gold-shimmer text-black font-inter font-bold px-10 py-3.5 rounded-full"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
