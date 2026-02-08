import React from 'react'
import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export default function CartProvider({children}) {
    const [cart, setCart] = useState(
        localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    );
    const addToCart = (item) => {
        setCart([...cart, item]);
        localStorage.setItem('cart', JSON.stringify([...cart, item]));
    }
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');    
    }
    const updateQuantity = (id, quantity) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    
  return (
    <div>
        <CartContext.Provider value={{cart, addToCart , removeFromCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    </div>
  )
}

export {CartContext}
