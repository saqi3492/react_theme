import { Box, FormControl, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';

const AppPagination = ({
  page = 1,
  pageSize = 10,
  totalPageCount = 1,
  pageSizeOptions = [10, 25, 50],
  onPageChange,
  onPageSizeChange,
  disabled = false,
}) => {
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1.5}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Rows per page
        </Typography>
        <FormControl size="small">
          <Select value={safePageSize} onChange={e => onPageSizeChange?.(Number(e.target.value))} disabled={disabled}>
            {pageSizeOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Pagination
        color="primary"
        shape="circular"
        page={page}
        count={Math.max(totalPageCount, 1)}
        onChange={(_, value) => onPageChange?.(value)}
        disabled={disabled}
      />
    </Stack>
  );
};

export default AppPagination;
