import { Button, DialogContent, DialogActions, Typography, Divider } from '@mui/material';
import AppDialog from 'components/AppDialog';
import { LoadingButton } from '@mui/lab';
import { deleteSessionById } from 'pages/sessions/SessionsApiCalls';
import { useState } from 'react';

const SessionDeleteDialog = ({ closeDialog, data }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteSessionById(data.sessionId);
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
        <LoadingButton loading={loading} fullWidth variant="contained" onClick={handleDelete}>
          Yes
        </LoadingButton>
      </DialogActions>
    </AppDialog>
  );
};

export default SessionDeleteDialog;
