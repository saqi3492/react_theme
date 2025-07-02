import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, sessionsColDefs } from '@/utils/constants';
import ActionRenderer from './ActionRenderer';

const renderers = { ActionRenderer };

const SessionsTable = ({ rowData }) => {
  return (
    <div style={{ flex: 1 }}>
      <AgGridReact
        loading={rowData === null}
        rowData={rowData}
        columnDefs={sessionsColDefs}
        defaultColDef={defaultColDef}
        components={renderers}
      />
    </div>
  );
};

export default SessionsTable;
