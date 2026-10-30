import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import FormField from './FormField';

const PasswordInputField = ({ formik, label, name, onChange, size = 'small', sx = {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { touched, error, value } = formik.getFieldMeta(name);

  return (
    <FormField label={label} sx={sx}>
      <TextField
        fullWidth
        name={name}
        placeholder={label}
        value={value}
        size={size}
        onChange={onChange ? onChange : formik.handleChange}
        error={Boolean(touched && error)}
        helperText={touched && error}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </FormField>
  );
};

export default PasswordInputField;
