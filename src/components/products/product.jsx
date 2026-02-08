import { FaHeart, FaShoppingCart } from "react-icons/fa";
import CheckIcon from '@mui/icons-material/Check';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import { ToastContext } from "../../contexts/toastContext";

function Product({ product }) {
    const  {setOpen} = useContext(ToastContext);
    const { cart, addToCart } = useContext(CartContext);

    function handelAddToCart() {
        addToCart(product);
        setOpen(true);
    }


    return (

        <div className="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
               border border-gray-100 overflow-hidden group ">
            <div className={cart.some(item => item.id === product.id) ? "border-4 border-indigo-600 rounded-2xl" : ""}>
                <Link to={`/Product/${product.id}`}>


                    <div className="relative h-56 overflow-hidden">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 
                 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>

                </Link>
                <div className="p-5">
                    <Link to={`/Product/${product.id}`}>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2 min-h-[3rem]">
                            {product.title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-1.5 mt-2 text-sm text-yellow-500">
                        <span>★</span>
                        <span className="text-gray-600">{product.rating}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-2xl font-black text-indigo-700">
                            ${product.price}
                        </div>

                        <button className="
        bg-gradient-to-r from-indigo-600 to-indigo-700 
        text-white p-3 rounded-full 
        hover:from-indigo-700 hover:to-indigo-800 
        hover:scale-110 active:scale-95
        transition-all duration-300 shadow-md hover:shadow-lg
                " onClick={handelAddToCart} disabled={cart.some(item => item.id === product.id)}>
                            {cart.some(item => item.id === product.id) ? <CheckIcon className="text-green-500" /> :
                                <FaShoppingCart size={20} />}
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
