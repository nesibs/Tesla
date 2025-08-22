import React from "react";

const DetailsAboutCard = ({ title, subtitle, image, color1, color2 }) => {
  return (
    <>
      <div className="md:container ">
        <div className="w-full h-[450px] md:h-[90vh] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} >
          
        </div>
        <div className=" px-5 md:px-20 lg:px-28 py-8">
          <h2 className={`text-1xl md:text-2xl lg:text-4xl font-semibold text-white py-3`} style={{color: color1}}>
            {title}
          </h2>
          <p className={`text-[15px]  md:text-xl   text-[#d0d1d2]`} style = {{color: color2}}>
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailsAboutCard;
