
import Image from 'next/image'
import React from 'react'
import Img1 from "../../../public/assets/pr-1.jpg";
import Link from 'next/link';



const Card = (props) => {
  return (
    <div className="flex flex-wrap justify-center mt-10">
 
    <div className="p-4 max-w-64 ">
        <div className="flex rounded-lg  dark:bg-gray-800  border border-b-4 border-r-4 border-orange-500 p-4 flex-col">
            
            <div>
                <img src={props.Image} alt='card-img' className='rounded-lg min-h-[140px] max-h-[140px] w-full'/>
            </div>
            <div className="text-center mb-3 max-w-xs">
                <h2 className="mt-2 dark:text-white text-lg font-semibold text-ellipsis  whitespace-nowrap overflow-hidden">{props.title}</h2>
           <p className='text-md underline'>Rs.{props.price}</p>
            </div>
    
            <div className="flex flex-col justify-between flex-grow">
                <div className='flex gap-4 text-[12px]'>
                   <button
                    //   onClick={handleOrderPopup}
                      className="bg-[#FF7518]  duration-200 text-white py-2 px-2 rounded-full" onClick={props.AddToCart}
                    >
                      Add To Cart
                    </button>
                    <Link
                    //   onClick={handleOrderPopup}
                    href={`/product/${props.detailsId}`}
                    // href="/product/1"
                      className="border-[#FF7518] border  duration-200 text-[#FF7518] py-2 px-2 rounded-full"
                    >
                     View Details
                    </Link>
                    </div>
            </div>
        </div>
    </div>

</div>

  )
}

export default Card
