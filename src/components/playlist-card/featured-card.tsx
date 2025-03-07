import { ListMusic, ListPlus, Play } from "lucide-react";
import { Button } from "../button/button";
import styles from "./featured-card.module.css";
import { Playlist } from "../../types/playlist";

export const FeaturedPlaylistCard = ({
  playlist,
  onPlay,
  onSave,
}: {
  playlist: Playlist;
  onPlay: () => void;
  onSave: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={playlist.imageSrc}
          alt={playlist.name}
          className={styles.image}
        />

        <Button
          icon={<Play fill="white" />}
          type="text"
          size="large"
          className={styles.imagePlayButton}
          onClick={onPlay}
        />
      </div>
      <div>
        <div className={styles.title}>{playlist.name}</div>
        <div className={styles.info}>
          <ListMusic size={16} /> Playlist • {playlist.userId} •{" "}
          {playlist.updatedAt.toDateString()}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          icon={<Play fill="white" />}
          type="success"
          rounded
          size="large"
          style={{ paddingInline: "2.5rem" }}
          onClick={onPlay}
        >
          Play
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
