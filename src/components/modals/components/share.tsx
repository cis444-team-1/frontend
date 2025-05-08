import { ModalData } from "../../../context/modal-context";
import { Button } from "../../button/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog/dialog";
import { ScrollArea, ScrollBar } from "../../scrollarea/scroll-area";

export const Share = ({
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
        <DialogTitle>{data?.title || "Unknown Modal"}</DialogTitle>
        <DialogDescription>
          {data?.description || "This action cannot be undone"}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea>
        <>Hi</>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DialogFooter>
        <Button type="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="success" onClick={onConfirm}>
          Add
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
