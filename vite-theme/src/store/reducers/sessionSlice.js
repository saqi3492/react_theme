import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessions: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessions(state, action) {
      state.sessions = action.payload;
    },
    createSessionAction(state, action) {
      state.sessions.unshift(action.payload);
    },
    updateSessionAction(state, action) {
      const index = state.sessions.findIndex(session => session.id === action.payload.id);
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
    },
    deleteSessionAction(state, action) {
      const index = state.sessions.findIndex(session => session.sessionId === action.payload);
      if (index !== -1) state.sessions.splice(index, 1);
    },
  },
});

export const { setSessions, createSessionAction, deleteSessionAction, updateSessionAction } = sessionSlice.actions;
export default sessionSlice.reducer;
