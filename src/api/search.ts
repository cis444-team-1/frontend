import { useQuery } from "@tanstack/react-query";
import { PlaylistAPIRequest } from "../types/playlist";
import { SongAPIRequest } from "../types/song";
import { PublicUser } from "../types/user";
import { routes } from "./routes";
import { api } from "./api-client";

type SearchAPIRequest = {
  playlists: PlaylistAPIRequest[];
  tracks: SongAPIRequest[];
  users: PublicUser[];
};

export function useSearch(searchQuery: string) {
  return useQuery<SearchAPIRequest>({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      const { data } = await api.get(routes.search(searchQuery));
      console.log(searchQuery, data);
      return data;
    },
  });
}
