import { useQuery } from "@tanstack/react-query";
import { PublicUser } from "../types/user";
import { queryKeys } from "./query-keys";
import { api } from "./api-client";
import { routes } from "./routes";

export function useGetPublicUser(userId: string) {
  return useQuery<PublicUser>({
    queryKey: [queryKeys.PUBLIC_USERS, userId],
    queryFn: async () => {
      const { data } = await api.get(routes.getPublicUser(userId));
      return data;
    },
  });
}

export function useGetPublicUsers(ids: string[]) {
  return useQuery<PublicUser[]>({
    queryKey: [queryKeys.PUBLIC_USERS],
    queryFn: async () => {
      const { data } = await api.post(routes.getPublicUsers, ids);
      return data;
    },
  });
}
