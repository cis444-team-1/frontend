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

import styles from "./song-card.module.css";
import { usePlayback } from "../../hooks/use-playback";
import { AudioLinesIcon } from "../audio-lines/audio-lines";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu.tsx/dropdown-menu";
import { useModal } from "../../hooks/use-modal";
import { toast } from "sonner";
import { Link } from "react-router";
import { AudioDuration } from "../audio-duration";
import { useGetDeleteTrack } from "../../api/tracks";

export const HorizontalSongCard = ({
  song,
  ranking,
}: {
  song: Song;
  ranking?: number;
}) => {
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

  function handleAddToPlaylist(e: React.MouseEvent) {
    e.stopPropagation(); // Prevents the card from being clicked
    openModal("playlist.add", {
      title: `Add ${song.title} to playlist`,
      description: "Choose what playlist(s) you want to add this song to",
      id: song.track_id,
    });
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

  return (
    <div className={styles.container} onClick={onClickCard}>
      {ranking && <p className={styles.ranking}>{ranking}</p>}

      <div className={styles.imageWrapper}>
        <img src={song.image_src} alt={song.title} className={styles.image} />

        <Button
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
      </div>

      <div>
        <p className={styles.title}>{song.title}</p>
        <p className={styles.info}>
          {song.artist_name}
          {song.album_title} • <AudioDuration src={song.audio_src} />
        </p>
      </div>

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
