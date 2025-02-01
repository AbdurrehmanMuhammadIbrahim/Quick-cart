"use client"
import Link from 'next/link'
import React, { useState,useEffect, useMemo }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus } from "react-icons/fa6";
import AddToCart from '../AddToCart/AddToCart';
import { fetchProducts, fetchCategories } from '../../../api/productService';
import { fetchCart,updateCartQuantity } from "../../../api/cartServices"; // Ensure correct path
import {getUser} from "../../../api/authService"
import Cookies from 'js-cookie';



const Header = () => {
 const [open, setOpen] = useState(false);
 const [token, setToken] = useState(null);
 const [catOpen,setCatOpen] = useState(false);
 const [userData, setUserData] = useState("");

  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.products);
    const { cartItems = []} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
     dispatch(fetchCart());
  }, [dispatch]);


  const fetchUserData = async () => {
    try {
      const data = await getUser(); // Call the API
      setUserData(data); // Update state with the fetched data
    } catch (err) {
      // setError('Failed to fetch user data');
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserData()

  },[])
console.log(userData)


 // Fetch token from localStorage on initial render
 useEffect(() => {
   const savedToken = localStorage.getItem('token');
   setToken(savedToken);
 }, []);

//  const totalQuantity = useMemo(() => {
//   return cartItems.reduce((sum, item) => sum + item.quantity, 0);
// }, [cartItems]);

const totalQuantity = useMemo(() => {
  return cartItems.reduce((sum, item) => {
    const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a valid number
    return sum + quantity;
  }, 0);
}, [cartItems]);

    const toggleCart = () => {
    setOpen(!open);

    };

    const toggleCat = () =>{
      setCatOpen(!catOpen)
    }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    Cookies.remove('token')
    setToken(null);
  };


  return (
    <div className="text-gray-600 body-font bg-gray-100  top-0 border border-x-none border-t-0 border-b-2 border-[#FF7518]">
    <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
     
      <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg> */}
        <span className="ml-3 text-xl font-semibold">Quick Cart</span>
      </Link>
      <div className="md:ml-auto md:mr-auto gap-4 flex flex-wrap items-center text-base justify-center">
        <Link href="/" className=" hover:text-gray-900">Home</Link>
        <Link href="/product" className=" hover:text-gray-900">All Product</Link>
        <div className="cursor-pointer" onClick={toggleCat}>
          
      <div type="button" id="dropdownToggle"  className="">
      Categories
      
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 inline ml-1" viewBox="0 0 24 24">
          <path fillRule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clipRule="evenodd" data-original="#000000" />
        </svg>
        </div>
        {catOpen && (
      <ul id="dropdownMenu" className='absolute shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-white py-2 z-[1000] mt-4 w-max divide-y max-h-96 '>
       {products.map((categories) =>(

     
        <li className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>{categories.category}</li>
      ))}
        </ul>
      )}
    </div>
        <Link href="/contact" className=" hover:text-gray-900">Contact</Link>
        <Link href="/faq" className=" hover:text-gray-900">FAQ</Link>
      </div>
   

{!token ?  (
  <div>
  <Link href="/login" className="inline-flex items-center  border-[#FF7518] bg-gray-100 border-2 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Sign in
        </Link>


        </div>
     ) :(
      <div className='flex gap-8 '>
      <div className='relative mt-3'>
      <div className='absolute mr-2 cursor-pointer'>
     
          <div>
          <div className='' onClick={toggleCart} > <FaCartPlus/></div>
        
          <div className="absolute inline-flex items-center justify-center text-[10px] w-4 h-4 text-white bg-[#FF3B54] rounded-full -top-3 -right-2">
                {totalQuantity}
              </div>
              </div>
             
          </div>
          </div>
          <div>
          <Link href="/login" onClick={handleLogout} className="inline-flex items-center  border-[#FF7518] bg-gray-100 border-2 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Log Out </Link> 

         {/* <Link href="/admin" className="inline-flex ml-3 items-center border-[#FF7518] bg-gray-100 border-2 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Admin </Link> */}
             </div>
              </div>
)
}

{userData?.role==="Admin" ?(
     <Link href="/admin" className="inline-flex items-center ml-3 border-[#FF7518] bg-gray-100 border-2 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Admin
        </Link>
   ):(
   " "
 ) }


      <AddToCart open={open} setOpen={setOpen}/>    
    </div>
  </div>
  )
}

export default Header
