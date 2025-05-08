import { ListMusic, ListPlus, Play } from "lucide-react";
import { Button } from "../button/button";
import styles from "./featured-card.module.css";
import { Playlist } from "../../types/playlist";
import { useGetPublicUser } from "../../api/user";

export const FeaturedPlaylistCard = ({
  playlist,
  onPlay,
  onSave,
}: {
  playlist: Playlist;
  onPlay: () => void;
  onSave: () => void;
}) => {
  const user = useGetPublicUser(playlist.user_id || "");

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={playlist.image_src}
          alt={playlist.title}
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

      <div className={styles.actions}>
        <div>
          <div className={styles.title}>{playlist.title}</div>
          <div className={styles.info}>
            <ListMusic size={16} /> Playlist •{" "}
            {user.data?.user_metadata.username || "Unknown User"}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            icon={<Play fill="white" color="white" />}
            type="success"
            rounded
            size="large"
            style={{ color: "white" }}
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
    </div>
  );
};
