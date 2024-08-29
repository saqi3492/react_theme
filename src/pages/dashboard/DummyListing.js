import { useEffect, useState } from 'react';
import { fetchDummyData } from './ApiCalls';
import ListingTable from './ListingTable';
import { Typography } from '@mui/material';

const DummyListing = () => {
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

export default DummyListing;
