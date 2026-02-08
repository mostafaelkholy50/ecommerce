import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavLinks() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Offers", path: "/offers" },
  ];

  return (
    <nav className="flex flex-row items-center justify-center gap-1 xl:gap-2 bg-[#2A2A2A] border-b border-gray-700 relative">
      {mainLinks.map(link => (
        <Link
          key={link.name}
          to={link.path}
          className={`
            px-4 py-2.5 font-medium rounded-lg transition-all duration-200
            ${location.pathname === link.path 
              ? 'text-white bg-gray-700/50 border-b-2 border-gray-300' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700/30'}
          `}
        >
          {link.name}
        </Link>
      ))}

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            inline-flex items-center gap-1.5
            px-4 py-2.5 font-medium rounded-lg transition-all duration-200
            ${isOpen ? 'text-white bg-gray-700/50' : 'text-gray-300 hover:text-white hover:bg-gray-700/30'}
          `}
        >
          Categories
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`
          absolute top-full right-0 mt-1 w-64
          bg-[#1E1E1E] border border-gray-700
          rounded-xl shadow-2xl overflow-hidden
          transition-all duration-200 z-50
          ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}>
          <div className="py-2 max-h-[70vh] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden">
            {categories.map(category => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="
                  block px-5 py-3 text-gray-300 hover:text-white
                  hover:bg-gray-700/50 transition-colors duration-150
                  text-right
                "
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}