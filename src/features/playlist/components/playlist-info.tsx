import { Button } from "../../../components/button/button";
import { formatDuration } from "../../../lib/utils";
import { Playlist } from "../../../types/playlist";
import { CoverImage } from "./cover-image";
import { EditableTitle } from "./editable-title";
import styles from "../styles/playlist-info.module.css";
import { Pause, Play, Share, Shuffle } from "lucide-react";
import { usePlayback } from "../../../hooks/use-playback";

export function PlaylistInfo({ playlist }: { playlist: Playlist }) {
  const { playTrack, isPlaying, togglePlayPause } = usePlayback();

  const playPlaylist = () => {
    if (playlist.songs.length > 0) {
      playTrack(playlist.songs[0]);
    }
  };

  const shufflePlaylist = () => {
    if (playlist.songs.length > 0) {
      const shuffled = playlist.songs.sort(() => Math.random() - 0.5);
      playTrack(shuffled[0]);
    }
  };

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
          {isPlaying ? (
            <Button
              type="danger"
              size="tiny"
              icon={<Pause />}
              onClick={togglePlayPause}
            >
              Pause
            </Button>
          ) : (
            <Button
              type="danger"
              size="tiny"
              icon={<Play />}
              onClick={playPlaylist}
            >
              Play All
            </Button>
          )}
          <Button
            type="warning"
            size="tiny"
            icon={<Shuffle />}
            onClick={shufflePlaylist}
          >
            Shuffle
          </Button>
        </div>
      </div>
    </div>
  );
}
