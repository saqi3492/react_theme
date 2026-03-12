import { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useAppSelector } from '@/store/store';
import { fetchUsers } from './usersApiCalls';
import UserForm from './UserForm';
import ActionRenderer from './ActionRenderer';
import SharedButton from '@/shared/GenericButton';
import InputField from '@/shared/InputField';
import { useFormik } from 'formik';
import { getLocalStorageItem, setLocalStorageItem, getFormattedDate } from '@/utils/helper';
import { debounce } from 'lodash';
import type { User } from '@/store/slices/usersSlice';
import { defaultColDef, usersColumnDefs } from '@/utils/agGridConfig';

const FILTER_STORAGE_KEY = 'users_filter';

const renderers = { ActionRenderer };

const Users = () => {
  const allUsers = useAppSelector(state => state.users.users);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const isLoading = allUsers.length === 0;

  // Load filter from localStorage
  const savedFilter = getLocalStorageItem<string>(FILTER_STORAGE_KEY, '');

  const formik = useFormik({
    initialValues: {
      searchText: savedFilter || '',
    },
    onSubmit: () => {},
  });

  // Filter and format users for display
  const filteredUsers = useMemo(() => {
    let usersToDisplay = allUsers;

    // Apply search filter
    if (formik.values.searchText) {
      const searchLower = formik.values.searchText.toLowerCase();
      usersToDisplay = allUsers.filter(
        (user: User) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower),
      );
    }

    // Format dates for display
    return usersToDisplay.map((user: User) => ({
      ...user,
      createdAt: getFormattedDate(user.createdAt, '', true),
      updatedAt: getFormattedDate(user.updatedAt, '', true),
    }));
  }, [allUsers, formik.values.searchText]);

  // Save filter to localStorage
  const debouncedSaveFilter = useMemo(
    () =>
      debounce((filter: string) => {
        setLocalStorageItem(FILTER_STORAGE_KEY, filter);
      }, 500),
    [],
  );

  useEffect(() => {
    // Only fetch if Redux state is empty
    if (allUsers.length === 0) {
      fetchUsers().catch(error => {
        console.error('Error fetching users:', error);
      });
    }
  }, [allUsers.length]);

  useEffect(() => {
    debouncedSaveFilter(formik.values.searchText);
  }, [formik.values.searchText, debouncedSaveFilter]);

  const handleCreateUser = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6 flex items-center justify-between px-6 pt-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <SharedButton onClick={handleCreateUser}>Add User</SharedButton>
      </div>

      <div className="mb-4 px-6">
        <InputField id="searchText" type="text" placeholder="Search by name, email, or role..." formik={formik} className="max-w-md" />
      </div>

      <div className="ag-theme-alpine flex-1" style={{ minHeight: 0, width: '100%' }}>
        <AgGridReact
          theme="legacy"
          rowData={filteredUsers}
          columnDefs={usersColumnDefs}
          defaultColDef={defaultColDef}
          components={renderers}
          loading={isLoading}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div>

      <UserForm isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
    </div>
  );
};

export default Users;
