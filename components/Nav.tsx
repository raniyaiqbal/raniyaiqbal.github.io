"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { useActiveSection } from "@/hooks";

const LINKS = ["projects", "about", "experience", "skills", "contact"] as const;

export default function Nav() {
  const active = useActiveSection(LINKS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-cyan-400/10 bg-[#07070d]/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-bold tracking-[0.3em] text-cyan-300 [text-shadow:0_0_12px_rgba(34,211,238,0.6)]">
          {profile.name.toUpperCase()}
        </a>

        <ul className="hidden gap-8 md:flex">
          {LINKS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === id ? "text-fuchsia-400" : "text-cyan-400/60 hover:text-cyan-300"
                }`}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="font-mono text-xs uppercase tracking-widest text-cyan-300 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "[close]" : "[menu]"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 px-4 pb-4 md:hidden">
          {LINKS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block py-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300/80"
              >
                &gt; {id}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
