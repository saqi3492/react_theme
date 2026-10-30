import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AppDialog from '@/components/AppDialog';
import InputField from '@/shared/InputField';
import PasswordInputField from '@/shared/PasswordInputField';
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

const UserForm = ({ onClose, userData = null, refetch }) => {
  const formik = useFormik({
    initialValues: {
      fullName: userData?.fullName || '',
      email: userData?.email || '',
      password: '',
      isActive: userData?.isActive ?? true,
      isEdit: Boolean(userData),
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      let isSuccess = false;
      const { fullName, email, password, isActive } = values;
      if (userData) {
        const payload = { fullName, email, isActive };
        isSuccess = await updateUser(userData.id, payload);
      } else {
        const payload = { fullName, email, password, isActive };
        isSuccess = await createUser(payload);
      }
      if (isSuccess) {
        onClose();
        refetch();
      }
    },
  });

  return (
    <AppDialog onClose={onClose} maxWidth="sm">
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3, pr: 4 }}>
        <Avatar sx={theme => ({ width: 44, height: 44, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) })}>
          {userData ? <EditOutlinedIcon /> : <PersonAddAltOutlinedIcon />}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
            {userData ? 'Update User' : 'Create New User'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {userData ? 'Edit the details of this user.' : 'Fill in the details to add a new user.'}
          </Typography>
        </Box>
      </Stack>

      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <InputField formik={formik} name="fullName" label="Full Name" />
        <InputField formik={formik} name="email" label="Email" type="email" />
        {!userData ? <PasswordInputField formik={formik} name="password" label="Password" /> : null}
        <InputDropdownField formik={formik} items={activeOptions} name="isActive" label="Status" />

        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end', mt: 1 }}>
          <Button variant="outlined" color="inherit" onClick={onClose} sx={{ borderColor: 'divider', px: 3 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disableElevation loading={formik.isSubmitting} sx={{ px: 3 }}>
            {userData ? 'Save Changes' : 'Create User'}
          </Button>
        </Stack>
      </form>
    </AppDialog>
  );
};

export default UserForm;
