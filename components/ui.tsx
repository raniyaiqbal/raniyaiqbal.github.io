"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks";

/** Fades + lifts children in when scrolled into view. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  label,
  hint,
  color = "text-fuchsia-400",
}: {
  label: string;
  hint?: string;
  color?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
      <h2 className={`font-mono text-xl font-bold tracking-[0.2em] sm:text-2xl ${color} [text-shadow:0_0_18px_currentColor]`}>
        <span className="opacity-60">{"// "}</span>
        {label}
      </h2>
      {hint && <p className="hidden font-mono text-xs text-cyan-400/70 sm:block">{hint}</p>}
    </div>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 px-4 py-24 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
