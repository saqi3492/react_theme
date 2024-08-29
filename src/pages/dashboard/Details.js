import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import CustomLoader from 'shared/CustomLoader';
import { fetchDataById } from './ApiCalls';

const Details = () => {
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchDataById(+id);
      if (data) setDetailsData(data);
      setIsLoading(false);
    })();
  }, [id]);

  return isLoading ? (
    <CustomLoader />
  ) : detailsData ? (
    <Typography textAlign="center" variant="h6" color="primary" mt={2}>
      {detailsData.title}
    </Typography>
  ) : (
    <Typography textAlign="center" variant="h6" color="primary" mt={2}>
      Sorry, we couldn't find what you're looking for.
    </Typography>
  );
};

export default Details;
