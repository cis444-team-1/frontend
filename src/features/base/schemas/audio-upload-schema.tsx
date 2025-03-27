import { z } from "zod";

export const AudioUpload = z.object({
  audioSrc: z
    .instanceof(File)
    .nullable()
    .refine((file) => file?.type.startsWith("audio/"), {
      message: "Only audio files are allowed",
    })
    .refine((file) => file?.size || 0 <= 100 * 1024 * 1024, {
      message: "File size must be less than 100MB",
    }),
  title: z.string(),
  imageSrc: z.instanceof(File).optional().nullable(),
  description: z.string().optional(),
  lyrics: z.string().optional(),
  artist: z.string().optional(), // name of artist not id
  album: z.string(), // name of album not id
});

export type AudioUploadSchema = z.infer<typeof AudioUpload>;
