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
    deleteSessionAction(state, action) {
      const index = state.sessions.findIndex(session => session.sessionId === action.payload);
      if (index !== -1) state.sessions.splice(index, 1);
    },
  },
});

export const { setSessions, deleteSessionAction } = sessionSlice.actions;
export default sessionSlice.reducer;
