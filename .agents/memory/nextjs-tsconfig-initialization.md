---
name: Next.js TypeScript initialization
description: A Next.js build can rewrite TypeScript settings during initial project setup.
---

After Next.js first detects TypeScript and generates App Router types, recheck the artifact's `tsconfig.json` and restore the project's intended strictness if Next relaxed it.

**Why:** The initial Next.js build rewrote `strict` to `false` while adding its own compiler options.

**How to apply:** Re-run the artifact typecheck after the first production build and verify the `strict` setting remains enabled.
