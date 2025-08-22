import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarsById } from "../service/CarsServices";
import DetailsAboutCard from "./DetailsAboutCard";

const DetailsAbout = () => {
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
      <div className="mt-5 md:mt-12 lg:mt-28">
        <div className="py-24 flex justify-center items-center">
          <DetailsAboutCard
            key={cars.id}
            image={cars.detCardTravel.image}
            title={cars.detCardTravel.title}
            subtitle={cars.detCardTravel.subtitle}
            color1 = {cars.detCardTravel.color1}
            color2 = {cars.detCardTravel.color2}
          />
        </div>
        <div className="pb-12 md:py-28 bg-[#222]   flex justify-center items-center">
          <DetailsAboutCard
            key={cars.id}
            image={cars.detCardTriMotor.image}
            title={cars.detCardTriMotor.title}
            subtitle={cars.detCardTriMotor.subtitle}
          />
        </div>
          <div className="pb-12 md:py-28 bg-[#222]   flex justify-center items-center">
          <DetailsAboutCard
            key={cars.id}
            image={cars.detCardPerformance.image}
            title={cars.detCardPerformance.title}
            subtitle={cars.detCardPerformance.subtitle}
          />
        </div>
         
      </div>
    </>
  );
};

export default DetailsAbout;
