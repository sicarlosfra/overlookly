import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // The monorepo root (two levels up from apps/site) — this is where
    // `next` itself is actually installed via npm workspaces hoisting.
    // Pinning this explicitly means a stray lockfile anywhere else on
    // the machine (e.g. accidentally created in the home directory)
    // can never cause Next.js to guess the wrong project root.
    root: path.resolve(process.cwd(), "..", ".."),
  },
};

export default nextConfig;
