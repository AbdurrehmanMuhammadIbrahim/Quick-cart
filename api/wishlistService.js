import { addToWishlist,getWishlist, removeFromWishlist, updateWishlistItem, setLoading, setError} from '../redux/slices/wishSlice';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const addItemToWish = (productId,redirect) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // if (!token) {
    //   throw new Error('Authentication token is missing');
    // }

    const response = await fetch(`${BASE_URL}/api/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add Authorization header
      },
      // body: JSON.stringify({ productId: item.productId }),
      body: JSON.stringify(productId),
    });

   
    if (response.ok) {
     alert("item added to wishlist");
    }
    const data = await response.json();
    dispatch(addToWishlist(data)); // Update Redux state with the updated cart
  } catch (error) {
    dispatch(setError('Failed to add item to wishlist'));
    console.error(error);
    alert(error.message);
  } finally {
    dispatch(setLoading(false));
  }
};