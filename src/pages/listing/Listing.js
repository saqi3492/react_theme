import { useEffect, useState } from 'react';
import { fetchDummyData } from './ListingApiCalls';
import ListingTable from './ListingTable';
import { Typography } from '@mui/material';

const Listing = () => {
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
        Listing
      </Typography>
      <ListingTable rowData={rowData} />
    </>
  );
};

export default Listing;
