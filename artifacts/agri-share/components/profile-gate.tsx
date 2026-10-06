"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { getGetCurrentProfileQueryKey, useGetCurrentProfile } from "@workspace/api-client-react";
import { ErrorPanel, LoadingPanel, SecureNote } from "./status-panel";

export function ProfileGate({ allowedRole }: { allowedRole: "FARMER" | "OWNER" | "ADMIN" }) {
  const { isLoaded, isSignedIn } = useAuth();
  const query = useGetCurrentProfile({ query: { enabled: isLoaded && !!isSignedIn, queryKey: getGetCurrentProfileQueryKey() } });
  if (!isLoaded || (isSignedIn && query.isLoading)) return <LoadingPanel />;
  if (!isSignedIn) return <div className="mx-auto max-w-xl rounded-3xl border border-[var(--line)] bg-[#faf8f1] p-9 text-center" data-testid="panel-auth-required">
    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e5eadf] text-[var(--moss)]"><span className="text-xl">01</span></div>
    <h1 className="mt-5 font-display text-3xl">Your farm, your space.</h1>
    <p className="mt-3 text-sm leading-6 text-[#68746b]">Sign in to continue to your AgriShare dashboard. Your account stays yours.</p>
    <Link href="/login" data-testid="link-secure-login" className="mt-6 inline-flex rounded-full bg-[var(--moss)] px-6 py-3 text-sm font-semibold text-white hover:bg-[#25492f]">Sign in securely</Link>
    <div className="mt-6"><SecureNote /></div>
  </div>;
  if (query.isError) return <ErrorPanel onRetry={() => void query.refetch()} />;
  if (!query.data?.authenticated) return <div data-testid="status-auth-required" className="rounded-3xl border border-[var(--line)] bg-[#faf8f1] p-8 text-center">
    <h1 className="font-display text-2xl">Your session needs a refresh</h1><p className="mt-2 text-sm text-[#68746b]">Please sign in again to securely access your profile.</p>
    <Link href="/login" data-testid="link-refresh-login" className="mt-5 inline-flex rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white">Return to sign in</Link>
  </div>;
  if (!query.data.onboardingComplete || !query.data.profile) return <div data-testid="panel-onboarding-needed" className="mx-auto max-w-xl rounded-3xl border border-[var(--line)] bg-[#faf8f1] p-9 text-center">
    <span className="text-xs font-bold uppercase tracking-[.19em] text-[var(--leaf)]">One last step</span><h1 className="mt-3 font-display text-3xl">Let’s set up your profile.</h1>
    <p className="mt-3 text-sm leading-6 text-[#68746b]">Tell us your name and how you’ll use AgriShare before opening your dashboard.</p>
    <Link href="/onboarding" data-testid="link-complete-profile" className="mt-6 inline-flex rounded-full bg-[var(--moss)] px-6 py-3 text-sm font-semibold text-white">Complete your profile</Link>
  </div>;
  const roles = query.data.profile.roles;
  if (!roles.includes(allowedRole)) {
    const destination = roles.includes("ADMIN") ? "/admin/dashboard" : roles.includes("OWNER") ? "/owner/dashboard" : "/farmer/dashboard";
    return <div data-testid="panel-role-mismatch" className="mx-auto max-w-xl rounded-3xl border border-[var(--line)] bg-[#faf8f1] p-9 text-center">
      <h1 className="font-display text-3xl">This dashboard is for another role.</h1><p className="mt-3 text-sm text-[#68746b]">Your account is securely signed in, but this destination doesn’t match your profile.</p>
      <Link href={destination} data-testid="link-correct-dashboard" className="mt-6 inline-flex rounded-full bg-[var(--moss)] px-6 py-3 text-sm font-semibold text-white">Go to your dashboard</Link>
    </div>;
  }
  return <section data-testid="profile-dashboard" className="mx-auto max-w-6xl">
    <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--leaf)]">AgriShare / {allowedRole.toLowerCase()}</p>
        <h1 data-testid="text-dashboard-title" className="mt-3 font-display text-4xl tracking-[-.04em] sm:text-5xl">Good to see you, {query.data.profile.displayName}.</h1>
        <p data-testid="text-profile-email" className="mt-3 text-sm text-[#6c796f]">{query.data.profile.email}</p></div>
      <div data-testid="status-profile-role" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d3dbc9] bg-[#e9eee3] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[var(--moss)]"><span className="h-2 w-2 rounded-full bg-[var(--leaf)]" />{allowedRole}</div>
    </div>
    <div className="grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
      <div className="relative overflow-hidden rounded-[30px] bg-[var(--moss)] p-8 text-[#f4f1e8] sm:p-11">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" /><div className="absolute -right-5 -top-5 h-44 w-44 rounded-full border border-white/10" />
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d7c987]">Your AgriShare account</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight sm:text-4xl">A stronger season starts with good neighbours.</h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#d9e0d5]">Your profile is ready. AgriShare is here to make local access to agricultural equipment dependable and straightforward.</p>
        <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-[#e0e5dc]"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">{query.data.profile.displayName.slice(0,1).toUpperCase()}</span><span>{query.data.profile.displayName}</span><span className="ml-auto text-xs text-[#c4d0c3]">Profile active</span></div>
      </div>
      <div className="flex flex-col justify-between rounded-[30px] border border-[var(--line)] bg-[#faf8f1] p-8 sm:p-9">
        <div><span className="text-xs font-bold uppercase tracking-[.18em] text-[var(--clay)]">Phase one</span><h2 className="mt-4 font-display text-3xl">Your starting point</h2><p className="mt-3 text-sm leading-7 text-[#6c796f]">This is your secure role-based home. We’ll keep your AgriShare experience grounded in what matters to you.</p></div>
        <div className="mt-8"><SecureNote /></div>
      </div>
    </div>
  </section>;
}
