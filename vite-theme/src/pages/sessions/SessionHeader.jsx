import { Typography, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreateSession from './CreateSession';

const SessionHeader = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleStartSession = () => {
    setIsCreateDialogOpen(true);
  };
  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5} mb={2.5}>
        <Typography variant="h6" fontWeight="500">
          Previous Sessions
        </Typography>
        <Button variant="contained" onClick={handleStartSession} startIcon={<AddIcon />}>
          Create Session
        </Button>
      </Stack>
      {isCreateDialogOpen ? <CreateSession onClose={handleCloseCreateDialog} /> : null}
    </>
  );
};

export default SessionHeader;
