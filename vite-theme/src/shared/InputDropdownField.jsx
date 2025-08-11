import { Autocomplete, TextField, Typography } from '@mui/material';

const InputDropdownField = ({ items = [], name, label, formik, multiSelect = false, onChange, disabled = false }) => {
  return (
    <>
      <Typography color={disabled ? 'textSecondary' : 'textPrimary'} fontSize={14} fontWeight="500" mb="4px">
        {label}
      </Typography>
      <Autocomplete
        multiple={multiSelect}
        options={items}
        getOptionLabel={option => option.label}
        disableCloseOnSelect={multiSelect}
        disabled={disabled}
        value={
          multiSelect
            ? items.filter(item => formik.values[name]?.includes(item.value))
            : items.find(item => item.value === formik.values[name]) || null
        }
        onChange={(e, newValue) => {
          const updatedValue = multiSelect ? newValue?.map(option => option.value) : (newValue?.value ?? null);
          if (onChange) {
            onChange(updatedValue);
          } else {
            formik.setFieldValue(name, updatedValue);
          }
        }}
        renderInput={params => (
          <TextField
            {...params}
            name={name}
            fullWidth
            size="small"
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            placeholder={`Select ${label}`}
            variant="outlined"
            sx={{ mb: 1 }}
          />
        )}
      />
    </>
  );
};

export default InputDropdownField;
