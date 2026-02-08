import React from 'react'
import { createContext, useState } from 'react';

const ToastContext = createContext();
export default function ToastProvider({ children }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <ToastContext.Provider value={{ open, setOpen }}>
                {children}
            </ToastContext.Provider>
        </div>
    )
}
export { ToastContext }