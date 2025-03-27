import { ModalData } from "../../../context/modal-context";
import { Button } from "../../button/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog/dialog";

export const DeleteConfirmation = ({
  onDelete,
  onCancel,
  data = null,
}: {
  onDelete: () => void;
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
      <DialogFooter>
        <Button type="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="danger" onClick={onDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
