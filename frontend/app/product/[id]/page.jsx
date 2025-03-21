"use client"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useRouter  } from 'next/navigation';
import { fetchSingleProduct } from '../../../api/productService';
import { FaPlus,FaMinus } from "react-icons/fa";
import { addItemToCart } from '../../../api/cartServices';
import { addItemToWish } from '../../../api/wishlistService';


const page = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const dispatch = useDispatch();
  const { id } = useParams();
  const router = useRouter();
  const { singleProduct, loading, error } = useSelector(state => state.products);
  const [selectedImage, setSelectedImage] = useState(); // Set the initial image
  const [quantity,setQuantity] = useState(1)

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    // Set the default image on component load
    if (singleProduct?.images?.length > 0) {
      setSelectedImage(singleProduct.images[0]);
    }
  }, [singleProduct]);


  const decrement = () => {
    setQuantity((prevState) => {
        if (prevState === 1) return 1;
        return prevState - 1;
    });
};
const increment = () => {
    setQuantity((prevState) => prevState + 1);
};

const handleAddToCart = () => {
  const cartItem = {
    productId: singleProduct._id,
    quantity: quantity, // Default to 1
  };
if(!token){
  router.push("/login")
}
  dispatch(addItemToCart(cartItem));
};

const handleAddToWish = () => {
  const wishItem = {
    productId: singleProduct._id,
    quantity: quantity, // Default to 1
  };
if(!token){
  router.push("/login")
}
  dispatch(addItemToWish(wishItem));
};


