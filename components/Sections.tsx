"use client";

import { useState } from "react";
import { certifications, experience, profile, skills } from "@/lib/content";
import { Reveal, Section, SectionHeading } from "./ui";

export function About() {
  return (
    <Section id="about">
      <SectionHeading label="ABOUT_ME" color="text-cyan-300" />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-zinc-400">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-lg border border-cyan-400/20 bg-[#05060b] p-6 font-mono text-sm">
            <p className="mb-4 text-xs text-zinc-600">{"// profile.json"}</p>
            <pre className="whitespace-pre-wrap leading-7 text-zinc-300">
              <span className="text-zinc-500">{"{"}</span>
              {"\n"}
              {(
                [
                  ["education", profile.education],
                  ["based_in", profile.location],
                  ["focus", "Robotics · Embedded AI · Automation"],
                  ["languages", profile.languages.join(", ")],
                ] as const
              ).map(([k, v]) => (
                <span key={k}>
                  {"  "}
                  <span className="text-fuchsia-400">&quot;{k}&quot;</span>: <span className="text-lime-300">&quot;{v}&quot;</span>,{"\n"}
                </span>
              ))}
              <span className="text-zinc-500">{"}"}</span>
            </pre>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading label="EXPERIENCE" color="text-amber-300" hint="git log --oneline career" />
      <ol className="relative border-l border-white/10">
        {experience.map((r, i) => (
          <li key={r.org} className="mb-12 ml-6 last:mb-0">
            <Reveal delay={i * 80}>
              <span
                className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full ${
                  r.end === "Present" ? "bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)]" : "bg-zinc-600"
                }`}
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {r.start} — {r.end} · {r.location}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-zinc-100">{r.title}</h3>
              <p className="font-mono text-sm text-amber-300/90">@ {r.org}</p>
              <ul className="mt-3 space-y-1.5 text-zinc-400">
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="text-amber-400/60">›</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Skills() {
  const [activeId, setActiveId] = useState<string>("all");
  const visible = activeId === "all" ? skills : skills.filter((s) => s.id === activeId);

  return (
    <Section id="skills">
      <SectionHeading label="STACK_TRACE" color="text-lime-300" />

      <div role="tablist" aria-label="Filter skills" className="mb-8 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider">
        {[{ id: "all", label: "All" }, ...skills].map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={activeId === g.id}
            onClick={() => setActiveId(g.id)}
            className={`rounded border px-3 py-1.5 transition ${
              activeId === g.id ? "border-lime-400/60 bg-lime-400/10 text-lime-300" : "border-white/10 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((g) => (
          <div key={g.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-lime-300">{g.label}</h3>
            <ul className="space-y-1.5 font-mono text-sm text-zinc-300">
              {g.items.map((s) => (
                <li key={s}>
                  <span className="text-fuchsia-400">›</span> {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-14 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">Certifications</h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {certifications.map((c) => (
          <li key={c.name} className="flex items-center justify-between gap-4 rounded border border-white/10 px-4 py-3 text-sm">
            <span className="text-zinc-200">{c.name}</span>
            <span className="shrink-0 font-mono text-xs text-zinc-500">{c.issuer}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" className="text-center">
      <Reveal>
        <h2 className="font-display text-4xl font-bold text-zinc-50 sm:text-6xl">
          Let&apos;s build <span className="text-amber-300 [text-shadow:0_0_30px_rgba(251,191,36,0.5)]">something.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Open to roles and collaborations in automation, AI and robotics.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block bg-fuchsia-600 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-fuchsia-500 hover:shadow-[0_0_30px_-4px_rgba(232,121,249,0.8)]"
        >
          Get in touch
        </a>
        <ul className="mt-10 flex justify-center gap-8 font-mono text-xs uppercase tracking-[0.2em]">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-cyan-400/70 hover:text-cyan-300">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center font-mono text-xs text-zinc-600">
      © {new Date().getFullYear()} {profile.name} · built with Next.js, TypeScript &amp; Tailwind CSS
    </footer>
  );
}
