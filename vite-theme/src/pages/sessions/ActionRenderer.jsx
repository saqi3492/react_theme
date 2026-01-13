import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SessionDeleteDialog from './SessionDeleteDialog';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import SessionForm from './SessionForm';
import { deleteSession } from './SessionsApiCalls';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setSessionsAction } from '@/store/reducers/sessionSlice';

const ActionRenderer = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: id => deleteSession(id),
    onSuccess: async (_, id) => {
      await queryClient.cancelQueries({ queryKey: ['sessions'] });

      const queryCache = queryClient.getQueryCache();
      const sessionQueries = queryCache.findAll({ queryKey: ['sessions'] });
      const previousData = new Map();

      for (const query of sessionQueries) {
        const oldData = query.state.data;
        if (oldData && Array.isArray(oldData) && oldData.some(session => session.id === id)) {
          previousData.set(query.queryKey, oldData);
          queryClient.setQueryData(
            query.queryKey,
            oldData.filter(session => session.id !== id)
          );
          dispatch(setSessionsAction(oldData.filter(session => session.id !== id)));
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
        <IconButton onClick={() => setOpen(true)} disabled={mutation.isSuccess}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {open ? <SessionDeleteDialog closeDialog={() => setOpen(false)} handleDelete={handleDelete} /> : null}
      {isEditOpen ? <SessionForm onClose={() => setIsEditOpen(false)} sessionData={data} /> : null}
    </>
  );
};

export default ActionRenderer;
