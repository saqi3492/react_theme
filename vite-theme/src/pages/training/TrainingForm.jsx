import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import AppDialog from '@/components/AppDialog';
import InputField from '@/shared/InputField';
import InputDropdownField from '@/shared/InputDropdownField';
import { createTraining, updateTraining } from './TrainingApiCalls';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const validationSchema = Yup.object().shape({
  trainingName: Yup.string().required('Training Name is required'),
  duration: Yup.number().positive('Duration must be a positive number').required('Duration is required'),
});

const durationOptions = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
];

const TrainingForm = ({ onClose, data = null }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: values => (data ? updateTraining(data.id, values) : createTraining(values)),

    onSuccess: async newTraining => {
      await queryClient.cancelQueries({ queryKey: ['trainings'] });

      const queryCache = queryClient.getQueryCache();
      const trainingQueries = queryCache.findAll({ queryKey: ['trainings'] });

      for (const query of trainingQueries) {
        const oldData = query.state.data;

        if (Array.isArray(oldData)) {
          if (data) {
            queryClient.setQueryData(
              query.queryKey,
              oldData.map(s => (s.id === data.id ? newTraining : s))
            );
          } else {
            queryClient.setQueryData(query.queryKey, [...oldData, newTraining]);
          }
        }
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      trainingName: data?.trainingName || '',
      duration: data?.duration ? parseInt(data.duration) : '',
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
          {data ? 'Update Training' : 'Create New Training'}
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '5px' }}>
          <InputField formik={formik} name="trainingName" label="Training Name" />

          <InputDropdownField formik={formik} items={durationOptions} name="duration" label="Duration" />

          <Button size="small" type="submit" fullWidth variant="contained" sx={{ my: 1 }} loading={formik.isSubmitting}>
            {data ? 'Update Training' : 'Create Training'}
          </Button>
        </form>
      </Box>
    </AppDialog>
  );
};

export default TrainingForm;
