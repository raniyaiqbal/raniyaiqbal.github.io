# raniyaiqbal.github.io

Personal portfolio of **Raniya Iqbal**, Mechatronics Engineer (robotics, automation & AI).

**Live:** https://raniyaiqbal.github.io

## Stack
- **Next.js 16** (App Router, static export) + **React 19**
- **TypeScript** (strict mode) + **Tailwind CSS 4**
- Deployed to **GitHub Pages** via GitHub Actions (type-check → build → deploy)

## Highlights
- **Interactive terminal**: a typed command registry with a quote-aware tokenizer, tab completion, command history and Levenshtein "did you mean" suggestions (`lib/terminal.ts`)
- **Live GitHub data**: a small REST client with sessionStorage TTL caching, in-flight request de-duplication and abortable fetches, exposed through typed `AsyncState<T>` hooks (`lib/github.ts`, `hooks/`)
- **LiDAR-style canvas animation**: drifting sensor nodes linked through a spatial-hash neighbour search (~O(n)), with a rotating scan beam, pointer interaction, DPR scaling, off-screen pausing and `prefers-reduced-motion` support (`components/SensorField.tsx`)
- **Content as data**: all copy lives in `lib/content.ts` and is type-checked against `lib/types.ts`

## Project structure
```
app/            layout, page, global styles
components/     Hero, Terminal, SensorField, ProjectCard, Projects, Sections, Nav, ui
hooks/          useTypewriter, useInView, useActiveSection, useRepo, useUserRepos
lib/            content.ts (edit me), types.ts, github.ts, terminal.ts
public/         CV and static assets
```

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static site in ./out
```

## Adding a project
Add an object to the `projects` array in `lib/content.ts`. The card, the "View repo" button, the live GitHub stats and the terminal's `open <project>` command all pick it up automatically.
