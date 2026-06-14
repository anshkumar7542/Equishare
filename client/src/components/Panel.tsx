import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Panel({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <motion.section
      className="glass-panel magnetic-panel rounded-lg p-5 transition duration-200"
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title ? <h2 className="panel-title text-sm font-semibold uppercase tracking-[0.16em] text-muted">{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </motion.section>
  );
}
