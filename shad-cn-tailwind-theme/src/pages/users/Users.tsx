import { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Plus } from 'lucide-react';
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

const FILTER_STORAGE_KEY = 'users_filter';

const renderers = { ActionRenderer };

const defaultColDef: ColDef = {
  filter: true,
  flex: 1,
  minWidth: 120,
  sortable: true,
};

const columnDefs: ColDef[] = [
  {
    headerName: 'Name',
    field: 'name',
    colId: 'name',
  },
  {
    headerName: 'Email',
    field: 'email',
    colId: 'email',
  },
  {
    headerName: 'Role',
    field: 'role',
    colId: 'role',
  },
  {
    headerName: 'Created At',
    field: 'createdAt',
    colId: 'createdAt',
  },
  {
    headerName: 'Updated At',
    field: 'updatedAt',
    colId: 'updatedAt',
  },
  {
    headerName: 'Actions',
    field: 'id',
    colId: 'actions',
    cellRenderer: 'ActionRenderer',
    filter: false,
    sortable: false,
    flex: 0,
    minWidth: 150,
  },
];

const Users = () => {
  const allUsers = useAppSelector(state => state.users.users);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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
      setIsLoading(true);
      fetchUsers().finally(() => {
        setIsLoading(false);
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
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <SharedButton onClick={handleCreateUser}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </SharedButton>
      </div>

      <div className="mb-4">
        <InputField
          id="searchText"
          type="text"
          placeholder="Search by name, email, or role..."
          formik={formik}
          className="max-w-md"
        />
      </div>

      <div className="ag-theme-alpine flex-1" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={filteredUsers}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          components={renderers}
          loading={isLoading}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
        />
      </div>

      <UserForm isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
    </div>
  );
};

export default Users;
