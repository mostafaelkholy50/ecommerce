import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Product from '../components/products/product';

export default function Search() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        async function fetchSearchResults() {
            if (!query) return;
            
            setLoading(true);
            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchSearchResults();
    }, [query]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative">
                    <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="py-12 md:py-16 bg-gradient-to-b from-gray-100 via-white to-gray-50 border-b border-gray-200">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <nav className="flex mb-4 text-sm text-indigo-600 font-medium">
                                <Link to="/" className="hover:underline">Home</Link>
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-gray-500 capitalize">{query}</span>
                            </nav>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight capitalize">
                                {query}
                            </h1>
                            <div className="w-32 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 mt-4 rounded-full"></div>
                        </div>
                        <div className="mt-6 sm:mt-0 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                            <span className="text-gray-400 text-sm block uppercase font-bold tracking-widest">Total Products</span>
                            <span className="text-2xl font-black text-indigo-600">{products.length} Items</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                        <h2 className="text-2xl text-gray-400 font-medium">للأسف مفيش منتجات بالاسم ده حالياً</h2>
                        <Link to="/" className="mt-4 inline-block text-indigo-600 font-bold hover:underline">ارجع للرئيسية</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((item) => (
                            <div key={item.id} className="transform transition duration-300 hover:-translate-y-2">
                                <Product product={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}