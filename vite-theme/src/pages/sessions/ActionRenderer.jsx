import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteDialog from '../../components/DeleteDialog';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import SessionForm from './SessionForm';
import { deleteSession } from './SessionsApiCalls';

const ActionRenderer = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    await deleteSession(data.sessionId);
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
      <Tooltip title="Delete" placement="right">
        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {open ? <DeleteDialog closeDialog={() => setOpen(false)} handleDelete={handleDelete} Value={'session'} /> : null}
      {isEditOpen ? <SessionForm onClose={() => setIsEditOpen(false)} sessionData={data} /> : null}
    </>
  );
};

export default ActionRenderer;
