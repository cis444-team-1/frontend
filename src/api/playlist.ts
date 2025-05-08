import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { PlaylistSchema } from "../features/base/schemas/playlist-schema";
import { uploadImage } from "./utils";
import { queryKeys } from "./query-keys";
import { PlaylistAPIRequest } from "../types/playlist";
import { api } from "./api-client";
import { routes } from "./routes";
import { SongAPIRequest } from "../types/song";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation<void, { error: string }, PlaylistSchema>({
    mutationFn: async (values: PlaylistSchema) => {
      let imageUrl = "";
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

      const payload: PlaylistAPIRequest = {
        title: values.title,
        description: values.description,
        is_public: values.isPublic,
        image_src: imageUrl,
      };

      await api.post(routes.createPlaylist, payload);
    },
    onSuccess: () => {
      toast.success("Playlist created! View your library to see it.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PLAYLISTS],
      });
    },
    onError: (e) => {
      toast.error("Something went wrong. Try again later.");
      console.log(e);
      return { error: "Something went wrong. Try again later." };
    },
  });
}

export function useUpdatePlaylist() {}

export function useDeletePlaylist() {}

export function useAddSongToPlaylist() {
  return useMutation({
    mutationFn: async ({
      trackId,
      ids,
    }: {
      trackId: string;
      ids: string[];
    }) => {
      for (const id of ids) {
        await api.post(routes.addSongToPlaylist(id), {
          track_id: trackId,
          position: 0,
        });
      }
    },
    onSuccess: () => {
      toast.success("Song added to playlist(s)!");
    },
    onError: (e) => {
      toast.error("Something went wrong. Try again later.");
      console.log(e);
    },
  });
}

export function useRemoveSongFromPlaylist(trackId: string, ids: string[]) {
  return useMutation({
    mutationFn: async () => {
      for (const id of ids) {
        await api.post(routes.removeSongFromPlaylist(id), {
          track_id: trackId,
        });
      }
    },
    onSuccess: () => {
      toast.success("Song removed from playlist(s)!");
    },
    onError: (e) => {
      toast.error("Something went wrong. Try again later.");
      console.log(e);
      return { error: "Something went wrong. Try again later." };
    },
  });
}

export function useGetPlaylist(playlistId: string) {
  return useQuery<PlaylistAPIRequest>({
    queryKey: [queryKeys.PLAYLIST],
    queryFn: async () => {
      const { data } = await api.get(routes.getPlaylistById(playlistId));
      console.log(data);
      return data;
    },
  });
}

export function useGetPlaylistSongs(playlistId: string) {
  return useQuery<SongAPIRequest[]>({
    queryKey: [queryKeys.SONGS],
    queryFn: async () => {
      const { data } = await api.get(routes.getPlaylistTracks(playlistId));
      console.log(data);
      return data;
    },
  });
}

export function useGetPersonalPlaylists(): UseQueryResult<
  PlaylistAPIRequest[],
  Error
> {
  return useQuery<PlaylistAPIRequest[]>({
    queryKey: [queryKeys.PLAYLISTS],
    queryFn: async () => {
      const { data } = await api.get(routes.getUserPlaylists);
      return data;
    },
  });
}

export function useGetNewReleases() {
  return useQuery<PlaylistAPIRequest[]>({
    queryKey: [queryKeys.NEW_RELEASES],
    queryFn: async () => {
      const { data } = await api.get(routes.newReleases);
      return data;
    },
  });
}

export function useGetPublicPlaylists() {}
