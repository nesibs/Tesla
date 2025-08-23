import React from "react";
import { motion } from "framer-motion";

/**
 * TeslaLoader — modern loading component built around the word "TESLA".
 *
 * Props:
 *  - size: "sm" | "md" | "lg" (default: "md")
 *  - variant: "glow" | "scan" | "pulse" (default: "glow")
 *  - className: optional extra classes
 *  - label: accessible label, defaults to "Loading"
 *
 * Usage:
 *  <TeslaLoader size="lg" variant="scan" />
 */
export default function Loading({
  size = "md",
  variant = "glow",
  className = "",
  label = "Loading",
}) {
  const letters = ["T", "E", "S", "L", "A"]; 

  const sizes = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-7xl",
  };

  // Staggered vertical float for each letter
  const letterVariants = {
    initial: { y: 0, opacity: 0.6 },
    animate: (i) => ({
      y: [0, -6, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.08,
      },
    }),
  };

  // Variant-specific wrappers
  const wrapperClass = {
    glow: "relative",
    scan: "relative overflow-hidden",
    pulse: "relative",
  }[variant];

  // Accent using gradient text
  const textBase = `${sizes[size]} font-semibold tracking-[0.3em]`;
  const textGradient =
    "bg-gradient-to-br from-red-500 via-neutral-200 to-neutral-500 dark:from-red-400 dark:via-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent";

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={label}
      className={`inline-flex select-none flex-col items-center gap-3 ${className}`}
    >
      {/* Wordmark */}
      <div className={`${wrapperClass}`}>
        <div className="flex items-end gap-[0.2em]">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              className={`${textBase} ${textGradient}`}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        {/* GLOW: soft bloom behind text */}
        {variant === "glow" && (
          <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl">
            <motion.div
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.03, 0.95] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full rounded-full bg-gradient-to-tr from-red-500/30 via-white/10 to-neutral-500/30 dark:from-red-400/30 dark:via-white/5 dark:to-neutral-500/20"
            />
          </div>
        )}

        {/* SCAN: subtle sweeping light */}
        {variant === "scan" && (
          <motion.span
            aria-hidden
            initial={{ x: "-150%" }}
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-gradient-to-r from-white/0 via-white/30 to-white/0 dark:via-white/10"
          />
        )}

        {/* PULSE: underline pulse bar */}
        {variant === "pulse" && (
          <motion.div
            aria-hidden
            initial={{ scaleX: 0.4, opacity: 0.6 }}
            animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] max-w-[80%] origin-center rounded-full bg-gradient-to-r from-red-500/70 via-neutral-300 to-red-500/70 dark:via-neutral-500"
          />
        )}
      </div>

      {/* Progress/Activity bar */}
      <div className="relative h-1 w-56 overflow-hidden rounded-full bg-neutral-200/60 dark:bg-neutral-800">
        <motion.div
          initial={{ x: "-60%" }}
          animate={{ x: ["-60%", "120%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-red-500/80 via-red-400/80 to-red-300/80 dark:from-red-400/80 dark:via-red-300/80 dark:to-rose-300/80"
        />
      </div>

      {/* Helper text (visually subtle) */}
      <div className="text-xs text-neutral-500 dark:text-neutral-400 tracking-widest">
        please wait
      </div>
    </div>
  );
}
