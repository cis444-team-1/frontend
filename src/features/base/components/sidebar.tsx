import { Trash, EllipsisVertical, Search, Pencil } from "lucide-react";
import { useRef, useEffect, RefObject } from "react";
import { usePlaylist } from "../../../hooks/use-playlist";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/dropdown-menu.tsx/dropdown-menu";
import { Button } from "../../../components/button/button";
import { ScrollArea } from "../../../components/scrollarea/scroll-area";
import { Playlist } from "../../../types/playlist";
import { Input } from "../../../components/input/input";
import { usePlayback } from "../../../hooks/use-playback";

import styles from "../styles.module.css";
import { useTheme } from "../../../hooks/theme";

export function Sidebar() {
  const { playlists } = usePlaylist();
  const playlistsContainerRef = useRef<HTMLUListElement>(null);
  const { registerPanelRef, handleKeyNavigation, setActivePanel } =
    usePlayback();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!registerPanelRef) {
      return;
    }
    registerPanelRef(
      "sidebar",
      playlistsContainerRef as RefObject<HTMLUListElement>
    );
  }, [registerPanelRef]);

  return (
    <div
      className={styles.sidebarContainer}
      onClick={() => setActivePanel("sidebar")}
    >
      <div>
        <div className={styles.sidebarHeader}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="dashed" block size="large">
                User Button
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Users</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            icon={<Search />}
            size="tiny"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>

        {/** TODO: MOVE SOMEWHERE ELSE */}
        <div style={{ marginLeft: "0.8rem" }}>
          <p style={{ fontSize: "0.8rem" }}>Current Theme: {theme}</p>
          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            Change theme
          </Button>
        </div>

        <p className={styles.playlistsTitle} style={{ marginTop: "1rem" }}>
          Navigation
        </p>
        <Link to="/">
          <Button
            type="text"
            size="tiny"
            block
            style={{
              borderRadius: 0,
              justifyContent: "start",
            }}
          >
            Home
          </Button>
        </Link>
        <Link to="/explore">
          <Button
            type="text"
            size="tiny"
            block
            style={{ borderRadius: 0, justifyContent: "start" }}
          >
            Explore
          </Button>
        </Link>
        <Link to="/library">
          <Button
            type="text"
            size="tiny"
            block
            style={{ borderRadius: 0, justifyContent: "start" }}
          >
            Library
          </Button>
        </Link>

        <p className={styles.playlistsTitle} style={{ marginTop: "1rem" }}>
          Create
        </p>
        <Button
          type="text"
          size="tiny"
          block
          style={{
            borderRadius: 0,
            justifyContent: "start",
          }}
        >
          Upload Music
        </Button>
        <Button
          type="text"
          size="tiny"
          block
          style={{
            borderRadius: 0,
            justifyContent: "start",
            marginBottom: "1rem",
          }}
        >
          Create Playlist
        </Button>

        <p className={styles.playlistsTitle}>Playlists</p>
      </div>

      <ScrollArea className={styles.sidebarScrollAreaContainer}>
        <ul
          ref={playlistsContainerRef}
          className={styles.sidebarList}
          onKeyDown={(e) => handleKeyNavigation(e, "sidebar")}
        >
          {playlists.map((playlist: Playlist) => (
            <PlaylistRow key={playlist.id} playlist={playlist} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}

function PlaylistRow({ playlist }: { playlist: Playlist }) {
  return (
    <li className={styles.playlistRowItem}>
      <Link to="/playlist" tabIndex={0}>
        <Button
          type="text"
          size="tiny"
          block
          style={{ borderRadius: 0, justifyContent: "start" }}
        >
          {playlist.name}
        </Button>
      </Link>
      <div className={styles.playlistAction}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="text" icon={<EllipsisVertical />} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              <Pencil /> Edit Playlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <Trash /> Delete Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
