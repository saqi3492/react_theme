import { Autocomplete, TextField } from '@mui/material';
import FormField from './FormField';

// Works with formik (pass `formik` + `name`) or standalone (pass `value` + `onChange`). Explicit props win over formik.
// `value` / `onChange` use the option's `value` (an array of values when `multiSelect`), not the whole option object.
const InputDropdownField = ({
  items = [],
  formik,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  multiSelect = false,
  disabled = false,
  sx,
}) => {
  const formikError = formik?.touched[name] && formik?.errors[name];
  const selectedValue = value !== undefined ? value : formik?.values[name];

  const handleChange = (e, newValue) => {
    const updatedValue = multiSelect ? newValue.map(option => option.value) : (newValue?.value ?? null);
    if (onChange) onChange(updatedValue);
    else formik?.setFieldValue(name, updatedValue);
  };

  return (
    <FormField label={label} disabled={disabled} sx={sx}>
      <Autocomplete
        multiple={multiSelect}
        options={items}
        getOptionLabel={option => option.label}
        isOptionEqualToValue={(option, selected) => option.value === selected.value}
        disableCloseOnSelect={multiSelect}
        disabled={disabled}
        value={
          multiSelect
            ? items.filter(item => selectedValue?.includes(item.value))
            : (items.find(item => item.value === selectedValue) ?? null)
        }
        onChange={handleChange}
        renderInput={params => (
          <TextField
            {...params}
            name={name}
            fullWidth
            size="small"
            placeholder={placeholder ?? (label ? `Select ${label}` : undefined)}
            error={error ?? Boolean(formikError)}
            helperText={helperText ?? (formikError || undefined)}
          />
        )}
      />
    </FormField>
  );
};

export default InputDropdownField;
