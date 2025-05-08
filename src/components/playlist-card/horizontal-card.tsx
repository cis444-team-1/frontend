import { Play } from "lucide-react";
import { Button } from "../button/button";

import styles from "./horizontal-card.module.css";
import { Playlist } from "../../types/playlist";

export const HorizontalPlaylistCard = ({
  playlist,
}: {
  playlist: Playlist;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={playlist.image_src}
          alt={playlist.title}
          className={styles.image}
        />

        <Button
          size="medium"
          className={styles.playButton}
          icon={<Play fill="white" color="white" />}
        />
      </div>

      <div>
        <p className={styles.title}>{playlist.title}</p>
        <p className={styles.info}>{playlist.user_id}</p>
      </div>
    </div>
  );
};
