# overlookly

Accessibility feedback, structured for agents.

See PROJECT-SPEC.md for the full design/content spec this project follows.

This is a monorepo containing:

- `packages/overlookly-a11y` — the browser toolbar (npm package)
- `packages/overlookly-mcp` — MCP server, bridges browser findings to agents
- `apps/site` — the marketing/docs site (Next.js, deployed on Vercel)
- `skills/overlookly-a11y-setup` — Claude Code skill for automated setup

## Setup

npm install

## Development

cd apps/site && npm run dev
