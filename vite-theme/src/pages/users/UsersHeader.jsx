import { useState, useMemo, useEffect } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
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
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 1.5, mb: 2.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Users
          </Typography>
          <AddCircleOutlineOutlinedIcon cursor="pointer" onClick={handleStartUser} color="primary" />
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
