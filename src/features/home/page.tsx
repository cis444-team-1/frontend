import { newrelease } from "../../types/newreleaseplaylist";
import { fanfavorites } from "../../types/fanfavorite";
import { playlists } from "../../types/playlist";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import { NewReleases } from "./components/newreleases";
import { FanFavorite } from "./components/fanfavorite";
export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <ScrollArea style={{ flex: 1, marginTop: "0.75rem" }}>
        <div className={styles.sectionContainer}>
          <p className={styles.pageTitle}>Home</p>
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
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
