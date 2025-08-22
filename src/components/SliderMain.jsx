import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const SliderMain = () => {
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isNavigation, setIsNavigation] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsAutoplay(false);
        setIsNavigation(true);
      } else {
        setIsAutoplay(true);
        setIsNavigation(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [
    {
      image: "./slider1.avif",
      title: "$7,500 Federal Tax Credit Ending",
      subtitle: "Limited Inventory – Take Delivery Now",
      buttons: ["Order Model 3", "Order Model Y"],
    },
    {
      image: "./slider2.avif",
      title: "Model 3",
      subtitle: "Experience electric like never before",
      buttons: ["Explore Models", "Learn More"],
    },
  ];

  return (
    <div className="w-full h-[75vh] md:h-[75vh] sm:h-screen relative">
      <Swiper
        effect="fade"
        loop={true}
        fadeEffect={{ crossFade: true }}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={
          isNavigation
            ? { enabled: true, nextEl: ".custom-next", prevEl: ".custom-prev" }
            : false
        }
        pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet custom-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
      }}
        autoplay={isAutoplay ? { delay: 3000, disableOnInteraction: false } : { delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex flex-col  lg:py-12 md:py-10 sm:py-7 items-center text-white  "
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <h1 className=" text-3xl md:text-5xl lg:text-7xl font-bold mt-5 mb-4 text-center">
                {slide.title}
              </h1>
              <p className="underline text-xl  lg:text-3xl mb-6 text-center">
                {slide.subtitle}
              </p>
              <div className="flex gap-2 md:gap-4">
                {slide.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    className="bg-blue-600 w-[120px] sm:w-[150px]  lg:w-[200px] py-3 rounded text-white font-bold hover:bg-blue-700 transition"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}

          <style>{`
        .custom-bullet { 
          width: 10px;
          height: 10px;
          background: #9ca3af; /* Boz rəng */
          opacity: 1;
          margin: 0 6px !important;
          border-radius: 50%;
          transition: background 0.3s;
        }

        .custom-bullet-active {
          background: #fff; v
        }
      `}</style>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="custom-prev hidden lg:flex absolute top-1/2 left-20 z-10 bg-gray-100 text-black w-10 h-10  shadow-black shadow-md justify-center items-center cursor-pointer">
        &#10094;
      </div>
      <div className="custom-next hidden lg:flex absolute top-1/2 right-20 z-10 bg-gray-100 text-black w-10 h-10  shadow-black shadow-md justify-center items-center cursor-pointer">
        &#10095;
      </div>
    </div>
  );
};

export default SliderMain;
