import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import PaperBox from '@/components/PaperBox';
import AppPagination from '@/shared/AppPagination';
import { setUsers } from '@/store/reducers/usersSlice';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';
import { fetchUsers } from './UsersApiCalls';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

const Users = () => {
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handleSearchTextChange = useCallback(value => {
    const normalizedValue = value || '';
    setSearchedText(prev => {
      if (prev === normalizedValue) return prev;
      setPage(1);
      return normalizedValue;
    });
  }, []);

  const handlePageChange = useCallback(nextPage => {
    setPage(nextPage);
  }, []);

  const handlePageSizeChange = useCallback(nextPageSize => {
    setPageSize(prev => {
      if (prev === nextPageSize) return prev;
      return nextPageSize;
    });
    setPage(1);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['users', searchedText, page, pageSize],
    queryFn: async ({ queryKey }) => {
      const [, filter, currentPage, currentPageSize] = queryKey;
      const result = await fetchUsers({ filter, page: currentPage, pageSize: currentPageSize });
      dispatch(setUsers(result.rows));
      return result;
    },
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const pagination = data?.pagination || { totalCount: 0, totalPageCount: 1 };

  return (
    <PaperBox sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <UsersHeader searchedText={searchedText} setSearchedText={handleSearchTextChange} />
      <UsersTable isLoading={isLoading} />
      <AppPagination
        page={page}
        pageSize={pageSize}
        totalCount={pagination.totalCount}
        totalPageCount={pagination.totalPageCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        disabled={isLoading}
      />
    </PaperBox>
  );
};

export default Users;
