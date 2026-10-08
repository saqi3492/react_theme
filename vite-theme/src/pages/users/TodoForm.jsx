import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import AppDialog from '@/components/AppDialog';
import InputField from '@/shared/InputField';
import { createTodo } from './UsersApiCalls';

const validationSchema = Yup.object().shape({
  headline: Yup.string().required('Headline is required'),
  description: Yup.string().required('Description is required'),
  ageOfWork: Yup.number().typeError('Age of work must be a number').min(0, 'Age of work must be 0 or more').required('Age of work is required'),
});

const TodoForm = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      headline: '',
      description: '',
      ageOfWork: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const { headline, description, ageOfWork } = values;
      const isSuccess = await createTodo({ headline, description, ageOfWork: Number(ageOfWork) });
      if (isSuccess) {
        onClose();
      }
    },
  });

  return (
    <AppDialog onClose={onClose} maxWidth="sm">
      <Box>
        <Typography gutterBottom sx={{ fontWeight: 500, fontSize: 24 }}>
          Create New Todo
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '5px' }}>
          <InputField formik={formik} name="headline" label="Headline" />
          <InputField formik={formik} name="description" label="Description" />
          <InputField formik={formik} name="ageOfWork" label="Age Of Work" type="number" />
          <Button size="small" type="submit" fullWidth variant="contained" sx={{ my: 1 }} loading={formik.isSubmitting}>
            Create Todo
          </Button>
        </form>
      </Box>
    </AppDialog>
  );
};

export default TodoForm;
