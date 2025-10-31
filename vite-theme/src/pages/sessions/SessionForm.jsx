import AppDialog from '@/components/AppDialog';
import InputDropdownField from '@/shared/InputDropdownField';
import InputField from '@/shared/InputField';
import { Box, Button, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createSession, updateSession } from './SessionsApiCalls';

const validationSchema = Yup.object().shape({
  patientName: Yup.string().required('Patient Name is required'),
  duration: Yup.number().positive('Duration must be a positive number').required('Duration is required'),
});

const durationOptions = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
];

const SessionForm = ({ onClose, sessionData = null }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: values => (sessionData ? updateSession(sessionData.id, values) : createSession(values)),

    onSuccess: async newSession => {
      await queryClient.cancelQueries({ queryKey: ['sessions'] });

      const queryCache = queryClient.getQueryCache();
      const sessionQueries = queryCache.findAll({ queryKey: ['sessions'] });

      for (const query of sessionQueries) {
        const oldData = query.state.data;

        if (Array.isArray(oldData)) {
          if (sessionData) {
            queryClient.setQueryData(
              query.queryKey,
              oldData.map(s => (s.id === sessionData.id ? newSession : s))
            );
          } else {
            queryClient.setQueryData(query.queryKey, [...oldData, newSession]);
          }
        }
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      patientName: sessionData?.patientName || '',
      duration: sessionData?.duration ? parseInt(sessionData.duration) : '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await mutation.mutateAsync(values);

      onClose();
    },
  });

  return (
    <AppDialog onClose={onClose} maxWidth="sm">
      <Box>
        <Typography fontWeight="500" fontSize={24} gutterBottom>
          {sessionData ? 'Update Session' : 'Create New Session'}
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '5px' }}>
          <InputField formik={formik} name="patientName" label="Patient Name" />

          <InputDropdownField formik={formik} items={durationOptions} name="duration" label="Duration" />

          <Button size="small" type="submit" fullWidth variant="contained" sx={{ my: 1 }} loading={mutation.isPending}>
            {sessionData ? 'Update Session' : 'Create Session'}
          </Button>
        </form>
      </Box>
    </AppDialog>
  );
};

export default SessionForm;
