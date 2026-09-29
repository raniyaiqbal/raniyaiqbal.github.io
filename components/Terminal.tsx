"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { complete, execute, type Effect, type Line, type LineKind } from "@/lib/terminal";
import { profile } from "@/lib/content";

const PROMPT = `${profile.handle}@portfolio:~$`;

const kindClass: Record<LineKind, string> = {
  input: "text-zinc-100",
  output: "text-zinc-300",
  error: "text-rose-400",
  accent: "text-cyan-300",
  muted: "text-zinc-500",
};

const BOOT: { kind: LineKind; text: string }[] = [
  { kind: "muted", text: "portfolio-shell v1.0 — interactive, try typing a command" },
  { kind: "output", text: "Type 'help' to get started" },
];

export default function Terminal() {
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  const [lines, setLines] = useState<Line[]>(() => BOOT.map((l, i) => ({ ...l, id: -i - 1 })));
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = useCallback((items: { kind: LineKind; text: string }[]) => {
    setLines((prev) => [...prev, ...items.map((l) => ({ ...l, id: nextId() }))].slice(-200));
  }, []);

  const runEffects = (effects: Effect[] = []) => {
    for (const fx of effects) {
      switch (fx.type) {
        case "clear":
          setLines([]);
          break;
        case "open":
          window.open(fx.url, fx.url.startsWith("mailto:") ? "_self" : "_blank", "noopener");
          break;
        case "scroll":
          document.getElementById(fx.target)?.scrollIntoView({ behavior: "smooth" });
          break;
      }
    }
  };

  const submit = () => {
    const input = value;
    push([{ kind: "input", text: `${PROMPT} ${input}` }]);
    if (input.trim()) setHistory((h) => [...h.filter((x) => x !== input), input].slice(-50));
    const result = execute(input);
    push(result.lines);
    runEffects(result.effects);
    setValue("");
    setCursor(null);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        submit();
        break;
      case "ArrowUp": {
        e.preventDefault();
        if (!history.length) return;
        const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
        setCursor(next);
        setValue(history[next]);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (cursor === null) return;
        const next = cursor + 1;
        if (next >= history.length) {
          setCursor(null);
          setValue("");
        } else {
          setCursor(next);
          setValue(history[next]);
        }
        break;
      }
      case "Tab": {
        e.preventDefault();
        const { value: completed, candidates } = complete(value);
        setValue(completed);
        if (candidates.length > 1) push([{ kind: "muted", text: candidates.join("   ") }]);
        break;
      }
      case "l":
        if (e.ctrlKey) {
          e.preventDefault();
          setLines([]);
        }
        break;
    }
  };

  return (
    <div
      className="overflow-hidden rounded-lg border border-cyan-400/20 bg-[#05060b]/90 shadow-[0_0_40px_-10px_rgba(34,211,238,0.35)] backdrop-blur"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime-400/80" />
        <span className="ml-3 font-mono text-[11px] tracking-wider text-zinc-500">~/portfolio — zsh</span>
      </div>

      <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6" role="log" aria-live="polite">
        {lines.map((l) => (
          <pre key={l.id} className={`whitespace-pre-wrap break-words ${kindClass[l.kind]}`}>
            {l.text}
          </pre>
        ))}
        <label className="flex items-center gap-2">
          <span className="shrink-0 text-fuchsia-400">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal input"
            className="w-full bg-transparent text-zinc-100 caret-cyan-300 outline-none"
          />
        </label>
      </div>
    </div>
  );
}
