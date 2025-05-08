import Badge from "../../components/badge/badge";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { HorizontalSongCard } from "../../components/song-card/song-card";
import { MUSIC_TYPES } from "../../types/song";
import styles from "./styles/page.module.css";
import { Header } from "../base/components/header";
import { useGetNewReleases } from "../../api/playlist";
import { useGetTopCharts, useGetTrendingMusic } from "../../api/tracks";

export default function ExplorePage() {
  const newReleases = useGetNewReleases();
  const topCharts = useGetTopCharts();
  const trendingMusic = useGetTrendingMusic();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea title="New Releases" showControls>
          <div className={styles.playlistContainer}>
            {newReleases.data?.map((playlist, index) => (
              <VerticalPlaylistCard playlist={playlist} key={index} />
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
        <ScrollArea showControls title="Top Charts">
          <div className={styles.songContainer}>
            {topCharts.data?.map((song, index) => (
              <HorizontalSongCard song={song} key={index} ranking={index + 1} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Trending Music (last 7 days)">
          <div className={styles.songContainer}>
            {trendingMusic.data?.map((song, index) => (
              <HorizontalSongCard song={song} key={index} ranking={index + 1} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
