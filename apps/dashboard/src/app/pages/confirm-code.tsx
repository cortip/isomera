import { Box, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export const ConfirmCode = () => {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().max(6).required('Code is required'),
    }),
    onSubmit: () => {
      navigation('/');
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
        </form>
      </Container>
    </Box>
  );
};
