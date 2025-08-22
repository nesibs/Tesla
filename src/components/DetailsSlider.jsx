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
    <div className="w-[97%] max-h-[70vh] mx-auto py-8 flex justify-center items-center">
      <div className="w-full h-full py-8 flex justify-center items-center relative">
        {/* Prev Button */}
        <div className="hidden md:block custom-swiper-button-prev absolute left-20 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[#d0d2d6] text-black p-3 shadow-md hover:bg-gray-200">
          <FaChevronLeft />
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          centeredSlides={false}
          slidesPerView={"auto"}
          spaceBetween={30}
          slideToClickedSlide={true}
          className="mySwiper relative"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="w-[80%] md:w-[50%] lg:w-[60%] transition-transform duration-3000"
            >
              <div className="relative bg-cover bg-center h-[100vh] rounded-xl overflow-hidden flex flex-col justify-end p-6 text-white">
                <div className="flex-[0.65] rounded-[10px] overflow-hidden relative h-[300px] md:min-h-[60vh] ">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full  h-full object-cover"
                  />
                </div>
                <div className="py-3">
                  <h2 className="text-1xl md:text-2xl lg:text-3xl font-semibold text-black py-3">
                    {slide.title}
                  </h2>
                  <p className="text-[15px] md:text-1xl lg:text-2xl text-[#393c41]">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <div className="hidden md:block custom-swiper-button-next absolute right-20 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-[#d0d2d6] text-black p-3 shadow-md hover:bg-gray-200">
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default DetailsSlider;
