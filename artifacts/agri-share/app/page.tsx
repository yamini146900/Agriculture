import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, Handshake, Sprout, Tractor } from "lucide-react";
import { SiteNav } from "../components/site-nav";
import { findProfileByClerkId } from "../lib/services/user-profile";

function FieldArtwork() {
  return <div aria-label="Illustrated rolling fields at golden hour" role="img" data-testid="illustration-fields" className="relative h-[340px] overflow-hidden rounded-[28px] bg-[#d9c989] sm:h-[440px]">
    <svg viewBox="0 0 800 520" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d9c98f"/><stop offset="1" stopColor="#f1d59b"/></linearGradient></defs>
      <rect width="800" height="520" fill="url(#sky)"/>
      <circle cx="598" cy="128" r="51" fill="#f4e3b2" opacity=".9"/>
      <path d="M0 278 Q156 199 328 256T800 223V520H0Z" fill="#8c9a63"/>
      <path d="M0 322 Q199 246 408 315T800 272V520H0Z" fill="#59764e"/>
      <path d="M0 379 Q190 294 393 359T800 318V520H0Z" fill="#385e3f"/>
      <path d="M-30 534 Q185 410 325 360T660 282" fill="none" stroke="#d2b66a" strokeWidth="34" opacity=".78"/>
      <path d="M-30 534 Q185 410 325 360T660 282" fill="none" stroke="#ead79a" strokeWidth="3" strokeDasharray="7 13" opacity=".9"/>
      <path d="M-10 505 Q198 390 342 345T685 257" fill="none" stroke="#253f31" strokeWidth="3" opacity=".25"/>
      <g fill="#314f37"><path d="M120 273h17v-38h-17z"/><path d="M110 245l18-29 18 29z"/><path d="M129 238l17-28 16 28z"/><path d="M686 250h15v-34h-15z"/><path d="M677 225l17-26 17 26z"/></g>
      <g fill="#f4e8ca" opacity=".82"><path d="M84 348c20-13 37-15 52-8-16 1-27 8-34 20z"/><path d="M534 364c16-10 28-11 40-6-12 1-20 6-26 15z"/></g>
    </svg>
    <div className="absolute bottom-4 left-4 flex max-w-[240px] items-center gap-3 rounded-2xl border border-white/30 bg-[#f4f1e8]/90 px-4 py-3 backdrop-blur-sm sm:bottom-6 sm:left-6">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--moss)] text-[#f4f1e8]"><Tractor size={19} /></span>
      <span><span className="block text-xs font-bold uppercase tracking-[.13em] text-[var(--moss)]">Made for the season</span><span className="mt-1 block text-xs text-[#677166]">Local equipment. Shared know-how.</span></span>
    </div>
    <span className="absolute right-5 top-5 rounded-full bg-[var(--moss)] px-3 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#f4f1e8]">Rooted in community</span>
  </div>;
}

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    const profile = await findProfileByClerkId(userId);
    if (!profile) {
      redirect("/onboarding");
    }
    if (profile.roles.includes("ADMIN")) {
      redirect("/admin/dashboard");
    }
    redirect(profile.roles.includes("OWNER") ? "/owner/dashboard" : "/farmer/dashboard");
  }

  return <main>
    <SiteNav />
    <section className="mx-auto grid max-w-7xl gap-9 px-5 pb-16 pt-10 md:grid-cols-[1.03fr_.97fr] md:items-center md:px-9 md:pb-24 md:pt-16">
      <div className="reveal">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8d6c5] bg-[#eeebdf] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.18em] text-[var(--moss)]"><span className="h-2 w-2 rounded-full bg-[var(--clay)]" /> A better way to share the work</div>
        <h1 data-testid="text-hero-title" className="font-display max-w-[690px] text-[52px] leading-[.99] tracking-[-.055em] sm:text-[68px] lg:text-[78px]">Good equipment.<br /><span className="text-[var(--clay)]">Shared locally.</span></h1>
        <p className="mt-7 max-w-[490px] text-[16px] leading-7 text-[#637067] sm:text-[18px]">AgriShare brings farmers and equipment owners together, so the right machinery is closer when the season calls for it.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/register" data-testid="link-hero-join" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--moss)] px-6 py-4 text-sm font-semibold text-[#f4f1e8] transition hover:bg-[#25492f]">Find your place on AgriShare <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          <a href="#how-it-works" data-testid="link-hero-how" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-6 py-4 text-sm font-semibold text-[var(--ink)] transition hover:bg-[#ebe8dc]">See how it works <ArrowDown size={15} /></a>
        </div>
        <div className="mt-10 flex items-center gap-3 text-xs text-[#748076]"><span className="flex -space-x-2"><i className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--paper)] bg-[#d4ad70] not-italic text-[10px] font-bold text-[#314336]">F</i><i className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--paper)] bg-[#a9b48c] not-italic text-[10px] font-bold text-[#314336]">O</i><i className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--paper)] bg-[#d17d5d] not-italic text-[10px] font-bold text-[#fff3e4]">A</i></span><span>Built around local knowledge and real seasons.</span></div>
      </div>
      <div className="reveal reveal-delay"><FieldArtwork /></div>
    </section>

    <section id="how-it-works" className="border-y border-[var(--line)] bg-[#eeebdf]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[.8fr_1.2fr] md:items-center md:px-9 md:py-20">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--clay)]">The simple idea</p><h2 className="mt-4 max-w-md font-display text-4xl leading-[1.05] tracking-[-.04em] sm:text-5xl">A little more access. A lot more possibility.</h2></div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div data-testid="card-how-step-1" className="border-t border-[#cfcdbf] pt-4"><span className="font-display text-3xl text-[var(--clay)]">01</span><h3 className="mt-4 font-semibold">Join your way</h3><p className="mt-2 text-sm leading-6 text-[#6c796f]">Choose the role that fits your work: farmer or equipment owner.</p></div>
          <div data-testid="card-how-step-2" className="border-t border-[#cfcdbf] pt-4"><span className="font-display text-3xl text-[var(--clay)]">02</span><h3 className="mt-4 font-semibold">Start local</h3><p className="mt-2 text-sm leading-6 text-[#6c796f]">Keep equipment access grounded in the communities that know it best.</p></div>
          <div data-testid="card-how-step-3" className="border-t border-[#cfcdbf] pt-4"><span className="font-display text-3xl text-[var(--clay)]">03</span><h3 className="mt-4 font-semibold">Make the season count</h3><p className="mt-2 text-sm leading-6 text-[#6c796f]">A shared resource can help good work reach further.</p></div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-16 md:px-9 md:py-24">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--leaf)]">Two sides, one community</p><h2 className="mt-3 font-display text-4xl tracking-[-.04em] sm:text-5xl">Better together, by design.</h2></div><p className="max-w-md text-sm leading-6 text-[#6c796f]">A dependable way to make use of what’s already here—and make room for more people to get the work done.</p></div>
      <div className="grid gap-5 md:grid-cols-2">
        <article id="for-farmers" data-testid="card-for-farmers" className="rounded-[28px] bg-[#dce2d2] p-7 sm:p-10">
          <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--moss)] text-[#f4f1e8]"><Sprout size={22} /></span><span className="rounded-full bg-[#edf0e9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-[var(--moss)]">For farmers</span></div>
          <h3 className="mt-8 max-w-sm font-display text-3xl leading-tight tracking-[-.03em]">Get closer to the equipment your season needs.</h3><p className="mt-4 max-w-md text-sm leading-7 text-[#586b5b]">When you need dependable machinery without making a bigger investment, a local owner may already have a way to help.</p>
          <Link href="/register" data-testid="link-farmer-register" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--moss)]">Join as a farmer <ArrowRight size={16} /></Link>
        </article>
        <article id="for-owners" data-testid="card-for-owners" className="rounded-[28px] bg-[#e8d8c9] p-7 sm:p-10">
          <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--clay)] text-[#fff5e9]"><Handshake size={22} /></span><span className="rounded-full bg-[#f3e6d8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#8d4934]">For owners</span></div>
          <h3 className="mt-8 max-w-sm font-display text-3xl leading-tight tracking-[-.03em]">Put your underused machinery to work.</h3><p className="mt-4 max-w-md text-sm leading-7 text-[#746257]">Share what you own with people nearby and help the whole community make more of the season.</p>
          <Link href="/register" data-testid="link-owner-register" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8d4934]">Join as an owner <ArrowRight size={16} /></Link>
        </article>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[var(--moss)] text-[#f4f1e8]">
      <div className="pointer-events-none absolute -right-14 top-[-180px] h-[450px] w-[450px] rounded-full border border-white/10" /><div className="pointer-events-none absolute -right-2 top-[-125px] h-[340px] w-[340px] rounded-full border border-white/10" />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-9 md:py-20">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#d7c987]">Good things grow nearby</p><h2 className="mt-4 font-display text-4xl leading-tight tracking-[-.04em] sm:text-6xl">Let’s make sharing part of the season.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#d6ded2]">Set up your AgriShare account and choose the role that feels right for you.</p></div>
        <Link href="/register" data-testid="link-bottom-register" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#e5cf8f] px-6 py-4 text-sm font-bold text-[#243c2d] transition hover:bg-[#f0dda3]">Get started <ArrowUpRight size={17} /></Link>
      </div>
    </section>
    <footer data-testid="footer-site" className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-[#778178] sm:flex-row sm:items-center sm:justify-between md:px-9">
      <Link href="/" data-testid="footer-brand" className="font-display text-lg font-semibold text-[var(--ink)]">AgriShare<span className="text-[var(--clay)]">.</span></Link>
      <span>Made for the people who keep things growing.</span>
      <Link href="/login" data-testid="footer-login" className="font-semibold text-[var(--moss)] hover:underline">Member sign in <ArrowUpRight className="inline" size={12} /></Link>
    </footer>
  </main>;
}
