import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import { dispatch } from '@/store/store';
import { getFormattedDate, handleCatchError, handleErrorMessages } from '@/utils/helpers';

const getFormattedTraining = training => {
  const duration = training.trainingDuration ?? training.duration ?? 0;
  return {
    id: training.id,
    trainingId: training.trainingId,
    trainingName: training.trainingName,
    createdAt: getFormattedDate(training.createdAt, '', true),
    duration: duration || duration === 0 ? `${duration} mins` : '',
  };
};

export const fetchTraining = async () => {
  const response = {
    status: true,
    data: {
      count: 5,
      total_count: 5,
      total_page_count: 1,
      page: 1,
      page_size: 2000,
      data: [
        {
          id: 425,
          trainingId: 'tr-001',
          trainingName: 'Daniel',
          trainingDuration: 0,
          createdAt: '2024-12-13T13:06:29.000+00:00',
        },
        {
          id: 428,
          trainingId: 'tr-002',
          trainingName: 'User Test 1',
          trainingDuration: 45,
          createdAt: '2024-12-13T13:06:29.000+00:00',
        },
        {
          id: 4284,
          trainingId: 'tr-003',
          trainingName: 'User Test 2',
          trainingDuration: 30,
          createdAt: '2024-12-13T13:06:29.000+00:00',
        },
        {
          id: 4428,
          trainingId: 'tr-004',
          trainingName: 'User Test 3',
          trainingDuration: 15,
          createdAt: '2024-12-13T13:06:29.000+00:00',
        },
        {
          id: 4248,
          trainingId: 'tr-005',
          trainingName: 'User Test 4',
          trainingDuration: 60,
          createdAt: '2024-12-13T13:06:29.000+00:00',
        },
      ],
    },
    message: 'Training list',
  };

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (response?.status) {
      return response.data.data.map(getFormattedTraining);
    }
    handleErrorMessages(response.data.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const createTraining = async training => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newTraining = {
      status: true,
      data: {
        id: Math.floor(Math.random() * 10000),
        trainingId: Math.random().toString(36).substring(2, 9),
        trainingName: training.trainingName,
        trainingDuration: training.duration || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'Training created successfully.',
    };

    if (newTraining.status && newTraining.data) {
      dispatch(setSnackbarObj({ message: 'Training created successfully.', severity: 'success' }));
      return getFormattedTraining(newTraining.data);
    }
    handleErrorMessages(newTraining.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const updateTraining = async (id, trainingData) => {
  console.log('Updating training with ID:', id, 'and data:', trainingData);
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updatedTraining = {
      status: true,
      data: {
        id,
        trainingId: trainingData.trainingId,
        trainingName: trainingData.trainingName,
        trainingDuration: trainingData.duration,
        createdAt: trainingData.createdAt,
        updatedAt: new Date().toISOString(),
      },
      message: 'Training updated successfully.',
    };

    if (updatedTraining.status && updatedTraining.data) {
      dispatch(setSnackbarObj({ message: 'Training updated successfully.', severity: 'success' }));
      return getFormattedTraining(updatedTraining.data);
    } else {
      handleErrorMessages(updatedTraining.errors);
    }
  } catch (error) {
    handleCatchError(error);
  }
};

export const deleteTraining = async id => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = { id, status: true };

    if (response.status) {
      dispatch(setSnackbarObj({ message: 'Training deleted successfully.', severity: 'success' }));
      return true;
    } else {
      dispatch(setSnackbarObj({ message: 'Failed to delete training.', severity: 'error' }));
      throw new Error('Failed to delete training');
    }
  } catch (error) {
    handleCatchError(error);
  }
};
