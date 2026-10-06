import "server-only";

import type { Role, User, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProfileInput } from "@/lib/validation/profile";

type UserWithRoles = User & { roles: UserRole[] };

export type PublicUserProfile = {
  id: string;
  displayName: string;
  email: string;
  roles: Role[];
};

function toPublicProfile(user: UserWithRoles): PublicUserProfile {
  return {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    roles: user.roles.map(({ role }) => role),
  };
}

export async function findProfileByClerkId(
  clerkUserId: string,
): Promise<PublicUserProfile | null> {
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    include: { roles: true },
  });

  return user ? toPublicProfile(user) : null;
}

export async function createInitialProfile(input: {
  clerkUserId: string;
  email: string;
  profile: ProfileInput;
}): Promise<{ profile: PublicUserProfile; created: boolean }> {
  const email = input.email.trim().toLowerCase();

  return prisma.$transaction(async (transaction) => {
    const existing = await transaction.user.findUnique({
      where: { clerkUserId: input.clerkUserId },
      include: { roles: true },
    });

    if (existing?.roles.length) {
      return { profile: toPublicProfile(existing), created: false };
    }

    const user = existing
      ? await transaction.user.update({
          where: { id: existing.id },
          data: {
            email,
            displayName: input.profile.displayName,
            roles: { create: { role: input.profile.role } },
          },
          include: { roles: true },
        })
      : await transaction.user.create({
          data: {
            clerkUserId: input.clerkUserId,
            email,
            displayName: input.profile.displayName,
            roles: { create: { role: input.profile.role } },
          },
          include: { roles: true },
        });

    return { profile: toPublicProfile(user), created: true };
  });
}
