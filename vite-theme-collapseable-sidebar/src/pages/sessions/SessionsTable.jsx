import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { defaultColDef, sessionsColDefs } from '@/utils/constants';
import ActionRenderer from './ActionRenderer';

const renderers = { ActionRenderer };

const SessionsTable = ({ rowData }) => {
  return (
    <div className="ag-theme-alpine" style={{ flex: 1 }}>
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
