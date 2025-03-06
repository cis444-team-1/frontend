import { playlists } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import { PlaylistInfo } from "./components/playlist-info";
import styles from "./styles/page.module.css";

export default function PlaylistPage() {
  const playlist = playlists[0];

  return (
    <div className={styles.pageContainer}>
      <PlaylistInfo playlist={playlist} />

      <div style={{ minWidth: "100%" }}>
        <TrackTable playlist={playlist} />
      </div>
    </div>
  );
}
