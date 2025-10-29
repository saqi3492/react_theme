import { Typography, Stack, Box } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import CreateSession from './SessionForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { debounce } from 'lodash';
import InputField from '@/shared/InputField';
import { fetchSessions } from './SessionsApiCalls';

const SessionHeader = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const handleStartSession = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const debouncedFetchSession = useMemo(() => debounce(fetchSessions, 500), []);
  useEffect(() => {
    debouncedFetchSession(filter);
  }, [filter, debouncedFetchSession]);

  const handleSearchChange = e => setFilter(e.target.value);

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
          <InputField
            name="Search"
            label=""
            formik={{ values: { search: filter }, handleChange: handleSearchChange, touched: {}, errors: {} }}
          />
        </Box>
      </Stack>
      {isCreateDialogOpen ? <CreateSession onClose={handleCloseCreateDialog} /> : null}
    </>
  );
};

export default SessionHeader;
