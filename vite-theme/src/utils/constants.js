import { config } from '@/config/config';

export const HEADER_HEIGHT = 60;
export const SIDEBAR_WIDTH = 230;
export const COLLAPSED_SIDEBAR_WIDTH = 75;
export const SIDEBAR_TOP_HEADER_AREA = 70;
export const PAGE_SIZE_OPTIONS = [10, config.defaultPageSize, 50, 100, 200, 500];

export const defaultColDef = {
  filter: false,
  flex: 1,
  minWidth: 120,
  // cellStyle: { textAlign: 'center' },
};

export const usersColDefs = [
  {
    headerName: 'Full Name',
    colId: 'fullName',
    field: 'fullName',
  },
  {
    headerName: 'Email',
    colId: 'email',
    field: 'email',
  },
  {
    headerName: 'Status',
    colId: 'isActive',
    field: 'isActive',
    cellRenderer: 'StatusRenderer',
  },
  {
    headerName: 'Created At',
    colId: 'createdAt',
    field: 'createdAt',
  },
  {
    headerName: 'Action',
    colId: 'action',
    field: 'id',
    cellRenderer: 'ActionRenderer',
  },
];
