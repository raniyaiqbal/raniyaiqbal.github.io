"use client";

import { profile } from "@/lib/content";
import { useTypewriter } from "@/hooks";
import SensorField from "./SensorField";
import Terminal from "./Terminal";

export default function Hero() {
  const role = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 md:pt-40">
      <SensorField />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#07070d]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-lime-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            Open to opportunities · {profile.location}
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent [filter:drop-shadow(0_0_24px_rgba(192,132,252,0.35))]">
              {profile.name.split(" ")[0]}
            </span>
            .
          </h1>

          <p className="mt-5 h-8 font-mono text-lg text-cyan-300 sm:text-xl" aria-label={profile.roles.join(", ")}>
            <span aria-hidden>
              &gt; {role}
              <span className="ml-0.5 inline-block w-2 animate-pulse bg-cyan-300">&nbsp;</span>
            </span>
          </p>

          <p className="mt-6 max-w-xl border-l-2 border-fuchsia-500/60 pl-5 text-lg leading-relaxed text-zinc-400">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 font-mono text-xs font-bold uppercase tracking-[0.2em]">
            <a href="#projects" className="border border-cyan-400/60 bg-cyan-400/10 px-6 py-3 text-cyan-200 transition hover:bg-cyan-400/20 hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]">
              View projects →
            </a>
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="border border-fuchsia-400/50 px-6 py-3 text-fuchsia-300 transition hover:bg-fuchsia-400/10">
              Download CV
            </a>
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
