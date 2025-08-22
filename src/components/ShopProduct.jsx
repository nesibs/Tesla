import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import { getShopData } from "../service/CarsServices";

const ShopProduct = () => {
  const { id, category } = useParams();
  const [shop, setShop] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    category || "charging"
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const shopData = await getShopData();
      setShop(shopData);
      setLoading(false);
    };
    fetchData();
  }, [id, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Yüklənir...</p>
      </div>
    );
  }
  
  console.log(setSelectedCategory);
  

  if (!shop || !shop[0] || !shop[0].header) {
    return <div>Məlumat tapılmadı</div>;
  }

  const selectedData = shop.find((obj) => obj[selectedCategory]);

  const renderItems = (items) => (
    <div className="w-full flex justify-center items-center flex-wrap md:gap-5 lg:gap-10 mt-5">
      {items
        .filter((item) =>
          searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
        )
        .map((item) => (
          <div
            key={item.id}
            className="flex justify-center items-center flex-col gap-3 w-[90%] md:w-[45%] lg:w-[30%] h-[400px] md:h-[450px] lg:h-[550px] overflow-hidden transition-transform transform hover:scale-101"
          >
            <div className="relative w-full h-full">
              <Link to={item.id ? `/productDetails/${item.id}` : '#'}>
                <img
                 src={item.img1 || item.img}  
                  alt={item.name}
                  className="absolute w-full h-full object-cover transition-opacity duration-300"
                />
                {item.img1 && item.img2 && (
                  <img
                    src={item.img2}
                    alt={item.name + " hover"}
                    className="absolute w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </Link>
            </div>
            <div className="px-4 pb-4 text-start w-full">
              <h3 className="text-lg font-semibold text-black hover:text-red-700 mb-2 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-md font-bold text-black">
                ${item.price}  
              </p>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div>
      <header className="h-[70px]">
        <ShopHeader id={id} onSearch={setSearchTerm} />
      </header>
      <section>
        {selectedData && (
          <>
            {selectedCategory === "charging" || selectedCategory === "lifestyle"
              ? Object.entries(selectedData[selectedCategory]).map(([subCategory, items]) => (
                  <div className="container mb-10" key={subCategory}>
                    <h2 className="py-3 text-2xl font-semibold capitalize text-center md:text-start">{subCategory}</h2>
                    {renderItems(items)}
                  </div>
                ))
              : selectedCategory === "apparel"
              ? Object.entries(selectedData[selectedCategory]).map(([group, groupData]) => (
                  <div key={group}>
                    <h2 className="font-semibold text-3xl px-10 py-8 text-center md:text-start">{group}</h2>
                    {Array.isArray(groupData)
                      ? groupData.map((categoryObj) =>
                          Object.entries(categoryObj).map(([catName, items]) => (
                            <div key={catName}>
                              <h3 className="font-semibold text-2xl px-10 pb-3 text-center md:text-start">{catName}</h3>
                              {renderItems(items)}
                            </div>
                          ))
                        )
                      : Object.entries(groupData).map(([catName, items]) => (
                          <div key={catName}>
                            <h3>{catName}</h3>
                            {renderItems(items)}
                          </div>
                        ))}
                  </div>
                ))
              : selectedCategory === "accessories"
              ? selectedData[selectedCategory].map((model) => (
                  <div key={model.id} className="container">
                    <h2 className="py-3 text-3xl font-semibold text-center md:text-start">{model.name}</h2>
                    {Object.entries(model.categories).map(([catName, items]) => (
                      <div key={catName}>
                        <h2 className="py-3 text-2xl font-semibold capitalize text-center md:text-start">{catName.replace(/_/g, " ")}</h2>
                        {renderItems(items)}
                      </div>
                    ))}
                  </div>
                ))
              : <p>Məlumat yoxdur</p>}
          </>
        )}
      </section>
      <footer className="w-full py-12">
        <div className="flex justify-center items-center flex-col md:flex-row gap-5 text-[13px] font-semibold">
          <Link>Tesla © 2025</Link>
          <Link>Privacy & Legal</Link>
          <Link>Locations</Link>
        </div>
      </footer>
    </div>
  );
};

export default ShopProduct;
