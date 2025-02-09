// api/authService.js
import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const registerUser = async (credentials) => {
    const response = await axios.post("http://localhost:5000/api/auth/register", credentials);
    return response.data; // { token, user }

  };


export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
  return response.data;
};

export const getUser = async () => {


    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage
      const response = await axios.get(`${BASE_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Return the data
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
  
      throw error; // Rethrow error for further handling
    }
  
};



export const getAllUsers = async () => {


  try {
    // const token = localStorage.getItem('token'); // Retrieve token from storage
    const response = await axios.get(`${BASE_URL}/api/auth/allusers`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    console.log(response.data)

    return response.data// Return the data
  } catch (error) {
    console.error('Error fetching user profile:', error.message);

    throw error; // Rethrow error for further handling
  }

};


