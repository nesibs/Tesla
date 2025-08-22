import React, { useEffect, useRef, useState } from "react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react"; 
import ShopAccesuareTab from "./ShopAccesuareTab";
import ShopHeader from "./ShopHeader"; 
const Shop = () => {
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isNavigation, setIsNavigation] = useState(false);
  const videoRef = useRef(null);

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
      image: "./shopPics/shopSwiper1.avif",
      title: "Cybertruck Crossbar",
    },
    {
      src: "https://digitalassets-shop.tesla.com/video/upload/f_auto,q_auto/v1/content/dam/tesla/abF0uRhidP4hdUBc2Jmir_desktop.mp4 ",
      poster:
        "https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/teslaweb/homepage/abF0uRhidP4hdUBc2Jmi_desktop_placeholder.jpg",
      img: "./shopPics/shopSwiper2.avif",
    },
  ];

  return (
    <>
      <div className="w-full h-[100vh]  relative">
        <ShopHeader />
        <Swiper
          effect="fade"
          loop={true}
          fadeEffect={{ crossFade: true }}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation={
            isNavigation
              ? {
                  enabled: true,
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }
              : false
          }
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}
          autoplay={
            isAutoplay
              ? { delay: 3000, disableOnInteraction: false }
              : { delay: 3000, disableOnInteraction: false }
          }
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full bg-center flex items-center justify-center text-white">
                {slide.src ? (
                  <>
                    <video
                      ref={videoRef}
                      preload="none"
                      poster={slide.poster}
                      playsInline
                      autoPlay
                      loop
                      muted
                      className="w-full h-screen object-cover"
                      crossOrigin="anonymous"
                    >
                      <source src={slide.src} type="video/mp4" />
                      Sizin brauzeriniz video etiketini dəstəkləmir.
                    </video>
                  </>
                ) : (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-screen object-cover"
                  />
                )}

                <div className="absolute bottom-40 w-full flex justify-center flex-col z-50">
                  <h2 className="text-center text-xl md:text-3xl lg:text-5xl font-semibold text-white  px-4 py-4 rounded-md  ">
                    {slide.title}
                  </h2>
                  <img className="w-[500px] mx-auto" src={slide.img} alt="" />
                  <div className="mx-auto">
                    <button className="bg-white px-20 py-2 text-black text-[13px] font-semibold rounded-[5px]">Shop Now</button>
                  </div>
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
          border-radius: import shopAccesuareTab from './ShopAccesuareTab';
50%;import shopHeader from './shopHeader';

          transition: background 0.3s;
        }

        .custom-bullet-active {
          background: #fff; v
        }
      `}</style>
        </Swiper>
        <ShopAccesuareTab /> 
      </div>
    </>
  );
};

export default Shop;
