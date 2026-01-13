import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SessionDeleteDialog from '@/components/DeleteDialog';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import SessionForm from './TrainingForm';
import { deleteTraining } from './TrainingApiCalls';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ActionRenderer = ({ data }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: id => deleteTraining(id),
    onSuccess: async (_, id) => {
      await queryClient.cancelQueries({ queryKey: ['trainings'] });

      const queryCache = queryClient.getQueryCache();
      const trainingQueries = queryCache.findAll({ queryKey: ['trainings'] });
      const previousData = new Map();

      for (const query of trainingQueries) {
        const oldData = query.state.data;
        if (oldData && Array.isArray(oldData) && oldData.some(training => training.id === id)) {
          previousData.set(query.queryKey, oldData);
          queryClient.setQueryData(
            query.queryKey,
            oldData.filter(training => training.id !== id)
          );
        }
      }
    },
  });

  const handleDelete = async () => {
    await mutation.mutateAsync(data.id);
  };

  return (
    <>
      <Tooltip title="Show Details" placement="left">
        <IconButton onClick={() => navigate(`/training/details/${data.id}`)}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" placement="top">
        <IconButton onClick={() => setIsEditOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => setOpen(true)} disabled={mutation.isSuccess}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {open ? <SessionDeleteDialog closeDialog={() => setOpen(false)} handleDelete={handleDelete} Value={'Training'} /> : null}
      {isEditOpen ? <SessionForm onClose={() => setIsEditOpen(false)} data={data} /> : null}
    </>
  );
};

export default ActionRenderer;
