import z from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot exceed 5"),

  comment: z.string().trim().min(1, "Comment cannot be empty"),
});
