import { createContext, useState } from "react";

export type ModalData = {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: any;
};

interface ModalContextType {
  modal: {
    isOpen: boolean;
    type: string | null;
    data: ModalData | null;
  };
  openModal: (type: string, data: ModalData | null) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalContextType["modal"]>({
    isOpen: false,
    type: null,
    data: null,
  });

  const openModal = (type: string, data: ModalData | null = null) => {
    setModal({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, data: null });
  };

  const value = {
    modal,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
