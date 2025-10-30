import { TextField, Typography } from '@mui/material';

const InputField = ({ formik, name, label, placeholder, onChange }) => {
  return (
    <>
      <Typography fontSize={14} fontWeight="500">
        {label}
      </Typography>
      <TextField
        fullWidth
        name={name}
        placeholder={placeholder || label}
        size="small"
        sx={{ mb: 1 }}
        value={formik.values[name]}
        onChange={onChange ?? formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </>
  );
};

export default InputField;
