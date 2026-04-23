import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { defaultColDef, usersColDefs } from '@/utils/constants';
import ActionRenderer from './ActionRenderer';
import StatusRenderer from './StatusRenderer';

const renderers = { ActionRenderer, StatusRenderer };

const UsersTable = ({ isLoading }) => {
  const users = useSelector(state => state.Users.users);

  return (
    <div style={{ flex: 1 }}>
      <AgGridReact
        loading={isLoading}
        rowData={users}
        columnDefs={usersColDefs}
        defaultColDef={defaultColDef}
        components={renderers}
      />
    </div>
  );
};

export default UsersTable;
