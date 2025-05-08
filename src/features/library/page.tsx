import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import Filters from "./components/filters";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { LongHorizontalSongCard } from "../../components/song-card/long-song-card";
import { useSession } from "../../hooks/session-hook";
import { Navigate } from "react-router";
import { Header } from "../base/components/header";
import { useGetUserPrivateUploads } from "../../api/tracks";
import { Loader } from "../../components/loader/loader";
import { useGetPersonalPlaylists } from "../../api/playlist";
import { useMemo } from "react";
import { useGetPublicUsers } from "../../api/user";
import { PublicUser } from "../../types/user";

export default function LibraryPage() {
  const { session } = useSession();
  const uploads = useGetUserPrivateUploads();
  const playlists = useGetPersonalPlaylists();

  const userIds = useMemo(() => {
    if (!playlists.data) {
      return [];
    }
    return Array.from(new Set(playlists.data.map((p) => p.user_id || "")));
  }, [playlists]);

  const { data: users, isLoading: usersLoading } = useGetPublicUsers(userIds);

  const userMap = useMemo(() => {
    const map: Record<string, PublicUser> = {};
    users?.forEach((user: PublicUser) => {
      map[user.id] = user;
    });
    return map;
  }, [users]);

  if (!session) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Your Playlists</p>
        {playlists.isPending || usersLoading ? (
          <Loader />
        ) : !playlists.data ? (
          <div>No playlists!</div>
        ) : (
          <>
            <Filters />
            <div className={styles.playlistContainer}>
              {playlists.data.map((playlist, index) => (
                <VerticalPlaylistCard
                  key={index}
                  playlist={playlist}
                  showVisibility
                  username={
                    playlist.user_id &&
                    userMap[playlist.user_id]?.user_metadata.username
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Followed Playlists</p>
      </div> */}

      {/* <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Artists</p>
        <div className={styles.artistContainer}>
          {users.map((user, index) => (
            <VerticalArtistCard key={index} user={user} />
          ))}
        </div>
      </div> */}

      <div className={styles.sectionContainer}>
        {uploads.isPending ? (
          <Loader />
        ) : !uploads.data ? (
          <div>No uploads!</div>
        ) : (
          <ScrollArea title="Uploads">
            <div className={styles.divider} />
            <div className={styles.songContainer}>
              {uploads.data.map((upload, index) => (
                <LongHorizontalSongCard key={index} song={upload} />
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
