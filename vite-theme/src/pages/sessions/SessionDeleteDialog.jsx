import AppDialog from '@/components/AppDialog';
import { Button, DialogActions, DialogContent, Divider, Typography } from '@mui/material';
import { useState } from 'react';

const SessionDeleteDialog = ({ closeDialog, handleDelete }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    await handleDelete();
    closeDialog();
    setLoading(false);
  };
  return (
    <AppDialog onClose={closeDialog}>
      <DialogContent sx={{ p: '30px 10px', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Confirmation
        </Typography>
        <Typography variant="body2">Are you sure you want to delete this session?</Typography>
      </DialogContent>
      <Divider sx={{ mb: 2 }} />
      <DialogActions>
        <Button fullWidth variant="outlined" onClick={closeDialog}>
          No
        </Button>
        <Button loading={loading} fullWidth variant="contained" onClick={onDelete}>
          Yes
        </Button>
      </DialogActions>
    </AppDialog>
  );
};

export default SessionDeleteDialog;
