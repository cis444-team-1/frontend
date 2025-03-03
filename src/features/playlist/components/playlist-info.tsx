import { Button } from "../../../components/button/button";
import { formatDuration } from "../../../lib/utils";
import { Playlist } from "../../../types/playlist";
import { CoverImage } from "./cover-image";
import { EditableTitle } from "./editable-title";
import styles from "../styles/playlist-info.module.css";

export function PlaylistInfo({ playlist }: { playlist: Playlist }) {
  return (
    <div className={styles.playlistInfoContainer}>
      <CoverImage
        imageSrc={playlist.imageSrc || null}
        playlistId={playlist.id}
      />
      <div>
        <EditableTitle playlistId={playlist.id} initialName={playlist.name} />
        <p className={styles.infoText}>
          {playlist.songs.length} tracks •{" "}
          {formatDuration(
            playlist.songs.reduce((acc, song) => acc + song.durationSeconds, 0)
          )}
        </p>
        <div className={styles.buttonContainer}>
          <Button type="danger" size="tiny">
            Play all
          </Button>
          <Button type="warning" size="tiny">
            Shuffle
          </Button>
          <Button type="primary" size="tiny">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
