import z from "zod";

export const createBookSchema = z.object({
  title: z.string().trim().min(1, "Book title is required"),

  coverImage: z
    .array(z.instanceof(File), { message: "cover image is required" })
    .min(1, "Please upload a cover image")
    .max(1, "You can only upload one photo"),

  author: z.string().trim().min(1, "Author name is required"),

  category: z.string().trim().min(1, "Book category is required"),

  description: z.string().trim().min(1, "Book title is required"),

  totalPages: z.number().min(1, "Number of total page is required"),
});
