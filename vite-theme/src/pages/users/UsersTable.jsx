import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, usersColDefs } from '@/utils/constants';
import ActionRenderer from './ActionRenderer';
import StatusRenderer from './StatusRenderer';
import NameRenderer from './NameRenderer';

const renderers = { ActionRenderer, StatusRenderer, NameRenderer };

const UsersTable = ({ isLoading, users }) => {
  return (
    <div style={{ flex: 1 }}>
      <AgGridReact loading={isLoading} rowData={users} columnDefs={usersColDefs} defaultColDef={defaultColDef} components={renderers} />
    </div>
  );
};

export default UsersTable;
