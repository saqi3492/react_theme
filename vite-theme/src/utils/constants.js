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
    headerName: 'Headline',
    colId: 'headline',
    field: 'headline',
  },
  {
    headerName: 'Description',
    colId: 'description',
    field: 'description',
  },
  {
    headerName: 'Age Of Work',
    colId: 'ageOfWork',
    field: 'ageOfWork',
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
