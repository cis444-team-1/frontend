import { playlists } from "../../types/playlist";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import Filters from "./components/filters";
import { users } from "../../types/user";
import { VerticalArtistCard } from "../../components/artist-card/vertical-card";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { LongHorizontalSongCard } from "../../components/song-card/long-song-card";
import { songs } from "../../types/song";
import { useSession } from "../../hooks/session-hook";
import { Navigate } from "react-router";
import { Header } from "../base/components/header";

export default function LibraryPage() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Playlists</p>
        <Filters />
        <div className={styles.playlistContainer}>
          {playlists.map((playlist, index) => (
            <VerticalPlaylistCard
              key={index}
              playlist={playlist}
              showVisibility
            />
          ))}
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Artists</p>
        <div className={styles.artistContainer}>
          {users.map((user, index) => (
            <VerticalArtistCard key={index} user={user} />
          ))}
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea title="Uploads">
          <div className={styles.divider} />
          <div className={styles.songContainer}>
            {songs.map((song, index) => (
              <LongHorizontalSongCard key={index} song={song} />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
