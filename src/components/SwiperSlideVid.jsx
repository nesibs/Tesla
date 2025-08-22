// SwiperSlideVid.jsx
import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const SwiperSlideVid = ({ slide }) => {
  const videoRef = useRef(null);
  const [videoPlay, setVideoPlay] = useState(true);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoPlay) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlay(!videoPlay);
    }
  };

  return (
    <>
      <div className="flex-[0.65] rounded-[10px]     h-[50vh] md:h-[70vh] lg:h-[90vh]">
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
              className="w-full h-full  object-cover"
              crossOrigin="anonymous"
            >
              <source src={slide.src} type="video/mp4" />
              Sizin brauzeriniz video etiketini dəstəkləmir.
            </video>

            <button
              className="bg-[#737373] text-white  bottom-0 left-0 p-2 sm:p-3 m-3 sm:m-5 rounded-[8px] absolute"
              onClick={handleVideoToggle}
            >
              {videoPlay ? <FaPause /> : <FaPlay />}
            </button>
          </>
        ) : (
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="py-3">
        <h2 className="text-1xl md:text-2xl lg:text-3xl font-semibold text-black py-3 ">
          {slide.title}
        </h2>
        <p className="text-[15px] md:text-1xl lg:text-2xl text-[#393c41]">
          {slide.subtitle}
        </p>
      </div>
    </>
  );
};

export default SwiperSlideVid;
