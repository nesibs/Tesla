import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarsById } from "../service/CarsServices";

const DetTabSection = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [activeTab, setActiveTab] = useState("main");

  useEffect(() => {
    getCarsById(id).then((item) => {
      console.log("Gələn car tam obyekt:", item);
      setCar(item);
    });
  }, [id]);

  if (!car)
    return <div className="text-center py-10 text-white">Loading...</div>;
  return (
    <div>
      <div className="bg-[#222] text-white py-10 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Active Car Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <img
              src={activeTab === "main" ? car.image.tabImg : car.subcar.image}
              alt={car.name}
              className="w-full h-auto object-contain sm:object-cover"
            />
          </div>

          {/* Separator */}
          <div className="w-full h-[2px] bg-white rounded-full" />

          {/* Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Active Car Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {" "}
                <button
                  onClick={() => setActiveTab("main")}
                  className={`text-xl font-semibold transition-all duration-300 ${
                    activeTab === "main"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {car.name}
                </button>
              </h2>
              <div className="flex flex-wrap gap-6 text-base sm:text-lg font-semibold mb-4">
                <div>
                  <p>
                    {car.mph}
                    <span className="text-sm font-normal">s</span>
                  </p>
                  <span className="text-xs text-gray-400">0-60 mph</span>
                </div>
                <div>
                  <p>
                    {car.range}
                    <span className="text-sm font-normal"> mi</span>
                  </p>
                  <span className="text-xs text-gray-400">
                    Range (EPA est.)
                  </span>
                </div>
                <div>
                  <p>
                    {car.peakPower}
                    <span className="text-sm font-normal"> hp</span>
                  </p>
                  <span className="text-xs text-gray-400">Peak Power</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed tracking-wide">
                {car.description}
              </p>
            </div>

            {/* Passive Car Info */}
            <div className="opacity-50">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                <button
                  onClick={() => setActiveTab("plaid")}
                  className={`text-xl font-semibold transition-all duration-300 ${
                    activeTab === "plaid"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {car.subcar.name}
                </button>
              </h2>
              <div className="flex flex-wrap gap-6 text-base sm:text-lg font-semibold mb-4">
                <div>
                  <p>
                    {car.subcar.mph}
                    <span className="text-sm font-normal">s</span>
                  </p>
                  <span className="text-xs ">0-60 mph</span>
                </div>
                <div>
                  <p>
                    {car.subcar.range}
                    <span className="text-sm font-normal"> mi</span>
                  </p>
                  <span className="text-xs ">Range (EPA est.)</span>
                </div>
                <div>
                  <p>
                    {car.subcar.peakPower}
                    <span className="text-sm font-normal"> hp</span>
                  </p>
                  <span className="text-xs ">Peak Power</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed tracking-wide">
                {car.subcar.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20">

        <section className="bg-white py-10 px-4 container">
          <div className="mx-auto">
            <div className=" ">
              <img
                src={car.detSafety.image}
                alt="Tesla safety frame"
                className="mx-auto mb-8 rounded-[8px] min-w-[220px] min-h-[250px]"
              />
            </div>
            <h2 className=" md:text-2xl lg:text-4xl font-semibold mb-4 px-5 md:px-20 lg:px-28">
              {car.detSafety.title}
            </h2>
            <p className="text-gray-600 mb-8  px-5 md:px-20 lg:px-28">
              {car.detSafety.description}
            </p>
            <div className="flex flex-col lg:flex-row gap-4 px-5 md:px-20 lg:px-28 md:max-w-[80%]">
              {car.detSafety?.features?.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center md:items-start px-5 ${
                    index !== car.detSafety.features.length - 1
                      ? "border-b pb-5 md:border-b-0 md:border-r border-gray-300"
                      : ""
                  }`}
                >
                  <div className="text-3xl font-bold text-black mb-2 text-start">
                    {feature.value}
                  </div>
                  <p className="font-semibold text-gray-600">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetTabSection;
