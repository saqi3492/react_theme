import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import UserDeleteDialog from './UserDeleteDialog';
import UserForm from './UserForm';
import { deleteUser } from './UsersApiCalls';

const ActionRenderer = ({ data }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    await deleteUser(data.id);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  return (
    <>
      <Tooltip title="Show Details" placement="left">
        <IconButton onClick={() => navigate(`/users/details/${data.id}`)}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" placement="top">
        <IconButton onClick={() => setIsEditOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" placement="right">
        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {open ? <UserDeleteDialog closeDialog={() => setOpen(false)} handleDelete={handleDelete} /> : null}
      {isEditOpen ? <UserForm onClose={() => setIsEditOpen(false)} userData={data} /> : null}
    </>
  );
};

export default ActionRenderer;
