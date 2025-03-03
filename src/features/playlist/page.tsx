import { playlists } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { PlaylistInfo } from "./components/playlist-info";
import styles from "./styles/page.module.css";

export default function PlaylistPage() {
  const playlist = playlists[0];

  return (
    <div className={styles.pageContainer}>
      <PlaylistInfo playlist={playlist} />

      <ScrollArea style={{ flex: 1, marginTop: "0.75rem" }}>
        <div style={{ minWidth: "100%" }}>
          <TrackTable playlist={playlist} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
