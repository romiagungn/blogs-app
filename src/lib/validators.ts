import { z } from "zod";

export const blogPostSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
    author: z.string().min(3, { message: "Author name must be at least 3 characters long." }),
    summary: z.string().min(10, { message: "Summary must be at least 10 characters long." }),
    category: z.enum(["Tech", "Lifestyle", "Business"]),
    content: z.string().min(20, { message: "Content must be at least 20 characters long." }),
});

export type BlogPostForm = z.infer<typeof blogPostSchema>;
