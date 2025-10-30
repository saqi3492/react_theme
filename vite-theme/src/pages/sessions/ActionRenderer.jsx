import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionDeleteDialog from './SessionDeleteDialog';
import SessionForm from './SessionForm';
import { deleteSession } from './SessionsApiCalls';

const ActionRenderer = ({ data }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteSession(data.id),
    onSuccess: () => queryClient.invalidateQueries(['sessions']),
  });

  const handleDelete = async () => {
    await mutation.mutateAsync();
  };

  return (
    <>
      <Tooltip title="Show Details" placement="left">
        <IconButton onClick={() => navigate(`/sessions/details/${data.sessionId}`)}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" placement="top">
        <IconButton onClick={() => setIsEditOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => setOpen(true)} disabled={mutation.isLoading}>
          {mutation.isLoading ? '...' : <DeleteIcon />}
        </IconButton>
      </Tooltip>
      {open ? <SessionDeleteDialog closeDialog={() => setOpen(false)} handleDelete={handleDelete} /> : null}
      {isEditOpen ? <SessionForm onClose={() => setIsEditOpen(false)} sessionData={data} /> : null}
    </>
  );
};

export default ActionRenderer;
