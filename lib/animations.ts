import type { Variants } from "framer-motion";

/** Shared luxury easing curves */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

/** Mount-time fade up (for hero / above-fold elements) */
export const fadeUp = (delay = 0, y = 48, duration = 0.9) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: EASE },
});

/** Viewport-triggered fade up */
export const viewFadeUp = (delay = 0, y = 40, duration = 0.85) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration, delay, ease: EASE },
});

/** Viewport-triggered fade in (no vertical movement) */
export const viewFadeIn = (delay = 0, duration = 0.7) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration, delay, ease: "easeOut" },
});

/** Viewport-triggered scale in */
export const viewScaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** Slide from left */
export const viewSlideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease: EASE },
});

/** Slide from right */
export const viewSlideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease: EASE },
});

/** Stagger container — use with motion.div variants */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/** Stagger item — child of stagger container */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Hover scale — micro-interaction for buttons */
export const hoverScale = {
  whileHover: { scale: 1.04, y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

/** Hover lift — micro-interaction for cards */
export const hoverLift = {
  whileHover: { y: -6 },
  transition: { duration: 0.3, ease: EASE },
};
