import { playlists } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import Filters from "./components/filters";
import { users } from "../../types/user";
import { VerticalArtistCard } from "../../components/artist-card/vertical-card";
import { Input } from "../../components/input/input";
import { Search } from "lucide-react";

export default function LibraryPage() {
  const playlist = playlists[0];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Input
          placeholder="Search music, artists, albums, or playlists..."
          size="xlarge"
          icon={<Search />}
          className={styles.searchInput}
        />
      </div>

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

      <div>
        <p className={styles.pageTitle} style={{ marginLeft: "1rem" }}>
          Uploads
        </p>

        <div style={{ minWidth: "100%" }}>
          <TrackTable playlist={playlist} />
        </div>
      </div>
    </div>
  );
}
