import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchSessionText: '',
  sessions: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionsAction(state, action) {
      state.sessions = action.payload;
    },
    setSearchSessionText(state, action) {
      state.searchSessionText = action.payload;
    },
  },
});

export const { setSessionsAction, setSearchSessionText } = sessionSlice.actions;
export default sessionSlice.reducer;
