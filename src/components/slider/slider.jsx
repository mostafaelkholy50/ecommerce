import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    image: './public/img/slider1.jpg',
    title: 'Summer Sale Up To 70% Off',
    subtitle: 'Discover the hottest deals on trending fashion & accessories',
    buttonText: 'Shop Now',
  },
  {
    image: './public/img/slider2.jpg',
    title: 'New Collection Arrived',
    subtitle: 'Elevate your style with our latest premium arrivals',
    buttonText: 'Explore Collection',
  },
  {
    image: './public/img/slider3.jpg',
    title: 'Flash Sale – Limited Time Only',
    subtitle: 'Grab your favorites before they are gone!',
    buttonText: 'Buy Now',
  },
];

export default function Slider() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper h-[450px] md:h-[550px] lg:h-[650px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-[0.75]"
              />

              {/* Overlay Text & Button */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <a
                    href="#shop" // ← غيّره للرابط اللي عايزه (مثلاً /offers أو /sale)
                    className="
                      inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600
                      text-white font-semibold text-lg rounded-full
                      hover:from-indigo-700 hover:to-purple-700
                      transform hover:scale-105 transition-all duration-300
                      shadow-lg hover:shadow-2xl
                    "
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}