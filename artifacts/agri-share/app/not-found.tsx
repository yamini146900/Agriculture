import Link from "next/link";
import { Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-16">
      <section
        data-testid="status-page-not-found"
        className="w-full max-w-lg rounded-[28px] border border-[var(--line)] bg-[#faf8f1] p-8 text-center sm:p-10"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e5eadf] text-[var(--moss)]">
          <Sprout size={25} />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-[var(--clay)]">
          Page not found
        </p>
        <h1 className="mt-3 font-display text-3xl text-[var(--ink)]">
          This path doesn’t lead to a field we know.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#68746b]">
          Check the address or return to AgriShare.
        </p>
        <Link
          href="/"
          data-testid="link-not-found-home"
          className="mt-7 inline-flex rounded-full bg-[var(--moss)] px-6 py-3 text-sm font-semibold text-white hover:bg-[#25492f]"
        >
          <span className="mr-2">Back to home</span>
        </Link>
      </section>
    </main>
  );
}
