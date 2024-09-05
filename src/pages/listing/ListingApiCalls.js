// dataFetcher.js

import { setShowCustomLoader, setSnackbarObj } from 'redux/reducers/alertsSlice';
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
  try {
    dispatch(setShowCustomLoader());
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundData = dummyListingData.find((item) => item.id === id);

    if (foundData) {
      dispatch(setSnackbarObj({ message: `Fetched data for ID: ${id} successfully`, severity: 'success' }));
      return foundData;
    } else {
      dispatch(setSnackbarObj({ message: `No data found for ID: ${id}` }));
      return null;
    }
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    dispatch(setSnackbarObj({ message: 'Error fetching data by ID' }));
    return null;
  } finally {
    dispatch(setShowCustomLoader());
  }
};
