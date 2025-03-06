import { useRef, useEffect, useState } from "react";
import { Play, Pause, Plus, Ellipsis } from "lucide-react";
import { usePlayback } from "../../hooks/use-playback";
import { usePlaylist } from "../../hooks/use-playlist";
import styles from "./track-table.module.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu.tsx/dropdown-menu";
import { Button } from "../button/button";
import { AudioLinesIcon } from "../audio-lines/audio-lines";
import { Song } from "../../types/song";
import { Playlist } from "../../types/playlist";
import { formatDuration } from "../../lib/utils";

export function TrackTable({ playlist }: { playlist: Playlist }) {
  const tableRef = useRef<HTMLTableElement>(null);
  const { registerPanelRef, setActivePanel, setPlaylist } = usePlayback();
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    registerPanelRef("tracklist", tableRef as React.RefObject<HTMLElement>);
  }, [registerPanelRef]);

  useEffect(() => {
    setPlaylist(playlist.songs);
  }, [playlist.songs, setPlaylist]);

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
      <tbody style={{ marginTop: "1px" }}>
        {playlist.songs.map((track: Song, index: number) => (
          <TrackRow
            key={track.id}
            track={track}
            index={index}
            isSelected={selectedTrackId === track.id}
            onSelect={() => setSelectedTrackId(track.id)}
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
  const { playlists } = usePlaylist();

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
              src={track.imageUrl || "/placeholder.svg"}
              alt={`${track.album} cover`}
              className={styles.trackImage}
            />
          </div>
          <div className={styles.trackTitle}>{track.title}</div>
        </div>
      </td>

      <td className={`${styles.cell} ${styles.hiddenSm} ${styles.truncate}`}>
        {track.artist}
      </td>
      <td className={`${styles.cell} ${styles.hiddenMd}`}>{track.album}</td>
      <td className={`${styles.cell} ${styles.tabularNums}`}>
        {formatDuration(track.durationSeconds)}
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
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Plus />
                  Add to Playlist
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {playlists.map((playlist) => (
                    <DropdownMenuItem
                      className={styles.playlistItem}
                      key={playlist.id}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {playlist.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>

      {(isSelected || isFocused) && <div className={styles.selectionBorder} />}
    </tr>
  );
}
