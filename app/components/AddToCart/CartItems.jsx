import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart,updateCartQuantity,removeItemFromCart } from "../../../api/cartServices"; // Ensure correct path
import Image from "next/image";


const CartItems = () => {
  
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const dispatch = useDispatch();
   
    const { cartItems, loading, error } = useSelector((state) => state.cart);
  // const [quantity,setquantity] = useState(1)

  // useEffect(() => {
  //   dispatch(fetchCart()); // Fetch cart data on component mount
  // }, [dispatch]); // Dependency: dispatch
  
  // // Optionally, refetch when cart state changes if needed
  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, [cartItems, dispatch]); // Dependency: cartItems

  const handleAddQuantity = async (itemId, currentQuantity) => {
    await dispatch(updateCartQuantity(itemId, currentQuantity + 1));
    dispatch(fetchCart()); // Fetch updated cart after adding
  };
  
  const handleReduceQuantity = async (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      await dispatch(updateCartQuantity(itemId, currentQuantity - 1));
      dispatch(fetchCart()); // Fetch updated cart after reducing
    }
  };
            // const handleAddQuantity = (itemId, currentQuantity) => {
            //    // Optional: Add limit if needed
            //       dispatch(updateCartQuantity(itemId, currentQuantity + 1));
                
            //   };
            
              // const handleReduceQuantity = (itemId, currentQuantity) => {
             
              //     dispatch(updateCartQuantity(itemId, currentQuantity - 1));
                
              // };
          
              const handleRemoveItem = (itemId) => {
                dispatch(removeItemFromCart(itemId));
              };

    if (loading) return <div className="flex justify-center items-center h-full"><svg className="w-12 h-12 text-orange-500 animate-spin" viewBox="0 0 64 64" fill="none"
    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path
      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
      stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path
      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
      stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
    </path>
  </svg></div>;
    if (error) return <div>Error: {error}</div>;
    if (!cartItems.length) return <div>Your cart is empty.</div>;
  return (
    <div className="">

      {cartItems.map((item,index) => (
        <div className="p-2 flex gap-4 hover:bg-gray-100" key={index}>
              <span className="text-lg font-semibold truncate block ">
              {item.title}
            </span>
          {/* Product Image */}
          <div className="bg-gray-200 w-16 h-16 flex-shrink-0">
            {/* <img
              src={`${BASE_URL}/${item.image}`} // Update image path if necessary
              
              alt={item.title}
              className="w-full h-full object-cover"
            /> */}
             <img src={item.images
                  ? `${BASE_URL}/${item.images[0]}`
                  : '/'} id={item.id}/>
          </div>

          {/* Product Details */}
          <div className="relative flex-grow">
            <span className="text-lg font-semibold truncate  ">
              {item.title}
            </span>

            {/* Remove Item */}
            <MdClose
              className="absolute top-0 right-0 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => handleRemoveItem(item.id)}
            />

            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 h-8 w-fit mb-2">
              <span
             
             onClick={() => handleReduceQuantity(item.id, item.quantity)}
                className="w-8 flex items-center justify-center cursor-pointer text-gray-500 border-r border-gray-300 "
              >
                <FaMinus className="text-xs"/>
              </span>
              <span className="w-10 flex items-center justify-center text-sm font-medium">
                {item.quantity} 

              </span>
              <span
                 onClick={() => handleAddQuantity(item.id, item.quantity)}

                // onClick={() => dispatch(updateCartQuantity(item.id, item.quantity + 1))}
                className="w-8 flex items-center justify-center cursor-pointer text-gray-500 border-l border-gray-300 "
              >
                <FaPlus className="text-xs"/>
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>Total:</span>
              <span className="text-purple-500">PKR {item.price * item.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;



// import React, { useEffect, useState } from "react";
// import { MdClose } from "react-icons/md";
// import { FaPlus, FaMinus } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart, updateCartQuantity, removeItemFromCart } from "../../../api/cartServices"; // Ensure correct path
// import Image from "next/image";

// const CartItems = () => {
//     const [token, setToken] = useState(null);
  
//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
//   const dispatch = useDispatch();

//   const { cartItems, loading, error } = useSelector((state) => state.cart);
//  useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     setToken(storedToken);
//   }, []);

//   // useEffect(() => {
//   //   dispatch(fetchCart());
//   // }, [dispatch]);


  
//   // Handle Quantity Increase
//   const handleAddQuantity = (itemId, currentQuantity) => {
//     dispatch(updateCartQuantity(itemId, currentQuantity + 1));
//   };

//   // Handle Quantity Decrease
//   const handleReduceQuantity = (itemId, currentQuantity) => {
//     dispatch(updateCartQuantity(itemId, currentQuantity - 1));
//   };

//   // Handle Item Removal
//   const handleRemoveItem = (itemId) => {
//     dispatch(removeItemFromCart(itemId));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <svg
//           className="w-12 h-12 text-orange-500 animate-spin"
//           viewBox="0 0 64 64"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//         >
//           <path
//             d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
//             stroke="currentColor"
//             strokeWidth="5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           ></path>
//           <path
//             d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
//             stroke="currentColor"
//             strokeWidth="5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="text-gray-900"
//           ></path>
//         </svg>
//       </div>
//     );
//   }
//   if (error) return <div>Error: {error}</div>;
//   if (!cartItems.length) return <div>Your cart is empty.</div>;

//   return (
//     <div className="">
//       {cartItems.map((item, index) => (
//         <div className="p-2 flex gap-4 hover:bg-gray-100" key={index}>
//           <span className="text-lg font-semibold truncate block ">
//             {item.title}
//           </span>
//           {/* Product Image */}
//           <div className="bg-gray-200 w-16 h-16 flex-shrink-0">
//             <img
//               src={item.images ? `${BASE_URL}/${item.images[0]}` : "/"}
//               alt={item.title}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Product Details */}
//           <div className="relative flex-grow">
//             <span className="text-lg font-semibold truncate  ">
//               {item.title}
//             </span>

//             {/* Remove Item */}
//             <MdClose
//               className="absolute top-0 right-0 text-gray-500 cursor-pointer hover:text-gray-700"
//               onClick={() => handleRemoveItem(item.id)}
//             />

//             {/* Quantity Controls */}
//             <div className="flex items-center border border-gray-300 h-8 w-fit mb-2">
//               <span
//                 onClick={() => handleReduceQuantity(item.id, item.quantity)}
//                 className="w-8 flex items-center justify-center cursor-pointer text-gray-500 border-r border-gray-300 "
//               >
//                 <FaMinus className="text-xs" />
//               </span>
//               <span className="w-10 flex items-center justify-center text-sm font-medium">
//                 {item.quantity}
//               </span>
//               <span
//                 onClick={() => handleAddQuantity(item.id, item.quantity)}
//                 className="w-8 flex items-center justify-center cursor-pointer text-gray-500 border-l border-gray-300 "
//               >
//                 <FaPlus className="text-xs" />
//               </span>
//             </div>

//             {/* Price */}
//             <div className="flex items-center gap-2 text-sm font-semibold">
//               <span>Total:</span>
//               <span className="text-purple-500">
//                 PKR {item.price * item.quantity}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartItems;
