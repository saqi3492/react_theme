import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import UserDeleteDialog from './UserDeleteDialog';
import { deleteTodo } from './UsersApiCalls';

const ActionRenderer = ({ data }) => {
  const [dialog, setDialog] = useState(null);

  const handleDelete = async () => {
    await deleteTodo(data.id);
  };

  return (
    <>
      <Tooltip title="Delete" placement="right">
        <IconButton onClick={() => setDialog('delete')}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {dialog === 'delete' ? <UserDeleteDialog closeDialog={() => setDialog(null)} handleDelete={handleDelete} /> : null}
    </>
  );
};

export default ActionRenderer;
