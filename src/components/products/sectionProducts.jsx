import Product from "./product";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SectionProducts({ products, category }) {
    return (
        <section className="py-10 md:py-15 bg-gradient-to-b from-gray-50 via-white to-gray-100 w-full">
            <div className="px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col pb-10 sm:flex-row sm:items-center sm:justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                            {category.replace(/-/g, " ").toUpperCase()}
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mt-3 rounded-full"></div>
                    </div>

                    <a
                        href={`/category/${category}`}
                        className="mt-4 sm:mt-0 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 group"
                    >
                        View All
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                </div>

                <div className="relative">
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
                        className="!pb-12"
                    >
                        {products?.products?.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="px-2">
                                    <Product product={item} />
                                </div>
                            </SwiperSlide>
                        ))}

                        <CustomNavigation />
                    </Swiper>
                </div>

            </div>
        </section>
    );
}

function CustomNavigation() {
    const swiper = useSwiper();

    return (
        <>
            <button
                onClick={() => swiper.slidePrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={() => swiper.slideNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </>
    );
}

export default SectionProducts;