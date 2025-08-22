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

  if (!cars) return <div>Loading...</div>;

  const features = [
    {
      icon: <Volume2 size={40} />,
      title: "Immersive Soundscape",
      description:
        "Step inside, close the door and experience the vast silence offered by specially engineered acoustic glass. Queue up your favorite songs and listen as your cabin turns into your own private sound studio.",
    },
    {
      icon: <Armchair size={40} />,
      title: "Comfort From Any Seat",
      description:
        "Front and rear touchscreens put all your climate and entertainment settings within reach. Heated and ventilated seats, power recline and soft-touch textiles provide added comfort.",
    },
    {
      icon: <Wifi size={40} />,
      title: "Even More Connected",
      description:
        "Calls come in clear. Data downloads fast. Doors and trunks unlock when you approach. Enhanced connectivity and signal range keep you and your vehicle in sync. Bluetooth capability keeps passengers entertained.",
    },
  ];


  const card = [
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Color-Mobile-NA.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Color-Mobile-NA.mp4",
      title: "Full-Spectrum Color",
      subtitle:
        "Choose from infinite colors to customize your wrap-around lighting and enjoy dynamic animated illuminations that appear along the dash and door trims when you enter then fade to an ambient glow.",
    },
  ];

  const slides = [
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/Model-S-New-Interior-Carousel-Slide-1-Mobile-NA.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/Model-S-New-Interior-Carousel-Slide-1-Mobile-NA.mp4",
      title: "Three Ultra-Responsive Displays",
      subtitle:
        "A 17.4” first-row and 9.4” second-row touchscreen offer a vivid image and respond quickly to your touch. Driver cluster display shows your speed, range and more.",
    },
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-2-Mobile-NA-v2.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-2-Mobile-NA-v2.mp4",
      title: "Three Ultra-Responsive Displays",
      subtitle:
        "A 17.4” first-row and 9.4” second-row touchscreen offer a vivid image and respond quickly to your touch. Driver cluster display shows your speed, range and more.",
    },
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-3-Mobile-NA-v2.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-S-New-Interior-Carousel-Slide-3-Mobile-NA-v2.mp4",
      title: "Three Ultra-Responsive Displays",
      subtitle:
        "A 17.4” first-row and 9.4” second-row touchscreen offer a vivid image and respond quickly to your touch. Driver cluster display shows your speed, range and more.",
    },
    {
      poster:
        "https://digitalassets.tesla.com/tesla-contents/video/upload/Model-S-New-Interior-Carousel-Slide-4-Mobile-NA.mp4",
      src: "https://digitalassets.tesla.com/tesla-contents/video/upload/Model-S-New-Interior-Carousel-Slide-4-Mobile-NA.mp4",
      title: "Three Ultra-Responsive Displays",
      subtitle:
        "A 17.4” first-row and 9.4” second-row touchscreen offer a vivid image and respond quickly to your touch. Driver cluster display shows your speed, range and more.",
    },
  ];

  return (
    <div className="container flex flex-col ">
      <div className=" flex justify-center items-center flex-col">
        <img
          className="container w-full h-auto md:h[60vh] lg:h-[100vh] rounded-[10px] overflow-hidden"
          src={cars.image.aboutImg1}
          alt=""
        />
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold py-10">
          Next-Level Interior
        </h2>
      </div>

      <div className="w-[97%] max-h-[70vh] mx-auto  py-8 flex justify-center items-center mt-28 md:mt-20 lg:mt-12">
        <div className="w-full  h-full py-8 flex justify-center items-center relative">
          {/* Prev Button */}
          <div className="  hidden md:block  custom-swiper-button-prev absolute left-20 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[#d0d2d6] text-black p-3   shadow-md hover:bg-gray-200">
            <FaChevronLeft />
          </div>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet custom-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active custom-bullet-active",
            }}
            centeredSlides={false}
            slidesPerView={"auto"}
            spaceBetween={30}
            slideToClickedSlide={true}
            className="mySwiper relative"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide
                key={idx}
                className="w-[80%] md:w-[50%] lg:w-[60%]  transition-transform duration-3000"
              >
                <div className="relative bg-cover bg-center h-[100vh] rounded-xl overflow-hidden flex flex-col justify-end p-6 text-white">
                  <SwiperSlideVid slide={slide} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className=" hidden md:block  custom-swiper-button-next absolute right-20 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-[#d0d2d6] text-black p-3   shadow-md hover:bg-gray-200">
            <FaChevronRight />
          </div>
        </div>
      </div>

      <div className=" w-[90%] h-[90vh] mx-auto py-5  md:py-12   lg:py-32  ">
        { card.map((slide) => (
           <SwiperSlideVid key={slide.id} slide={slide} /> 
        ))}
      </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mx-auto max-w-[80%]  mt-24 md:mt-52 lg:mt-96 ">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-50 p-1 lg:p-6 rounded-xl shadow-md flex flex-col items-start"
        >
          <div className="mb-4 text-gray-800">{feature.icon}</div>
          <h3 className=" text[20px] lg:text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-[14px] lg:text-[18px] text-gray-600">{feature.description}</p>
        </div>
      ))}
    </section>
    </div>
  );
};

export default DetailsCard;
