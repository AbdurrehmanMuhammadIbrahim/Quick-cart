// 'use client';

// import React, { useEffect, useState } from 'react';
// import { BsCartX } from 'react-icons/bs';
// import { MdClose } from 'react-icons/md';
// import { fetchCart } from "../../../api/cartServices"; // Ensure correct path
// import { useDispatch, useSelector } from "react-redux";
// import CartItems from "../AddToCart/CartItems";
// import { useRouter } from 'next/navigation';

// const AddToCart = ({ open, setOpen }) => {
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const { cartItems, loading, error } = useSelector((state) => state.cart);
//       const [token, setToken] = useState(null);



//       useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         setToken(storedToken);
//       }, []);

//     useEffect(() => {
//         // if (open) {
//             if(token){
//                 dispatch(fetchCart());
//               }
//         // }
//     }, [ dispatch, token]);


//      // Optional: Fetch cart again when the drawer is opened
//      useEffect(() => {
//         if (open && token) {
//             dispatch(fetchCart());
//         }
//     }, [dispatch, open, token]);


//     // const cartSubTotal = cartItems.reduce((total, item) => total + item.price * item.quantity , 0);
//     const cartSubTotal = cartItems.reduce((total, item) => {
//         const price = parseFloat(item?.price);
//         const quantity = parseInt(item?.quantity, 10);
//         if (isNaN(price) || isNaN(quantity)) return total; // Skip invalid items
//         return total + price * quantity;
//     }, 0).toFixed(2); 


//     return (
//         <div>
//             {open && (
//                 <div className="fixed top-0 right-0 w-96 h-full z-50 flex justify-end">
//                     <div
//                         className="bg-gray-700 opacity-50 w-full h-full absolute top-0 left-0"
//                         onClick={() => setOpen(false)}
//                     ></div>
//                     <div className="relative z-10 bg-white w-full h-full flex flex-col shadow-lg">
//                         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//                             <span className="font-bold uppercase text-lg">Shopping Cart</span>
//                             <button
//                                 onClick={() => setOpen(false)}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <MdClose className="w-6 h-6" />
//                             </button>
//                         </div>
//                         {!cartItems.length ? (
//                             <div className="flex flex-col items-center justify-center h-full gap-4">
//                                 <BsCartX className="text-gray-300 text-6xl" />
//                                 <span className="text-lg font-medium">No products in the cart.</span>
//                                 <button
//                                     onClick={() => {
//                                         router.push("/");
//                                         setOpen(false);
//                                     }}
//                                     className="px-4 py-2 bg-[#FF7518] text-white rounded shadow-md hover:bg-orange-600"
//                                 >
//                                     Return to Shop
//                                 </button>
//                             </div>
//                         ) : (
//                             <>
//                                 <div className="flex-grow p-1 overflow-y-auto">
//                                     <CartItems />
//                                 </div>
//                                 <div className="p-4 border-t border-gray-200">
//                                     <div className="flex justify-between items-center mb-4">
//                                         <span className="uppercase text-lg font-semibold">Subtotal:</span>
//                                         <span className="text-lg font-semibold text-purple-600">
//                                             PKR {cartSubTotal || "0.00"}
//                                         </span>
//                                     </div>
//                                     <button
//                                         onClick={() => {
//                                             router.push("/checkout");
//                                             setOpen(false);
//                                         }}
//                                         className="w-full py-3 bg-[#FF7518] text-white rounded shadow-md uppercase text-sm font-semibold hover:bg-[#e66916]"
//                                     >
//                                         Checkout
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddToCart;



'use client';

import React, { useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { fetchCart } from "../../../api/cartServices"; // Ensure correct path
import { useDispatch, useSelector } from "react-redux";
import CartItems from "../AddToCart/CartItems";
import { useRouter } from 'next/navigation';

const AddToCart = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(fetchCart());
  //   }
  // }, [dispatch, token]);

  useEffect(() => {
    if (open && token) {
      dispatch(fetchCart());
    }
  }, [dispatch, open, token]);

  const cartSubTotal = cartItems
    .reduce((total, item) => {
      const price = parseFloat(item?.price);
      const quantity = parseInt(item?.quantity, 10);
      if (isNaN(price) || isNaN(quantity)) return total;
      return total + price * quantity;
    }, 0)
    .toFixed(2);

  return (
    <div>
      {open && (
        <div className="fixed top-0 right-0 w-96 h-full z-50 flex justify-end">
          <div
            className="bg-gray-700 opacity-50 w-full h-full absolute top-0 left-0"
            onClick={() => setOpen(false)}
          ></div>
          <div className="relative z-10 bg-white w-full h-full flex flex-col shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-bold uppercase text-lg">Shopping Cart</span>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            {!cartItems.length ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <BsCartX className="text-gray-300 text-6xl" />
                <span className="text-lg font-medium">No products in the cart.</span>
                <button
                  onClick={() => {
                    router.push("/");
                    setOpen(false);
                  }}
                  className="px-4 py-2 bg-[#FF7518] text-white rounded shadow-md hover:bg-orange-600"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              <>
                <div className="flex-grow p-1 overflow-y-auto">
                  <CartItems />
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="uppercase text-lg font-semibold">Subtotal:</span>
                    <span className="text-lg font-semibold text-purple-600">
                      PKR {cartSubTotal || "0.00"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      router.push("/checkout");
                      setOpen(false);
                    }}
                    className="w-full py-3 bg-[#FF7518] text-white rounded shadow-md uppercase text-sm font-semibold hover:bg-[#e66916]"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
