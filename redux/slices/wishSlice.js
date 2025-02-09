import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: [], // Array of items in the wishlist
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity if the item exists
      } else {
        state.wishlistItems.push(action.payload); // Add new item
      }
    },
    getWishlist: (state, action) => {
      state.wishlistItems = action.payload.map((item) => ({
        id: item.product._id,
        productId: item.product._id,
        title: item.product.name,
        price: item.product.price,
        images: item.product.images,
        quantity: item.quantity,
      }));
    },
    
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.productId !== action.payload.productId);
    },
    updateWishlistItem: (state, action) => {
      const updatedItem = action.payload;
      state.wishlistItems = state.wishlistItems.map((item) =>
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

export const { addToWishlist,getWishlist, removeFromWishlist, updateWishlistItem, setLoading, setError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
