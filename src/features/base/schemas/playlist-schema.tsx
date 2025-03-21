import { z } from "zod";

export const PlaylistSchema = z.object({
  title: z
    .string()
    .min(2, "Playlist name must be at least 2 characters")
    .max(50, "Playlist name must be less than 50 characters"),
  description: z
    .string()
    .max(100, "Playlist description must be less than 100 characters")
    .optional(),
  isPublic: z.boolean(),
  imageSrc: z.instanceof(File).nullable(),
});

export type PlaylistSchema = z.infer<typeof PlaylistSchema>;
