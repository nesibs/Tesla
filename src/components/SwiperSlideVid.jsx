import React, { useRef, useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const SwiperSlideVid = ({ slide, index, activeIndex }) => {
  const videoRef = useRef(null);
  const [videoPlay, setVideoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mobil yoxlaması
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Videonu aktiv slide olduqda oynat / pause et
  useEffect(() => {
    if (videoRef.current) {
      if (isMobile) {
        // Mobil üçün: yalnız aktiv slide videonu göstərsin
        if (index === activeIndex) {
          videoRef.current.play();
          setVideoPlay(true);
        } else {
          videoRef.current.pause();
          setVideoPlay(false);
        }
      } else {
        // Desktop / tablet üçün bütün videolar autoplay
        videoRef.current.play();
        setVideoPlay(true);
      }
    }
  }, [activeIndex, index, isMobile]);

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
    <div className="w-full">
      <div className="relative w-full rounded-xl overflow-hidden h-[50vh] md:h-[70vh] lg:h-[80vh]">
        {slide.src ? (
          <>
            <video
              ref={videoRef}
              preload="none"
              poster={slide.poster}
              playsInline
              loop
              muted
              className="w-full h-full object-cover"
            >
              <source src={slide.src} type="video/mp4" />
              Sizin brauzeriniz video etiketini dəstəkləmir.
            </video>

            <button
              className="absolute bottom-4 left-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition"
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

      <div className="py-4 text-center md:text-left">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
          {slide.title}
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-gray-600 mt-2">
          {slide.subtitle}
        </p>
      </div>
    </div>
  );
};

export default SwiperSlideVid;
