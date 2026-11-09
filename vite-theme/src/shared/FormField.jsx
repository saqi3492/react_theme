import { Box, Typography } from '@mui/material';

// Shared wrapper for form inputs: label + input as one block with consistent spacing between fields
const FormField = ({ label, disabled = false, sx, children }) => {
  return (
    <Box sx={{ mb: 1.5, ...sx }}>
      {label ? (
        <Typography sx={{ mb: 0.5, fontSize: 14, fontWeight: 500, color: disabled ? 'text.secondary' : 'text.primary' }}>
          {label}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
};

export default FormField;
