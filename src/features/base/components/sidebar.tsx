"use client";
import {
  Trash,
  EllipsisVertical,
  Search,
  Pencil,
  Home,
  Radio,
  PlusSquare,
  User,
} from "lucide-react";
import { useRef, useEffect, type RefObject } from "react";
import { usePlaylist } from "../../../hooks/use-playlist";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/dropdown-menu.tsx/dropdown-menu";
import { Button } from "../../../components/button/button";
import { ScrollArea } from "../../../components/scrollarea/scroll-area";
import type { Playlist } from "../../../types/playlist";
import { Input } from "../../../components/input/input";
import { usePlayback } from "../../../hooks/use-playback";

import styles from "../styles.module.css";
import { useTheme } from "../../../hooks/theme";

// TODO : Change the active affect, since some pages lead to the same route, the active affect is not working properly.

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
      <div className={styles.sidebarHeader}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={styles.userButton}>
              <User size={18} />
              <span>User Account</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Users</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              Toggle Theme
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          icon={<Search />}
          size="tiny"
          placeholder="Search"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.navSection}>
        <p className={styles.playlistsTitle}>Navigation</p>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <Home size={18} className={styles.navIcon} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <PlusSquare size={18} className={styles.navIcon} />
          <span>Explore</span>
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <Radio size={18} className={styles.navIcon} />
          <span>Library</span>
        </NavLink>
      </div>

      <div className={styles.navSection}>
        <p className={styles.playlistsTitle}>Create</p>
        <NavLink
          to="/upload-music"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>Upload Music</span>
        </NavLink>
        <NavLink
          to="/create-playlist"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>Create Playlist</span>
        </NavLink>
      </div>

      <div className={styles.navSection}>
        <p className={styles.playlistsTitle}>Playlists</p>
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
    </div>
  );
}

function PlaylistRow({ playlist }: { playlist: Playlist }) {
  return (
    <li className={styles.playlistRowItem}>
      <NavLink
        to={`/playlist`}
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.active : ""}`
        }
        tabIndex={0}
      >
        {playlist.name}
      </NavLink>
      <div className={styles.playlistAction}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="text" icon={<EllipsisVertical size={16} />} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              <Pencil size={16} /> Edit Playlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <Trash size={16} /> Delete Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
