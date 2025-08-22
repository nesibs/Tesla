import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCarsById } from "../service/CarsServices";
import Header from "./Header";
import DetailsCard from "./DetailsCard";
import DetailsAbout from "./DetailsAbout";
import DetTaBSection from "./DetTabSection";
import DetailsSlider from "./DetailsSlider";

const Details = () => {
  const { id } = useParams();
  const [cars, setCars] = useState(null);

  useEffect(() => {
    getCarsById(id).then((item) => {
      console.log("Gələn car tam obyekt:", item);
      setCars(item);
    });
  }, [id]);

  if (!cars) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div
        className=" w-full h-[90vh] bg-cover bg-center flex flex-col  lg:py-12 md:py-10 sm:py-7 items-center text-white  "
        style={{ backgroundImage: `url(${cars.image.detImg})` }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold mt-12 sm:mt-8 lg:mt-5">
          {cars.name}
        </h1>
        <p className="text-[15px] md:text-1xl lg:text-2xl font-semibold">
          From {cars.price}
        </p>
        <p>
          Grok AI now available. <span>Learn More</span>
        </p>
        <div className="flex justify-center items-center font-semibold gap-3">
          <Link to={`/order/${cars.id}`} className="bg-blue-600 text-[13px] w-[120px] sm:w-[150px]  lg:w-[200px] py-3 rounded text-white font-bold hover:bg-blue-700 transition text-center">
            Order Now
          </Link>
          <Link className="bg-[#fff] text-[13px] text-[#393c41]   w-[120px] sm:w-[150px]  lg:w-[200px] py-3  hover:bg-[#e9e9e9] transition rounded text-center">
            Demo Drive
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center py-32 font-semibold text-center">
        <div className="flex-1 border-b md:border-b-0 md:border-r px-10 py-6">
          <p className="text-2xl md:text-4xl lg:text-6xl">
            {cars.range}
            <span className="text-[20px] md:text-2xl lg:text-3xl">mi</span>
          </p>
          <p className="text-[15px] md:text-xl lg:text-2xl text-[#393c41]">
            Range (EPA est.)
          </p>
        </div>

        <div className="flex-1 border-b md:border-b-0 md:border-r px-10 py-6">
          <p className="text-2xl md:text-4xl lg:text-6xl">
            {cars.mph}
            <span className="text-[20px] md:text-2xl lg:text-3xl">s</span>
          </p>
          <p className="text-[15px] md:text-xl lg:text-2xl text-[#393c41]">
            0-60 mph<sup>2</sup>
          </p>
        </div>

        <div className="flex-1 px-10 py-6">
          <p className="text-2xl md:text-4xl lg:text-6xl">
            {cars.peakPower}
            <span className="text-[20px] md:text-2xl lg:text-3xl">hp</span>
          </p>
          <p className="text-[15px] md:text-xl lg:text-2xl text-[#393c41]">
            Peak Power
          </p>
        </div>
      </div>
      <DetailsCard car={cars} />
      <DetailsSlider car={cars} />
      <DetailsAbout car={cars} />
      <DetTaBSection car={cars} />
    </>
  );
};

export default Details;
