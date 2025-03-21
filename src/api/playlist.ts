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
import { useSession } from "../hooks/session-hook";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation<void, { error: string }, PlaylistSchema>({
    mutationFn: async (values: PlaylistSchema) => {
      let imageUrl = "";
      if (values.imageSrc) {
        const { data } = await uploadImage(values.imageSrc);

        if (data.url) {
          imageUrl = data.url;
        } else {
          toast.error(
            "Something went wrong when uploading image. Try again later."
          );
          console.log("ERROR UPLOADING IMAGE", data);
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
      toast.success("Playlist created");
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

export function useAddSongToPlaylist() {}

export function useRemoveSongFromPlaylist() {}

export function useGetPlaylist() {}

export function useGetMyPlaylists(): UseQueryResult<
  PlaylistAPIRequest[],
  Error
> {
  const { session } = useSession();

  return useQuery<PlaylistAPIRequest[]>({
    queryKey: [queryKeys.PLAYLISTS],
    queryFn: async () => {
      if (!session) {
        return [];
      }
      const { data } = await api.get(routes.getUserPlaylists(session.user.id));
      return data;
    },
  });
}

export function useGetPublicPlaylists() {}
