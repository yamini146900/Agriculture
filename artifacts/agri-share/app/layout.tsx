import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import "./globals.css";
import { Providers } from "../components/providers";

export const metadata: Metadata = {
  title: "AgriShare — good equipment, shared locally",
  description: "Reliable access to agricultural equipment, shared by local farmers and equipment owners.",
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "AgriShare — good equipment, shared locally",
    description: "Reliable access to agricultural equipment, shared by local farmers and equipment owners.",
    type: "website",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
  const requestHost = forwardedHost.split(",")[0]?.trim() ?? "localhost";
  let hostname = "localhost";
  try {
    hostname = new URL(`http://${requestHost}`).hostname;
  } catch {
    // Fall back to the configured key if the incoming host is malformed.
  }
  const publishableKey = publishableKeyFromHost(hostname, process.env.CLERK_PUBLISHABLE_KEY);

  if (!publishableKey) {
    throw new Error("Clerk publishable key is not configured.");
  }

  const protocol = (requestHeaders.get("x-forwarded-proto") ?? "https").split(",")[0]?.trim();
  const logoImageUrl = `${protocol || "https"}://${requestHost}/logo.svg`;
  const proxyUrl =
    process.env.CLERK_PROXY_URL ??
    process.env.NEXT_PUBLIC_CLERK_PROXY_URL ??
    process.env.VITE_CLERK_PROXY_URL ??
    "";

  return (
    <html lang="en">
      <body>
        <Providers
          publishableKey={publishableKey}
          proxyUrl={proxyUrl}
          logoImageUrl={logoImageUrl}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
