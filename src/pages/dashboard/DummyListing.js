import ListingTable from './ListingTable';
import { Typography } from '@mui/material';

const DummyListing = () => {
  return (
    <>
      <Typography variant="h5" color="primary" fontWeight="bold">
        Listing
      </Typography>
      <ListingTable />
    </>
  );
};

export default DummyListing;
