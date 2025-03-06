import { newrelease } from "../../types/newreleaseplaylist";
import { fanfavorites } from "../../types/fanfavorite";
import { playlists } from "../../types/playlist";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import { NewReleases } from "./components/newreleases";
import { FanFavorite } from "./components/fanfavorite";
import { Input } from "../../components/input/input";
import { Search } from "lucide-react";
export default function HomePage() {
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
        <p className={styles.pageTitle}>New Releases for You</p>
        <div className={styles.playlistContainer}>
          {newrelease.map((playlist) => (
            <NewReleases playlist={playlist} />
          ))}
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Recently Played</p>
        <div className={styles.playlistContainer}>
          {playlists.map((playlist) => (
            <VerticalPlaylistCard playlist={playlist} />
          ))}
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Bruno Mars Fans Love</p>
        <div className={styles.playlistContainer}>
          {fanfavorites.map((playlist) => (
            <FanFavorite playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
