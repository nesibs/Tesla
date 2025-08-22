import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarsById } from "../service/CarsServices";
import SwiperSlideVid from "./SwiperSlideVid";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../index.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Volume2, Armchair, Wifi } from "lucide-react";

const DetailsCard = () => {
  const { id } = useParams();
  const [cars, setCars] = useState(null);

  useEffect(() => {
    getCarsById(id).then((item) => {
      console.log("Gələn car tam obyekt:", item);
      setCars(item);
    });
  }, [id]);

  if (!cars) return <div className="text-center py-20 text-lg font-semibold">Loading...</div>;

  const features = [
    {
      icon: <Volume2 size={40} />,
      title: "Immersive Soundscape",
      description:
        "Specially engineered acoustic glass offers silence inside. Queue up your favorite songs and let the cabin turn into a private studio.",
    },
    {
      icon: <Armchair size={40} />,
      title: "Comfort From Any Seat",
      description:
        "Front and rear touchscreens, heated and ventilated seats, and soft-touch textiles make every ride comfortable.",
    },
    {
      icon: <Wifi size={40} />,
      title: "Even More Connected",
      description:
        "Clear calls, fast data, auto-unlock when you approach. Enhanced connectivity keeps you in sync.",
    },
  ];

  const card = [
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Color-Mobile-NA.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Color-Mobile-NA.mp4",
      title: "Full-Spectrum Color",
      subtitle:
        "Choose from infinite colors for your wrap-around lighting. Enjoy ambient glow that changes dynamically when you enter.",
    },
  ];

  const slides = [
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/Model-S-New-Interior-Carousel-Slide-1-Mobile-NA.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/Model-S-New-Interior-Carousel-Slide-1-Mobile-NA.mp4",
      title: "Three Ultra-Responsive  ",
      subtitle:
        "Passengers enjoy movies and gaming with ultra-fast connectivity and clear sound.",
    },
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-2-Mobile-NA-v2.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-2-Mobile-NA-v2.mp4",
      title: "Immersive Rear Display",
      subtitle:
        "Passengers enjoy movies and gaming with ultra-fast connectivity and clear sound.",
    },
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-3-Mobile-NA-v2.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-3-Mobile-NA-v2.mp4",
      title: "Premium Materials",
      subtitle:
        "Every surface is refined with soft-touch materials and high-tech detailing.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-full h-auto md:h-[60vh] lg:h-[100vh] rounded-xl object-cover"
          src={cars.image.aboutImg1}
          alt=""
        />
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold py-10 text-gray-800">
          Next-Level Interior
        </h2>
      </div>

      {/* Swiper Section */}
      <div className="w-[95%] mx-auto py-10 flex justify-center items-center ">
        <div className="w-full h-full relative">
          {/* Prev Button */}
          <div className="hidden md:flex custom-swiper-button-prev absolute left-6 top-1/2 transform -translate-y-1/2 z-40 cursor-pointer bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition">
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
            spaceBetween={15}
            slideToClickedSlide={true}
            className="mySwiper"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide
                key={idx}
                className="w-[95%] md:w-[50%] lg:w-[60%] transition-transform duration-500"
              >
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <SwiperSlideVid slide={slide} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Next Button */}
          <div className="hidden md:flex custom-swiper-button-next absolute right-6 top-1/2 transform -translate-y-1/2 z-40 cursor-pointer bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition">
            <FaChevronRight />
          </div>
        </div>
      </div>

      {/* Single Card */}
      <div className="w-[90%] mx-auto py-10">
        {card.map((slide, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden shadow-lg">
            <SwiperSlideVid slide={slide} />
          </div>
        ))}
      </div>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mx-auto max-w-[85%] my-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition"
          >
            <div className="mb-4 text-gray-700">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-sm lg:text-base text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DetailsCard;
