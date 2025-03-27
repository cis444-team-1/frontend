import { Dialog } from "../dialog/dialog";
import { useModal } from "../../hooks/use-modal";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { AddToPlaylist } from "./components/add-to-playlist";
import { MutatePlaylist } from "./components/mutate-playlist";
import { AddUser } from "./components/add-user";
import { EditUser } from "./components/edit-user";
import { MutateSong } from "./components/mutate-song";

export const ModalRenderer = () => {
  const { modal, closeModal } = useModal();

  const renderModalContent = () => {
    switch (modal.type) {
      case "playlist.mutate":
        return <MutatePlaylist data={modal.data} onCancel={closeModal} />;
      case "playlist.add":
        return (
          <AddToPlaylist
            data={modal.data}
            onCancel={closeModal}
            onConfirm={closeModal}
          />
        );
      case "song.mutate":
        return <MutateSong data={modal.data} onCancel={closeModal} />;
      case "user.add":
        return <AddUser data={modal.data} />;
      case "user.edit":
        return <EditUser data={modal.data} />;
      case "delete":
        return (
          <DeleteConfirmation
            onDelete={closeModal}
            onCancel={closeModal}
            data={modal.data}
          />
        );
      default:
        return null; // No modal appears if type is not found
    }
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={closeModal}>
      {renderModalContent()}
    </Dialog>
  );
};
