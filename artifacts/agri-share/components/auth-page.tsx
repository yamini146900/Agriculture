import Link from "next/link";
import { Sprout } from "lucide-react";
import type { ReactNode } from "react";

export function AuthPage({ children, mode }: { children: ReactNode; mode: "login" | "register" }) {
  return <main className="relative min-h-[100dvh] overflow-hidden bg-[#eeebdf] px-5 py-6 sm:px-8">
    <div className="absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full border border-[#d4d1c3]" /><div className="absolute -right-16 -top-16 h-[300px] w-[300px] rounded-full border border-[#d4d1c3]" />
    <Link href="/" data-testid="link-auth-brand" className="relative z-10 mx-auto flex w-fit items-center gap-2.5 sm:mx-0">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--moss)] text-[#f4f1e8]"><Sprout size={20} /></span><span className="font-display text-2xl font-semibold tracking-[-.04em]">AgriShare<span className="text-[var(--clay)]">.</span></span>
    </Link>
    <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 py-9 md:min-h-[calc(100dvh-88px)] md:grid-cols-[1fr_1fr] md:py-4">
      <section className="hidden max-w-lg md:block">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--clay)]">{mode === "login" ? "Welcome back" : "A good place to begin"}</p>
        <h1 className="mt-4 font-display text-6xl leading-[.98] tracking-[-.05em]">{mode === "login" ? "Your season is waiting." : "Let’s grow something good."}</h1>
        <p className="mt-6 max-w-md text-base leading-7 text-[#68746b]">{mode === "login" ? "Sign in to return to your AgriShare account and your local community." : "Create an account to connect your work with the people and equipment around you."}</p>
        <div className="mt-10 flex items-center gap-3 border-t border-[#d4d1c3] pt-5 text-xs text-[#778178]"><span className="h-2 w-2 rounded-full bg-[var(--leaf)]" /> A dependable start, rooted in community.</div>
      </section>
      <section className="flex flex-col items-center">
        <div className="mb-6 text-center md:hidden"><p className="font-display text-3xl">{mode === "login" ? "Good to have you back." : "Find your place here."}</p><p className="mt-2 text-sm text-[#68746b]">Good equipment. Shared locally.</p></div>
        <div data-testid={`auth-card-${mode}`} className="w-full max-w-[470px] rounded-[28px] border border-[#dedbce] bg-[#f8f6ee] p-4 shadow-[0_20px_70px_-48px_rgba(28,48,34,.3)] sm:p-7">{children}</div>
        <p className="mt-5 text-xs text-[#788178]">Your account is protected by Clerk secure sign-in.</p>
      </section>
    </div>
  </main>;
}
