import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { listingDefaultColDef, listingColDefs as colDefs, dummyListingData } from 'utils/constants';
import ActionRenderer from './ActionRenderer';

const renderers = { ActionRenderer };

const TranscriptionsTable = () => {
  return (
    <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 150px)' }}>
      <AgGridReact rowData={dummyListingData} columnDefs={colDefs} defaultColDef={listingDefaultColDef} components={renderers} />
    </div>
  );
};

export default TranscriptionsTable;
