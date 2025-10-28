import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import AppDialog from '@/components/AppDialog';
import InputField from '@/shared/InputField';
import InputDropdownField from '@/shared/InputDropdownField';
import { createNewSession, UpdateSessionById } from './SessionsApiCalls';
const validationSchema = Yup.object().shape({
  patientName: Yup.string().required('Patient Name is required'),
  duration: Yup.number().positive('Duration must be a positive number').required('Duration is required'),
});

const CreateSession = ({ onClose, isEdit = false, sessionData = null }) => {
  const formik = useFormik({
    initialValues: {
      patientName: sessionData?.patientName || '',
      duration: sessionData?.duration ? parseInt(sessionData.duration) : '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit && sessionData) {
        await UpdateSessionById(sessionData.id, values);
      } else {
        await createNewSession(values);
      }
      onClose();
    },
  });

  const durationOptions = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
  ];

  return (
    <AppDialog onClose={onClose} maxWidth="sm">
      <Box sx={{ p: { xs: 2, lg: 4 }, width: '100%' }}>
        <Typography fontWeight="500" fontSize={24} gutterBottom>
          Create New Session
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '20px' }}>
          <InputField formik={formik} name="patientName" label="Patient Name" />

          <InputDropdownField formik={formik} items={durationOptions} name="duration" label="Duration" />

          <Button size="large" type="submit" fullWidth variant="contained" sx={{ my: 3 }} loading={formik.isSubmitting}>
            Create Session
          </Button>
        </form>
      </Box>
    </AppDialog>
  );
};

export default CreateSession;
