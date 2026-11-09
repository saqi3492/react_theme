import { useEffect, useMemo, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';

// Debounced search box. Remount with a new `key` to reset it from the parent.
const SearchField = ({ value = '', onSearch, placeholder = 'Search...', delay = 500, sx }) => {
  const [text, setText] = useState(value);

  const debouncedSearch = useMemo(() => debounce(searchText => onSearch?.(searchText), delay), [onSearch, delay]);

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleChange = e => {
    const searchText = e.target.value.trimStart();
    setText(searchText);
    debouncedSearch(searchText);
  };

  const handleClear = () => {
    debouncedSearch.cancel();
    setText('');
    onSearch?.('');
  };

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      onKeyDown={e => e.key === 'Escape' && text && handleClear()}
      sx={[
        {
          width: { xs: '100%', sm: 230 },
          transition: 'width 0.25s ease',
          '&:focus-within': { width: { sm: 250 } },
          '& .MuiOutlinedInput-root': { bgcolor: 'background.paper', pl: '10px' },
          '& .MuiOutlinedInput-root.Mui-focused .searchIcon': { color: 'primary.main' },
          '& input::placeholder': { color: 'text.disabled', opacity: 1 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" className="searchIcon" sx={{ color: 'text.disabled', transition: 'color 0.2s ease' }} />
            </InputAdornment>
          ),
          endAdornment: text ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                edge="end"
                onClick={handleClear}
                sx={{
                  p: '3px',
                  color: 'text.disabled',
                  transition: 'all 0.15s ease',
                  animation: 'clearFadeIn 0.15s ease',
                  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                  '@keyframes clearFadeIn': { from: { opacity: 0, transform: 'scale(0.6)' }, to: { opacity: 1, transform: 'scale(1)' } },
                }}
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
};

export default SearchField;
