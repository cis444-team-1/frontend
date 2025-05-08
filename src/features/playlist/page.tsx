import { Playlist } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import { PlaylistInfo } from "./components/playlist-info";
import styles from "./styles/page.module.css";
import { useSession } from "../../hooks/session-hook";
import { Navigate } from "react-router";
import { Header } from "../base/components/header";
import { useGetPlaylist, useGetPlaylistSongs } from "../../api/playlist";
import { Loader } from "../../components/loader/loader";
import { Loader2 } from "lucide-react";

export default function PlaylistPage() {
  const { session } = useSession();
  const playlistId = window.location.pathname.split("/")[2];

  const playlist = useGetPlaylist(playlistId);
  const songs = useGetPlaylistSongs(playlistId);

  if (!session) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      {playlist.isPending ? (
        <Loader />
      ) : !playlist.data ? (
        <p>Playlist not found</p>
      ) : (
        <PlaylistInfo
          playlist={playlist.data as Playlist}
          songs={songs.data || []}
        />
      )}

      {songs.isPending ? (
        <Loader2 />
      ) : !songs.data ? (
        <p style={{ padding: "1rem" }}>
          Currently no songs in this playlist. Add some!
        </p>
      ) : (
        <div style={{ minWidth: "100%" }}>
          <TrackTable songs={songs.data} />
        </div>
      )}
    </div>
  );
}
