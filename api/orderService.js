import axios from 'axios';
import { setOrders,setLoading, setError } from '../redux/slices/orderSlice';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export const addOrder = (orderData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content type as JSON
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData), // Convert data to JSON format
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to place the order');
    }

    const data = await response.json();
    dispatch(setOrders(data)); // Update the orders state
    alert('Order placed successfully'); // Notify success
  } catch (error) {
    dispatch(setError(error.message || 'Failed to place the order'));
    alert(error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getOrder = async () => {

    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage
      const response = await axios.get(`${BASE_URL}/api/orders/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log(response)
      return response.data; // Return the data
      
    } catch (error) {
      console.error('Error fetching Orders:', error.message);
  
      throw error; // Rethrow error for further handling
    }
  
};


export const updateOrder = (orderId, updates) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(setLoading(true));

  try {
    const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update order status");
    }

    const data = await response.json();
    console.log("Order updated:", data);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};






