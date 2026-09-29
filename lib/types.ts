/**
 * Domain types for the portfolio. All site content is typed so that adding a
 * project, role or skill is a compile-time-checked data change, not a UI change.
 */

export type Accent = "cyan" | "fuchsia" | "amber" | "lime";

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  /** Stable id, also used as the terminal `open <id>` argument. */
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  badge?: string;
  tags: readonly string[];
  metrics?: readonly Metric[];
  accent: Accent;
  /** "owner/name" — used to fetch live stats from the GitHub REST API. */
  repo: `${string}/${string}`;
}

export interface Role {
  title: string;
  org: string;
  location: string;
  start: string;
  end: string | "Present";
  highlights: readonly string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  items: readonly string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  handle: string;
  title: string;
  location: string;
  email: string;
  cv: string;
  roles: readonly string[];
  summary: string;
  about: readonly string[];
  education: string;
  languages: readonly string[];
  socials: readonly SocialLink[];
}

/** Subset of the GitHub REST `GET /repos/{owner}/{repo}` response we use. */
export interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  topics?: string[];
}

/** Discriminated union for any async resource. */
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
