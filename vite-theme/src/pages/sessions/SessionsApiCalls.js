// import axios from 'axios';
import { setHideBeatLoader, setShowBeatLoader, setSnackbarObj } from '@/store/reducers/alertsSlice';
import { setSessions, deleteSessionAction } from '@/store/reducers/sessionSLice';
import { dispatch, getState } from '@/store/store';
import { getFormattedDate, handleCatchError, handleErrorMessages } from '@/utils/helpers';

const getFormattedSessionData = session => {
  return {
    id: session.id,
    sessionId: session.sessionId,
    patientName: session.patientPseudoName,
    createdAt: getFormattedDate(session.createdAt, '', true),
    duration: session.sessionDuration || session.sessionDuration === 0 ? `${session.sessionDuration} mins` : '',
  };
};

export const fetchSessionData = async () => {
  if (getState().Session.sessions) return;

  try {
    dispatch(setShowBeatLoader());

    // const response = await axios.post('/sessions/list', { page_size: 2000 });
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
            sessionId: '57169cc8-e375-4b4b-962a-a67a26c81d98',
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
            id: 4,
            sessionId: '57169cc8-e375-4b4b-962a-a67a26c81d98',
            patientPseudoName: 'Daniel',
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

    if (response?.status && response.data?.data) {
      dispatch(setSessions(response.data.data.map(getFormattedSessionData)));
    } else {
      handleErrorMessages(response.errors);
    }
  } catch (error) {
    handleCatchError(error);
  } finally {
    dispatch(setHideBeatLoader());
  }
};

export const deleteSessionById = async sessionId => {
  try {
    // const response = await axios.delete(`/sessions/${sessionId}`);
    const response = { status: true, data: true, message: 'Session deleted successfully.' };

    if (response.status) {
      dispatch(deleteSessionAction(sessionId));
      dispatch(setSnackbarObj({ message: 'Session  deleted successfully.', severity: 'success' }));
    } else {
      handleErrorMessages(response.errors);
    }
  } catch (error) {
    handleCatchError(error);
  }
};
