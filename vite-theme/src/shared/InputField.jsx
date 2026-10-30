import { TextField } from '@mui/material';
import FormField from './FormField';

// Works with formik (pass `formik` + `name`) or standalone (pass `value` + `onChange`). Explicit props win over formik.
const InputField = ({
  formik,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  type = 'text',
  fullWidth = true,
  disabled = false,
  sx,
}) => {
  const formikError = formik?.touched[name] && formik?.errors[name];
  const fieldValue = value ?? formik?.values[name] ?? '';

  const fieldOnChange = e => {
    e.target.value = e.target.value.trimStart();
    (onChange ?? formik?.handleChange)?.(e);
  };

  return (
    <FormField label={label} disabled={disabled} sx={sx}>
      <TextField
        fullWidth={fullWidth}
        name={name}
        type={type}
        placeholder={placeholder || label}
        size="small"
        disabled={disabled}
        value={fieldValue}
        onChange={fieldOnChange}
        error={error ?? Boolean(formikError)}
        helperText={helperText ?? (formikError || undefined)}
      />
    </FormField>
  );
};

export default InputField;
