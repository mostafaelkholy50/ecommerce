import React, { useContext } from 'react';
import { CartContext } from "../contexts/cartContext";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    const flatCart = cart.flat().filter(item => item && item.id);

    const totalPrice = flatCart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">سلة المشتريات</h1>
            
            {flatCart.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">السلة فاضية، روح اشتريلك حاجة!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {flatCart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <img src={item.thumbnail || 'https://via.placeholder.com/100'} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <span className="text-blue-600 font-semibold">${item.price}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center border rounded-lg">
                                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                                        <span className="px-4 font-medium">{item.quantity || 1}</span>
                                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                                    </div>
                                    
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">ملخص الطلب</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>عدد المنتجات</span>
                                <span>{flatCart.length}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-800 pt-4 border-t">
                                <span>الإجمالي</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
                            إتمام الشراء
                        </button>
                        <button onClick={clearCart} className="w-full mt-2 text-sm text-gray-400 hover:text-red-500 underline">
                            تفريغ السلة
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}