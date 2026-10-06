"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { getGetCurrentProfileQueryKey, useCompleteProfile, useGetCurrentProfile } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Check, LoaderCircle, Sprout, Tractor } from "lucide-react";
import { ErrorPanel, LoadingPanel, SecureNote } from "./status-panel";

type InitialRole = "FARMER" | "OWNER";

export function OnboardingForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoaded, isSignedIn } = useAuth();
  const profile = useGetCurrentProfile({ query: { enabled: isLoaded && !!isSignedIn, queryKey: getGetCurrentProfileQueryKey() } });
  const completeProfile = useCompleteProfile();
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<InitialRole>("FARMER");
  const [validationError, setValidationError] = useState("");
  const profileIsComplete = !!profile.data?.onboardingComplete && !!profile.data.profile;
  const savedProfile = profile.data?.profile;
  useEffect(() => {
    if (profileIsComplete && savedProfile) {
      const roles = savedProfile.roles;
      router.replace(roles.includes("ADMIN") ? "/admin/dashboard" : roles.includes("OWNER") ? "/owner/dashboard" : "/farmer/dashboard");
    }
  }, [profileIsComplete, savedProfile, router]);

  if (!isLoaded || (isSignedIn && profile.isLoading)) return <LoadingPanel label="Preparing your profile setup" />;
  if (!isSignedIn) return <div data-testid="panel-onboarding-auth-required" className="mx-auto max-w-lg rounded-[28px] border border-[var(--line)] bg-[#faf8f1] p-8 text-center sm:p-10">
    <h1 className="font-display text-3xl">First, sign in to AgriShare.</h1><p className="mt-3 text-sm leading-6 text-[#6c796f]">Your profile is connected to your secure account.</p>
    <Link href="/login" data-testid="link-onboarding-login" className="mt-6 inline-flex rounded-full bg-[var(--moss)] px-6 py-3 text-sm font-semibold text-white">Go to sign in</Link>
  </div>;
  if (profile.isError) return <ErrorPanel onRetry={() => void profile.refetch()} />;
  if (profileIsComplete) {
    return <LoadingPanel label="Taking you to your AgriShare home" />;
  }
  if (!profile.data?.authenticated) return <div role="alert" data-testid="status-profile-unavailable" className="rounded-3xl border border-[#e8c8b9] bg-[#fcf4ef] p-8 text-center"><h1 className="font-display text-2xl">Your session isn’t ready yet.</h1><p className="mt-2 text-sm text-[#6c796f]">Please sign in again, then return to set up your profile.</p><Link href="/login" data-testid="link-profile-signin" className="mt-5 inline-flex rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white">Sign in</Link></div>;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = displayName.trim();
    if (cleanName.length < 2 || cleanName.length > 80) {
      setValidationError("Enter a name between 2 and 80 characters.");
      return;
    }
    setValidationError("");
    completeProfile.mutate({ data: { displayName: cleanName, role } }, {
      onSuccess: (userProfile) => {
        queryClient.setQueryData(getGetCurrentProfileQueryKey(), (current) => current
          ? { ...current, authenticated: true, onboardingComplete: true, profile: userProfile }
          : current);
        const destination = userProfile.roles.includes("ADMIN") ? "/admin/dashboard" : userProfile.roles.includes("OWNER") ? "/owner/dashboard" : "/farmer/dashboard";
        router.replace(destination);
      },
    });
  }

  return <section data-testid="form-onboarding-panel" className="mx-auto grid max-w-5xl overflow-hidden rounded-[30px] border border-[var(--line)] bg-[#faf8f1] shadow-[0_22px_70px_-50px_rgba(36,55,42,.32)] md:grid-cols-[.8fr_1.2fr]">
    <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-[var(--moss)] p-7 text-[#f4f1e8] sm:p-9 md:min-h-full">
      <div className="absolute -bottom-16 -left-12 h-64 w-64 rounded-full border border-white/10" /><div className="absolute -bottom-4 left-0 h-40 w-40 rounded-full border border-white/10" />
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10"><Sprout size={23} /></span>
      <div className="relative mt-10 md:mt-20"><span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d7c987]">Welcome to AgriShare</span><h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-.04em]">Every good season starts somewhere.</h1><p className="mt-4 max-w-sm text-sm leading-6 text-[#d9e0d5]">A few details help us make your space feel like yours.</p></div>
      <span className="relative mt-8 text-xs text-[#c5d0c3]">Your profile stays connected to your secure account.</span>
    </div>
    <div className="p-6 sm:p-10 md:p-12">
      <span className="text-xs font-bold uppercase tracking-[.18em] text-[var(--clay)]">Profile setup · 1 of 1</span>
      <h2 className="mt-3 font-display text-3xl tracking-[-.03em] sm:text-4xl">How will you use AgriShare?</h2>
      <p className="mt-3 text-sm leading-6 text-[#6c796f]">Choose your starting role. You can get started in just a moment.</p>
      <form onSubmit={handleSubmit} className="mt-7">
        <label htmlFor="displayName" className="block text-sm font-semibold">Your name</label>
        <input id="displayName" name="displayName" type="text" autoComplete="name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={80} placeholder="Name you go by" data-testid="input-display-name" aria-describedby={validationError ? "onboarding-error" : "name-help"} className="mt-2.5 w-full rounded-2xl border border-[#d9d6c9] bg-[#f5f2e9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9a9d90] focus:border-[var(--leaf)] focus:ring-2 focus:ring-[#66804a]/15" />
        <p id="name-help" className="mt-2 text-xs text-[#81887e]">This is how your profile will appear.</p>
        <fieldset className="mt-7">
          <legend className="text-sm font-semibold">I’m here as a…</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button type="button" role="radio" aria-checked={role === "FARMER"} onClick={() => setRole("FARMER")} data-testid="button-role-farmer" className={`rounded-2xl border p-4 text-left transition ${role === "FARMER" ? "border-[var(--moss)] bg-[#e8ede2] ring-2 ring-[#315c3c]/10" : "border-[#d9d6c9] bg-[#f5f2e9] hover:border-[#aab79e]"}`}>
              <span className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#dbe4d3] text-[var(--moss)]"><Sprout size={20} /></span><span className={`grid h-5 w-5 place-items-center rounded-full border ${role === "FARMER" ? "border-[var(--moss)] bg-[var(--moss)] text-white" : "border-[#c8c9bd]"}`}>{role === "FARMER" && <Check size={12} />}</span></span>
              <span className="mt-4 block text-sm font-bold">Farmer</span><span className="mt-1 block text-xs leading-5 text-[#71796e]">I’m looking for access to equipment.</span>
            </button>
            <button type="button" role="radio" aria-checked={role === "OWNER"} onClick={() => setRole("OWNER")} data-testid="button-role-owner" className={`rounded-2xl border p-4 text-left transition ${role === "OWNER" ? "border-[var(--moss)] bg-[#e8ede2] ring-2 ring-[#315c3c]/10" : "border-[#d9d6c9] bg-[#f5f2e9] hover:border-[#aab79e]"}`}>
              <span className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f0dfd3] text-[var(--clay)]"><Tractor size={20} /></span><span className={`grid h-5 w-5 place-items-center rounded-full border ${role === "OWNER" ? "border-[var(--moss)] bg-[var(--moss)] text-white" : "border-[#c8c9bd]"}`}>{role === "OWNER" && <Check size={12} />}</span></span>
              <span className="mt-4 block text-sm font-bold">Equipment owner</span><span className="mt-1 block text-xs leading-5 text-[#71796e]">I own machinery I’d like to share.</span>
            </button>
          </div>
        </fieldset>
        {(validationError || completeProfile.isError) && <p id="onboarding-error" role="alert" data-testid="status-onboarding-error" className="mt-4 rounded-xl border border-[#e8c8b9] bg-[#fcf4ef] px-4 py-3 text-sm text-[#8d4934]">{validationError || "We couldn’t save your profile. Please try again."}</p>}
        <button type="submit" disabled={completeProfile.isPending} data-testid="button-complete-profile" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--moss)] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#25492f] disabled:cursor-wait disabled:opacity-70">{completeProfile.isPending && <LoaderCircle size={16} className="animate-spin" />}{completeProfile.isPending ? "Setting up your profile…" : "Continue to AgriShare"}</button>
      </form>
      <div className="mt-6"><SecureNote /></div>
    </div>
  </section>;
}
