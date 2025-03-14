'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img1 from "../../../public/assets/pr-1.jpg";
import Img2 from "../../../public/assets/pr-1.jpg";
import Img3 from "../../../public/assets/pr-1.jpg";
import Img4 from "../../../public/assets/pr-1.jpg";
import { FaStar } from "react-icons/fa6";
import Card from "../../components/Card/Card"
import { fetchProducts, fetchCategories } from '../../../api/productService';
import { addItemToCart } from '../../../api/cartServices';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { addToCart } from '../../../redux/slices/cartSlice';
import ChatWidget from "../../components/ChatWidget/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const BestSelling = () => {

  const router = useRouter()
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // const handleAddToCart = (productId) => {
  //   const cartItem = {
  //     productId: productId,
  //     quantity: 1, // Default to 1
  //   };
  //   // const updatedCart = [...cartItems, cartItem];
  // if(!token){
  //   router.push("/login")
  // }
  // dispatch(addToCart(cartItem));
  // dispatch(addItemToCart(cartItem));
  //   // localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  // };


  const handleAddToCart = (productId) => {
    const cartItem = {
      productId: productId,
      quantity: 1, // Default to 1
    };
    // const updatedCart = [...cartItems, cartItem];
    if (!token) {
      router.push("/login")
    }
    dispatch(addToCart(cartItem));
    dispatch(addItemToCart(cartItem));
    // localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };

  return (
    <div>
    <div className="mt-14 mb-12">
      <div className="mx-auto lg:max-w-[1065px] xl:max-w-[1865px]">
        <div className="flex flex-wrap justify-center mt-10">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {/* <p>{products?._id}</p> */}
          {products.map((product, index) => (
            <div key={index}>
              <Card key={index}
                title={product.title}
                price={product.price}
                detailsId={product._id}
                AddToCart={() => handleAddToCart(product._id)}  // Pass the product._id to the function
                Image={product.images && product.images.length > 0
                  ? `${BASE_URL}/${product.images[0]}`
                  : '/placeholder.jpg'} id={product?.id} />

              {/* <Image src={product.images[0]} width={500} height={500}/> */}

            </div>
          ))}
        </div>
        {/* <Card title="sfsf"/> */}
      </div>
    </div>

    <ChatWidget/>
    </div>
  );
};

export default BestSelling;