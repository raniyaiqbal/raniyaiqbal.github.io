import type { GitHubRepo } from "./types";

/**
 * Minimal GitHub REST client for a static site.
 *
 * - Unauthenticated (60 req/hour/IP), so responses are cached in sessionStorage
 *   with a TTL, and in-flight requests are de-duplicated in memory.
 * - Every storage access is guarded: private browsing or blocked storage must
 *   never break rendering.
 */

const API = "https://api.github.com";
const TTL_MS = 10 * 60 * 1000;
const inflight = new Map<string, Promise<unknown>>();

interface CacheEntry<T> {
  at: number;
  data: T;
}

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    return Date.now() - entry.at < TTL_MS ? entry.data : null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data } satisfies CacheEntry<T>));
  } catch {
    /* storage unavailable — ignore */
  }
}

export class GitHubError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "GitHubError";
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const key = `gh:${path}`;
  const cached = readCache<T>(key);
  if (cached) return cached;

  const existing = inflight.get(key);
  if (existing) return existing as Promise<T>;

  const promise = fetch(`${API}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        const reason =
          res.status === 404
            ? "Repository not published yet"
            : res.status === 403
              ? "GitHub rate limit reached"
              : `GitHub responded ${res.status}`;
        throw new GitHubError(res.status, reason);
      }
      const data = (await res.json()) as T;
      writeCache(key, data);
      return data;
    })
    .finally(() => inflight.delete(key));

  inflight.set(key, promise);
  return promise;
}

export const github = {
  repo: (fullName: string, signal?: AbortSignal) =>
    request<GitHubRepo>(`/repos/${fullName}`, signal),

  userRepos: (user: string, signal?: AbortSignal) =>
    request<GitHubRepo[]>(`/users/${user}/repos?sort=pushed&per_page=30`, signal),
};

/** "3 days ago" style formatting using the platform Intl API. */
export function timeAgo(iso: string, now: number = Date.now()): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

export const repoUrl = (fullName: string) => `https://github.com/${fullName}`;
