# overlookly — project spec

This file is the single source of truth for what this project should look
like. If a future session (or future me) is unsure about a decision, check
here before guessing.

## Brand

- Name: **overlookly**
- Typeface: **Inter** (via next/font/google)
- Red `#E5484D` — logo text, and ALL hover effects across the entire site
  and toolbar (nav links, buttons, toolbar highlights)
- Blue `#2480ED` — default color for all links, never underlined
- No domain purchased yet — ship on the free `*.vercel.app` URL, add a
  custom domain later without restructuring anything
- License: plain MIT, no commercial restriction

## Repo structure (monorepo, npm workspaces)

```
overlookly/
  packages/overlookly-a11y/   — the browser toolbar (npm package)
  packages/overlookly-mcp/    — MCP server (separate npm package,
                                 mirrors how Agentation ships agentation
                                 + agentation-mcp as two packages)
  apps/site/                  — Next.js site, deployed on Vercel
  skills/overlookly-a11y-setup/ — Claude Code skill
```

## Toolbar (packages/overlookly-a11y)

- Position: bottom-right
- Hover/highlight color: red `#E5484D`
- Corner radius: 6–8px throughout (toggle button, panel, highlight outline)
- Six checks: color contrast, missing alt text, unlabeled form inputs,
  invalid/redundant ARIA roles, keyboard focusability, skipped heading
  levels
- "Copy as markdown" and "Send to agent" (via MCP) actions in the panel
- Options API: `endpoint`, `position`, `autoActivate`, `className`,
  `onFindingAdd`, `onSend`

## Site structure — 8 standalone pages, not anchors

Every nav item is its OWN page (not a same-page anchor link like an
earlier draft mistakenly used):

1. **Overview** (`/`) — hero, live demo, Features, How agents use it,
   Licensing
2. **Install** (`/install`)
3. **Features** (`/features`)
4. **Schema** (`/schema`)
5. **MCP** (`/mcp`)
6. **Claude Skill** (`/claude-skill`)
7. **Changelog** (`/changelog`)
8. **FAQ** (`/faq`)

## Navigation

- **Desktop:** sidebar, but NOT pinned to the browser's left edge — the
  whole sidebar+content block is centered together as a unit within the
  page, with margin visible on both the far left and far right of the
  viewport. (Earlier version incorrectly had the sidebar flush against
  the edge — corrected per reference screenshot.)
- Grouped links: top-level (Overview, Install, Features, Schema), then a
  "Tools" group (MCP, Claude Skill), then a "Resources" group (Changelog,
  FAQ), then a small version footer.
- **Mobile:** top bar with logo + hamburger icon, opens a dropdown panel
  with the same links when tapped.

## Install command styling

The `npm install overlookly-a11y` snippet on the Overview page is a
**button**, not plain text — click to copy to clipboard, border, 6-8px
radius, hover fills with red `#E5484D` at 10% opacity (not a solid red
fill).

## Overview page demo section

Needs multiple broken examples, not just one button:
- A low-contrast button (existing)
- An unlabeled input (new)
- An element with a bad/missing ARIA label (new)

## Exact copy — Features section

- Click the icon in the bottom-right corner to activate
- Hover over elements to see what's checkable
- Click any element to run the check
- Get the issue, the WCAG criterion, and a suggested fix
- Click to copy formatted markdown
- Paste into your agent

## Exact copy — How agents use it

- CSS selectors to grep your codebase
- Source file paths to jump directly to the right line
- WCAG criterion so the fix is grounded in an actual standard, not a guess
- Computed styles — contrast ratio, focus state, ARIA attributes as they
  actually render
- Suggested fix with the exact change, not just a description of the
  problem

**OPEN FLAG (unresolved as of this spec):** the "source file paths" line
is not actually implemented — the tool currently returns a CSS selector,
not a file path. This has been flagged twice. Decide: (a) build it before
using this copy, (b) mark it "coming soon" in the copy, or (c) drop the
line. Do not silently include or silently drop it without flagging again.

## Deployment

- Framework: Next.js
- Host: Vercel, connected to GitHub, monorepo root directory set to
  `apps/site`
- No custom domain yet (see Brand section)

## Known working process notes (learned the hard way)

- Lockfiles generated in a Linux sandbox don't work on Mac/Apple Silicon
  — always delete `node_modules` + `package-lock.json` and run a fresh
  `npm install` on the actual Mac before relying on it.
- When updating an existing local folder from a new zip, use `rsync -a
  --exclude='.git'` from Terminal — Finder's drag-and-drop "Replace" is
  unreliable for nested folders and can silently skip files.
- Always verify `.gitignore` survived packaging (`cat .gitignore`) before
  trusting a fresh zip.
