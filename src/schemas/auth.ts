import { isStrongPassword } from "validator";
import { z } from "zod";

export const userSignupSchema = z.object({
  name: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Name is required" : "Name is not valid",
    })
    .trim(),
  email: z
    .email({
      error: (iss) =>
        iss.input === undefined ? "Email is required" : "Email is not valid",
    })
    .trim()
    .toLowerCase(),
  password: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "Password is required"
          : "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long")
    .refine((password: string) => isStrongPassword(password), {
      message: "Password must be strong",
    }),
});
