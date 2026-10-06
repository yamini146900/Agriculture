import { PrismaClient, Role } from "@prisma/client";

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  process.stderr.write(
    "Usage: pnpm --filter @workspace/agri-share run grant-admin -- <account-email>\n",
  );
  process.exitCode = 1;
} else {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      process.stderr.write("No AgriShare account exists for that email. Sign up first.\n");
      process.exitCode = 1;
    } else {
      await prisma.userRole.upsert({
        where: { userId_role: { userId: user.id, role: Role.ADMIN } },
        create: { userId: user.id, role: Role.ADMIN },
        update: {},
      });
      process.stdout.write("ADMIN access granted.\n");
    }
  } finally {
    await prisma.$disconnect();
  }
}
