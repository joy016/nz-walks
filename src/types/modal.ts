export type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  modalStyle?: (React.CSSProperties & { position?: string }) | undefined;
  children: React.ReactNode;
};

export type DeleteModalProps = {
  onDeleteRegion: (id: string) => Promise<void>;
  showModal: boolean;
  onCloseModal: () => void;
  regionId: string | null;
};
