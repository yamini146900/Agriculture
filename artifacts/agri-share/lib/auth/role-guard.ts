import "server-only";

import type { Role } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { PublicUserProfile } from "@/lib/services/user-profile";

function preferredDashboard(roles: Role[]): string {
  if (roles.includes("ADMIN")) return "/admin/dashboard";
  if (roles.includes("OWNER")) return "/owner/dashboard";
  if (roles.includes("FARMER")) return "/farmer/dashboard";
  return "/onboarding";
}

export async function requireRole(requiredRole: Role): Promise<PublicUserProfile> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: { roles: true },
  });

  if (!user || user.roles.length === 0) {
    redirect("/onboarding");
  }

  if (!user.isActive) {
    redirect("/login?error=account-disabled");
  }

  const roles = user.roles.map(({ role }) => role);
  if (!roles.includes(requiredRole)) {
    redirect(preferredDashboard(roles));
  }

  return {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    roles,
  };
}
