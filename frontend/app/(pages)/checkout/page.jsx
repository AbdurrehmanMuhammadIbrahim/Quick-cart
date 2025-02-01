// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart,updateCartQuantity,removeItemFromCart } from "../../../api/cartServices"; // Ensure correct path
// import img1 from "../../../public/assets/american-express.webp"
// import img2 from "../../../public/assets/master.webp"
// import img3 from "../../../public/assets/visa.webp"
// import Image from 'next/image';
// import { BsPhone } from 'react-icons/bs';
// import { addOrder } from '../../../api/orderService';
// import {getUser} from "../../../api/authService"

// const Checkout = () => {
// const [userData,setUserData] = useState("")
//     const dispatch = useDispatch();
//     const { cartItems, loading, error } = useSelector((state) => state.cart);

//     const [formData,setFormData] = useState({
//       // firstName:"",
//       // lastName:"",
//       // email:"",
//       // phoneNumber:"",
//       address:"",
//       city:"",
//       country:"",
//       postalCode:"",
// paid:"paid",
// unpaid:"unpaid"
//     })

//     const handleChange = (e) =>{
//       const {name,value} = e.target;
//       setFormData({...formData,[name]: value})
//     }

   
//       useEffect(() => {
//         const fetchUserData = async () => {
//           try {
//             const data = await getUser(); // Call the API
//             setUserData(data); // Update state with the fetched data
//           } catch (err) {
//             // setError('Failed to fetch user data');
//             console.error(err);
//           }
//         };
//         fetchUserData()
    
//       },[])
//     // console.log(userData)

//     // const handleOrder= async (e) => {
//     //   e.preventDefault();
//     //   dispatch(addOrder())
//     //   console.log(formData)
//     // }
  
   
//       //  useEffect(() => {
//       //    dispatch(fetchCart());
//       //  }, [dispatch]);
     
//       const handleOrder = (e) => {
//         e.preventDefault();
      
//         const orderData = {
//         //   shippingAddress: {
//         //     address: "123 Street",
//         //     city: "City",
//         //     country: "Country",
//         //     postalCode: "12345",
//         //   },
//         //   paymentMethod: "Card",
//         // };
//         shippingAddress: {
//           address: formData.address,
//           city: formData.city,
//           country: formData.country,
//           postalCode: formData.postalCode,
//         },
//         paymentMethod: "Card",
//         // paymentMethod: formData.paid ? 'Card' : 'Cash On Delivery',
//       };
//         dispatch(addOrder(orderData));
//       };
     
//       const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity , 0);

//       const cartSubTotal = cartItems.reduce((total, item) => total + item.price * item.quantity , 250);


//   return (
//     <div className="font-sans bg-white p-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="">
//           <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
//         </div>
//         <div className='md:grid grid-cols-3 gap-4'>
       
//         <div className="mt-7 col-span-2 ">
//           <div className="grid md:grid-cols-3 gap-4">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-300">01</h3>
//               <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
//             </div>

//             <div className="md:col-span-2">
//               <form>
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   {/* <div>
//                     <input  name='firstName' defaultValue={userData.name} type="text" placeholder="First name"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div> */}
//                   {/* <div>
//                     <input  onChange={handleChange} name='lastName' value={formData.lastName}  type="text" placeholder="Last name"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div> */}
//                   {/* <div>
//                     <input  defaultValue={userData.email} name='email'  type="email" placeholder="Email address"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div> */}
//                   {/* <div>
//                     <input  onChange={handleChange} name='phoneNumber' value={formData.phoneNumber} type="number" placeholder="Phone number"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div> */}
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-4 mt-12">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-300">02</h3>
//               <h3 className="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
//             </div>

//             <div className="md:col-span-2">
//               <form>
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <input  onChange={handleChange} name='address' value={formData.address} type="text" placeholder="Street address"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div>
//                   <div>
//                     <input  onChange={handleChange} name='city' value={formData.city} type="text" placeholder="City"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div>
//                   <div>
//                     <input  onChange={handleChange} name='country' value={formData.country} type="text" placeholder="State"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div>
//                   <div>
//                     <input  onChange={handleChange} name='postalCode' value={formData.postalCode} type="number" placeholder="Zip Code"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-4 mt-12">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-300">03</h3>
//               <h3 className="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
//             </div>

//             <div className="md:col-span-3">
//               <div className="grid gap-4 sm:grid-cols-5">
//                 <div className="flex col-span-2 items-center">
//                   <input  onChange={handleChange} name='paid' value={formData.paid} type="radio" className="w-5 h-5 cursor-pointer" id="card"/>
//                   <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
//                     <Image  src={img1} className="w-12" alt="card1" />
//                     <Image src={img2} className="w-12" alt="card2" />
//                     <Image  src={img3} className="w-12" alt="card3" />
//                   </label>
//                 </div>

                
//                 <div className="flex items-center col-span-2">
//                   <input  onChange={handleChange} name='unpaid' value={formData.unpaid} type="radio" className="w-5 h-5 cursor-pointer" id="paypal"  />
//                   <label htmlFor="Cash On Delivery" className="ml-4 flex gap-2 cursor-pointer">
//                   Cash On Delivery
//                   </label>
//                 </div>
//               </div>
             

