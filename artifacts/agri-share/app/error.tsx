"use client";

import Link from "next/link";
import { Sprout } from "lucide-react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      role="alert"
      data-testid="status-page-error"
      className="grid min-h-[70vh] place-items-center px-5 py-16"
    >
      <section className="w-full max-w-lg rounded-[28px] border border-[var(--line)] bg-[#faf8f1] p-8 text-center sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e5eadf] text-[var(--moss)]">
          <Sprout size={25} />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-[var(--clay)]">
          A small pause
        </p>
        <h1 className="mt-3 font-display text-3xl text-[var(--ink)]">
          This page didn’t load as expected.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#68746b]">
          Your account is unchanged. Try again, or return to the AgriShare home page.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            data-testid="button-page-retry"
            className="rounded-full bg-[var(--moss)] px-6 py-3 text-sm font-semibold text-white hover:bg-[#25492f]"
          >
            Try again
          </button>
          <Link
            href="/"
            data-testid="link-page-home"
            className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-[#eeebdf]"
          >
            AgriShare home
          </Link>
        </div>
      </section>
    </main>
  );
}
