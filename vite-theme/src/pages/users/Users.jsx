import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import PaperBox from '@/components/PaperBox';
import AppPagination from '@/shared/AppPagination';
import { setUsers } from '@/store/reducers/usersSlice';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';
import { fetchUsers } from './UsersApiCalls';

const Users = () => {
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['users', searchedText, page, pageSize],
    queryFn: async () => {
      const result = await fetchUsers({ filter: searchedText, page, pageSize });
      dispatch(setUsers(result.rows));
      return result;
    },
  });

  const pagination = data?.pagination || { totalCount: 0, totalPageCount: 1 };
  const handleSearchTextChange = value => {
    setSearchedText(value);
    setPage(1);
  };

  return (
    <PaperBox sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <UsersHeader searchedText={searchedText} setSearchedText={handleSearchTextChange} />
      <UsersTable isLoading={isLoading} />
      <AppPagination
        page={page}
        pageSize={pageSize}
        totalCount={pagination.totalCount}
        totalPageCount={pagination.totalPageCount}
        onPageChange={setPage}
        onPageSizeChange={nextPageSize => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
        disabled={isLoading}
      />
    </PaperBox>
  );
};

export default Users;
