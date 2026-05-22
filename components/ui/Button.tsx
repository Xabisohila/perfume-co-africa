"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-inter font-semibold tracking-wide rounded-full transition-all duration-300 cursor-pointer select-none",
  {
    variants: {
      variant: {
        gold: "btn-gold-shimmer text-black",
        "gold-glow": "btn-gold-shimmer glow-pulse text-black",
        outline: "border border-white/25 text-white hover:border-gold/60 hover:text-gold bg-transparent",
        "outline-dark": "border border-black/20 text-text-primary hover:border-gold hover:text-gold bg-transparent",
        dark: "bg-black text-white hover:bg-gold hover:text-black",
        ghost: "text-gold hover:text-gold-light underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-5 py-2 text-xs",
        md: "px-7 py-3 text-sm",
        lg: "px-10 py-4 text-base",
        xl: "px-12 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "lg",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> &
  Omit<HTMLMotionProps<"a">, "children"> & {
    children: React.ReactNode;
    href?: string;
  };

export function Button({ variant, size, className, children, href = "#", ...props }: ButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
