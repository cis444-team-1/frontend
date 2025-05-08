import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AudioUploadSchema } from "../features/base/schemas/audio-upload-schema";
import { uploadImage } from "./utils";
import { toast } from "sonner";
import { SongAPIRequest } from "../types/song";
import { api } from "./api-client";
import { routes } from "./routes";
import { queryKeys } from "./query-keys";

export function useCreateTrack() {
  const queryClient = useQueryClient();

  return useMutation<void, { error: string }, AudioUploadSchema>({
    mutationFn: async (values: AudioUploadSchema) => {
      let imageUrl = "/logo.png";
      let audioUrl = "";

      // Upload image
      if (values.imageSrc) {
        const data = await uploadImage(values.imageSrc);

        if (data && data.url) {
          imageUrl = data.url;
        } else {
          toast.error(
            "Something went wrong when uploading image. Try again later."
          );
          console.log("ERROR UPLOADING IMAGE", data);
          return;
        }
      }

      // Upload audio
      if (values.audioSrc) {
        const data = await uploadImage(values.audioSrc);

        if (data && data.url) {
          audioUrl = data.url;
        } else {
          toast.error(
            "Something went wrong when uploading audio. Try again later."
          );
          console.log("ERROR UPLOADING AUDIO", data);
          return;
        }
      }

      const payload: Partial<SongAPIRequest> = {
        title: values.title,
        description: values.description,
        image_src: imageUrl,
        audio_src: audioUrl,
        album_title: values.album || "",
        artist_name: values.artist || "",
        duration_seconds: 0,
      };

      await api.post(routes.createTrack, payload);
    },
    onSuccess: () => {
      toast.success("Track uploaded. View your library to see it.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRIVATE_UPLOADS],
      });
    },
    onError: (e) => {
      toast.error("Something went wrong. Try again later.");
      console.log(e);
      return { error: "Something went wrong. Try again later." };
    },
  });
}

export function useGetTrack(trackId: string) {
  return useQuery<SongAPIRequest>({
    queryKey: [queryKeys.SONGS, trackId],
    queryFn: async () => {
      const { data } = await api.get(routes.getTrackById(trackId));
      return data;
    },
  });
}

export function useGetUserPrivateUploads() {
  return useQuery<SongAPIRequest[]>({
    queryKey: [queryKeys.PRIVATE_UPLOADS],
    queryFn: async () => {
      const { data } = await api.get(routes.getUserPrivateUploads);
      console.log(data);
      return data;
    },
  });
}

export function useAddToPlayHistory() {
  return useMutation({
    mutationFn: async ({ trackId }: { trackId: string }) => {
      await api.post(routes.addToPlayHistory(trackId), {
        track_id: trackId,
      });
    },
  });
}

export function useRemoveFromPlayHistory() {
  return useMutation({
    mutationFn: async ({ trackId }: { trackId: string }) => {
      await api.post(routes.removeFromPlayHistory(trackId), {
        track_id: trackId,
      });
    },
  });
}

export function useGetPlayhistory() {
  return useQuery<(SongAPIRequest & { played_at: Date })[]>({
    queryKey: [queryKeys.PLAY_HISTORY],
    queryFn: async () => {
      const { data } = await api.get(routes.getPlayHistory);
      return data;
    },
  });
}

export function useGetTrendingMusic() {
  return useQuery<SongAPIRequest[]>({
    queryKey: [queryKeys.TRENDING],
    queryFn: async () => {
      const { data } = await api.get(routes.trending);
      return data;
    },
  });
}

export function useGetTopCharts() {
  return useQuery<SongAPIRequest[]>({
    queryKey: [queryKeys.TOP_CHARTS],
    queryFn: async () => {
      const { data } = await api.get(routes.topCharts);
      return data;
    },
  });
}