if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;
if (!singleProduct) return <div>Product not found</div>;


  return (
    <div>

      <div className="font-[sans-serif] p-4 mb-60">
        <div className="lg:max-w-6xl max-w-xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
            <div className="w-full top-0">
              <div className="flex flex-col gap-4">
                {/* Large Displayed Image */}
                <div className="bg-white shadow p-2">
                  <img
                    src={selectedImage ? `${BASE_URL}/${selectedImage}` : '/placeholder.jpg'}
                    className="w-full aspect-[11/8] object-contain object-top"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className=" bg-white p-2 w-full max-w-full overflow-auto">
                  <div className="flex  flex-row gap-4 ">

                    {singleProduct.images && singleProduct.images.length > 0 && singleProduct.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={`${BASE_URL}/${image}`}
                          alt={`Product image ${index + 1}`}
                          onClick={() => setSelectedImage(image)} // Update selected image on click
                          className={`w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md ${selectedImage === image ? "border-b-2 border-[#FF7518]" : "border-b-2 border-transparent"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div>
                <h3 className=" mt-4 text-2xl sm:text-xl max-md:text-center font-bold text-gray-800">{singleProduct.title}</h3>
                {/* <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <p className="text-base text-gray-500">4</p>
                    <svg className="w-4 h-4 fill-[#FF7518]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 h-4 fill-[#FF7518]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 h-4 fill-[#FF7518]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 h-4 fill-[#FF7518]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  </div>
                  <span className="text-gray-500">|</span>
                  <p className="text-sm text-gray-500">76 Ratings</p>
                  <span className="text-gray-500">|</span>
                  <p className="text-sm text-gray-500">50 Reviews</p>
                </div> */}
                <div className="mt-2">
                  <p className="text-gray-500 mt-1 text-sm">{singleProduct.description}</p>
                </div>

                <div className="flex items-center flex-wrap gap-2 mt-4">
                  {/* <p className="text-gray-500 text-base"><strike>Rs.16</strike></p> */}
                  <h4 className="text-[#FF7518] text-2xl sm:text-3xl font-bold">Rs.{singleProduct.price}</h4>
                  {/* <div className="flex py-1 px-2 bg-[#FF7518] font-semibold !ml-4">
                    <span className="text-white text-sm">save 10%</span>
                  </div> */}
                </div>

              </div>

              <hr className="my-6 border-gray-300" />

              <div>
                <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2.5 w-max">
                  <button type="button" className="border-none outline-none" onClick={increment}>
                 <FaPlus className='text-xs'/>
                  </button>
                  <span className="text-gray-800 text-md font-semibold px-3">{quantity}</span>
                  <button type="button" className="border-none outline-none" onClick={decrement}>
                  <FaMinus className='text-xs'/>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  <button type="button" className="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-[#FF7518]  text-gray-800 text-sm font-semibold" onClick={handleAddToCart}>Add to cart</button>
                  <button type="button" className="px-4 py-3 w-[45%] border border-[#FF7518] bg-[#FF7518] hover:bg-white text-black-500 text-sm font-semibold" onClick={handleAddToWish} >Add To Whislist</button>
                </div>
              </div>

              <hr className="my-6 border-gray-300" />

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Select Delivery Location</h3>
                <p className="text-gray-500 text-sm mt-1">Enter the pincode of your area to check product availability.</p>
                <div className='flex items-center gap-2 mt-4 max-w-sm'>
                  <input type='number'
                    placeholder='Enter pincode' className='bg-white px-4 py-2.5 text-sm w-full  border border-gray-300 outline-0' />
                  <button type='button' className='border border-[#FF7518] outline-none bg-[#FF7518] hover:bg-purple-700 text-white  px-4 py-2.5 text-sm'>Apply</button>
                </div>
              </div>

              <div className='flex justify-between gap-4 mt-6'>
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-[#FF7518] inline" viewBox="0 0 64 64">
                    <g data-name="Layer 2">
                      <path d="M59.89 13.36 49.73 7.495a4.21 4.21 0 0 0-4.2 0l-10.163 5.867A4.213 4.213 0 0 0 33.267 17v11.733a4.213 4.213 0 0 0 2.1 3.637L45.53 38.24a4.217 4.217 0 0 0 4.2 0l10.161-5.867a4.213 4.213 0 0 0 2.1-3.637V17a4.212 4.212 0 0 0-2.1-3.64zm-1.5 15.372a.6.6 0 0 1-.3.52L47.931 35.12a.62.62 0 0 1-.26.07V24.697a2.4 2.4 0 0 0-1.125-2.031l-9.56-6.008a.593.593 0 0 1 .181-.18l10.163-5.866a.592.592 0 0 1 .299-.08.607.607 0 0 1 .3.08l10.161 5.865a.6.6 0 0 1 .3.521zm-4.07 16.024H42.452a5.977 5.977 0 0 0-.583-2.565 5.581 5.581 0 0 0-3.348-2.926l-9.75-3.084a6.558 6.558 0 0 0-4.028.017l-8.899 2.882a4.2 4.2 0 0 0-3.797-2.433H6.21a4.2 4.2 0 0 0-4.2 4.2v15.73a4.2 4.2 0 0 0 4.2 4.2h5.838a4.192 4.192 0 0 0 3.96-2.858h6.75a1.92 1.92 0 0 1 .815.193l7.331 3.006a11.425 11.425 0 0 0 7.649.353l15.76-4.81a7.12 7.12 0 0 0 4.835-6.96 4.93 4.93 0 0 0-4.827-4.945zM12.647 56.578a.6.6 0 0 1-.6.6H6.21a.6.6 0 0 1-.6-.6V40.852a.6.6 0 0 1 .6-.6h5.838a.6.6 0 0 1 .6.6zm40.518-3.324-15.663 4.778a7.84 7.84 0 0 1-5.233-.24l-7.262-2.974a5.428 5.428 0 0 0-2.247-.498h-6.515V42.74l9.6-3.12a2.98 2.98 0 0 1 1.83-.008l9.749 3.084a2.009 2.009 0 0 1 1.2 1.07 2.407 2.407 0 0 1 .089 1.894 1.966 1.966 0 0 1-2.064 1.338l-8.572-1.2a1.8 1.8 0 0 0-.502 3.565l8.573 1.2a5.406 5.406 0 0 0 5.152-2.209h13.02a1.334 1.334 0 0 1 1.231 1.417c0 .047 0 .094.006.14a3.445 3.445 0 0 1-2.392 3.343zM21.62 32.167a1.8 1.8 0 0 0 1.8-1.8V29a1.578 1.578 0 0 0 .227-.022 5.214 5.214 0 0 0-.36-10.416h-3.058a1.628 1.628 0 0 1-.01-3.257h5.89a1.8 1.8 0 0 0 0-3.6h-2.69v-1.356a1.8 1.8 0 0 0-3.6 0v1.395a5.202 5.202 0 0 0 .048 10.38 1.81 1.81 0 0 0 .36.036h3.054a1.627 1.627 0 1 1 0 3.254H16.52a1.8 1.8 0 0 0 0 3.6h3.3v1.357a1.8 1.8 0 0 0 1.8 1.796z" data-original="#000000" />
                      <path d="M8.764 32.376a1.8 1.8 0 0 0 1.411-2.914 14.578 14.578 0 0 1-3.15-9.102 14.724 14.724 0 0 1 24.7-10.836 1.8 1.8 0 0 0 2.435-2.65A18.326 18.326 0 0 0 7.345 31.692a1.8 1.8 0 0 0 1.42.685z" data-original="#000000" />
                    </g>
                  </svg>
                  <p className='text-gray-500 text-xs sm:text-sm mt-3'>COD available</p>
                </div>
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-[#FF7518] inline" viewBox="0 0 100 100">
                    <path d="M98 50c0 26.467-21.533 48-48 48S2 76.467 2 50c0-1.658 1.342-3 3-3s3 1.342 3 3c0 23.159 18.841 42 42 42s42-18.841 42-42S73.159 8 50 8c-11.163 0-21.526 4.339-29.322 12H32c1.658 0 3 1.342 3 3s-1.342 3-3 3H14c-1.658 0-3-1.342-3-3V5c0-1.658 1.342-3 3-3s3 1.342 3 3v10.234C25.851 6.786 37.481 2 50 2c26.467 0 48 21.533 48 48zM77 38v27c0 1.251-.776 2.37-1.945 2.81l-24 9a3.04 3.04 0 0 1-2.11 0l-24-9A3.003 3.003 0 0 1 23 65V38c0-1.251.776-2.37 1.945-2.81l24-9a3.036 3.036 0 0 1 2.109 0l24 9A3.002 3.002 0 0 1 77 38zm-42.457 0L50 43.795 65.457 38 50 32.205zM29 62.92l18 6.75V49.08l-18-6.75zm42 0V42.33l-18 6.75v20.59z" data-original="#000000" />
                  </svg>
                  <p className='text-gray-500 text-xs sm:text-sm mt-3'>15-Day Return Policy</p>
                </div>
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-[#FF7518] inline" viewBox="0 0 32 32">
                    <g data-name="Layer 24">
                      <path d="m31.385 15.434-3.33-5.55a1.11 1.11 0 0 0-.955-.544h-6.66V8.23a1.11 1.11 0 0 0-1.11-1.11h-2.22a1.11 1.11 0 0 0 0 2.22h1.11v13.32h-7.837a3.863 3.863 0 0 0-5.416 0H2.68v-5.55a1.11 1.11 0 0 0-2.22 0v6.66a1.11 1.11 0 0 0 1.11 1.11h2.276a4.44 4.44 0 0 0 0 .555 3.885 3.885 0 0 0 7.77 0 4.44 4.44 0 0 0-.056-.555h8.991a4.44 4.44 0 0 0-.056.555 3.885 3.885 0 0 0 7.77 0 4.44 4.44 0 0 0-.055-.555h2.22a1.11 1.11 0 0 0 1.11-1.11V16a1.11 1.11 0 0 0-.155-.566zm-2.92-.544H24.88v-3.33h1.587zM7.675 27.1a1.665 1.665 0 1 1 1.665-1.665A1.665 1.665 0 0 1 7.675 27.1zm16.65 0a1.665 1.665 0 1 1 1.665-1.665 1.665 1.665 0 0 1-1.665 1.665zm2.708-4.44a3.863 3.863 0 0 0-5.416 0H20.44v-11.1h2.22V16a1.11 1.11 0 0 0 1.11 1.11h5.55v1.11h-1.11a1.11 1.11 0 0 0 0 2.22h1.11v2.22z" data-original="#000000" />
                      <path d="M7.12 16A6.66 6.66 0 1 0 .46 9.34 6.66 6.66 0 0 0 7.12 16zm0-11.1a4.44 4.44 0 1 1-4.44 4.44A4.44 4.44 0 0 1 7.12 4.9z" data-original="#000000" />
                      <path d="M7.12 10.45h2.22a1.11 1.11 0 0 0 0-2.22H8.23V7.12a1.11 1.11 0 0 0-2.22 0v2.22a1.11 1.11 0 0 0 1.11 1.11z" data-original="#000000" />
                    </g>
                  </svg>
                  <p className='text-gray-500 text-xs sm:text-sm mt-3'>Free Delivery On Orders Above 1000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
