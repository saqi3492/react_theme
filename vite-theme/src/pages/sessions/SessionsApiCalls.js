// import axios from 'axios';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import { dispatch } from '@/store/store';
import { getFormattedDate, handleCatchError, handleErrorMessages } from '@/utils/helpers';

const getFormattedSession = session => {
  return {
    id: session.id,
    sessionId: session.sessionId,
    patientName: session.patientPseudoName,
    createdAt: getFormattedDate(session.createdAt, '', true),
    duration: session.sessionDuration || session.sessionDuration === 0 ? `${session.sessionDuration} mins` : '',
  };
};

export const fetchSessions = async (filter = '') => {
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
          sessionId: '57169cc8-e375-4b4b-962a-a67a26c45454581d98',
          patientPseudoName: 'Daniel',
          providerId: 41,
          sessionDuration: 0,
          doctorNote: null,
          transcription: null,
          createdAt: '2024-12-13T13:06:29.000+00:00',
          updatedAt: '2024-12-13T13:06:29.000+00:00',
          transcriptionUsage: null,
        },
        {
          id: 428,
          sessionId: '57169cc8-e375-4b4b-962ha-a67a26c45454581d98',
          patientPseudoName: 'User Test',
          providerId: 41,
          sessionDuration: 0,
          doctorNote: null,
          transcription: null,
          createdAt: '2024-12-13T13:06:29.000+00:00',
          updatedAt: '2024-12-13T13:06:29.000+00:00',
          transcriptionUsage: null,
        },
        {
          id: 4284,
          sessionId: '57169cc8-e375h-4b4b-962ha-a67a26c45454581d98',
          patientPseudoName: 'User Test',
          providerId: 41,
          sessionDuration: 0,
          doctorNote: null,
          transcription: null,
          createdAt: '2024-12-13T13:06:29.000+00:00',
          updatedAt: '2024-12-13T13:06:29.000+00:00',
          transcriptionUsage: null,
        },
        {
          id: 4428,
          sessionId: '57169cc84-e375-4b4b-962ha-a67a26c45454581d98',
          patientPseudoName: 'User Test',
          providerId: 41,
          sessionDuration: 0,
          doctorNote: null,
          transcription: null,
          createdAt: '2024-12-13T13:06:29.000+00:00',
          updatedAt: '2024-12-13T13:06:29.000+00:00',
          transcriptionUsage: null,
        },
        {
          id: 4248,
          sessionId: '571694cc8-e375-4b4b-962ha-a67a26c45454581d98',
          patientPseudoName: 'User Test',
          providerId: 41,
          sessionDuration: 0,
          doctorNote: null,
          transcription: null,
          createdAt: '2024-12-13T13:06:29.000+00:00',
          updatedAt: '2024-12-13T13:06:29.000+00:00',
          transcriptionUsage: null,
        },
      ],
    },
    message: ' Session List',
  };

  try {
    console.log('.....');
    await new Promise(resolve => setTimeout(resolve, 1000));
    // const response = await axios.post('/sessions/list', { page_size: 2000 });

    const filteredData = filter
      ? response.data.data.filter(session => session.patientPseudoName.toLowerCase().includes(filter.toLowerCase()))
      : response.data.data;

    if (response?.status && filteredData) {
      return filteredData.map(getFormattedSession);
    }
    handleErrorMessages(filteredData.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const createSession = async sessionData => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // const response = await axios.post('/sessions/create', sessionData);
    const newsession = {
      status: true,
      data: {
        id: Math.random(1, 1000),
        sessionId: Math.random().toString(36).substring(2, 9),
        patientPseudoName: sessionData.patientName,
        providerId: 41,
        sessionDuration: sessionData.duration,
        doctorNote: null,
        transcription: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        transcriptionUsage: null,
      },
      message: 'Session Created successfully.',
    };

    if (newsession.status && newsession.data) {
      dispatch(setSnackbarObj({ message: 'Session created successfully.', severity: 'success' }));
      return getFormattedSession(newsession.data);
    }
    handleErrorMessages(newsession.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const updateSession = async (id, sessionData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // const response = await axios.put(`/sessions/${sessionId}`, sessionData);
    const updatedSession = {
      status: true,
      data: {
        id: id,
        sessionId: sessionData.sessionId,
        patientPseudoName: sessionData.patientName,
        providerId: sessionData.providerId,
        sessionDuration: sessionData.duration,
        doctorNote: sessionData.doctorNote,
        transcription: sessionData.transcription,
        createdAt: sessionData.createdAt,
        updatedAt: '2024-12-13T13:06:29.000+00:00',
        transcriptionUsage: sessionData.transcriptionUsage,
      },
      message: 'Session Created successfully.',
    };
    if (updatedSession.status && updatedSession.data) {
      dispatch(setSnackbarObj({ message: 'Session updated successfully.', severity: 'success' }));
      return getFormattedSession(updatedSession.data);
    } else {
      handleErrorMessages(updatedSession.errors);
    }
  } catch (error) {
    handleCatchError(error);
  }
};

export const deleteSession = async id => {
  try {
    // const response = await axios.delete(`/sessions/${sessionId}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = {
      id: id,
      status: true,
    };
    if (response.status) {
      dispatch(setSnackbarObj({ message: 'Session deleted successfully.', severity: 'success' }));
      return true;
    } else {
      dispatch(setSnackbarObj({ message: 'Failed to delete session.', severity: 'error' }));
      throw new Error('Failed to delete session');
    }
  } catch (error) {
    handleCatchError(error);
  }
};
