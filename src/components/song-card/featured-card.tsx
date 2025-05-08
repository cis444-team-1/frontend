import { ListPlus, Music, Pause, Play } from "lucide-react";
import { Song } from "../../types/song";
import { Button } from "../button/button";
import styles from "./featured-card.module.css";
import { AudioLinesIcon } from "../audio-lines/audio-lines";
import { useModal } from "../../hooks/use-modal";
import { AudioDuration } from "../audio-duration";

export const FeaturedSongCard = ({
  song,
  isPlaying = false,
  onPlay,
}: {
  song: Song;
  isPlaying?: boolean;
  onPlay: () => void;
}) => {
  const { openModal } = useModal();

  function handleAddToPlaylist(e: React.MouseEvent) {
    e.stopPropagation(); // Prevents the card from being clicked
    openModal("playlist.add", {
      title: `Add ${song.title} to playlist`,
      description: "Choose what playlist(s) you want to add this song to",
      id: song.track_id,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={song.image_src} alt={song.title} className={styles.image} />

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

      <div className={styles.actions}>
        <div>
          <div className={styles.title}>
            {song.title} {isPlaying && <AudioLinesIcon />}
          </div>
          <div className={styles.info}>
            <Music size={16} /> Song • {song.artist_name} •{" "}
            <AudioDuration src={song.audio_src} />
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
            onClick={handleAddToPlaylist}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
