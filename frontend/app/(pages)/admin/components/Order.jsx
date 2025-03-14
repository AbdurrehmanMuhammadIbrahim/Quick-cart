// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { MdEdit } from 'react-icons/md';
// import { MdArrowDropDown } from 'react-icons/md';
// import { getOrder,updateOrder } from "../../../../api/orderService"
// import { useDispatch } from 'react-redux';

// const Order = () => {
//   const [open, setOpen] = useState(false);
//   const [dropdownMenu, setDownMenu] = useState(false)
//   const [formData,setFormData] = useState({
//     payment:"",
//     delivery:""
//   })
//     const dispatch = useDispatch();
  
//   const [orderdata, setOrderData] = useState([])
//   const toggleModal = () => {
//     setOpen(!open);
//   };

//   const closeModal = () => {
//     setOpen(false);
//   };



//   // console.log(orderdata)



// // const updateStatus =(e) =>{
// //   e.preventDefault();
  
// //   const updates = {
// //     isDelivered: formData.delivery, // true or false from dropdown
// //   };

// //   dispatch(updateOrder(orderdata[0]._id,updates))
// //   console.log(formData)
// // }


// const updateStatus = async (e,orderId) => {
//   e.preventDefault();
//   const updates = {
//     isDelivered: formData.delivery,
//     paymentStatus: formData.payment ? "Paid" : "Pending",
//   };
//   try {
//     const updatedOrder = await dispatch(updateOrder(orderId, updates));

//     // If the update is successful, update the local state
//     setOrderData((prevOrders) => 
//       prevOrders.map(order => 
//         order._id === orderId ? { ...order, ...updates } : order
//       )
//     );

//     closeModal();
//   } catch (error) {
//     console.error("Error updating order status:", error);
//   }
//   // dispatch(updateOrder(orderId, updates));
//   // closeModal();
  
//   // console.log(orderdata[0]._id)
// };

// useEffect(() => {
//   const fetchOrder = async () => {

//     try {
//       const response = await getOrder()
//       setOrderData(response)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   fetchOrder()
// }, [])

//   const dropdown1Options = [
//     { label: 'Delivered', value: true },
//     { label: 'out for Delivery', value: false },

//   ];

//   const dropdown2Options = [
//     { label: 'Pending', value: 'Pending' },
//     { label: 'Paid', value: 'Paid' },

//   ];
//   const handleDropdownSelect = (name, value) => {
//     console.log(`${name}: ${value}`);
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };



//   // const handleChange = (e) =>{
//   //   const {name,value} = e.target
//   //   setFormData({...formData,[name]:value})
//   // }
//   return (
//     <div>
         
//       <div>
//         {/* Order Details Card */}
//         {orderdata?.map((item, index) => (


//           <div key={index} className="bg-white shadow-md w-full rounded-lg font-sans overflow-hidden">
//       {/* {item._id} */}
//             <div className="p-6">
//               <h3 className="text-lg font-semibold text-gray-500">User Name:</h3>
//               <h3 className="text-lg ">{item.user.name}</h3>

//               <h3 className="mt-2 font-semibold text-gray-500 leading-relaxed">Order Items:</h3>
//               <div className="  gap-4 mt-4">

//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border">
//                 <thead className=" whitespace-nowrap border-2 border-black">
//                       <tr>
//                         <th className="p-4 text-left text-sm font-medium ">
//                           Product
//                         </th>
//                         <th className="p-4 text-left text-sm font-medium ">
//                           Quantity
//                         </th>
//                         <th className="p-4 text-left text-sm font-medium ">
//                           price
//                         </th>
//                       </tr>
                   
