import {
  Delete,
  EllipsisVertical,
  ExternalLink,
  Heart,
  ListPlus,
  Pause,
  Play,
  Share,
} from "lucide-react";
import { Song } from "../../types/song";
import { Button } from "../button/button";

import styles from "./long-song-card.module.css";
import { usePlayback } from "../../hooks/use-playback";
import { AudioLinesIcon } from "../audio-lines/audio-lines";
import { useModal } from "../../hooks/use-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu.tsx/dropdown-menu";
import { toast } from "sonner";
import { Link } from "react-router";
import { AudioDuration } from "../audio-duration";
import { useGetDeleteTrack } from "../../api/tracks";

export const LongHorizontalSongCard = ({ song }: { song: Song }) => {
  const {
    currentTrack,
    playTrack,
    togglePlayPause,
    isPlaying,
    setActivePanel,
  } = usePlayback();

  const { openModal } = useModal();
  const useDeleteTrack = useGetDeleteTrack();

  const isCurrentTrack = currentTrack?.title === song.title;

  function onClickCard(e: React.MouseEvent) {
    e.preventDefault();
    setActivePanel("tracklist");
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(song);
    }
  }

  function handleDeleteTrack(e: React.MouseEvent) {
    e.stopPropagation(); // Prevents the card from being clicked
    openModal("delete", {
      title: `Delete ${song.title}`,
      description: "Are you sure you want to delete this song?",
      id: song.track_id,
      onConfirm: () => {
        useDeleteTrack.mutate(
          { trackId: song.track_id },
          {
            onSuccess: () => {
              toast.success("Song deleted");
            },
          }
        );
      },
    });
  }

  function handleAddToPlaylist(e: React.MouseEvent) {
    e.stopPropagation(); // Prevents the card from being clicked
    openModal("playlist.add", {
      title: `Add ${song.title} to playlist`,
      description: "Choose what playlist(s) you want to add this song to",
      id: song.track_id,
    });
  }

  return (
    <div className={styles.container} onClick={onClickCard}>
      <img src={song.image_src} alt={song.title} className={styles.image} />

      <div className={styles.textContainer}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{song.title}</p>
        </div>

        <div className={styles.infoContainer}>
          <p className={styles.info}>
            {song.artist_name} • <AudioDuration src={song.audio_src} />
          </p>
          <p className={styles.info}>{song.album_title}</p>
          <p className={styles.smallInfo}>
            {song.artist_name} • {song.album_title}
          </p>
        </div>
      </div>

      <Button
        type="text"
        size="medium"
        className={
          isCurrentTrack && isPlaying ? styles.pauseButton : styles.playButton
        }
        icon={
          isCurrentTrack && isPlaying ? (
            <Pause />
          ) : (
            <Play fill="white" color="white" />
          )
        }
      />

      <Button
        type="text"
        size="medium"
        className={
          isCurrentTrack && isPlaying ? styles.audioButton : styles.noShow
        }
        icon={<AudioLinesIcon />}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="text"
            size="medium"
            className={styles.moreButton}
            icon={<EllipsisVertical />}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link
            to={`/track/${song.track_id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem>
              <ExternalLink size={16} /> Go to
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() =>
              toast.success("Liked song! It's now in your liked songs.")
            }
          >
            <Heart size={16} /> Like
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share size={16} /> Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAddToPlaylist}>
            <ListPlus size={16} /> Add to playlist
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteTrack}>
            <Delete size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
