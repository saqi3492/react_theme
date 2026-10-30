import { useState } from 'react';
import { Button, Typography, Stack, Avatar } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AppDialog from '@/components/AppDialog';

// Confirmation dialog, delete-styled by default. `onConfirm` may be async; the dialog closes after it resolves.
const ConfirmDialog = ({
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action can’t be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  color = 'error',
  icon: Icon = DeleteOutlineRoundedIcon,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    onClose();
    setLoading(false);
  };

  return (
    <AppDialog onClose={loading ? undefined : onClose}>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', pt: 1 }}>
        <Avatar sx={theme => ({ width: 56, height: 56, mb: 2, color: `${color}.main`, bgcolor: alpha(theme.palette[color].main, 0.1) })}>
          <Icon sx={{ fontSize: 28 }} />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {message}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
        <Button fullWidth variant="outlined" color="inherit" onClick={onClose} disabled={loading} sx={{ borderColor: 'divider' }}>
          {cancelText}
        </Button>
        <Button fullWidth variant="contained" color={color} onClick={handleConfirm} loading={loading} disableElevation>
          {confirmText}
        </Button>
      </Stack>
    </AppDialog>
  );
};

export default ConfirmDialog;
