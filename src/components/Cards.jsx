import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

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

     <div className="w-full min-h-[250px] lg:h-[60vh] flex flex-col lg:flex-row justify-center items-stretch gap-4 container">
  {/* Video Section */}
  <div className="flex-[0.65] rounded-[10px] overflow-hidden relative min-h-[250px]">
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
      className="bg-[#737373] text-white top-0 right-0 p-2 sm:p-3 m-3 sm:m-5 rounded-[8px] absolute"
      onClick={handleVideoToggle}
    >
      {videoPlay ? <FaPause /> : <FaPlay />}
    </button>
    <div className="text-white p-5 sm:p-10 bottom-0 absolute">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
        Full Self-Driving (Supervised)
      </h2>
      <div className="flex mt-3 sm:mt-5 items-center gap-2 sm:gap-3">
        <button className="bg-[#3e6ae1] hover:bg-[#3e4ee1] px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base rounded transition">
          Demo drive
        </button>
        <button className="bg-white text-black px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base rounded transition">
          Learn More
        </button>
      </div>
    </div>
  </div>

  {/* Image Section */}
  <div className="flex-[0.35] rounded-[10px] overflow-hidden relative min-h-[250px]">
    <img
      className="w-full h-full object-cover"
      src="./homeCard3.avif"
      alt=""
    />
    <div className="text-white p-5 sm:p-10 bottom-0 absolute">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
        World's First Autonomous Car Delivery
      </h2>
      <div className="mt-3 sm:mt-5">
        <button className="bg-[#3e6ae1] hover:bg-[#3e4ee1] px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base rounded transition">
          Watch now
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Cards;
