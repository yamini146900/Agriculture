"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { Sprout, LogOut, ArrowUpRight } from "lucide-react";
import { ProfileGate } from "./profile-gate";

export function DashboardFrame({ role }: { role: "FARMER" | "OWNER" | "ADMIN" }) {
  const { signOut } = useClerk();
  const roleName = role === "OWNER" ? "Owner" : role === "ADMIN" ? "Admin" : "Farmer";
  return <main className="min-h-[100dvh]">
    <header className="border-b border-[var(--line)] bg-[var(--paper)]">
      <nav aria-label="Account navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-9">
        <div><Link href="/" data-testid="link-dashboard-brand" className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--moss)] text-[#f4f1e8]"><Sprout size={20} /></span><span className="font-display text-2xl font-semibold tracking-[-.04em]">AgriShare<span className="text-[var(--clay)]">.</span></span></Link>
          <span data-testid="text-dashboard-section" className="ml-[50px] mt-0.5 block text-[10px] font-bold uppercase tracking-[.15em] text-[#778178]">{roleName} space</span></div>
        <button type="button" data-testid="button-sign-out" onClick={() => void signOut({ redirectUrl: "/" })} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[#faf8f1] px-4 py-2.5 text-xs font-semibold text-[#536359] transition hover:bg-[#e9e5d8]">Sign out <LogOut size={14} /></button>
      </nav>
    </header>
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-5 md:px-9 md:pb-20"><ProfileGate allowedRole={role} /></div>
    <footer className="border-t border-[var(--line)] px-5 py-5 text-xs text-[#778178] md:px-9"><div className="mx-auto flex max-w-7xl items-center justify-between"><span>AgriShare · Good equipment, shared locally.</span><Link href="/" data-testid="link-dashboard-home" className="flex items-center gap-1 font-semibold text-[var(--moss)]">Public site <ArrowUpRight size={12} /></Link></div></footer>
  </main>;
}
