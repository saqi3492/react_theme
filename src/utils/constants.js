export const HEADER_HEIGHT = 60;
export const SIDEBAR_WIDTH = 240;
export const COLLAPSED_SIDEBAR_WIDTH = 70;
export const SIDEBAR_TOP_HEADER_AREA = 70;

export const listingDefaultColDef = {
  filter: false,
  flex: 1,
  minWidth: 100
  // cellStyle: { textAlign: 'center' }
};

export const listingColDefs = [
  {
    headerName: 'id',
    colId: 'id',
    field: 'id'
  },
  {
    headerName: 'Title',
    colId: 'title',
    field: 'title',
    filter: 'agTextColumnFilter',
    flex: 2
  },
  {
    headerName: 'Speakers',
    colId: 'speakers',
    field: 'speakers',
    flex: 0.5
  },
  {
    headerName: 'Duration',
    colId: 'duration',
    field: 'duration',
    flex: 0.5
  },
  {
    headerName: 'Created Date',
    colId: 'createdAt',
    field: 'createdAt'
    // filter: 'agDateColumnFilter',
    // valueGetter: (params) => getValidDateObj(params.data.createdAt),
    // valueFormatter: (params) => getFormattedDate(params.value)
  },
  {
    headerName: 'Status',
    colId: 'status',
    field: 'status'
  },
  {
    headerName: 'Action',
    colId: 'action',
    field: 'id',
    cellRenderer: 'ActionRenderer',
    minWidth: 120
  }
];

// Dummy data array matching the column definitions
export const dummyListingData = [
  {
    id: 1,
    title: 'Introduction to React',
    speakers: 'John Doe, Jane Smith',
    duration: '30 mins',
    createdAt: '2023-01-15T10:00:00Z',
    status: 'Published'
  },
  {
    id: 2,
    title: 'Advanced JavaScript Techniques',
    speakers: 'Emily Johnson',
    duration: '45 mins',
    createdAt: '2023-02-20T14:30:00Z',
    status: 'Draft'
  },
  {
    id: 3,
    title: 'CSS Grid Layout Mastery',
    speakers: 'Michael Brown, Lisa White',
    duration: '60 mins',
    createdAt: '2023-03-10T09:15:00Z',
    status: 'Published'
  },
  {
    id: 4,
    title: 'Understanding Async/Await in JavaScript',
    speakers: 'David Wilson',
    duration: '40 mins',
    createdAt: '2023-04-05T13:45:00Z',
    status: 'Published'
  },
  {
    id: 5,
    title: 'TypeScript for Beginners',
    speakers: 'Sophia Davis, Alexander Martinez',
    duration: '50 mins',
    createdAt: '2023-05-25T11:00:00Z',
    status: 'Draft'
  },
  {
    id: 6,
    title: 'Full-Stack Development with MERN',
    speakers: 'Emma Garcia',
    duration: '75 mins',
    createdAt: '2023-06-15T08:30:00Z',
    status: 'Published'
  },
  {
    id: 7,
    title: 'Mastering Python for Data Science',
    speakers: 'Oliver Martinez, Ava Thompson',
    duration: '90 mins',
    createdAt: '2023-07-20T16:00:00Z',
    status: 'Draft'
  },
  {
    id: 8,
    title: 'Introduction to Machine Learning',
    speakers: 'Liam Hernandez',
    duration: '80 mins',
    createdAt: '2023-08-10T10:20:00Z',
    status: 'Published'
  },
  {
    id: 9,
    title: 'Building Responsive Websites with Tailwind CSS',
    speakers: 'Lucas Anderson, Mia Rodriguez',
    duration: '55 mins',
    createdAt: '2023-09-18T15:10:00Z',
    status: 'Draft'
  },
  {
    id: 10,
    title: 'Understanding Docker and Kubernetes',
    speakers: 'Amelia Perez',
    duration: '65 mins',
    createdAt: '2023-10-12T17:30:00Z',
    status: 'Published'
  }
];
