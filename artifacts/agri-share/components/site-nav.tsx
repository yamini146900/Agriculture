"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sprout } from "lucide-react";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-20 border-b border-[var(--line)] bg-[var(--paper)]/95">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-9">
        <Link href="/" data-testid="link-brand" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--moss)] text-[#f4f1e8]"><Sprout size={21} strokeWidth={1.8} /></span>
          <span className="font-display text-[25px] font-semibold tracking-[-.04em]">AgriShare<span className="text-[var(--clay)]">.</span></span>
        </Link>
        <div className="hidden items-center gap-9 text-[13px] font-semibold text-[#536359] md:flex">
          <a href="/#how-it-works" data-testid="link-how-it-works" className="transition-colors hover:text-[var(--moss)]">How it works</a>
          <a href="/#for-farmers" data-testid="link-for-farmers" className="transition-colors hover:text-[var(--moss)]">For farmers</a>
          <a href="/#for-owners" data-testid="link-for-owners" className="transition-colors hover:text-[var(--moss)]">For equipment owners</a>
        </div>
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/login" data-testid="link-login" className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--clay)]">Log in</Link>
          <Link href="/register" data-testid="link-get-started" className="rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-[#f6f3e9] transition hover:bg-[#25492f]">Get started <span aria-hidden="true">↗</span></Link>
        </div>
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} data-testid="button-mobile-menu" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] md:hidden">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && <div className="absolute inset-x-0 top-full border-b border-[var(--line)] bg-[var(--paper)] px-5 pb-5 pt-2 shadow-lg md:hidden">
        <div className="flex flex-col gap-1">
          <a href="/#how-it-works" onClick={() => setOpen(false)} data-testid="mobile-link-how-it-works" className="rounded-xl px-3 py-3 text-sm font-semibold">How it works</a>
          <a href="/#for-farmers" onClick={() => setOpen(false)} data-testid="mobile-link-for-farmers" className="rounded-xl px-3 py-3 text-sm font-semibold">For farmers</a>
          <a href="/#for-owners" onClick={() => setOpen(false)} data-testid="mobile-link-for-owners" className="rounded-xl px-3 py-3 text-sm font-semibold">For equipment owners</a>
          <div className="mt-2 flex gap-3 border-t border-[var(--line)] pt-4">
            <Link href="/login" onClick={() => setOpen(false)} data-testid="mobile-link-login" className="flex-1 rounded-full border border-[var(--line)] py-3 text-center text-sm font-semibold">Log in</Link>
            <Link href="/register" onClick={() => setOpen(false)} data-testid="mobile-link-register" className="flex-1 rounded-full bg-[var(--moss)] py-3 text-center text-sm font-semibold text-white">Get started</Link>
          </div>
        </div>
      </div>}
    </header>
  );
}
