import { ColDef } from 'ag-grid-community';

export const defaultColDef: ColDef = {
  filter: true,
  flex: 1,
  minWidth: 120,
  sortable: true,
  resizable: true,
  cellStyle: { display: 'flex', alignItems: 'center' },
  headerClass: 'ag-header-cell-custom',
};

export const usersColumnDefs: ColDef[] = [
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
