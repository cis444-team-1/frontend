import { useContext } from "react";
import { ModalContext } from "../context/modal-context";

export const useModal = () => {
  if (!ModalContext || !ModalContext.Provider) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal: ModalContext is null");
  }

  return context;
};
