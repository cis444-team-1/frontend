import { ListPlus, Music, Pause, Play } from "lucide-react";
import { Song } from "../../types/song";
import { Button } from "../button/button";
import styles from "./featured-card.module.css";
import { formatDuration } from "../../lib/utils";
import { AudioLinesIcon } from "../audio-lines/audio-lines";

export const FeaturedSongCard = ({
  song,
  isPlaying = false,
  onPlay,
  onSave,
}: {
  song: Song;
  isPlaying?: boolean;
  onPlay: () => void;
  onSave: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={song.imageUrl} alt={song.title} className={styles.image} />

        <Button
          icon={
            isPlaying ? (
              <Pause fill="white" color="white" />
            ) : (
              <Play fill="white" color="white" />
            )
          }
          type="text"
          size="large"
          className={styles.imagePlayButton}
          onClick={onPlay}
        />
      </div>

      <div>
        <div className={styles.title}>
          {song.title} {isPlaying && <AudioLinesIcon />}
        </div>
        <div className={styles.info}>
          <Music size={16} /> Song • {song.artist} •{" "}
          {formatDuration(song.durationSeconds)}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          icon={
            isPlaying ? (
              <Pause fill="white" color="white" />
            ) : (
              <Play fill="white" color="white" />
            )
          }
          type="success"
          rounded
          size="large"
          style={{ paddingInline: "2.5rem", color: "white" }}
          onClick={onPlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          icon={<ListPlus />}
          type="outline"
          rounded
          size="large"
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
