import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

export const ConfirmCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      code: '',
      email: (location?.state?.email as string) ?? '',
    },
    validationSchema: Yup.object({
      code: Yup.string().max(7).required('Code is required'),
    }),
    onSubmit: (values) => {
      try {
        axios
          .post('/api/auth/code', values)
          .then(() => {
            navigate('/');
            toast('Email confirmed  successfully');
          })
          .catch(() => {
            toast('One error happened, try again', { type: 'error' });
          })
          .finally(() => {
            formik.setSubmitting(false);
          });
      } catch (err) {
        toast('Try again', { type: 'error' });
      }
    },
  });

  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h1">
              Confirm code
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              An confirmation code was sent to your email
            </Typography>
          </Box>

          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            margin="normal"
            name="email"
            disabled={typeof location?.state?.email === 'string'}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="outlined"
          />

          <TextField
            error={Boolean(formik.touched.code && formik.errors.code)}
            fullWidth
            helperText={formik.touched.code && formik.errors.code}
            label="Confirmation code"
            margin="normal"
            name="code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
            variant="outlined"
          />

          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Verify email
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};
