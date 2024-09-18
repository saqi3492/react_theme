import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { listingDefaultColDef, listingColDefs as colDefs } from 'utils/constants';
import ActionRenderer from './ActionRenderer';

const renderers = { ActionRenderer };

const ListingTable = ({ rowData }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 'calc(100% - 35px)' }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={listingDefaultColDef} components={renderers} />
    </div>
  );
};

export default ListingTable;
