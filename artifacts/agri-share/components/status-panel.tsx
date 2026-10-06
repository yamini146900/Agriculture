import { AlertTriangle, LoaderCircle, ShieldCheck } from "lucide-react";

export function LoadingPanel({ label = "Checking your account" }: { label?: string }) {
  return <div role="status" data-testid="status-loading" className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-3xl border border-[var(--line)] bg-[#faf8f1] p-8 text-center">
    <div className="relative h-10 w-10"><span className="absolute inset-0 animate-ping rounded-full bg-[#d9e2d1]" /><LoaderCircle className="relative animate-spin text-[var(--moss)]" size={38} strokeWidth={1.5} /></div>
    <div><p className="font-semibold">{label}</p><p className="mt-1 text-sm text-[#738077]">A moment while we get things ready.</p></div>
  </div>;
}

export function ErrorPanel({ onRetry, message = "We couldn’t reach your profile right now." }: { onRetry: () => void; message?: string }) {
  return <div role="alert" data-testid="status-error" className="rounded-3xl border border-[#e8c8b9] bg-[#fcf4ef] p-8 text-center">
    <AlertTriangle className="mx-auto text-[var(--clay)]" size={28} />
    <h2 className="mt-4 font-display text-2xl">A small pause in the field</h2>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d736a]">{message} Please check your connection and try again.</p>
    <button type="button" data-testid="button-retry" onClick={onRetry} className="mt-5 rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25492f]">Try again</button>
  </div>;
}

export function SecureNote() {
  return <div data-testid="notice-secure-session" className="flex items-center justify-center gap-2 text-xs text-[#788278]"><ShieldCheck size={15} /> Your account and profile are securely connected.</div>;
}
