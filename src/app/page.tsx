'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import NzMain from './components/NzMain';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ margin: '10px' }}>
      <Box sx={{display: 'flex' }}>
        <Link href="/addRegion" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            sx={{ marginLeft: '190px', marginBottom: '20px' }}
          >
            Add Region
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          width: '80%',
          margin: '0 auto',
        }}
      >
        <Grid container spacing={2}>
          <NzMain />
        </Grid>
      </Box>
    </Box>
  );
}
