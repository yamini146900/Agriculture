import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { findProfileByClerkId } from "@/lib/services/user-profile";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const profile = await findProfileByClerkId(userId);

    return NextResponse.json({
      authenticated: true,
      onboardingComplete: Boolean(profile),
      profile,
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn't load your profile. Please try again." },
      { status: 500 },
    );
  }
}
