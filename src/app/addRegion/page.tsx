'use client';

import {
  Alert,
  AlertTitle,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import agent from '../api/agent';
import { AddRegion } from '@/types/region';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const AddRegion = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
      regionImageUrl: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Region Code is required'),
      name: Yup.string().required('Region Name is required'),
      regionImageUrl: Yup.string().required('Image Url is required'),
    }),
    onSubmit: async (values: AddRegion, { resetForm }) => {
      setLoading(true);
      await agent.regions.addRegion(values);
      alert('Added Successfully');
      setLoading(false);
      resetForm();
    },
  });
  return (
    <>
      <Box sx={{ margin: '0 auto', width: '60%', paddingTop: '80px' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
          Save Region to Database
        </Typography>
        <Paper elevation={3} sx={{ width: '100%' }}>
          <Stack
            spacing={2}
            sx={{ padding: '50px' }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="Region Code"
              variant="outlined"
              onChange={formik.handleChange('code')}
              onBlur={formik.handleBlur}
              value={formik.values.code}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
            <TextField
              id="outlined-basic"
              label="Region Name"
              variant="outlined"
              onChange={formik.handleChange('name')}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              id="outlined-basic"
              label="Region Image Url"
              variant="outlined"
              onChange={formik.handleChange('regionImageUrl')}
              onBlur={formik.handleBlur}
              value={formik.values.regionImageUrl}
              error={
                formik.touched.regionImageUrl &&
                Boolean(formik.errors.regionImageUrl)
              }
              helperText={
                formik.touched.regionImageUrl && formik.errors.regionImageUrl
              }
            />
            <LoadingButton
              loadingPosition="start"
              loading={loading}
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ width: '25%' }}
              type="submit"
            >
              Add Region
            </LoadingButton>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default AddRegion;
