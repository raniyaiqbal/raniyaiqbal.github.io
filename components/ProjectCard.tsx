"use client";

import type { Accent, Project } from "@/lib/types";
import { repoUrl, timeAgo } from "@/lib/github";
import { useRepo } from "@/hooks";

export const accentStyles: Record<Accent, { text: string; border: string; glow: string; chip: string }> = {
  cyan: { text: "text-cyan-300", border: "hover:border-cyan-400/60", glow: "group-hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]", chip: "border-cyan-400/30 text-cyan-300" },
  fuchsia: { text: "text-fuchsia-300", border: "hover:border-fuchsia-400/60", glow: "group-hover:shadow-[0_0_30px_-8px_rgba(232,121,249,0.5)]", chip: "border-fuchsia-400/30 text-fuchsia-300" },
  amber: { text: "text-amber-300", border: "hover:border-amber-400/60", glow: "group-hover:shadow-[0_0_30px_-8px_rgba(251,191,36,0.5)]", chip: "border-amber-400/30 text-amber-300" },
  lime: { text: "text-lime-300", border: "hover:border-lime-400/60", glow: "group-hover:shadow-[0_0_30px_-8px_rgba(163,230,53,0.5)]", chip: "border-lime-400/30 text-lime-300" },
};

function RepoStats({ repo }: { repo: string }) {
  const state = useRepo(repo);

  if (state.status === "loading" || state.status === "idle") {
    return <span className="h-3 w-40 animate-pulse rounded bg-white/5" aria-label="Loading repository stats" />;
  }
  if (state.status === "error") {
    return <span className="text-zinc-600">{state.error.toLowerCase()}</span>;
  }
  const { stargazers_count, forks_count, language, pushed_at } = state.data;
  return (
    <span className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-500">
      {language && <span>● {language}</span>}
      <span>★ {stargazers_count}</span>
      <span>⑂ {forks_count}</span>
      <span>updated {timeAgo(pushed_at)}</span>
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const a = accentStyles[project.accent];

  return (
    <article
      className={`group relative flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 ${a.border} ${a.glow}`}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-50">
            {project.title}
          </h3>
          <p className={`mt-1 text-sm ${a.text}`}>{project.tagline}</p>
        </div>
        {project.badge && (
          <span className={`shrink-0 rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${a.chip}`}>
            {project.badge}
          </span>
        )}
      </div>

      <p className="border-l border-white/10 pl-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>

      {project.metrics && (
        <dl className="mt-5 flex gap-8">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd className={`text-2xl font-bold ${a.text}`}>{m.value}</dd>
              <dd className="text-[10px] uppercase tracking-wide text-zinc-500">{m.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li key={t} className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6 text-[11px]">
        <RepoStats repo={project.repo} />
        <div className="flex flex-wrap gap-2">
          {project.report && (
            <a
              href={project.report}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-2 font-bold uppercase tracking-wide text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              View full report <span aria-hidden>↗</span>
            </a>
          )}
          <a
          href={repoUrl(project.repo)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded border px-4 py-2 font-bold uppercase tracking-wide transition-colors hover:bg-white/5 ${a.chip}`}
        >
          View repo <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
