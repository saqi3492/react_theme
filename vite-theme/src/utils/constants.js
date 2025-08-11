export const HEADER_HEIGHT = 60;
export const SIDEBAR_WIDTH = 230;
export const COLLAPSED_SIDEBAR_WIDTH = 75;
export const SIDEBAR_TOP_HEADER_AREA = 70;

export const defaultColDef = {
  filter: false,
  flex: 1,
  minWidth: 120,
  // cellStyle: { textAlign: 'center' },
};

export const sessionsColDefs = [
  {
    headerName: 'Patient Name',
    colId: 'patientName',
    field: 'patientName',
  },
  {
    headerName: 'Date & Time',
    colId: 'createdAt',
    field: 'createdAt',
  },
  {
    headerName: 'Duration',
    colId: 'duration',
    field: 'duration',
  },
  {
    headerName: 'Action',
    colId: 'action',
    field: 'sessionId',
    cellRenderer: 'ActionRenderer',
  },
];
