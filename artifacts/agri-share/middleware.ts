import { clerkMiddleware } from "@clerk/nextjs/server";
import { publishableKeyFromHost } from "@clerk/shared/keys";

export default clerkMiddleware(
  () => undefined,
  (request) => {
    const requestUrl = new URL(request.url);
    const forwardedHost =
      request.headers.get("x-forwarded-host") ??
      request.headers.get("host") ??
      requestUrl.host;
    const host = forwardedHost.split(",")[0]?.trim() ?? requestUrl.host;
    let hostname = requestUrl.hostname;

    try {
      hostname = new URL(`http://${host}`).hostname;
    } catch {
      // Keep the request URL hostname if a forwarded host is malformed.
    }

    return {
      publishableKey: publishableKeyFromHost(
        hostname,
        process.env.CLERK_PUBLISHABLE_KEY,
      ),
    };
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
