import { LoaderCircle, Sprout } from "lucide-react";

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      data-testid="status-page-loading"
      className="grid min-h-[60vh] place-items-center px-5 py-16"
    >
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e5eadf] text-[var(--moss)]">
          <Sprout size={26} />
        </span>
        <p className="mt-5 font-display text-2xl text-[var(--ink)]">Getting things ready</p>
        <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[#68746b]">
          <LoaderCircle size={15} className="animate-spin" />
          Loading your AgriShare page
        </p>
      </div>
    </main>
  );
}
