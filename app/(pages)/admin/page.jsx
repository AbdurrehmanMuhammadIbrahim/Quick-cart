'use client'
import React, { use, useReducer, useState } from 'react';
import Order from './components/Order';
import AddItems from './components/AddItems';
import ItemsList from './components/ItemsList';
import { useRouter } from 'next/navigation';
import { PiChatsCircleBold } from "react-icons/pi";
import Link from 'next/link';

const Page = () => {
  const [content, setContent] = useState('Order');
const router = useRouter();

  const renderContent = () => {
    switch (content) {
      case 'AddItems':
        return <AddItems />;
      case 'ItemsList':
        return <ItemsList />;
      case 'Order':
      default:
        return <Order />;
    }
  };

    // Handle logout
    const handleLogout = () => {
      localStorage.removeItem('token'); 
      router.push('/login')
     
    };
  
  return (
    <div>
      <div className="relative font-[sans-serif] ">
        <header className='flex shadow-md py-1 px-4 sm:px-7 bg-white min-h-[70px] tracking-wide z-[110] fixed top-0 w-full'>
          <div className='flex items-center justify-between gap-4 w-full relative'>
           <h1>Dashboard</h1>
            <div
              className='flex mx-auto w-[70%] bg-gray-100 px-4 py-1 rounded outline-none border focus-within:border-blue-600 focus-within:bg-transparent transition-all'>
              <input type='text' placeholder='Search something...'
                className='w-full text-sm bg-transparent rounded outline-none pr-2' />
            </div>
            <div>
              <button
              onClick={handleLogout}
                className="bg-[#FF7518] duration-200 text-white py-2 px-4 rounded-full"
              >
                LogOut
              </button>
            </div>
            {/* <div> */}
              <Link
           href="/chat"
                className="border-orange-500 border-2  px-4 py-1 rounded-full"
              >
                <div className='flex gap-2 items-center'>
                <span><PiChatsCircleBold size={20}/></span>
                <span>Chat</span>
                </div>  
              </Link>
            {/* </div> */}
          </div>
        </header>
        <div className="flex mt-14">
          <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8 max-sm:hidden">
            <div id="sidebar-collapse-menu" className="bg-white py-6 px-4">
              <ul className="space-y-2">
                <li onClick={() => setContent('AddItems')} className='cursor-pointer'>
                  <div className="text-gray-800 text-sm flex items-center hover:bg-gray-200 rounded-md px-4 py-2 transition-all">
                    <span>Add Items</span>
                  </div>
                </li>
                <li onClick={() => setContent('ItemsList')} className='cursor-pointer'>
                  <div className="text-gray-800 text-sm flex items-center hover:bg-gray-200 rounded-md px-4 py-2 transition-all">
                    <span>Items List</span>
                  </div>
                </li>
                <li onClick={() => setContent('Order')} className='cursor-pointer'>
                  <div className="text-gray-800 text-sm flex items-center hover:bg-gray-200 rounded-md px-4 py-2 transition-all">
                    <span>Orders</span>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <section className="w-full overflow-auto px-6">
            <div className="py-10">{renderContent()}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
