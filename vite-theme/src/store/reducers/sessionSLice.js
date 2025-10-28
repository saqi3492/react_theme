import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessions: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessions(state, action) {
      state.sessions = action.payload;
    },
    createNewSessionAction(state, action) {
      state.sessions = [action.payload, ...(state.sessions || [])];
    },
    updateSessionAction(state, action) {
      const { id, patientName, sessionDuration } = action.payload;
      const index = state.sessions.findIndex(session => session.id === id);
      if (index !== -1) {
        state.sessions[index] = { ...state.sessions[index], patientName, duration: `${sessionDuration} mins` };
      }
    },
    deleteSessionAction(state, action) {
      const index = state.sessions.findIndex(session => session.sessionId === action.payload);
      if (index !== -1) state.sessions.splice(index, 1);
    },
  },
});

export const { setSessions, createNewSessionAction, deleteSessionAction, updateSessionAction } = sessionSlice.actions;
export default sessionSlice.reducer;
