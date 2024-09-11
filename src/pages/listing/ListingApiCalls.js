import { setHideBeatLoader, setShowBeatLoader, setSnackbarObj } from 'redux/reducers/alertsSlice';
import { dispatch } from 'redux/store';
import { dummyListingData } from 'utils/constants';

export const fetchDummyData = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setSnackbarObj({ message: 'Api Fetched Data Suucessfully', severity: 'success' }));

    return dummyListingData;
  } catch (error) {
    console.error('Error fetching dummy data:', error);

    return [];
  }
};

export const fetchDataById = async (id) => {
  let foundData = {};
  try {
    dispatch(setShowBeatLoader());
    await new Promise((resolve) => setTimeout(resolve, 1000));

    foundData = dummyListingData.find((item) => item.id === id);

    if (foundData) {
      dispatch(setSnackbarObj({ message: `Fetched data for ID: ${id} successfully`, severity: 'success' }));
    } else {
      dispatch(setSnackbarObj({ message: `No data found for ID: ${id}` }));
      foundData = {};
    }
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    dispatch(setSnackbarObj({ message: 'Error fetching data by ID' }));
  } finally {
    dispatch(setHideBeatLoader());
    return foundData;
  }
};
