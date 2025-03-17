"use client";

import {
  Trash,
  EllipsisVertical,
  Pencil,
  Home,
  Radio,
  PlusSquare,
  Plus,
  Upload,
} from "lucide-react";
import { useRef, useEffect, type RefObject, useState } from "react";
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
import { useSession } from "../../../hooks/session-hook";

export function Sidebar() {
  const { playlists } = usePlaylist();
  const playlistsContainerRef = useRef<HTMLUListElement>(null);
  const { registerPanelRef, handleKeyNavigation, setActivePanel } =
    usePlayback();
  const [open, setOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [addToProfile, setAddToProfile] = useState(false);

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

  const handleCreatePlaylist = () => {
    // Handle playlist creation logic here
    console.log({
      name: playlistName,
      description: playlistDescription,
      isPublic,
      isCollaborative,
      addToProfile,
    });

    // Reset form and close dialog
    setPlaylistName("");
    setPlaylistDescription("");
    setIsPublic(false);
    setIsCollaborative(false);
    setAddToProfile(false);
    setOpen(false);
  };

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div
                className={styles.navItem}
                role="button"
                tabIndex={0}
                onClick={() => setOpen(true)}
              >
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
                  <Label htmlFor="playlist-name" required>
                    Playlist Title
                  </Label>
                  <Input
                    id="playlist-name"
                    placeholder="Add a playlist title"
                    className={styles.input}
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    size="medium"
                  />
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="playlist-description">Description</Label>
                  <Textarea
                    id="playlist-description"
                    placeholder="Add an optional description"
                    className={styles.textarea}
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                  />
                </div>

                <div className={styles.optionsContainer}>
                  <div className={styles.checkboxGroup}>
                    <Checkbox
                      id="make-public"
                      checked={isPublic}
                      onCheckedChange={(checked) =>
                        setIsPublic(checked === true)
                      }
                    />
                    <Label
                      htmlFor="make-public"
                      className={styles.checkboxLabel}
                    >
                      Make playlist public
                    </Label>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <Checkbox
                      id="allow-collaborative"
                      checked={isCollaborative}
                      onCheckedChange={(checked) =>
                        setIsCollaborative(checked === true)
                      }
                    />
                    <Label
                      htmlFor="allow-collaborative"
                      className={styles.checkboxLabel}
                    >
                      Allow collaborative editing
                    </Label>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <Checkbox
                      id="add-to-profile"
                      checked={addToProfile}
                      onCheckedChange={(checked) =>
                        setAddToProfile(checked === true)
                      }
                    />
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
                  onClick={handleCreatePlaylist}
                  disabled={!playlistName.trim()}
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
