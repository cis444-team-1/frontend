import { playlists } from "../../types/playlist";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import Filters from "./components/filters";
import { users } from "../../types/user";
import { VerticalArtistCard } from "../../components/artist-card/vertical-card";
import { Input } from "../../components/input/input";
import { Search } from "lucide-react";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { LongHorizontalSongCard } from "../../components/song-card/long-song-card";
import { songs } from "../../types/song";

export default function LibraryPage() {
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
            <VerticalPlaylistCard playlist={playlist} showVisibility />
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

      <div className={styles.sectionContainer}>
        <ScrollArea title="Uploads">
          <div className={styles.songContainer}>
            {songs.map((song) => (
              <LongHorizontalSongCard song={song} />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
