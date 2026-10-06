import { z } from "zod";

export const profileInputSchema = z.object({
  displayName: z.string().trim().min(2).max(80),
  // ADMIN is intentionally excluded: elevated access must be assigned out of band.
  role: z.enum(["FARMER", "OWNER"]),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;
