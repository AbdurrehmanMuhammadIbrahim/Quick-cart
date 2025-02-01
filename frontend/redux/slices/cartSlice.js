import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Array of items in the cart
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity if the item exists
      } else {
        state.cartItems.push(action.payload); // Add new item
      }
    },
    getCart: (state, action) => {
      state.cartItems = action.payload.map((item) => ({
        id: item.product._id,
        productId: item.product._id,
        title: item.product.name,
        price: item.product.price,
        images: item.product.images,
        quantity: item.quantity,
      }));
    },
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload.productId);
    },
    updateCartItem: (state, action) => {
      const updatedItem = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addToCart,getCart, removeFromCart, updateCartItem, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;
