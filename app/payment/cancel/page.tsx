import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
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
        <div className="w-20 h-20 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>

        <h1 className="font-playfair text-text-primary text-3xl font-bold mb-3">
          Payment Cancelled
        </h1>
        <p className="text-text-secondary font-inter leading-relaxed mb-8">
          Your payment was cancelled and you have not been charged. Your cart items are still saved — you can complete your order any time.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/checkout"
            className="btn-gold-shimmer text-black font-inter font-bold px-8 py-3.5 rounded-full inline-block"
          >
            Try Again
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-black/15 text-text-primary font-inter font-semibold text-sm px-8 py-3.5 rounded-full hover:border-gold/40 hover:text-gold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </a>
        </div>
      </div>
    </div>
  );
}
