import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Product from '../components/products/product';
import { useContext } from 'react';
import { ToastContext } from '../contexts/toastContext';
import { CartContext } from '../contexts/cartContext';

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mainImage, setMainImage] = useState('')
    const [relatedProducts, setRelatedProducts] = useState([])
    const { setOpen } = useContext(ToastContext);
    const { cart, addToCart } = useContext(CartContext);

    function handelAddToCart() {
        addToCart(product);
        setOpen(true);
    }

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                setProduct(response.data)
                setMainImage(response.data.images[0] || '')
                setLoading(false)
            })
            .catch((error) => {
                console.error('فشل جلب المنتج', error)
                setLoading(false)
            })
    }, [id])


    useEffect(() => {
        if (product && product.category) {
            axios
                .get(`https://dummyjson.com/products/category/${product.category}`)
                .then((response) => {
                    setRelatedProducts(response.data.products)
                })
                .catch((error) => {
                    console.error('فشل جلب المنتجات المتعلقة', error)
                })
        }
    }, [product?.category])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative">
                    <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">المنتج مش موجود</h2>
                    <p className="text-gray-500">ممكن يكون الرابط غلط أو المنتج اتحذف</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6">
            <div className=" mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="flex flex-col lg:flex-row">

                        <div className="lg:w-1/2 p-6 lg:p-10 bg-white">
                            <div className="sticky top-10">
                                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-6 group">
                                    <img
                                        src={mainImage}
                                        alt={product.title}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {product.discountPercentage > 0 && (
                                        <span className="absolute top-5 left-5 bg-rose-500 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                                            {Math.round(product.discountPercentage)}% OFF
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    {product.images?.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setMainImage(img)}
                                            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-gray-100 hover:border-gray-300'
                                                }`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt="product view" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-50">
                            <div className="mb-2">
                                <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">{product.category}</span>
                            </div>

                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex bg-amber-50 px-2 py-1 rounded-lg">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-500 font-medium">{product.rating} Rating</span>
                                <span className="text-gray-300">|</span>
                                <span className={`font-semibold ${product.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {product.stock > 0 ? 'متاح في المخزون' : 'خلصان'}
                                </span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-5xl font-black text-gray-900">${product.price}</span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-2xl text-gray-400 line-through font-medium">
                                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">البراند</p>
                                    <p className="text-gray-800 font-semibold">{product.brand || 'غير محدد'}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">الكمية المتاحة</p>
                                    <p className="text-gray-800 font-semibold">{product.stock} قطعة</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={handelAddToCart} disabled={cart.some(item => item.id === product.id)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-200 active:scale-95">
                                    أضف للسلة
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4">
                                {product.tags?.map((tag) => (
                                    <span key={tag} className="text-xs font-bold text-gray-400 uppercase">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-10 md:py-15 bg-gradient-to-b from-gray-50 via-white to-gray-100 w-full" >
                <div className=" px-4 sm:px-6 lg:px-8 ">

                    <div className="flex flex-col pb-10 sm:flex-row sm:items-center sm:justify-between mb-10 ">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                                {product.category.replace(/-/g, " ").toUpperCase()}
                            </h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mt-3 rounded-full"></div>
                        </div>
                    </div>

                    {/* Swiper Slider للمنتجات */}
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        className="relative !pb-12"
                    >
                        {relatedProducts.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="px-2">
                                    <Product product={item} />
                                </div>
                            </SwiperSlide>
                        ))}

                        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </Swiper>

                </div>
            </section>
        </div>
    )
}

export default ProductDetails