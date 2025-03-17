import Badge from "../../components/badge/badge";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { HorizontalSongCard } from "../../components/song-card/song-card";
import { playlists } from "../../types/playlist";
import { MUSIC_TYPES, songs } from "../../types/song";
import styles from "./styles/page.module.css";
import { Header } from "../base/components/header";

export default function ExplorePage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea title="New Releases" showControls>
          <div className={styles.playlistContainer}>
            {playlists.map((playlist, index) => (
              <VerticalPlaylistCard playlist={playlist} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Top Charts">
          <div className={styles.songContainer}>
            {songs.map((song, index) => (
              <HorizontalSongCard song={song} ranking={index + 1} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Moods & Genres">
          <div className={styles.genreContainer}>
            {MUSIC_TYPES.map((type, index) => (
              <Badge
                label={type}
                onClick={() => {}}
                borderRadius={5}
                variant="outline"
                size="large"
                key={index}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Trending">
          <div className={styles.songContainer}>
            {songs.map((song, index) => (
              <HorizontalSongCard song={song} ranking={index + 1} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
