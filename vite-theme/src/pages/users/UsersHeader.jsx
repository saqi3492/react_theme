import { useState, useMemo, useEffect } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { debounce } from 'lodash';
import { useFormik } from 'formik';
import InputField from '@/shared/InputField';
import UserForm from './UserForm';

const UsersHeader = ({ searchedText, setSearchedText }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const debouncedSetSearchedText = useMemo(() => debounce(setSearchedText, 500), [setSearchedText]);
  const formik = useFormik({ initialValues: { searchedText } });

  const handleStartUser = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  useEffect(() => {
    debouncedSetSearchedText(formik.values.searchedText);
  }, [formik.values.searchedText, debouncedSetSearchedText]);

  useEffect(() => {
    return () => {
      debouncedSetSearchedText.cancel();
    };
  }, [debouncedSetSearchedText]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5} mb={2.5}>
        <Box direction="row" alignItems="center" display="flex" gap={1}>
          <Typography variant="h6" fontWeight="500">
            Users
          </Typography>
          <AddCircleOutlineIcon cursor="pointer" onClick={handleStartUser} color="primary" />
        </Box>
        <Box sx={{ width: '250px' }}>
          <InputField name="searchedText" placeholder="Search by email" formik={formik} />
        </Box>
      </Stack>
      {isCreateDialogOpen ? <UserForm onClose={handleCloseCreateDialog} /> : null}
    </>
  );
};

export default UsersHeader;
