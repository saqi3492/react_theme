import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from '@/shared/ConfirmDialog';
import UserForm from './UserForm';
import { deleteUser } from './UsersApiCalls';

const ActionRenderer = ({ data }) => {
  const [dialog, setDialog] = useState(null);

  const handleDelete = async () => {
    await deleteUser(data.id);
  };

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => setDialog('edit')}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => setDialog('delete')}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {dialog === 'edit' ? <UserForm onClose={() => setDialog(null)} userData={data} /> : null}
      {dialog === 'delete' ? (
        <ConfirmDialog
          onClose={() => setDialog(null)}
          onConfirm={handleDelete}
          title="Delete user?"
          message={
            <>
              <strong>{data.fullName}</strong> will be permanently removed. This action can’t be undone.
            </>
          }
        />
      ) : null}
    </>
  );
};

export default ActionRenderer;
