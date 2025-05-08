import { Button } from "../../../components/button/button";
import { Playlist } from "../../../types/playlist";
import { CoverImage } from "./cover-image";
import { EditableTitle } from "./editable-title";
import styles from "../styles/playlist-info.module.css";
import { Pause, Play, Shuffle } from "lucide-react";
import { usePlayback } from "../../../hooks/use-playback";
import { Song } from "../../../types/song";

export function PlaylistInfo({
  playlist,
  songs,
}: {
  playlist: Playlist;
  songs: Song[];
}) {
  const { playTrack, isPlaying, togglePlayPause } = usePlayback();

  const playPlaylist = () => {
    if (songs.length > 0) {
      playTrack(songs[0]);
    }
  };

  const shufflePlaylist = () => {
    if (songs.length > 0) {
      const shuffled = songs.sort(() => Math.random() - 0.5);
      playTrack(shuffled[0]);
    }
  };

  return (
    <div className={styles.playlistInfoContainer}>
      <CoverImage imageSrc={playlist.image_src || "/placeholder.svg"} />
      <div>
        <EditableTitle title={playlist.title} />
        <p className={styles.infoText}>{songs.length} tracks</p>
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
