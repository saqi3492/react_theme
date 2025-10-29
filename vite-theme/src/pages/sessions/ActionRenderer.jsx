import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SessionDeleteDialog from './SessionDeleteDialog';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import SessionForm from './SessionForm';

const ActionRenderer = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
      {open ? <SessionDeleteDialog closeDialog={() => setOpen(false)} data={data} /> : null}
      {isEditOpen ? <SessionForm onClose={() => setIsEditOpen(false)} sessionData={data} /> : null}
    </>
  );
};

export default ActionRenderer;
