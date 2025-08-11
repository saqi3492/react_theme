import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
};

export const themeOptionsSlice = createSlice({
  name: 'masterData',
  initialState,
  reducers: {
    setCountries: (state, actions) => {
      state.countries = actions.payload;
    },
  },
});

export const { setCountries } = themeOptionsSlice.actions;

export default themeOptionsSlice.reducer;
