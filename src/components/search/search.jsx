import React, { useState, useEffect, useRef } from 'react'
import { IoSearch } from "react-icons/io5";
import { useNavigate, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.trim().length > 1) {
                fetchSuggestions();
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    async function fetchSuggestions() {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=5`);
            const data = await response.json();
            setSuggestions(data.products);
            setShowSuggestions(true);
        } catch (error) {
            console.error(error);
        }
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        if (search.trim()) {
            setShowSuggestions(false);
            navigate(`/search?query=${encodeURIComponent(search)}`);
        }
    }

    return (
        <div ref={wrapperRef} className="hidden md:block w-64 lg:w-80 xl:w-96 relative">
            <form onSubmit={handleSearchSubmit}>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => search.trim() && setShowSuggestions(true)}
                    value={search}
                    type="search"
                    placeholder="Search products..."
                    className="w-full px-4 py-2.5 pl-4 pr-11 bg-[#1E1E1E] text-gray-200 text-sm border border-gray-600 rounded-full focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500/30 placeholder:text-gray-500 placeholder:text-sm transition-all duration-200"
                />
                <button
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    type="submit"
                >
                    <IoSearch size={20} />
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E1E1E] border border-gray-600 rounded-xl overflow-hidden shadow-xl z-50">
                    {suggestions.map((item) => (
                        <Link
                            key={item.id}
                            to={`/search?query=${item.title}`}
                            onClick={() => {
                                setSearch(item.title);
                                setShowSuggestions(false);
                            }}
                            className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <img src={item.thumbnail} alt={item.title} className="w-8 h-8 rounded object-cover" />
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}