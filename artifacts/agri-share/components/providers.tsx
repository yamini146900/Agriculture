"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: "/",
  },
  variables: {
    colorPrimary: "#315c3c",
    colorForeground: "#1e3228",
    colorMutedForeground: "#68746b",
    colorDanger: "#a64831",
    colorBackground: "#f8f6ee",
    colorInput: "#f5f2e9",
    colorInputForeground: "#1e3228",
    colorNeutral: "#d9d6c9",
    fontFamily: '"DM Sans", sans-serif',
    borderRadius: "1rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-[#f8f6ee] rounded-[24px] w-[440px] max-w-full overflow-hidden border border-[#dedbce]",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "font-semibold text-[#1e3228]",
    headerSubtitle: "text-[#68746b]",
    socialButtonsBlockButtonText: "font-semibold text-[#1e3228]",
    formFieldLabel: "font-semibold text-[#1e3228]",
    footerActionLink: "font-semibold text-[#315c3c]",
    footerActionText: "text-[#68746b]",
    dividerText: "text-[#68746b]",
    identityPreviewEditButton: "text-[#315c3c]",
    formFieldSuccessText: "text-[#315c3c]",
    alertText: "text-[#1e3228]",
    logoBox: "h-10",
    logoImage: "h-10 w-10",
    socialButtonsBlockButton: "rounded-xl border-[#d9d6c9] bg-[#f5f2e9] hover:bg-[#eeebdf]",
    formButtonPrimary: "rounded-full bg-[#315c3c] text-white hover:bg-[#25492f]",
    formFieldInput: "rounded-xl border-[#d9d6c9] bg-[#f5f2e9] text-[#1e3228]",
    footerAction: "text-[#68746b]",
    dividerLine: "bg-[#d9d6c9]",
    alert: "rounded-xl",
    otpCodeFieldInput: "rounded-lg border-[#d9d6c9] bg-[#f5f2e9] text-[#1e3228]",
    formFieldRow: "gap-2",
    main: "gap-5",
  },
};

export function Providers({
  children,
  publishableKey,
  proxyUrl,
  logoImageUrl,
}: {
  children: ReactNode;
  publishableKey: string;
  proxyUrl: string;
  logoImageUrl: string;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
  }));
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      proxyUrl={proxyUrl}
      appearance={{
        ...clerkAppearance,
        options: { ...clerkAppearance.options, logoImageUrl },
      }}
      signInUrl="/login"
      signUpUrl="/register"
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to continue with your AgriShare community.",
          },
        },
        signUp: {
          start: {
            title: "Join AgriShare",
            subtitle: "Create your account and find your place in the community.",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClerkProvider>
  );
}
