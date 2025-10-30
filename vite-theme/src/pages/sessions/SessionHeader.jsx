import InputField from '@/shared/InputField';
import { setSearchSessionText } from '@/store/reducers/sessionSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateSession from './SessionForm';

const SessionHeader = () => {
  const dispatch = useDispatch();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const fetchSessionsRef = useRef(debounce(value => dispatch(setSearchSessionText(value)), 500));

  const formik = useFormik({ initialValues: { searchedText: '' } });

  const handleStartSession = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  useEffect(() => {
    fetchSessionsRef.current(formik.values.searchedText);
  }, [formik.values.searchedText]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5} mb={2.5}>
        <Box direction="row" alignItems="center" display="flex" gap={1}>
          <Typography variant="h6" fontWeight="500">
            Previous Sessions
          </Typography>

          <AddCircleOutlineIcon cursor="pointer" onClick={handleStartSession} color="primary" />
        </Box>
        <Box sx={{ width: '250px' }}>
          <InputField name="searchedText" placeholder="Enter Search Text" formik={formik} />
        </Box>
      </Stack>
      {isCreateDialogOpen ? <CreateSession onClose={handleCloseCreateDialog} /> : null}
    </>
  );
};

export default SessionHeader;
