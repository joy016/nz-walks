import { ModalProps } from "@/types/modal";
import { Backdrop, Box, Fade, } from "@mui/material";
import Modal from "@mui/material/Modal";


const BasicModal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  modalStyle,
  children,
}) => {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              ...modalStyle,
            }}
          >
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BasicModal;
