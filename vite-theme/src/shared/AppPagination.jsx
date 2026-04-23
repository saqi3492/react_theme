import { Box, FormControl, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { PAGE_SIZE_OPTIONS } from '@/utils/constants';

const AppPagination = ({
  page = 1,
  pageSize = 10,
  totalPageCount = 1,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}) => {
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;

  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Page Size
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
