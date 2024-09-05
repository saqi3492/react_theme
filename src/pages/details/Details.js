import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { fetchDataById } from '../listing/ListingApiCalls';
import { useSelector } from 'react-redux';

const Details = () => {
  const { id } = useParams();
  const showCustomLoader = useSelector((state) => state.Alerts.showCustomLoader);
  const [detailsData, setDetailsData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchDataById(+id);
      if (data) setDetailsData(data);
    })();
  }, [id]);

  return !showCustomLoader ? (
    detailsData ? (
      <Typography textAlign="center" variant="h6" color="primary" mt={2}>
        {detailsData.title}
      </Typography>
    ) : (
      <Typography textAlign="center" variant="h6" color="primary" mt={2}>
        Sorry, we couldn't find what you're looking for.
      </Typography>
    )
  ) : null;
};

export default Details;
