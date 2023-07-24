import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import agent from '../api/agent';
import { SyntheticEvent, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import DeleteModalRegion from './region/DeleteModal';
import { RegionData } from '@/types/region';

type ToastProperty = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' ;
};

const NzMain = () => {
  const [regionsData, setRegionsData] = useState<RegionData[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [regionId, setRegionId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<ToastProperty>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleOpen = (id: string) => {
    setOpenDeleteModal(true);
    setRegionId(id);
  };
  const handleClose = () => setOpenDeleteModal(false);

  const handleSnackbarClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regionsData = await agent.regions.getAllRegions();
        setRegionsData(regionsData);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    fetchRegions();
  }, []);

  const deleteRegion = async (id: string) => {
    try {
      await agent.regions.deleteRegion(id);
      setRegionsData((prevData) =>
        prevData.filter((region) => region.id !== id)
      );
      setShowToast({
        open: true,
        message: 'Region successfully deleted',
        severity: 'success',
      });
      setOpenDeleteModal(false);
    } catch (error) {
      console.error('Error deleting region:', error);
    }
  };

  return (
    <>
      {regionsData.map(({ id, code, name, regionImageUrl }) => (
        <Grid item key={id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={regionImageUrl}
                alt={name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nostrud dolores. Minim. Perspiciatis nesciunt, or nulla and
                  qui. Nemo mollit or laborum and exercitation odit but rem,
                  laboris. Illum fugiat exercitationem commodi ullamco.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  // onClick={() => deleteRegion(id)}
                  onClick={() => handleOpen(id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<CreateIcon />}
                >
                  Edit
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {openDeleteModal && regionId !== null && (
        <DeleteModalRegion
          regionId={regionId}
          onDeleteRegion={() => deleteRegion(regionId)}
          onCloseModal={handleClose}
          showModal={openDeleteModal}
        />
      )}
      <Snackbar
        open={showToast.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={showToast.severity} sx={{ width: '100%' }}>
          {showToast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NzMain;
