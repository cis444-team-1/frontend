import { playlists } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import Filters from "./components/filters";
import { users } from "../../types/user";
import { VerticalArtistCard } from "../../components/artist-card/vertical-card";

export default function LibraryPage() {
  const playlist = playlists[0];

  return (
    <div className={styles.pageContainer}>
      <ScrollArea style={{ flex: 1, marginTop: "0.75rem" }}>
        <div className={styles.sectionContainer}>
          <p className={styles.pageTitle}>Playlists</p>
          <Filters />
          <div className={styles.playlistContainer}>
            {playlists.map((playlist) => (
              <VerticalPlaylistCard playlist={playlist} />
            ))}
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <p className={styles.pageTitle}>Artists</p>
          <div className={styles.artistContainer}>
            {users.map((user) => (
              <VerticalArtistCard user={user} />
            ))}
          </div>
        </div>

        <p className={styles.pageTitle} style={{ marginLeft: "1rem" }}>
          Uploads
        </p>

        <div style={{ minWidth: "100%" }}>
          <TrackTable playlist={playlist} />
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
