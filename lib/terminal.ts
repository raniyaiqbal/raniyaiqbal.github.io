import { certifications, experience, profile, projects, skills } from "./content";
import { repoUrl } from "./github";

/**
 * A tiny shell: a typed command registry, a tokenizer that respects quotes,
 * and tab-completion. The UI (components/Terminal.tsx) only renders lines and
 * executes side effects returned here, so this module is pure and testable.
 */

export type LineKind = "input" | "output" | "error" | "accent" | "muted";

export interface Line {
  id: number;
  kind: LineKind;
  text: string;
}

export type Effect =
  | { type: "clear" }
  | { type: "open"; url: string }
  | { type: "scroll"; target: string };

export interface CommandResult {
  lines: { kind: LineKind; text: string }[];
  effects?: Effect[];
}

interface Command {
  summary: string;
  usage?: string;
  complete?: (partial: string) => string[];
  run: (args: string[]) => CommandResult;
}

const out = (...text: string[]) => text.map((t) => ({ kind: "output" as const, text: t }));
const accent = (text: string) => ({ kind: "accent" as const, text });
const muted = (text: string) => ({ kind: "muted" as const, text });
const error = (text: string) => ({ kind: "error" as const, text });

const pad = (s: string, n: number) => s + " ".repeat(Math.max(1, n - s.length));

const sections = ["about", "projects", "experience", "skills", "contact"] as const;

const registry: Record<string, Command> = {
  help: {
    summary: "list available commands",
    run: () => ({
      lines: [
        accent("Available commands:"),
        ...Object.entries(registry).map(([name, c]) =>
          ({ kind: "output" as const, text: `  ${pad(c.usage ?? name, 22)}${c.summary}` }),
        ),
        muted("Tip: ↑/↓ for history, Tab to autocomplete."),
      ],
    }),
  },

  whoami: {
    summary: "who is this?",
    run: () => ({
      lines: [accent(`${profile.name} — ${profile.title}`), ...out(profile.summary, `📍 ${profile.location}`)],
    }),
  },

  projects: {
    summary: "list projects",
    run: () => ({
      lines: [
        accent(`${projects.length} project(s):`),
        ...projects.map((p) => ({ kind: "output" as const, text: `  ${pad(p.id, 20)}${p.tagline}` })),
        muted("Run `open <project>` to view its repository."),
      ],
    }),
  },

  open: {
    summary: "open a project's repo",
    usage: "open <project>",
    complete: (partial) => projects.map((p) => p.id).filter((id) => id.startsWith(partial)),
    run: ([id]) => {
      if (!id) return { lines: [error("usage: open <project>")] };
      const project = projects.find((p) => p.id === id.toLowerCase());
      if (!project) return { lines: [error(`open: no such project '${id}'. Try \`projects\`.`)] };
      return {
        lines: out(`Opening ${repoUrl(project.repo)} …`),
        effects: [{ type: "open", url: repoUrl(project.repo) }],
      };
    },
  },

  skills: {
    summary: "show skills, optionally by group",
    usage: "skills [group]",
    complete: (partial) => skills.map((s) => s.id).filter((id) => id.startsWith(partial)),
    run: ([group]) => {
      const groups = group ? skills.filter((s) => s.id === group.toLowerCase()) : skills;
      if (!groups.length) {
        return { lines: [error(`skills: unknown group '${group}'`), muted(`groups: ${skills.map((s) => s.id).join(", ")}`)] };
      }
      return { lines: groups.map((g) => ({ kind: "output" as const, text: `${pad(g.label, 14)}${g.items.join(" · ")}` })) };
    },
  },

  experience: {
    summary: "work history",
    run: () => ({
      lines: experience.flatMap((r) => [
        accent(`${r.title} @ ${r.org}`),
        muted(`  ${r.start} – ${r.end} · ${r.location}`),
      ]),
    }),
  },

  certs: {
    summary: "certifications",
    run: () => ({ lines: certifications.map((c) => ({ kind: "output" as const, text: `✔ ${c.name} (${c.issuer})` })) }),
  },

  contact: {
    summary: "how to reach me",
    run: () => ({ lines: profile.socials.map((s) => ({ kind: "output" as const, text: `${pad(s.label, 10)}${s.href.replace("mailto:", "")}` })) }),
  },

  cv: {
    summary: "download my CV",
    run: () => ({ lines: out("Opening CV …"), effects: [{ type: "open", url: profile.cv }] }),
  },

  goto: {
    summary: "scroll to a section",
    usage: "goto <section>",
    complete: (partial) => sections.filter((s) => s.startsWith(partial)),
    run: ([section]) => {
      if (!section || !sections.includes(section as (typeof sections)[number])) {
        return { lines: [error(`usage: goto <${sections.join("|")}>`)] };
      }
      return { lines: out(`→ #${section}`), effects: [{ type: "scroll", target: section }] };
    },
  },

  clear: {
    summary: "clear the screen",
    run: () => ({ lines: [], effects: [{ type: "clear" }] }),
  },

  sudo: {
    summary: "try it",
    usage: "sudo <cmd>",
    run: (args) =>
      args.join(" ") === "hire raniya"
        ? { lines: [accent("✔ Permission granted."), ...out(`Drafting email to ${profile.email} …`)], effects: [{ type: "open", url: `mailto:${profile.email}?subject=Let's%20work%20together` }] }
        : { lines: [error("Nice try. Hint: `sudo hire raniya`")] },
  },
};

/** Split input into tokens, honouring "double" and 'single' quotes. */
export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) tokens.push(m[1] ?? m[2] ?? m[3]);
  return tokens;
}

export function execute(input: string): CommandResult {
  const [name, ...args] = tokenize(input.trim());
  if (!name) return { lines: [] };
  const cmd = registry[name.toLowerCase()];
  if (!cmd) {
    const suggestion = Object.keys(registry).find((k) => levenshtein(k, name.toLowerCase()) <= 2);
    return {
      lines: [
        error(`command not found: ${name}`),
        ...(suggestion ? [muted(`did you mean \`${suggestion}\`?`)] : [muted("type `help` for a list of commands")]),
      ],
    };
  }
  return cmd.run(args);
}

/** Returns the completed input, or all candidates when ambiguous. */
export function complete(input: string): { value: string; candidates: string[] } {
  const endsWithSpace = /\s$/.test(input);
  const tokens = tokenize(input);
  if (tokens.length <= 1 && !endsWithSpace) {
    const partial = (tokens[0] ?? "").toLowerCase();
    const matches = Object.keys(registry).filter((k) => k.startsWith(partial));
    return matches.length === 1 ? { value: `${matches[0]} `, candidates: [] } : { value: input, candidates: matches };
  }
  const cmd = registry[tokens[0].toLowerCase()];
  const partial = endsWithSpace ? "" : tokens[tokens.length - 1];
  const matches = cmd?.complete?.(partial.toLowerCase()) ?? [];
  if (matches.length === 1) {
    const base = endsWithSpace ? input : input.slice(0, input.length - partial.length);
    return { value: base + matches[0], candidates: [] };
  }
  return { value: input, candidates: matches };
}

/** Edit distance, used for "did you mean" suggestions. O(n·m) time, O(m) space. */
export function levenshtein(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}
