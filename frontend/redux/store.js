import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';


const store = configureStore({
  reducer: {
    // auth: authReducer,
    cart: cartReducer,
    products : productsReducer,
    // product: productReducer, 
  },
});

export default store;
