import { playlists } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card.tsx/vertical-card";
import { Button } from "../../components/button/button";
import { Filter } from "lucide-react";

export default function LibraryPage() {
  const playlist = playlists[0];

  return (
    <div className={styles.pageContainer}>
      <ScrollArea style={{ flex: 1, marginTop: "0.75rem" }}>
        <div
          style={{
            padding: "1rem",
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          <p>Playlists</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div>Public</div>
            <div>Private</div>
            <div>Not Mine</div>
            <Button icon={<Filter />} />
          </div>
          <div className={styles.playlistContainer}>
            {playlists.map((playlist) => (
              <VerticalPlaylistCard playlist={playlist} />
            ))}
          </div>
        </div>

        <div>
          <p>Artists</p>
          <ul></ul>
        </div>

        <p>Uploads</p>

        <div style={{ minWidth: "100%" }}>
          <TrackTable playlist={playlist} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
