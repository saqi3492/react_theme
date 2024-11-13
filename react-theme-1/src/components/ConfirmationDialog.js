import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const ConfirmationDialog = ({ setOpen, data }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setOpen(false);
    setLoading(false);
  };

  return (
    <Dialog open={true} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Confirmation!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <b>'{data.title ?? 'this'}'</b> ?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mr: 1, mb: 1 }}>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <LoadingButton loading={loading} variant="contained" onClick={handleDelete}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
