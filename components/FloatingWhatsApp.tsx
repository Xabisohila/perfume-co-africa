"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "27640713844";
const WHATSAPP_MESSAGE = "Hi! I'd like to order from The Perfume Co. Africa 🌟";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="whatsapp-btn">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 10 }}
            className="absolute right-14 bottom-1 bg-white rounded-2xl shadow-2xl p-4 w-56 border border-gray-100"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-inter font-bold text-gray-900">Perfume Co. Support</p>
                <p className="text-[10px] text-green-500 font-inter">● Online now</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 font-inter leading-snug">
              Need help choosing your scent? Chat with us — we reply instantly!
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center bg-[#25D366] text-white text-xs font-inter font-bold py-2 rounded-xl hover:bg-[#1eb556] transition-colors"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse rings */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />

        <svg
          className="w-7 h-7 text-white relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>
    </div>
  );
}
