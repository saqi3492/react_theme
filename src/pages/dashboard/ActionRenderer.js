import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';

const ActionRenderer = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Show Details" placement="left">
        <IconButton onClick={() => navigate(`/details/${data.id}`)}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" placement="right">
        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {open ? <ConfirmationDialog setOpen={setOpen} data={data} /> : null}
    </>
  );
};

export default ActionRenderer;
