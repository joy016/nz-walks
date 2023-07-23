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
} from '@mui/material';
import agent from '../api/agent';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const NzMain = () => {
  const [regionsData, setRegionsData] = useState([]);

  useEffect(() => {
    // Function to fetch region data
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
      alert('Delete na vovo');
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
                  onClick={() => deleteRegion(id)}
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
    </>
  );
};

export default NzMain;
