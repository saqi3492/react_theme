import { useState, useCallback } from 'react';
import { Typography, Stack, Box, IconButton, Button, Tooltip } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchField from '@/shared/SearchField';
import UserForm from './UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { resetFiltersAction, setSearchedText } from '@/store/reducers/usersSlice';

const UsersHeader = ({ refetch, isFetching }) => {
  const dispatch = useDispatch();
  const [isCreateDialog, setIsCreateDialog] = useState(false);
  const searchedText = useSelector(state => state.Users.searchedText);
  const [searchKey, setSearchKey] = useState(0);

  const handleSearch = useCallback(text => dispatch(setSearchedText(text)), [dispatch]);

  const handleReset = () => {
    setSearchKey(key => key + 1);
    dispatch(resetFiltersAction());
  };

  const handleRefresh = () => {
    if (!isFetching) refetch();
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', m: 1.5, gap: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Users
          </Typography>
          <Tooltip title={isFetching ? 'Getting Fresh Users...' : 'Refresh Users'}>
            <IconButton color="info" onClick={handleRefresh} sx={{ bgcolor: 'action.hover', '&:hover': { bgcolor: 'action.selected' } }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            color="primary"
            onClick={() => setIsCreateDialog(true)}
            sx={{ bgcolor: 'action.hover', '&:hover': { bgcolor: 'action.selected' } }}
          >
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchField key={searchKey} value={searchedText} onSearch={handleSearch} placeholder="Search users..." />
          <Button variant="contained" size="small" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Stack>
      {isCreateDialog ? <UserForm onClose={() => setIsCreateDialog(false)} /> : null}
    </>
  );
};

export default UsersHeader;
