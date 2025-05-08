import { useEffect, useState } from "react";
import {
  useAddSongToPlaylist,
  useGetPersonalPlaylists,
} from "../../../api/playlist";
import { ModalData } from "../../../context/modal-context";
import { Button } from "../../button/button";
import { Checkbox } from "../../checkbox/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog/dialog";
import { Loader } from "../../loader/loader";
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
  const playlists = useGetPersonalPlaylists();
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<string[]>([]);
  const addSongToPlaylist = useAddSongToPlaylist();

  const handleToggle = (id: string, checked: boolean) => {
    setSelectedPlaylistIds((prev) =>
      checked ? [...prev, id] : prev.filter((pid) => pid !== id)
    );
  };

  const handleSubmit = () => {
    if (!data?.id) return;

    addSongToPlaylist.mutate({
      trackId: data.id,
      ids: selectedPlaylistIds,
    });
  };

  useEffect(() => {
    if (addSongToPlaylist.isSuccess) {
      onConfirm();
    }
  }, [addSongToPlaylist.isSuccess, onConfirm]);

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

      {playlists.isPending ? (
        <Loader />
      ) : !playlists.data ? (
        <p>No playlists!</p>
      ) : (
        <ScrollArea style={{ height: "21rem" }}>
          <div className={styles.playlists}>
            {playlists.data.map((playlist) => {
              const isChecked = selectedPlaylistIds.includes(
                playlist.playlist_id as string
              );
              return (
                <div
                  key={playlist.playlist_id}
                  className={styles.playlistButtonContainer}
                >
                  <Checkbox
                    className={styles.checkbox}
                    id={playlist.playlist_id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleToggle(playlist.playlist_id as string, !!checked)
                    }
                  />
                  <div>
                    <h1>{playlist.title}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}

      <DialogFooter>
        <Button type="default" size="medium" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="success"
          size="medium"
          loading={addSongToPlaylist.isPending}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
