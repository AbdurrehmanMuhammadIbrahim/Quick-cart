import { setProducts, setSingleProduct, setCategories, setLoading, setError } from '../redux/slices/productSlice';

export const addProduct = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Send FormData directly
    });

    if (response.ok) {
      alert('Product added successfully');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add product');
    }
    const data = await response.json();
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(setError('Failed to add product'));
    console.error(error);
    alert(error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProducts = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    dispatch(setProducts(data));
    // console.log("fetchProducts",data)
  } catch (error) {
    dispatch(setError("Failed to fetch products"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch a single product by its ID
export const fetchSingleProduct = (productId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`http://localhost:5000/api/products/${productId}`);
    const data = await response.json();
    console.log("fetchProducts",data)
    dispatch(setSingleProduct(data)); // Assuming the response is a single product object
  } catch (error) {
    dispatch(setError("Failed to fetch product"));
    console.error("Fetch Error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};



export const fetchCategories = () => async (dispatch) => {
//   try {
//     const response = await fetch('/api/categories');
//     const data = await response.json();
//     dispatch(setCategories(data));
//   } catch (error) {
//     dispatch(setError("Failed to fetch categories"));
//   }
};
