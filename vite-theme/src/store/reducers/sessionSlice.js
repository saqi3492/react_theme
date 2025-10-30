import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchSessionText: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSearchSessionText(state, action) {
      state.searchSessionText = action.payload;
    },
  },
});

export const { setSearchSessionText } = sessionSlice.actions;
export default sessionSlice.reducer;
