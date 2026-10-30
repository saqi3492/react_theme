import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AppDialog = ({ onClose, maxWidth = 'xs', children }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      slotProps={{ paper: { sx: { p: 3, borderRadius: '14px', boxShadow: '0 24px 48px rgba(16, 24, 40, 0.18)' } } }}
    >
      <IconButton
        size="small"
        onClick={onClose}
        sx={{ position: 'absolute', right: 12, top: 12, color: 'text.disabled', '&:hover': { color: 'text.primary' } }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default AppDialog;