//               <div className="grid sm:grid-cols-4 gap-4 mt-4">
//                 <div className="col-span-2">
//                   <input type="number" placeholder="Card number"
//                     className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                 </div>
//                 <div>
//                   <input type="number" placeholder="EXP."
//                     className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                 </div>
//                 <div>
//                   <input  type="number" placeholder="CVV"
//                     className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap justify-end gap-4 mt-12">
//             <button type="button"
//               className="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 text-gray-800 rounded-md hover:bg-gray-100">Pay later</button>
//             <button type="button"
//               className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleOrder}>Pay now</button>
//           </div>
//         </div>
//         <div className="bg-white col-span-1 w-full p-6 rounded-md  shadow-lg">
//             <h3 className="text-lg font-bold text-gray-800 underline">Summary</h3>
//             <ul className="text-gray-800 mt-6 space-y-3">
//               <li className="flex flex-wrap gap-4 text-sm">Sub total <span className="ml-auto font-bold">Rs.{cartTotal}</span></li>
//               <li className="flex flex-wrap gap-4 text-sm">Delivery Charges <span className="ml-auto font-bold">250.00</span></li>
//               <li className="flex flex-wrap gap-4 text-sm">Discount (20%) <span className="ml-auto font-bold">0.00</span></li>
//               <hr />
//               {cartItems.quantity}
//               <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">Rs.{cartSubTotal}</span></li>
//             </ul>
           
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Checkout




'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartQuantity, removeItemFromCart } from '../../../api/cartServices'; // Ensure correct path
import img1 from '../../../public/assets/american-express.webp';
import img2 from '../../../public/assets/master.webp';
import img3 from '../../../public/assets/visa.webp';
import Image from 'next/image';
import { BsPhone } from 'react-icons/bs';
import { addOrder } from '../../../api/orderService';
import { getUser } from '../../../api/authService';

const page = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    paid: 'unpaid',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'radio' ? checked : value, // Handle radio button correctly
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(); // Call the API
        setUserData(data); // Update state with the fetched data
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  const handleOrder = (e) => {
    e.preventDefault();

    const orderData = {
      shippingAddress: {
        phoneNumber:formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      paymentMethod: formData.paid ? 'Card' : 'Cash On Delivery',
    };

    dispatch(addOrder(orderData));
    setFormData("")
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartSubTotal = cartTotal + 250; // Assuming delivery charges are Rs. 250

  return (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">
            Checkout
          </h2>
        </div>
        <div className="md:grid grid-cols-3 gap-4">
          <div className="mt-7 col-span-2">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">01</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
              </div>
              <div className="md:col-span-2">
                <form>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        name="firstName"
                        value={userData.name || ''}
                        onChange={handleChange}
                        type="text"
                        placeholder="First name"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Last name"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        name="email"
                        value={formData.email || userData.email || ''}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email address"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        type="number"
                        placeholder="Phone number"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">02</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
              </div>
              <div className="md:col-span-2">
                <form>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        type="text"
                        placeholder="Street address"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        type="text"
                        placeholder="City"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        type="text"
                        placeholder="State"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        type="number"
                        placeholder="Zip Code"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">03</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
              </div>
              <div className="md:col-span-3">
                <div className="grid gap-4 sm:grid-cols-5">
                  <div className="flex col-span-2 items-center">
                    <input
                      name="paid"
                      checked={formData.paid === 'paid'}
                      onChange={handleChange}
                      type="radio"
                      className="w-5 h-5 cursor-pointer"
                      id="card"
                    />
                    <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                      <Image src={img1} className="w-12" alt="card1" />
                      <Image src={img2} className="w-12" alt="card2" />
                      <Image src={img3} className="w-12" alt="card3" />
                    </label>
                  </div>

                  <div className="flex items-center col-span-2">
                    <input
                      name="paid"
                      checked={formData.paid === 'unpaid'}
                      onChange={handleChange}
                      type="radio"
                      className="w-5 h-5 cursor-pointer"
                      id="cash"
                    />
                    <label htmlFor="cash" className="ml-4 flex gap-2 cursor-pointer">
                      Cash On Delivery
                    </label>
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-4 mt-4">
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Card number"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="EXP."
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="CVV"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-4 mt-12">
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 text-gray-800 rounded-md hover:bg-gray-100"
              >
                Pay later
              </button>
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleOrder}
              >
                Pay now
              </button>
            </div>
          </div>

          <div className="bg-white col-span-1 w-full p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 underline">Summary</h3>
            <ul className="text-gray-800 mt-6 space-y-3">
              <li className="flex flex-wrap gap-4 text-sm">
                Sub total <span className="ml-auto font-bold">Rs. {cartTotal}</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Delivery Charges <span className="ml-auto font-bold">250.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Discount (20%) <span className="ml-auto font-bold">0.00</span>
              </li>
              <hr />
              <li className="flex flex-wrap gap-4 text-base font-bold">
                Total <span className="ml-auto">Rs. {cartSubTotal}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
