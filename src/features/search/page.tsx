import styles from "./styles/page.module.css";
import { Button } from "../../components/button/button";
import { songs } from "../../types/song";
import { HorizontalSongCard } from "../../components/song-card/song-card";
import { FeaturedSongCard } from "../../components/song-card/featured-card";
import { usePlayback } from "../../hooks/use-playback";
import { FeaturedPlaylistCard } from "../../components/playlist-card/featured-card";
import { playlists } from "../../types/playlist";
import { Header } from "../base/components/header";

export default function SearchPage() {
  const playback = usePlayback();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Top Result</p>

        <FeaturedSongCard
          song={songs[0]}
          isPlaying={
            playback.isPlaying &&
            playback.currentTrack?.title === songs[0].title
          }
          onPlay={() => {
            if (
              playback.currentTrack?.title === songs[0].title &&
              playback.isPlaying
            ) {
              playback.togglePlayPause();
              return;
            }

            playback.playTrack(songs[0]);
          }}
          onSave={() => {}}
        />

        <FeaturedPlaylistCard
          playlist={playlists[0]}
          onPlay={() => {}}
          onSave={() => {}}
        />
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Songs</p>

        <div className={styles.songContainer}>
          {songs.slice(0, 3).map((song, index) => (
            <>
              <HorizontalSongCard key={index} song={song} />
              {index < 2 && <div className={styles.divider} />}
            </>
          ))}
        </div>

        <Button
          type="outline"
          rounded
          size="large"
          style={{ marginTop: "1rem", width: "fit-content" }}
        >
          Show all
        </Button>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Playlists</p>

        <div className={styles.songContainer}>
          {songs.slice(0, 3).map((song, index) => (
            <>
              <HorizontalSongCard song={song} />
              {index < 2 && <div className={styles.divider} />}
            </>
          ))}
        </div>

        <Button
          type="outline"
          rounded
          size="large"
          style={{ marginTop: "1rem", width: "fit-content" }}
        >
          Show all
        </Button>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Albums</p>

        <div className={styles.songContainer}>
          {songs.slice(0, 3).map((song, index) => (
            <>
              <HorizontalSongCard song={song} />
              {index < 2 && <div className={styles.divider} />}
            </>
          ))}
        </div>

        <Button
          type="outline"
          rounded
          size="large"
          style={{ marginTop: "1rem", width: "fit-content" }}
        >
          Show all
        </Button>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Profiles</p>

        <div className={styles.songContainer}>
          {songs.slice(0, 3).map((song, index) => (
            <>
              <HorizontalSongCard song={song} />
              {index < 2 && <div className={styles.divider} />}
            </>
          ))}
        </div>

        <Button
          type="outline"
          rounded
          size="large"
          style={{ marginTop: "1rem", width: "fit-content" }}
        >
          Show all
        </Button>
      </div>
    </div>
  );
}
