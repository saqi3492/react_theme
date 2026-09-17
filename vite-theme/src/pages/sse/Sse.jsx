import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useSse } from './useSse';

const STATUS_LABELS = {
  disconnected: 'Disconnected',
  connecting: 'Connecting...',
  connected: 'Connected',
  error: 'Error',
};

const Sse = () => {
  const { status, count } = useSse(true);

  return (
    <Box
      sx={{
        bgcolor: theme => alpha(theme.palette.primary.main, 0.05),
        border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        borderRadius: '12px',
        p: '20px 24px',
        maxWidth: 480,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Live Counter
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="body2">Status:</Typography>
        <Chip
          label={STATUS_LABELS[status] || status}
          size="small"
          variant="outlined"
          color="primary"
          sx={{ fontWeight: 600, borderRadius: '16px' }}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Count (increments every 2s)
      </Typography>

      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '24px',
          p: '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: theme => alpha(theme.palette.primary.main, 0.12),
            color: 'primary.main',
            fontWeight: 700,
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {count}
        </Box>
      </Box>
    </Box>
  );
};

export default Sse;
