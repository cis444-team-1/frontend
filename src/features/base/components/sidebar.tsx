import {
  Trash,
  EllipsisVertical,
  Pencil,
  User,
  Settings,
  Users,
  LogOut,
  Home,
  Radio,
  PlusSquare,
  Plus,
  Upload,
  History,
} from "lucide-react";
import { useRef, useEffect, RefObject } from "react";
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
import { Playlist } from "../../../types/playlist";
import { usePlayback } from "../../../hooks/use-playback";

import styles from "../styles.module.css";
import { useTheme } from "../../../hooks/theme";
import { users } from "../../../types/user";

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
            <DropdownMenuContent align="center" style={{ width: "12rem" }}>
              <Link to="/profile">
                <DropdownMenuItem onClick={() => {}}>
                  <User /> Profile
                </DropdownMenuItem>
              </Link>
              <Link to="/history">
                <DropdownMenuItem onClick={() => {}}>
                  <History /> History
                </DropdownMenuItem>
              </Link>
              <Link to="/settings">
                <DropdownMenuItem onClick={() => {}}>
                  <Settings />
                  Settings
                </DropdownMenuItem>
              </Link>
              <Link to="/admin/users">
                <DropdownMenuItem onClick={() => {}}>
                  <Users />
                  Users
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => {}}>
                <LogOut />
                Logout
              </DropdownMenuItem>
              <Button
                block
                size="medium"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                style={{ marginTop: "0.5rem" }}
              >
                Change theme
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
          <Upload size={18} className={styles.navIcon} />
          <span>Upload Music</span>
        </NavLink>
        <NavLink
          to="/create-playlist"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <Plus size={18} className={styles.navIcon} />
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
        {/** TODO: HANDLE TEXT OVERFLOW WITH ELLIPSIS */}
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
