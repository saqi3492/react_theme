import { useState, useRef, useEffect } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import CreateSession from './SessionForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { debounce } from 'lodash';
import InputField from '@/shared/InputField';
import { fetchSessions } from './SessionsApiCalls';
import { useFormik } from 'formik';

const SessionHeader = () => {
  const fetchSessionsRef = useRef(debounce(fetchSessions, 500));
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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
