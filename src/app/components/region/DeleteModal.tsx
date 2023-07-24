import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import BasicModal from '../Modal';
import { DeleteModalProps } from '@/types/modal';
import agent from '@/app/api/agent';

const DeleteModalRegion: React.FC<DeleteModalProps> = ({
  showModal,
  onCloseModal,
  onDeleteRegion,
  regionId,
}) => {
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.only('sm'));
  const laptop = useMediaQuery(theme.breakpoints.only('md'));
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));

  const getWidth = () => {
    let modalWidth;

    switch (true) {
      case mobile:
        modalWidth = '80%';
        break;
      case tablet:
        modalWidth = '70%';
        break;
      case laptop:
        modalWidth = '50%';
        break;
      case largeScreen:
        modalWidth = '45%';
        break;
      case xl:
        modalWidth = '30%';
        break;
      default:
        break;
    }
    return { modalWidth };
  };
  const resetPassModalStyle = {
    width: getWidth().modalWidth,
    bgcolor: '#FFFFFF',
    borderRadius: '28px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: '30px 30px',
  };

  return (
    <BasicModal
      showModal={showModal}
      onClose={onCloseModal}
      modalStyle={resetPassModalStyle}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            id="modal-modal-title"
            sx={{ textAlign: 'center', fontWeight: '700', fontSize: '150%' }}
          >
            Delete Region
          </Typography>
          <CloseIcon onClick={onCloseModal} sx={{ width: '19px' }} />
        </div>
        <Box sx={{ marginTop: '20px' }} component="form">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Do you want to delete this region?</Typography>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '15px',
            }}
          >
            <Button variant="outlined" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: '10px' }}
              onClick={() => {
                if (regionId !== null) {
                  onDeleteRegion(regionId);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Box>
    </BasicModal>
  );
};

export default DeleteModalRegion;
