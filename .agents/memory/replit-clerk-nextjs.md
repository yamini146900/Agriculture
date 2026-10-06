---
name: Replit-managed Clerk with Next.js
description: Replit's managed Clerk key names and the explicit key wiring needed by Next.js middleware.
---

With Replit-managed Clerk in a Next.js App Router app, resolve the publishable key from the incoming hostname with `publishableKeyFromHost` and pass it explicitly through the Clerk middleware options callback and to the server-rendered `ClerkProvider`. Replit provisions `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, and `VITE_CLERK_PUBLISHABLE_KEY`; it does not provision `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.

**Why:** The default Next middleware returned a missing-keys 500 even though the managed secrets existed; explicitly supplying the managed key fixed the preview.

**How to apply:** Keep Replit-managed secrets unchanged. For Next.js, use the request's forwarded hostname and managed `CLERK_PUBLISHABLE_KEY` in `publishableKeyFromHost`, then pass the result to `ClerkProvider`.
