"use client";

import {
  Trash,
  EllipsisVertical,
  Pencil,
  Home,
  Radio,
  PlusSquare,
  Upload,
} from "lucide-react";
import { useRef, useEffect, type RefObject } from "react";
import { usePlaylist } from "../../../hooks/use-playlist";
import { Link, NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/dropdown-menu.tsx/dropdown-menu";
import { Button } from "../../../components/button/button";
import { ScrollArea } from "../../../components/scrollarea/scroll-area";
import type { Playlist } from "../../../types/playlist";
import { usePlayback } from "../../../hooks/use-playback";
import styles from "../styles.module.css";
import { useSession } from "../../../hooks/session-hook";
import { CreatePlaylistModal } from "./create-playlist-modal";

export function Sidebar() {
  const { playlists } = usePlaylist();
  const playlistsContainerRef = useRef<HTMLUListElement>(null);
  const { registerPanelRef, handleKeyNavigation, setActivePanel } =
    usePlayback();

  const { session } = useSession();

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
      <Link to="/">
        <div className={styles.sidebarHeader}>
          <img src="/logo.png" alt="Logo" />
          <p>Melo Music</p>
        </div>
      </Link>

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
        {session && (
          <NavLink
            to="/library"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <Radio size={18} className={styles.navIcon} />
            <span>Library</span>
          </NavLink>
        )}
      </div>

      {session && (
        <div className={styles.navSection}>
          <p className={styles.playlistsTitle}>Create</p>
          <NavLink
            to="/upload-music"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <Upload size={18} className={styles.navIcon} />
            <span>Upload Music</span>
          </NavLink>
          <CreatePlaylistModal />
        </div>
      )}

      {session && (
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
      )}
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
            <Button
              type="text"
              style={{ width: "2rem", height: "2rem" }}
              icon={<EllipsisVertical size={16} />}
            />
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
