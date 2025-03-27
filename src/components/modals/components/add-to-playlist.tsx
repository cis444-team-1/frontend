import { ModalData } from "../../../context/modal-context";
import { playlists } from "../../../types/playlist";
import { Button } from "../../button/button";
import { Checkbox } from "../../checkbox/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog/dialog";
import { ScrollArea, ScrollBar } from "../../scrollarea/scroll-area";

import styles from "../styles/modal.module.css";

export const AddToPlaylist = ({
  onConfirm,
  onCancel,
  data = null,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  data: ModalData | null;
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <img src="/logo.png" alt="Melo" style={{ width: "2rem" }} />
          {data?.title || "Unknown Modal"}
        </DialogTitle>
        <DialogDescription>
          {data?.description || "This action cannot be undone"}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea style={{ height: "21rem" }}>
        <div className={styles.playlists}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistButtonContainer}>
              <Checkbox className={styles.checkbox} />
              <div>
                <h1>{playlist.name}</h1>
                <p> {playlist.songs.length} songs</p>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <DialogFooter>
        <Button type="default" size="medium" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="success" size="medium" onClick={onConfirm}>
          Add
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
