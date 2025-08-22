import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import { PiPlugChargingFill } from "react-icons/pi";

const Cards = () => {
  const videoRef = useRef(null);
  const [videoPlay, setVideoPlay] = useState(true);

  const handleVideoToggle = () => {
    if (videoPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoPlay(!videoPlay);
  };

  return (
    <>
      <div>
        <div className=" md:flex justify-center items-center gap-8  py-10 container">
          <div className=" w-full md:h-[200px] lg:h-[250px] bg-[#F4F4F4] flex justify-between items-center flex-col-reverse md:flex-row rounded-[10px] overflow-hidden my-5">
            <div className=" px-4 py-5 w-full lg:p-7 md:w-full lg:w-[70%]  ">
              <h3 className=" text-[25px] md:text-[28px] lg:text-[32px] font-bold">
                Current Offers
              </h3>
              <p className="text-[15px] md:text-[20px] lg:text-[25px] text-[#5C5E62]">
                Limited inventory. Take delivery today.
              </p>
              <button className="bg-white text-black px-10 md:px-14 lg:px-20 py-3 rounded-[10px] hover:bg-[#eeeeee] transition font-semibold">
                Learn more
              </button>
            </div>
            <div className="w-full md:w-[0%] h-[250px] lg:w-[30%] lg:h-full ">
              <img
                className="block md:hidden lg:block w-full h-full"
                src="./homeCard1.avif"
                alt=""
              />
            </div>
          </div>

          <div className=" w-full md:h-[200px] lg:h-[250px] bg-[#F4F4F4] flex justify-between items-center flex-col-reverse md:flex-row rounded-[10px] overflow-hidden my-5">
            <div className=" px-4 py-5 w-full lg:p-7 md:w-full lg:w-[70%]  ">
              <h3 className=" text-[25px] md:text-[28px] lg:text-[32px] font-bold">
                Current Offers
              </h3>
              <p className="text-[15px] md:text-[20px] lg:text-[25px] text-[#5C5E62]">
                Limited inventory. Take delivery today.
              </p>
              <button className="bg-white text-black px-10 md:px-14 lg:px-20 py-3 rounded-[10px] hover:bg-[#eeeeee] transition font-semibold">
                Learn more
              </button>
            </div>
            <div className="w-full md:w-[0%] h-[250px] lg:w-[30%] lg:h-full ">
              <img
                className="block md:hidden lg:block w-full h-full"
                src="./homeCard2.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 container mb-20">
          {/* Video Section */}
          <div className="flex-[0.65] rounded-[10px] overflow-hidden relative w-full lg:h-[60vh] min-h-[250px]">
            <video
              ref={videoRef}
              preload="none"
              poster="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-FSD-Tablet-Poster.jpg"
              playsInline
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            >
              <source
                src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Homepage-FSD-Tablet.mp4"
                type="video/mp4"
              />
              Sizin brauzeriniz video etiketini dəstəkləmir.
            </video>

            <button
              className="bg-[#737373] text-white top-3 right-3 p-2 sm:p-3 rounded-[8px] absolute z-20"
              onClick={handleVideoToggle}
            >
              {videoPlay ? <FaPause /> : <FaPlay />}
            </button>

            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 bg-gradient-to-t from-black/70 to-transparent text-white z-10">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
                Full Self-Driving (Supervised)
              </h2>
              <div className="flex mt-2 sm:mt-4 items-center gap-2 sm:gap-3 flex-wrap">
                <button className="bg-[#3e6ae1] hover:bg-[#3e4ee1] px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded transition">
                  Demo drive
                </button>
                <button className="bg-white text-black px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-[0.35] rounded-[10px] overflow-hidden relative w-full lg:h-[60vh] min-h-[250px]">
            <img
              className="w-full h-full object-cover"
              src="./homeCard3.avif"
              alt=""
            />
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
                World's First Autonomous Car Delivery
              </h2>
              <div className="mt-2 sm:mt-4">
                <button className="bg-[#3e6ae1] hover:bg-[#3e4ee1] px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded transition">
                  Watch now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-20"></div>
        {/* Google Maps Section */}
        <div className="mx-auto container mt-6 md:mt-12 lg:mt-20 mb-5">
          <div>
            <div className="w-full h-[70vh] rounded-[10px] overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2351173.159508729!2d49.127583158019426!3d40.592829777968035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1saz!2saz!4v1755901408964!5m2!1saz!2saz"
                className="w-full h-full"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="flex justify-between items-center flex-col md:flex-row text-center md:text-start md:px-10">
              <div>
                <h1 className=" text-2xl lg:text-4xl font-semibold py-1">
                  Find Your Charge
                </h1>
                <p className="text-[14px] lg:text-xl text-[#5c5e62] py-1">
                  View the network of Tesla Superchargers and Destination
                  Chargers available near you.
                </p>
                <div className="flex   items-center gap-3 py-1 justify-center md:justify-start">
                  <button className="bg-black  text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded transition font-semibold">
                    Watch now
                  </button>
                  <button className="bg-[#a6aab1]  text-black px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded transition font-semibold">
                    Watch now
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 ">
                <div className="">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl lg:text-4xl font-semibold py-1">
                      32,679
                    </span>
                    <span className="text-2xl lg:text-4xl font-semibold py-1">
                      <SlEnergy />
                    </span>
                  </div>
                  <p className="text-[14px] lg:text-xl text-[#5c5e62] py-1">
                    Superchargers
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl lg:text-4xl font-semibold py-1">
                      10,405
                    </span>
                    <span className="text-2xl lg:text-4xl font-semibold py-1">
                      <PiPlugChargingFill />
                    </span>
                  </div>
                  <p className="text-[14px] lg:text-xl text-[#5c5e62] py-1">
                    {" "}
                    Destination Chargers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10"></div>
      </div>
    </>
  );
};

export default Cards;
