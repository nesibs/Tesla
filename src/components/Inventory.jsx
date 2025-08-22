import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

export default function CarFilter() {
  const [cars, setCars] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/data/teslaApi.json");
        const data = await res.json();
        setCars(data.inventory);
        console.log(data.inventory);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const price = Number(car.price.replace(/,/g, ""));
    return (
      (selectedModel ? car.model === selectedModel : true) &&
      (selectedType ? car.type === selectedType : true) &&
      (selectedPackage ? car.package === selectedPackage : true) &&
      price >= minPrice
    );
  });

  const Filters = () => (
    <div className="w-[300px]">
      {/* Model filter */}
      <div className="w-full">
        <h3 className="font-bold mb-2">Model</h3>
        {["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"].map(
          (model) => (
            <label key={model} className="flex items-center space-x-2">
              <input
                type="radio"
                name="model"
                value={model}
                checked={selectedModel === model}
                onChange={() => setSelectedModel(model)}
                className="accent-[#5c5e62]"
              />
              <span>{model}</span>
            </label>
          )
        )}
        <button
          onClick={() => setSelectedModel("")}
          className="text-[#5c5e62] text-sm mt-2"
        >
          Reset
        </button>
      </div>

      {/* Type filter */}
      <div>
        <h3 className="font-bold mb-2">Type</h3>
        {["Simple", "Plaid"].map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value={type}
              checked={selectedType === type}
              onChange={() => setSelectedType(type)}
              className="accent-[#5c5e62]"
            />
            <span>{type}</span>
          </label>
        ))}
        <button
          onClick={() => setSelectedType("")}
          className="text-[#5c5e62] text-sm mt-2"
        >
          Reset
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-bold mb-2">Payment Option</h3>
        <label className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={paymentType === "cash"}
            onChange={() => setPaymentType("cash")}
            className="accent-[#5c5e62]"
          />
          Cash
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={paymentType === "lease"}
            onChange={() => setPaymentType("lease")}
            className="accent-[#5c5e62]"
          />
          Lease
        </label>
      </div>

      {/* Price filter */}
      <div>
        <h3 className="font-bold mb-2">Min Price</h3>
        <input
          type="range"
          min="71000"
          max="121000"
          step="3000"
          value={minPrice}
          onInput={(e) => setMinPrice(Number(e.target.value))}
          className=" accent-[#5c5e62]"
        />
        <p className="text-sm mt-1">{minPrice.toLocaleString()} $</p>
      </div>

      {/* Package filter */}
      <div>
        <h3 className="font-bold mb-2">Options</h3>
        {[
          "Standard Interior",
          "Performance Package",
          "Off-Road Package",
          "Luxury Interior",
        ].map((options) => (
          <label key={options} className="flex items-center space-x-2">
            <input
              type="radio"
              name="package"
              value={options}
              checked={selectedPackage === options}
              onChange={() => setSelectedPackage(options)}
              className="accent-[#5c5e62]"
            />
            <span>{options}</span>
          </label>
        ))}
        <button
          onClick={() => setSelectedPackage("")}
          className="text-[#5c5e62] text-sm mt-2"
        >
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <div className="">
      <Header />
      <h1 className=" text-[30px] md:text-[45px] py-4 px-8 font-semibold mb-5">
        Inventory
      </h1>
      <div className=" flex justify-center  w-full p-1 md:p-6  gap-2">
        {/* Filters (desktop) */}
        <div className="hidden md:block lg:col-span-3  md:w-[25%] p-4 rounded-xl shadow">
          <Filters />
        </div>

        {/* Cars list */}
        <div className=" w-full md:w-[75%] col-span-1 lg:col-span-7">
          {/* Mobile filter button */}
          <div
            onClick={() => setShowFilters(true)}
            className=" flex justify-between items-center rounded-[1px] shadow md:hidden mb-4"
          >
            <button className="px-4 py-2  text-black  ">Filters</button>
            <p>
              <FaAngleDown />
            </p>
          </div>

          <div className=" flex flex-wrap justify-center items-center gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className=" w-full sm:w-[45%] md:w-[40%] lg:w-[32%] border-[0.5px] border-[#d6d9e0] rounded-[5px] shadow p-4 hover:shadow-lg transition"
                >
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="font-bold mt-2">{car.title}</h4>
                  <p className="mt-2 font-semibold">
                    {paymentType === "cash"
                      ? `${car.price.toLocaleString()} $`
                      : `Est. $ ${(parseInt(car.price.replace(/,/g, "")) / 36)
                          .toFixed(0)
                          .toLocaleString()} / mo lease - $ ${car.price}`}
                  </p>
                  <p className="text-[#5c5e62] text-[14px]"> {car.desc} </p>
                  <p className="text-[#5c5e62] text-[14px]"> {car.range} </p>
                </div>
              ))
            ) : (
              <p className="col-span-2 text-center text-gray-500">
                No cars found
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter modal */}
      {showFilters && (
        <div className=" md:hidden fixed inset-0  bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white relative w-full sm:w-[80%] rounded-t-2xl p-6 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold  ">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-red-500 font-semibold"
              >
                Close
              </button>
            </div>
            <Filters />
            <button
              onClick={() => setShowFilters(false)}
              className="absolute fixed z-40 right-2 bottom-5 p-2 font-semibold text-[14px] rounded-[3px] bg-blue-600 text-white   w-[200px] mx-auto"
            >
              Show Result
            </button>
          </div>
        </div>
      )}

      <footer className="w-full py-12">
        <div className="flex justify-center items-center flex-col md:flex-row gap-5 text-[13px] font-semibold">
          <Link>Tesla © 2025</Link>
          <Link>Privacy & Legal</Link>
          <Link>Locations</Link>
        </div>
      </footer>
    </div>
  );
}
