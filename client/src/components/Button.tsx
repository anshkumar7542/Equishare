import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const styles = {
    primary: "button-prism bg-ink text-cloud shadow-sm hover:shadow-lg",
    secondary: "border border-line bg-surface/80 text-ink hover:bg-elevated",
    ghost: "bg-transparent text-muted hover:bg-elevated hover:text-ink"
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={`focus-ring relative inline-flex min-h-10 items-center justify-center gap-2 overflow-hidden rounded-md px-4 py-2 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
