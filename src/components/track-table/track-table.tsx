import { useRef, useEffect, useState } from "react";
import { Play, Pause, Ellipsis, Heart, Share, ListPlus } from "lucide-react";
import { usePlayback } from "../../hooks/use-playback";
import styles from "./track-table.module.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu.tsx/dropdown-menu";
import { Button } from "../button/button";
import { AudioLinesIcon } from "../audio-lines/audio-lines";
import { Song } from "../../types/song";
import { toast } from "sonner";
import { useModal } from "../../hooks/use-modal";
import { AudioDuration } from "../audio-duration";

export function TrackTable({ songs }: { songs: Song[] }) {
  const tableRef = useRef<HTMLTableElement>(null);
  const { registerPanelRef, setActivePanel, setPlaylist } = usePlayback();
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    registerPanelRef("tracklist", tableRef as React.RefObject<HTMLElement>);
  }, [registerPanelRef]);

  useEffect(() => {
    setPlaylist(songs);
  }, [songs, setPlaylist]);

  return (
    <table
      ref={tableRef}
      className={styles.tableContainer}
      onClick={() => setActivePanel("tracklist")}
    >
      <thead className={styles.tableHead}>
        <tr className={styles.tableHeadRow}>
          <th
            className={`${styles.tableHeader} ${styles.w10} ${styles.paddingLeftRight}`}
          >
            #
          </th>
          <th className={styles.tableHeader}>Title</th>
          <th className={`${styles.tableHeader} ${styles.hiddenSm}`}>Artist</th>
          <th className={`${styles.tableHeader} ${styles.hiddenMd}`}>Album</th>
          <th className={styles.tableHeader}>Duration</th>
          <th className={styles.w8}></th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {songs.map((track: Song, index: number) => (
          <TrackRow
            key={track.track_id}
            track={track}
            index={index}
            isSelected={selectedTrackId === track.track_id}
            onSelect={() => setSelectedTrackId(track.track_id)}
          />
        ))}
      </tbody>
    </table>
  );
}

function TrackRow({
  track,
  index,
  isSelected,
  onSelect,
}: {
  track: Song;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const {
    currentTrack,
    playTrack,
    togglePlayPause,
    isPlaying,
    setActivePanel,
    handleKeyNavigation,
  } = usePlayback();
  const { openModal } = useModal();
  const [isFocused, setIsFocused] = useState(false);
  const isCurrentTrack = currentTrack?.title === track.title;

  function onClickTrackRow(e: React.MouseEvent) {
    e.preventDefault();
    setActivePanel("tracklist");
    onSelect();
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  }

  function onKeyDownTrackRow(e: React.KeyboardEvent<HTMLTableRowElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
      if (isCurrentTrack) {
        togglePlayPause();
      } else {
        playTrack(track);
      }
    } else {
      handleKeyNavigation(e, "tracklist");
    }
  }

  function handleAddToPlaylist(e: React.MouseEvent) {
    e.stopPropagation(); // Prevents the card from being clicked
    openModal("playlist.add", {
      title: `Add ${track.title} to playlist`,
      description: "Choose what playlist(s) you want to add this song to",
      id: track.track_id,
    });
  }

  return (
    <tr
      className={`${styles.trackRow} ${
        isCurrentTrack ? styles.currentTrack : ""
      }`}
      tabIndex={0}
      onClick={onClickTrackRow}
      onKeyDown={onKeyDownTrackRow}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <td className={`${styles.cell} ${styles.indexCell}`}>
        {isCurrentTrack && isPlaying ? (
          <AudioLinesIcon size={18} />
        ) : (
          <span className={styles.indexText}>{index + 1}</span>
        )}
      </td>

      <td className={styles.cell}>
        <div className={styles.trackInfo}>
          <div className={styles.imageWrapper}>
            <img
              src={track.image_src || "/placeholder.svg"}
              alt={`${track.album_title} cover`}
              className={styles.trackImage}
            />
          </div>
          <div className={styles.trackTitle}>{track.title}</div>
        </div>
      </td>

      <td className={`${styles.cell} ${styles.hiddenSm} ${styles.truncate}`}>
        {track.artist_name}
      </td>
      <td className={`${styles.cell} ${styles.hiddenMd}`}>
        {track.album_title}
      </td>
      <td className={`${styles.cell} ${styles.tabularNums}`}>
        <AudioDuration src={track.audio_src} />
      </td>

      <td className={styles.cell}>
        <div className={styles.menu}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="text" icon={<Ellipsis />} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (isCurrentTrack) {
                    togglePlayPause();
                  } else {
                    playTrack(track);
                  }
                }}
              >
                {isCurrentTrack && isPlaying ? (
                  <>
                    <Pause />
                    Pause
                  </>
                ) : (
                  <>
                    <Play />
                    Play
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success("Liked song! It's now in your liked songs.");
                }}
              >
                <Heart size={16} /> Like
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Share size={16} /> Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddToPlaylist}>
                <ListPlus size={16} /> Add to playlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>

      {(isSelected || isFocused) && <div className={styles.selectionBorder} />}
    </tr>
  );
}
