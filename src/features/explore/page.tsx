import { Search } from "lucide-react";
import Badge from "../../components/badge/badge";
import { Input } from "../../components/input/input";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { HorizontalSongCard } from "../../components/song-card/song-card";
import { playlists } from "../../types/playlist";
import { MUSIC_TYPES, songs } from "../../types/song";
import styles from "./styles/page.module.css";

export default function ExplorePage() {
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
        <p className={styles.pageTitle}>New releases</p>
        <div className={styles.playlistContainer}>
          {playlists.map((playlist) => (
            <VerticalPlaylistCard playlist={playlist} />
          ))}
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Top Charts">
          <div className={styles.songContainer}>
            {songs.map((song) => (
              <HorizontalSongCard song={song} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Moods & Genres">
          <div className={styles.genreContainer}>
            {MUSIC_TYPES.map((type) => (
              <Badge
                label={type}
                onClick={() => {}}
                borderRadius={5}
                variant="outline"
                size="large"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Trending">
          <div className={styles.songContainer}>
            {songs.map((song) => (
              <HorizontalSongCard song={song} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
