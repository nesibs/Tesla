import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../index.css"

const slides = [
  { image: "./homeSwip1.avif", title: "Solar Panels", subtitle: "Use Solar Energy to Power Your Home and Charge Your Tesla" },
  { image: "./homeSwip2.avif", title: "Pwerwall", subtitle: "Keep Your Lights On During Outages" },
  { image: "./homeSwip3.avif", title: "Solar Roof", subtitle: "Generate Clean Energy With Your Roof" },
  { image: "./homeSwip4.avif", title: "Megapack", subtitle: "Massive Batteries for Massive Energy Support" }
];


const Swiper2 = () => {
  return (
     <div className="w-full max-h-lvh  py-8 flex justify-center items-center">
      <Swiper
        modules={[Pagination]}
        pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet custom-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
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
              <div className="flex justify-center lg:justify-start gap-2 lg:gap-4">
                <button className="bg-blue-600 w-[60%]  lg:w-[200px] rounded py-2  text-[13px] font-semibold">Order Now</button>
                <button className="bg-white text-black w-[60%]  lg:w-[200px] rounded py-2  text-[13px] font-semibold">Learn More</button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <style >{`
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
          background: #111827; /* Qara rəng aktiv üçün */
        }
      `}</style>
      </Swiper>
    </div>
  )
}

export default Swiper2
