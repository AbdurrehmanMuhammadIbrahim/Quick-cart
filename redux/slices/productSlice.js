import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  singleProduct:null,
  categories: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(item => item.productId !== action.payload.productId);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts,setSingleProduct,removeProduct, setCategories, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to fetch a single product
// export const fetchSingleProduct = createAsyncThunk(
//   "products/fetchSingleProduct",
//   async (productId) => {
//     const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
//     return response.data;
//   }
// );

// const initialState = {
//   products: [],
//   singleProduct: null,
//   categories: [],
//   loading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProducts: (state, action) => {
//       state.products = action.payload;
//     },
//     setSingleProduct: (state, action) => {
//       state.singleProduct = action.payload;
//     },
//     setCategories: (state, action) => {
//       state.categories = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSingleProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSingleProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.singleProduct = action.payload;
//       })
//       .addCase(fetchSingleProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setProducts, setSingleProduct, setCategories, setLoading, setError } = productSlice.actions;
// export default productSlice.reducer;
