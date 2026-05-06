import { TextField, Typography } from '@mui/material';

const InputField = ({ formik, fullWidth = true, name, label, placeholder, value, onChange, type = 'text' }) => {
  const fieldValue = formik ? (formik.values[name] ?? '') : value;

  const fieldOnChange = e => {
    e.target.value = e.target.value.trimStart();
    (onChange ?? formik?.handleChange)?.(e);
  };

  return (
    <>
      {label ? <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{label}</Typography> : null}
      <TextField
        fullWidth={fullWidth}
        name={name}
        type={type}
        placeholder={placeholder || label}
        size="small"
        sx={{ mb: label ? 1 : 0 }}
        value={fieldValue}
        onChange={fieldOnChange}
        error={formik && formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik && formik.touched[name] && formik.errors[name]}
      />
    </>
  );
};

export default InputField;
