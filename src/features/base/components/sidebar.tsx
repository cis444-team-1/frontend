import {
  Trash,
  EllipsisVertical,
  Pencil,
  User,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
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
import { usePlayback } from "../../../hooks/use-playback";

import styles from "../styles.module.css";
import { useTheme } from "../../../hooks/theme";
import { users } from "../../../types/user";

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
              <Button
                type="text"
                block
                size="large"
                className={styles.userButton}
                icon={<img src={users[0].imageSrc} className={styles.avatar} />}
              >
                {users[0].username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/profile">
                <DropdownMenuItem onClick={() => {}}>
                  <User /> Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => {}}>
                <Settings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <Users />
                Users
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <LogOut />
                Logout
              </DropdownMenuItem>
              <Button
                block
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                style={{ marginTop: "0.5rem" }}
              >
                Change theme
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
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
