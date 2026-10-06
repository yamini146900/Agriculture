import { auth, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { createInitialProfile } from "@/lib/services/user-profile";
import { profileInputSchema } from "@/lib/validation/profile";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }

    const parsed = profileInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Check your name and account type, then try again." },
        { status: 400 },
      );
    }

    const clerkUser = await currentUser();
    const email = clerkUser?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json(
        { error: "Add and verify an email address before continuing." },
        { status: 400 },
      );
    }

    const result = await createInitialProfile({
      clerkUserId: userId,
      email,
      profile: parsed.data,
    });

    return NextResponse.json(result.profile, { status: result.created ? 201 : 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "That email address is already linked to another account." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "We couldn't complete your profile. Please try again." },
      { status: 500 },
    );
  }
}
