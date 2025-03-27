"use client";

import {
  Trash,
  EllipsisVertical,
  Pencil,
  Home,
  Radio,
  PlusSquare,
  Plus,
} from "lucide-react";
import { useRef, useEffect, type RefObject } from "react";
import { usePlaylist } from "../../../hooks/use-playlist";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { useModal } from "../../../hooks/use-modal";

export function Sidebar() {
  const { playlists } = usePlaylist();
  const { openModal } = useModal();
  const navigate = useNavigate();
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
          to={session ? "/" : "/auth/login"}
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
        <div
          className={styles.navItem}
          onClick={() => {
            if (!session) {
              return navigate("/auth/login");
            }

            openModal("song.mutate", {
              title: "Upload song",
              description: "Upload a song to Melo Music",
            });
          }}
        >
          <Plus size={18} className={styles.navIcon} />
          <span>Upload song</span>
        </div>
        <div
          className={styles.navItem}
          onClick={() => {
            if (!session) {
              return navigate("/auth/login");
            }

            openModal("playlist.mutate", {
              title: "Create playlist",
              description: "Create a new playlist",
            });
          }}
        >
          <Plus size={18} className={styles.navIcon} />
          <span>Create playlist</span>
        </div>
      </div>

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
  const { openModal } = useModal();
  return (
    <li className={styles.playlistRowItem}>
      <NavLink
        to={`/playlist/${playlist.id}`}
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
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                openModal("playlist.mutate", {
                  title: `Edit playlist: ${playlist.name}`,
                  description: "Change playlist details",
                  formData: {
                    title: playlist.name,
                    description: "LALALLALALALALALALA",
                    is_public: playlist.visbility === "public", // TODO: CHANGE TO is_public
                    image_src: playlist.imageSrc, // TODO: CHANGE TO image_src
                  },
                });
              }}
            >
              <Pencil size={16} /> Edit Playlist
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                openModal("delete", {
                  title: "Delete Playlist",
                  description: "Are you sure you want to delete this playlist?",
                  onConfirm: () => {},
                });
              }}
            >
              <Trash size={16} /> Delete Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
