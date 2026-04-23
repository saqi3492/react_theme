import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
// import { useQueryClient } from '@tanstack/react-query';
import AppDialog from '@/components/AppDialog';
import InputField from '@/shared/InputField';
import InputDropdownField from '@/shared/InputDropdownField';
import { createUser, updateUser } from './UsersApiCalls';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().when('isEdit', {
    is: false,
    then: schema => schema.required('Password is required'),
    otherwise: schema => schema.notRequired(),
  }),
});

const activeOptions = [
  { value: true, label: 'Active' },
  { value: false, label: 'Inactive' },
];

const UserForm = ({ onClose, userData = null }) => {
  const isEdit = Boolean(userData);
  // const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      fullName: userData?.fullName || '',
      email: userData?.email || '',
      password: '',
      isActive: userData?.isActive ?? true,
      isEdit,
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (userData) {
        const res = await updateUser(userData.id, {
          fullName: values.fullName,
          email: values.email,
          isActive: values.isActive,
        });
        if (res) {
          onClose();
        }
      } else {
        const res = await createUser({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          isActive: values.isActive,
        });
        if (res) {
          onClose();
        }
      }
      // queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <AppDialog onClose={onClose} maxWidth="sm">
      <Box>
        <Typography fontWeight="500" fontSize={24} gutterBottom>
          {userData ? 'Update User' : 'Create New User'}
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '5px' }}>
          <InputField formik={formik} name="fullName" label="Full Name" />
          <InputField formik={formik} name="email" label="Email" type="email" />
          {!userData ? <InputField formik={formik} name="password" label="Password" type="password" /> : null}
          <InputDropdownField formik={formik} items={activeOptions} name="isActive" label="Status" />
          <Button size="small" type="submit" fullWidth variant="contained" sx={{ my: 1 }} loading={formik.isSubmitting}>
            {userData ? 'Update User' : 'Create User'}
          </Button>
        </form>
      </Box>
    </AppDialog>
  );
};

export default UserForm;
