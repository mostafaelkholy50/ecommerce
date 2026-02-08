import React from 'react';
import { IoSearch, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {CartContext} from "../../contexts/cartContext";
import Search from '../search/search';

export default function TopHeader() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;

  return (
    <header className="w-full h-16 bg-[#2A2A2A] border-b border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-10 shadow-md z-10">
      {/* Logo + Name */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="w-20 h-20 md:w-14 md:h-14 ">
          <Link to="/">
            <img
              src="/img/7722870.png"
              alt="Ecommerce Logo"
              className="w-12 h-12 pt-5 md:w-16 md:h-16 md:pt-0  object-cover"
            />
          </Link>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-200 tracking-tight hidden sm:block">
          Ecommerce
        </h1>
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search Bar */}
       <Search /> 
        {/* Cart */}
        <Link to="/cart" className="relative text-gray-400 hover:text-gray-200 transition-colors">
          <IoCartOutline size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}