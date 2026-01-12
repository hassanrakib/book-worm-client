import { isStrongPassword } from "validator";
import { z } from "zod";

export const userSignupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  profilePhoto: z
    .array(z.instanceof(File), { message: "Profile photo is required" })
    .min(1, "Please upload a profile photo")
    .max(1, "You can only upload one photo"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format."
    ),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .refine((password: string) => isStrongPassword(password), {
      message: "Password must be strong",
    }),
});
