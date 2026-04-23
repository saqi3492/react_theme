import { Chip } from '@mui/material';

const StatusRenderer = ({ value }) => {
  const isActive = Boolean(value);
  return <Chip size="small" label={isActive ? 'Active' : 'Inactive'} color={isActive ? 'success' : 'error'} />;
};

export default StatusRenderer;
