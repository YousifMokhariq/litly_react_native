import { z } from "zod";

// 🎬 Replaces Movie.java
export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  genre: z.string(),
  releaseYear: z.number(),
  director: z.string(),
  posterUrl: z.string().url().nullable().or(z.string().length(0)),
  averageRating: z.coerce.number().default(0), 
  reviewCount: z.coerce.number().default(0),
});

// ✍️ Replaces Review.java
export const ReviewSchema = z.object({
  id: z.number().optional(), // Optional for new reviews being sent to API
  movieId: z.number().optional(), // Optional - provided by the form
  userId: z.number().optional(), // Optional - might be auto-assigned by backend
  username: z.string().optional(),
  rating: z.number().min(1, "Rating must be between 1 and 5").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
  createdAt: z.string().optional(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type Review = z.infer<typeof ReviewSchema>;