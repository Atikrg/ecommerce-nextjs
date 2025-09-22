import { z } from "zod";

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z
    .union([z.boolean(), z.string().optional()])
    .transform((val) => val === true || val === "true"), // only true stays true
});

// Infer TypeScript type
export type LoginSchema = z.infer<typeof loginSchema>;
