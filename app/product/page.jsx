'use client';
import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductBanner from "../components/ProductBanner/page"
import { FaStar } from "react-icons/fa6";
import Card from "../components/Card/Card"
import { fetchProducts, fetchCategories } from '../../api/productService';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";



const page = (props) => {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
  <div>
<ProductBanner name="Products"/>
<div className="mt-14 mb-12">
      <div className="mx-auto lg:max-w-[1065px] xl:max-w-[1865px]">
      <div className="flex flex-wrap justify-center mt-10">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {products.map((product,index) => (
        
           <div key={index}>
             <Card key={index} title={product.title} detailsId={product._id} Image={product.images && product.images.length > 0
      ? `${BASE_URL}/${product.images[0]}`
      : '/placeholder.jpg'} id={product.id}/>
      
         {/* <Image src={product.images[0]} width={500} height={500}/> */}
        
           </div>
        ))}
          </div>
       {/* <Card title="sfsf"/> */}
      </div>
    </div>


  </div>
  )
}

export default page
