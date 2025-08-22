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
        className="relative w-full h-[90vh] bg-cover bg-center flex flex-col  lg:py-12 md:py-10 sm:py-7 items-center text-white  "
        style={{ backgroundImage: `url(${cars.image.detImg})` }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold">
          {cars.name}
        </h1>
        <p className="text-[15px] md:text-1xl lg:text-2xl font-semibold">
          From {cars.price}
        </p>
        <p>
          Grok AI now available. <span>Learn More</span>
        </p>
        <div className="flex justify-center items-center font-semibold gap-3">
          <Link className="bg-[#3e6ae1] text-[13px]  px-16 py-2  hover:bg-[#3457b1] transition rounded-[5px]">
            Order Now
          </Link>
          <Link className="bg-[#fff] text-[13px] text-[#393c41]  px-16 py-2  hover:bg-[#e9e9e9] transition rounded-[5px]">
            Demo Drive
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 py-32 font-semibold flex-col md:flex-row">
        <div className="not-md:border-b-1  md:border-r-1 px-10">
          <p className="text-2xl md:text-4xl lg:text-6xl  ">
            {" "}
            {cars.range}
            <span className="text-[20px] md:text-2xl lg:text-3xl">mi</span>
          </p>
          <p className="text-[15px] md:text-1xl lg:text-2xl text-[#393c41]">
            Range (EPA est.)
          </p>
        </div>
        <div className="not-md:border-b-1 md:border-r-1 px-10">
          <p className="text-2xl md:text-4xl lg:text-6xl  ">
            {cars.mph}
            <span className="text-[20px] md:text-2xl lg:text-3xl">s</span>
          </p>
          <p className="text-[15px] md:text-1xl lg:text-2xl text-[#393c41]">
            {" "}
            0-60 mph<sup>2</sup>
          </p>
        </div>
        <div className=" ">
          <p className="text-2xl md:text-4xl lg:text-6xl  ">
            {cars.peakPower}
            <span className="text-[20px] md:text-2xl lg:text-3xl">hp</span>
          </p>
          <p className="text-[15px] md:text-1xl lg:text-2xl  text-[#393c41]">
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
