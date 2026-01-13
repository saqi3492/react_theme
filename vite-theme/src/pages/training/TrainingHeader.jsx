import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateTraining from './TrainingForm';

const TrainingHeader = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleStartTraining = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5} mb={2.5}>
        <Box direction="row" alignItems="center" display="flex" gap={1}>
          <Typography variant="h6" fontWeight="500">
            Previous Trainings
          </Typography>
        </Box>
        <AddCircleOutlineIcon cursor="pointer" color="primary" onClick={handleStartTraining} />
      </Stack>
      {isCreateDialogOpen ? <CreateTraining onClose={handleCloseCreateDialog} /> : null}
    </>
  );
};
export default TrainingHeader;
