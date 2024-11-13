import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { fetchDataById } from '../listing/ListingApiCalls';
import { isEmpty } from 'lodash';

const Details = () => {
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState(null);

  useEffect(() => {
    (async () => {
      setDetailsData((await fetchDataById(+id)) ?? {});
    })();
  }, [id]);

  return detailsData ? (
    <Typography textAlign="center" variant="h6" color="primary" mt={2}>
      {isEmpty(detailsData) ? `Sorry, we couldn't find what you're looking for.` : detailsData.title}
    </Typography>
  ) : null;
};

export default Details;
