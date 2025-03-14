import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   user: (state, action) => {
      state.products = action.payload;
    },
   
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { user, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
