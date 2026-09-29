"use client";

import { useMemo } from "react";
import { profile, projects } from "@/lib/content";
import { timeAgo } from "@/lib/github";
import { useUserRepos } from "@/hooks";
import ProjectCard from "./ProjectCard";
import { Reveal, Section, SectionHeading } from "./ui";

/** Repos that should never appear in the "live from GitHub" feed. */
const HIDDEN = new Set([`${profile.handle}.github.io`, profile.handle]);

function LiveRepos() {
  const state = useUserRepos(profile.handle);
  const featured = useMemo(() => new Set(projects.map((p) => p.repo.split("/")[1])), []);

  const repos = useMemo(() => {
    if (state.status !== "success") return [];
    return state.data
      .filter((r) => !r.fork && !HIDDEN.has(r.name) && !featured.has(r.name))
      .slice(0, 6);
  }, [state, featured]);

  if (state.status === "error" || (state.status === "success" && repos.length === 0)) return null;

  return (
    <div className="mt-16">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
        <span className="text-lime-400">●</span> live from github.com/{profile.handle}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {state.status === "loading" || state.status === "idle"
          ? Array.from({ length: 3 }, (_, i) => <li key={i} className="h-20 animate-pulse rounded border border-white/5 bg-white/[0.02]" />)
          : repos.map((r) => (
              <li key={r.name}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded border border-white/10 bg-white/[0.02] p-4 font-mono transition hover:border-cyan-400/40"
                >
                  <span className="block truncate text-sm text-zinc-100">{r.name}</span>
                  <span className="mt-1 block truncate text-xs text-zinc-500">{r.description ?? "No description"}</span>
                  <span className="mt-2 block text-[11px] text-zinc-600">
                    {r.language ?? "—"} · updated {timeAgo(r.pushed_at)}
                  </span>
                </a>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading label="PROJECTS" hint="each card links to its repository" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 100}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
        <Reveal delay={projects.length * 100}>
          <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-white/10 p-6 text-center font-mono">
            <span className="text-3xl text-fuchsia-400/60">+</span>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-400">Next build in progress</p>
            <p className="mt-2 text-xs text-zinc-600">New robotics &amp; AI projects land here as they ship.</p>
          </div>
        </Reveal>
      </div>
      <LiveRepos />
    </Section>
  );
}
