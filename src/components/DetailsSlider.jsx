import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getCarsById } from "../service/CarsServices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const DetailsSlider = () => {
  const { id } = useParams();
  const [cars, setCars] = useState(null);

  useEffect(() => {
    getCarsById(id).then((item) => {
      console.log("Gələn car tam obyekt:", item);
      setCars(item);
    });
  }, [id]);

  if (!cars) return <div>Loading...</div>;

  // `detSlider` obyektini array formasına çeviririk
  const slides = Object.values(cars.detSlider || {});

  return (
    <div className="w-full mx-auto py-6 flex justify-center items-center">
      <div className="w-full h-full relative">
        {/* Prev Button */}
        <div className="hidden md:block custom-swiper-button-prev absolute left-3 md:left-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[#d0d2d6] text-black p-2 md:p-3 rounded-full shadow-md hover:bg-gray-200">
          <FaChevronLeft />
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          centeredSlides={false}
          slidesPerView={1} // mobil üçün 1.2
          spaceBetween={10}
          slideToClickedSlide={true}
          breakpoints={{
            768: { slidesPerView: 1.3 }, // tablet
            1024: { slidesPerView: 1.5 }, // desktop → 1 tam + 0.5 slayd
          }}
          className="mySwiper relative "
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="transition-transform duration-500"
            >
              <div className="relative bg-cover bg-center h-[80%] rounded-xl overflow-hidden flex flex-col justify-end p-6 text-white">
                <div className="flex-[0.65] rounded-[10px] overflow-hidden relative h-[250px] md:h-[700px] ">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full md:h-[70vh] object-cover"
                  />
                </div>
                <div className="py-3">
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-black py-3">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg lg:text-xl text-[#393c41]">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <div className="hidden md:block custom-swiper-button-next absolute right-3 md:right-10 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-[#d0d2d6] text-black p-2 md:p-3 rounded-full shadow-md hover:bg-gray-200">
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default DetailsSlider;
