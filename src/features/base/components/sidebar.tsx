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
} from "lucide-react";
import { useRef, useEffect, RefObject, useState } from "react";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/dialog/dialog";
import { Label } from "../../../components/label/label";
import { Input } from "../../../components/input/input";
import { Textarea } from "../../../components/textarea/textarea";
import { Checkbox } from "../../../components/checkbox/checkbox";
import styles from "../styles.module.css";
import { useTheme } from "../../../hooks/theme";
import { users } from "../../../types/user";

// TODO : Change the active affect, since some pages lead to the same route, the active affect is not working properly.
// TODO : Add the proper styling to make the dialog look better.

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

  const [open, setOpen] = useState(false);

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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className={styles.navItem}>
              <Plus size={18} className={styles.navIcon} />
              <span>Create Playlist</span>
            </div>
          </DialogTrigger>
          <DialogContent className={styles.dialogContent}>
            <DialogHeader>
              <DialogTitle>Create Playlist</DialogTitle>
              <DialogDescription>
                Create a new playlist to organize your music.
              </DialogDescription>
            </DialogHeader>

            <div className={styles.formContainer}>
              <div className={styles.formGroup}>
                <Label htmlFor="playlist-name" className={styles.label}>
                  Playlist Title
                </Label>
                <Input
                  id="playlist-name"
                  placeholder="Add an Playlist Title"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="playlist-description" className={styles.label}>
                  Description
                </Label>
                <Textarea
                  id="playlist-description"
                  placeholder="Add an optional description"
                  className={styles.textarea}
                />
              </div>

              <div className={styles.optionsContainer}>
                <div className={styles.checkboxGroup}>
                  <Checkbox id="make-public" />
                  <Label htmlFor="make-public" className={styles.checkboxLabel}>
                    Make playlist public
                  </Label>
                </div>

                <div className={styles.checkboxGroup}>
                  <Checkbox id="allow-collaborative" />
                  <Label
                    htmlFor="allow-collaborative"
                    className={styles.checkboxLabel}
                  >
                    Allow collaborative editing
                  </Label>
                </div>

                <div className={styles.checkboxGroup}>
                  <Checkbox id="add-to-profile" />
                  <Label
                    htmlFor="add-to-profile"
                    className={styles.checkboxLabel}
                  >
                    Add to profile
                  </Label>
                </div>
              </div>
            </div>

            <DialogFooter className={styles.footer}>
              <Button
                type="default"
                onClick={() => setOpen(false)}
                className={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle playlist creation
                  setOpen(false);
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
