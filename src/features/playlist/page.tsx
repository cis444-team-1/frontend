import { playlists } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import { PlaylistInfo } from "./components/playlist-info";
import styles from "./styles/page.module.css";
import { Input } from "../../components/input/input";
import { Search } from "lucide-react";

export default function PlaylistPage() {
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

      <PlaylistInfo playlist={playlist} />

      <div style={{ minWidth: "100%" }}>
        <TrackTable playlist={playlist} />
      </div>
    </div>
  );
}
