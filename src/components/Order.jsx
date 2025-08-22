import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarsById } from "../service/CarsServices";
import { useSwipeable } from "react-swipeable";
import { Globe } from "lucide-react";

const Order = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [activeTab, setActiveTab] = useState("cash");
  const [selectedVersion, setSelectedVersion] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("grey");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [includeSavings, setIncludeSavings] = useState(true);

  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false); // Fade-i söndür
    const timeout = setTimeout(() => setFade(true), 50); // Yenidən yandır
    return () => clearTimeout(timeout);
  }, [selectedImageIndex]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedImageIndex < carImages.length - 1) {
        setSelectedImageIndex((prev) => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (selectedImageIndex > 0) {
        setSelectedImageIndex((prev) => prev - 1);
      }
    },
    trackMouse: true, // Desktop üçün də işləyəcək
  });

  const savingsAmount = 6500;

  useEffect(() => {
    getCarsById(id).then((item) => {
      setCar(item);
    });
  }, [id]);

  const ballImg = [
    {
      title: "Stealth Grey",
      increase: 0,
      image: "/orderPics/greyBall.avif",
      key: "grey",
    },
    {
      title: "Ultra Red",
      increase: 2200,
      image: "/orderPics/redBall.avif",
      key: "blue",
    },
    {
      title: "Frost Blue Metallic",
      increase: 2500,
      image: "/orderPics/blueBall.avif",
      key: "red",
    },
    {
      title: "Black Diamond",
      increase: 1300,
      image: "/orderPics/blackBall.avif",
      key: "black",
    },
    {
      title: "Pearl White Multi-Coat",
      increase: 2100,
      image: "/orderPics/whiteBall.avif",
      key: "white",
    },
  ];

  if (!car) return <div className="p-8 text-center">Loading...</div>;

  const subcar = car.subcar;

  const getVersionData = () => (selectedVersion === "standard" ? car : subcar);

  const getDisplayPrice = (version = "standard") => {
    const data = version === "standard" ? car : subcar;
    let basePrice = parseInt(data.price.replace(/[^\d]/g, ""), 10);

    const colorObj = ballImg.find((c) => c.key === selectedColor);
    if (colorObj?.increase) {
      basePrice += colorObj.increase;
    }

    if (activeTab === "lease") {
      const monthly = Math.round(basePrice / 36);
      return `$${monthly.toLocaleString()}/mo`;
    } else if (activeTab === "finance") {
      const r = 0.02 / 12; // aylıq faiz
      const n = 36; // ay sayı
      const monthly =
        (basePrice * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return `$${Math.round(monthly).toLocaleString()}/mo`;
    } else {
      let finalPrice = basePrice;
      if (includeSavings) finalPrice -= savingsAmount;
      return `$${finalPrice.toLocaleString()}`;
    }
  };

  const getCurrentImages = () => {
    const imgList = car.orderPage?.carImg[selectedColor];
    if (imgList && imgList.length > 0) {
      return imgList;
    }
    return [car.image.mainImg]; // fallback image
  };

  const getVersionPrice = () => {
    const rawPrice = getVersionData().price.replace(/[^\d]/g, "");
    let finalPrice = parseInt(rawPrice, 10);

    const colorObj = ballImg.find((c) => c.key === selectedColor);
    if (colorObj?.increase) {
      finalPrice += colorObj.increase;
    }

    if (includeSavings) finalPrice -= savingsAmount;

    return `$${finalPrice.toLocaleString()}`;
  };

  const versionData = getVersionData();
  const carImages = getCurrentImages();

  return (
    <div>
      <header className="container flex justify-between items-center h-[70px] shadow">
        <div className="w-40">
          <img className="w-full" src="/teslalogo.svg"  alt="" />
        </div>
        <div><Globe className="w-5 h-5 cursor-pointer" /></div>
      </header>
      <div className="flex flex-col lg:flex-row  gap-8">
        {/* LEFT SIDE - Carousel */}
        <div
          {...swipeHandlers}
          className="flex-1 relative flex items-center justify-center overflow-hidden"
        >
          <img
            src={carImages[selectedImageIndex]}
            alt="Car"
            className={`w-full h-screen object-contain transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Left Navigation */}
          {selectedImageIndex > 0 && (
            <button
              onClick={() => setSelectedImageIndex((prev) => prev - 1)}
              className="absolute left-2 md:left-6 text-black bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition"
            >
              ‹
            </button>
          )}

          {/* Right Navigation */}
          {selectedImageIndex < carImages.length - 1 && (
            <button
              onClick={() => setSelectedImageIndex((prev) => prev + 1)}
              className="absolute right-2 md:right-6 text-black bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition"
            >
              ›
            </button>
          )}
        </div>

        {/* RIGHT SIDE - Fixed Order Panel */}
        <div className="lg:w-[400px] flex flex-col p-4 lg:pr-12 lg:pt-12 gap-4 sticky text-center top-4">
          <h2 className="text-3xl font-semibold">{car.name}</h2>
          <p className="text-gray-600 flex justify-center items-center">
            <img className="w-12" src="/homeCard2.png" alt="" />
            Grok AI now available.{" "}
            <span className="border-b-1 border-gray-400">Learn more</span>
          </p>

          <div className="flex justify-center gap-10 items-center   mt-2  pb-2">
            <div className="flex flex-col items-center justify-center">
              <strong>{versionData.range}mi</strong>{" "}
              <span className="text-xs">Range (est.)</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <strong>{versionData.topSpeed || "149 mph"}</strong>{" "}
              <span className="text-xs">Top Speed</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <strong>{versionData.mph}sec</strong>{" "}
              <span className="text-xs">0-60 mph</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            {/* Tab buttons */}
            <div className="flex gap-2 border-b border-gray-300">
              {["cash", "lease", "finance"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-center font-semibold uppercase transition-all ${
                    activeTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Version Selector */}
            <div className="flex flex-col gap-2 mt-2">
              <p
                onClick={() => setSelectedVersion("standard")}
                className={`border p-3 rounded flex justify-between items-center ${
                  selectedVersion === "standard"
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <span>All-Wheel Drive</span>{" "}
                <span>{getDisplayPrice("standard")}</span>
              </p>
              <button
                onClick={() => setSelectedVersion("plaid")}
                className={`border p-3 rounded flex justify-between items-center ${
                  selectedVersion === "plaid"
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <span>Plaid</span> <span>{getDisplayPrice("plaid")}</span>
              </button>
            </div>

            {/* Tab content */}
            <div className="mt-1">
              {activeTab === "cash" && (
                <div>
                  <div className="my-3 font-semibold flex gap-3 items-center bg-[#f4f4f4] ">
                    <div className="w-[30%] h-[80px]">
                      <img
                        className="h-full w-full object-center rounded-l-[5px]"
                        src={car.image.banImg}
                        alt=""
                      />
                    </div>
                    <div>
                      <p> View & Compare Features</p>
                    </div>
                  </div>
                  <div className="text-start  mt-2">
                    <input
                      type="checkbox"
                      checked={includeSavings}
                      onChange={() => setIncludeSavings(!includeSavings)}
                    />
                    <label>
                      Include est. 5-year gas savings of $
                      {savingsAmount.toLocaleString()} /mo
                    </label>
                    <br />
                    <button className="border-b-1 mt-2 text-gray-700  hover:text-black hover:border-b-2 transition cursor-pointer">
                      Edit saving
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "lease" && (
                <>
                  <div className="my-3 font-semibold flex gap-3 items-center bg-[#f4f4f4] ">
                    <div className="w-[30%] h-[80px]">
                      <img
                        className="h-full w-full object-center rounded-l-[5px]"
                        src={car.image.banImg}
                        alt=""
                      />
                    </div>
                    <div>
                      <p> View & Compare Features</p>
                    </div>
                  </div>
                  <div className="text-start text-sm text-gray-600 mt-2 ">
                    $7,500 down, 36 mo, 10,000 miles
                    <button className="border-b-1  text-gray-700 px-2 hover:text-black hover:border-b-2 transition cursor-pointer">
                      {" "}
                      Edit Leasing
                    </button>
                    <button className="border-b-1 mt-2 text-gray-700  hover:text-black hover:border-b-2 transition cursor-pointer">
                      Get Prequalified
                    </button>
                    <div className="text-start text-[16px] mt-2">
                      <input
                        type="checkbox"
                        checked={includeSavings}
                        onChange={() => setIncludeSavings(!includeSavings)}
                      />
                      <label>
                        Include est. 5-year gas savings of $
                        {(
                          Math.round(savingsAmount / 36 / 100) * 100
                        ).toLocaleString()}{" "}
                        /mo
                      </label>{" "}
                      <br />
                      <button className="border-b-1 mt-2 text-gray-700  hover:text-black hover:border-b-2 transition cursor-pointer">
                        Edit saving
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "finance" && (
                <>
                  <div className=" my-3 font-semibold flex gap-3 items-center bg-[#f4f4f4] ">
                    <div className="w-[30%] h-[80px]">
                      <img
                        className="h-full w-full object-center rounded-l-[5px]"
                        src={car.image.banImg}
                        alt=""
                      />
                    </div>
                    <div>
                      <p> View & Compare Features</p>
                    </div>
                  </div>
                  <div className="text-start text-sm text-gray-600 mt-2 ">
                    6.52% APR, $3,999 down, 84 mo
                    <button className="border-b-1  text-gray-700 px-2 hover:text-black hover:border-b-2 transition cursor-pointer">
                      {" "}
                      Edit Leasing
                    </button>
                    <button className="border-b-1 mt-2 text-gray-700  hover:text-black hover:border-b-2 transition cursor-pointer">
                      Get Prequalified
                    </button>
                  </div>
                  <div className="text-start  mt-2">
                    <input
                      type="checkbox"
                      checked={includeSavings}
                      onChange={() => setIncludeSavings(!includeSavings)}
                    />
                    <label>
                      Include est. 5-year gas savings of $
                      {(
                        Math.round(savingsAmount / 36 / 100) * 100
                      ).toLocaleString()}{" "}
                      /mo
                    </label>
                    <br />
                    <button className="border-b-1 mt-2 text-gray-700  hover:text-black hover:border-b-2 transition cursor-pointer">
                      Edit saving
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Savings Checkbox */}

          {/* Colors */}
          <div className="mt-6">
            <p className="text-sm mb-1 text-gray-500">
              {ballImg
                .find((c) => c.key === selectedColor)
                ?.increase.toLocaleString()}{" "}
              $
            </p>
            <h4 className="text-lg font-medium capitalize mb-3">
              {ballImg.find((c) => c.key === selectedColor)?.title}
            </h4>
            <div className="flex gap-3 justify-center items-center flex-wrap">
              {ballImg.map((color) => (
                <div
                  key={color.key}
                  className={`flex flex-col  items-center cursor-pointer transition-transform ${
                    selectedColor === color.key ? "scale-110" : ""
                  }`}
                  onClick={() => setSelectedColor(color.key)}
                >
                  <img
                    src={color.image}
                    alt={color.title}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.key
                        ? "border-gray-400 p-1 bg-gray-200"
                        : "border-gray-200"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Total & Button */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              {activeTab === "cash" && (
                <div>
                  <h3 className="text-xl font-semibold">{getVersionPrice()}</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Order Now
                  </button>
                </div>
              )}
              {activeTab === "lease" && "finance" && (
                <div>
                  <h3 className="text-xl font-semibold">
                    {getVersionPrice() / 36}
                  </h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Order Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
