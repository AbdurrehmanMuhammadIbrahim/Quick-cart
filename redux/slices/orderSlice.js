import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [], // Renamed for consistency
  singleOrder: null,
  categories: [], // Categories aren't relevant to orders; consider moving them to a separate slice
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setSingleOrder: (state, action) => {
      state.singleOrder = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setSingleOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
