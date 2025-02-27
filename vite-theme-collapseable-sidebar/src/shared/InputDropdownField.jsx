import { MenuItem, TextField, Typography } from '@mui/material';

const InputDropdownField = ({ formik, items = [], name, label, onChange }) => {
  return (
    <>
      <Typography fontSize={14} fontWeight="500" gutterBottom>
        {label}
      </Typography>
      <TextField
        select
        name={name}
        value={formik.values[name]}
        onChange={e => {
          onChange ? onChange(e.target.value) : formik.handleChange(e);
        }}
        fullWidth
        size="small"
        sx={{
          '& .MuiSelect-select span::before': { content: `"Select ${label}"` },
        }}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      >
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default InputDropdownField;