//                     </thead>
//                     <tbody className="whitespace-nowrap min-w-full">
//                         {item.orderItems?.map((item, index) => (
//                           <tr key={index} className="even:bg-blue-50">
//                                 <td className="p-4 text-sm text-black">
//                               {item?.product.title}
//                             </td>
//                             <td className="p-4 text-sm text-black">
//                               {item?.quantity}
//                             </td>
//                             <td className="p-4 text-sm text-black">
//                               {item?.product.price}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                   </table>
//                   {/* 
//               <p className="text-sm ">Product: {item?.product.title}</p>
//               <p className="text-sm ">Quantity: {item?.quantity}</p>
//               <p className="text-sm ">price: {item?.product.price}</p> */}
//                 </div>

//               </div>

//               <h3 className="mt-2 font-semibold text-gray-500 leading-relaxed">Shipping Address:</h3>
//               <p className="text-sm my-4">Address: {item.shippingAddress.address}</p>
//               <div className="grid grid-cols-2 gap-4">
//                 <p className="text-sm ">City: {item.shippingAddress.city}</p>
//                 <p className="text-sm ">Postal Code: {item.shippingAddress.postalCode}</p>
//                 <p className="text-sm ">Country: {item.shippingAddress.country}</p>
//                 <p className="text-sm ">Total Price: {item.totalPrice}</p>
//               </div>

//               <div className="mt-7 flex justify-between">
//                 <p className="text-sm text-gray-500">
//                   Payment Status:
//                   <span className="border-2 border-green-700 px-2 py-1 rounded-full">{item.paymentStatus}</span>
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Is Delivered:{' '}
//                   <span className="border-2 border-green-700 px-2 py-1 rounded-full">  {item.isDelivered ? "Delivered" : "Not Delivered"}</span>
//                 </p>
//                 <MdEdit className="text-gray-500 cursor-pointer" onClick={toggleModal} />
//               </div>
//               <p className="mt-2 text-sm text-gray-500">Delivered At: {item.updatedAt}</p>
//               <button
//                 type="button"
//                 className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm bg-blue-600 hover:bg-blue-700">
//                 Submit
//               </button>
//             </div>

//              {/* Modal */}
//         {open && (
//           <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 relative w-96">
//               <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={closeModal}>
//                 ×
//               </button>
//               <div className="">
//                 <h4 className="text-lg text-center font-semibold text-gray-800">Are you sure you want to Update it?</h4>
//                 <div >

//                   <CustomDropdown
//                   name="delivery"
//                     label="Payment Status"
//                     options={dropdown1Options}
//                     placeholder="Select an option"
//                     onSelect={handleDropdownSelect}
//                   />
//                 </div>
//                 <div className='mt-4'>
//                   <CustomDropdown
//                   name="payment"
//                     label="Delivered Status"
//                     options={dropdown2Options}
//                     placeholder="Select a choice"
//                     onSelect={handleDropdownSelect}
//                   />
//                 </div>
             

//                 <div className="mt-6 flex justify-center gap-4">
//                   <button
//                     className="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300"
//                     onClick={closeModal}>
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700"   onClick={(e) => updateStatus(e,orderdata._id)}>
//                     Update
//                   </button>
                
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//           </div>




//         ))}
       
//       </div>
//     </div>
//   );
// };

// export default Order;

// const CustomDropdown = ({ options, placeholder, onSelect, label,name }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = () => setIsOpen(false);

//   const handleOptionClick = (option) => {
//     setSelected(option);
//     onSelect(name, option.value);
//     closeDropdown();
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         closeDropdown();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={dropdownRef} className="relative mt-4">
//       <label>{label} </label>
//       <button
//         type="button"
//         // value={selected}
//         onClick={toggleDropdown}
//         className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex justify-between items-center">
//         <span className="text-gray-700">{selected ? selected.label : placeholder}</span>
//         <MdArrowDropDown className="text-gray-600" />
//       </button>

//       {isOpen && (
//         <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-48 overflow-auto">
//           {options.map((option, index) => (
//             <li
            
//             name={name}
//               key={index}
//               onClick={() => handleOptionClick(option)}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };






'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MdEdit, MdArrowDropDown } from 'react-icons/md';
import { getOrder, updateOrder } from "../../../../api/orderService"
import { useDispatch } from 'react-redux';

