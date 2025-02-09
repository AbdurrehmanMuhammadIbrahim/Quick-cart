import { addToCart,getCart, removeFromCart, updateCartItem, setLoading, setError } from '../redux/slices/cartSlice';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// export const addItemToCart = (item) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await fetch('http://localhost:5000/api/cart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(item),
//     });
//     const data = await response.json();
//     dispatch(addToCart(data)); // Update Redux state with the added item
//   } catch (error) {
//     dispatch(setError('Failed to add item to cart'));
//     alert(error)
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

export const addItemToCart = (item,redirect) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // if (!token) {
    //   throw new Error('Authentication token is missing');
    // }

    const response = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add Authorization header
      },
      body: JSON.stringify([item]), // Backend expects an array
    });

   
    if (response.ok) {
     alert("add item to cart");
    }
    const data = await response.json();
    dispatch(addToCart(data)); // Update Redux state with the updated cart
  } catch (error) {
    dispatch(setError('Failed to add item to cart'));
    console.error(error);
    alert(error.message);
  } finally {
    dispatch(setLoading(false));
  }
};


export const fetchCart = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  

    const data = await response.json();
    dispatch(getCart(data.items || [])); // Use data.items if nested in the response
    // console.log(data)
    // if (!response.ok) {
    //   throw new Error("Failed to fetch cart");
    // }
  } catch (error) {
    dispatch(setError("Failed to fetch cart"));
    console.error("Fetch Cart Error:", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};




export const removeItemFromCart = (productId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setLoading(true));
  try {
    await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeFromCart({ productId }));
  } catch (error) {
    dispatch(setError('Failed to remove item from cart'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
  const token = localStorage.getItem('token'); 
  dispatch(setLoading(true));
  try {
    const response = await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
      
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error("Failed to update cart item");
    }
    if (!response.ok) throw new Error("Failed to update cart item");
    const data = await response.json();

    dispatch(updateCartItem(data)); // This should update the specific item in the Redux state
  } catch (error) {
    console.error(error.message);
    dispatch(setError("Failed to update cart item"));
  } finally {
    dispatch(setLoading(false));
  }
};
