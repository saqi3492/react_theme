import { useEffect, useState } from 'react';
import { fetchDummyData } from './ListingApiCalls';
import SessionsTable from './SessionsTable';
import { Typography } from '@mui/material';

const Sessions = () => {
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDummyData();
      if (data) setRowData(data);
    };

    getData();
  }, []);

  return (
    <>
      <Typography variant="h5" color="primary" fontWeight="bold">
        Sessions
      </Typography>
      <SessionsTable rowData={rowData} />
    </>
  );
};

export default Sessions;