const Order = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);  // New state for selected order ID
  const [formData, setFormData] = useState({ payment: "", delivery: "" });
  const [orderdata, setOrderData] = useState([]);
  const dispatch = useDispatch();

  const toggleModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(!open);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };

  const updateStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrderId) return;

    const updates = {
      isDelivered: formData.delivery,
      paymentStatus: formData.payment,
    };

    console.log(formData)
    try {
      await dispatch(updateOrder(selectedOrderId, updates));

      setOrderData((prevOrders) =>
        prevOrders.map(order =>
          order._id === selectedOrderId ? { ...order, ...updates } : order
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrder();
        setOrderData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  const dropdown1Options = [
    { label: 'Delivered', value: true },
    { label: 'Out for Delivery', value: false },
  ];

  const dropdown2Options = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Paid', value: 'Paid' },
  ];

  const handleDropdownSelect = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      {/* Order List */}
      {orderdata?.map((item) => (
        <div key={item._id} className="bg-white shadow-md w-full rounded-lg font-sans overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-500">User Name:</h3>
            <h3 className="text-lg">{item.user.name}</h3>

            {/* Order Items Table */}
            <h3 className="mt-2 font-semibold text-gray-500 leading-relaxed">Order Items:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="border-2 border-black">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium">Product</th>
                    <th className="p-4 text-left text-sm font-medium">Quantity</th>
                    <th className="p-4 text-left text-sm font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {item.orderItems?.map((product, index) => (
                    <tr key={index} className="even:bg-blue-50">
                      <td className="p-4 text-sm text-black">{product?.product?.title}</td>
                      <td className="p-4 text-sm text-black">{product?.quantity}</td>
                      <td className="p-4 text-sm text-black">{product?.product?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Shipping Address */}
            <h3 className="mt-2 font-semibold text-gray-500 leading-relaxed">Shipping Address:</h3>
            <p className="text-sm my-4">Address: {item.shippingAddress.address}</p>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm">City: {item.shippingAddress.city}</p>
              <p className="text-sm">Postal Code: {item.shippingAddress.postalCode}</p>
              <p className="text-sm">Country: {item.shippingAddress.country}</p>
              <p className="text-sm">Total Price: {item.totalPrice}</p>
            </div>

            {/* Order Status */}
            <div className="mt-7 flex justify-between">
              <p className="text-sm text-gray-500">
                Payment Status: <span className="border-2 border-green-700 px-2 py-1 rounded-full">{item.paymentStatus}</span>
              </p>
              <p className="text-sm text-gray-500">
                Is Delivered: <span className="border-2 border-green-700 px-2 py-1 rounded-full">{item.isDelivered ? "Delivered" : "Not Delivered"}</span>
              </p>
              <MdEdit className="text-gray-500 cursor-pointer" onClick={() => toggleModal(item._id)} />
            </div>

            <p className="mt-2 text-sm text-gray-500">Delivered At: {item.updatedAt}</p>
          </div>
        </div>
      ))}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-96">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={closeModal}>×</button>
            <h4 className="text-lg text-center font-semibold text-gray-800">Update Order Status</h4>

            {/* Dropdowns */}
            <CustomDropdown name="delivery" label="Delivery Status" options={dropdown1Options} placeholder="Select an option" onSelect={handleDropdownSelect} />
            <CustomDropdown name="payment" label="Payment Status" options={dropdown2Options} placeholder="Select a choice" onSelect={handleDropdownSelect} />

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button className="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700" onClick={updateStatus} disabled={!selectedOrderId}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;

const CustomDropdown = ({ options, placeholder, onSelect, label, name }) => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelected(option);
    onSelect(name, option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative mt-4">
      <label>{label}</label>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex justify-between items-center">
        <span>{selected ? selected.label : placeholder}</span>
        <MdArrowDropDown />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-48 overflow-auto">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{option.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
