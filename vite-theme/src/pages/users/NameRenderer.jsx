import { Avatar, Box, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const getInitials = name =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');

const NameRenderer = ({ value, data }) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', height: '100%', minWidth: 0 }}>
      <Avatar
        sx={theme => ({
          width: 28,
          height: 28,
          fontSize: 12,
          fontWeight: 600,
          color: 'primary.main',
          bgcolor: alpha(theme.palette.primary.main, 0.12),
        })}
      >
        {getInitials(value)}
      </Avatar>
      <Box
        component="button"
        type="button"
        onClick={() => navigate(`/users/details/${data.id}`)}
        sx={{
          p: 0,
          border: 0,
          background: 'none',
          font: 'inherit',
          fontWeight: 500,
          color: 'text.primary',
          cursor: 'pointer',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          transition: 'color 0.15s ease',
          '&:hover': { color: 'primary.main', textDecoration: 'underline', textUnderlineOffset: '3px' },
        }}
      >
        {value}
      </Box>
    </Stack>
  );
};

export default NameRenderer;
