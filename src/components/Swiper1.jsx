import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../index.css";

const slides = [
  {
    image: "./swiper1.avif",
    title: "Model Y",
    subtitle: "From $349/mo for a Limited Time",
  },
  {
    image: "./swiper2.avif",
    title: "Model 3",
    subtitle: "0% APR With Purchase or Transfer of FSD",
  },
  { image: "./swiper3.avif", title: "Model X", subtitle: "From $89,990" },
  { image: "./swiper4.avif", title: "Model S", subtitle: "From $84,990" },
  {
    image: "./swiper5.avif",
    title: "Model 3",
    subtitle: "0% APR With Purchase or Transfer of FSD",
  },
];

const Swiper1 = () => {
  return (
    <div className="swipper1 w-full max-h-lvh  py-8 flex justify-center items-center">
      <Swiper
        modules={[Pagination]}
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
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className=" w-[80%]  md:w-[50%] lg:w-[60%] transition-transform duration-3000"
          >
            <div
              className="relative bg-cover bg-center h-[60vh] rounded-xl overflow-hidden flex flex-col justify-end p-6 text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="mb-4">{slide.subtitle}</p>
              <div className="  flex justify-center lg:justify-start gap-2 lg:gap-4">
                <button className="bg-blue-600  w-[60%]  lg:w-[200px] rounded py-2  text-[13px] font-semibold">
                  Order Now
                </button>
                <button className="bg-white text-black w-[60%]  lg:w-[200px]  py-2 rounded text-[13px] font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <style>{`
        .custom-bullet { 
          top: 100px;
          margin
          width: 10px;
          height: 10px;
          background: #9ca3af; /* Boz rəng */
          opacity: 1;
          margin-top: -10px!important;
          border-radius: 50%;
          transition: background 0.3s;
        }

        .custom-bullet-active {
          background: #111827; /* Qara rəng aktiv üçün */
        }
      `}</style>
      </Swiper>
    </div>
  );
};

export default Swiper1;
