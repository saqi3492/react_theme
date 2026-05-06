import { useState, useEffect, useRef } from 'react';
import { Typography, Stack, Box, IconButton, Button, Tooltip } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { debounce } from 'lodash';
import InputField from '@/shared/InputField';
import UserForm from './UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { resetFiltersAction, setSearchedText } from '@/store/reducers/usersSlice';

const UsersHeader = ({ refetch, isFetching }) => {
  const dispatch = useDispatch();
  const [isCreateDialog, setIsCreateDialog] = useState(false);
  const searchedText = useSelector(state => state.Users.searchedText);
  const [value, setValue] = useState(searchedText);

  const throttledScroll = useRef(
    debounce(text => {
      dispatch(setSearchedText(text));
    }, 500)
  );

  useEffect(() => {
    throttledScroll.current(value);
  }, [value]);

  const handleReset = () => {
    throttledScroll.current.cancel();
    setValue('');
    dispatch(resetFiltersAction());
  };

  const handleRefresh = () => {
    if (!isFetching) refetch();
  };

  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', m: 1.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Users
          </Typography>
          <Tooltip title={isFetching ? 'Getting Fresh Users...' : 'Refresh Users'} arrow>
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <InputField placeholder="Search here..." value={value} onChange={e => setValue(e.target.value)} fullWidth={false} />
          <Button variant="contained" size="small" onClick={handleReset} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            Reset Filters
          </Button>
        </Box>
      </Stack>
      {isCreateDialog ? <UserForm onClose={() => setIsCreateDialog(false)} /> : null}
    </>
  );
};

export default UsersHeader;
