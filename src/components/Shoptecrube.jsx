import React, { useEffect, useState } from "react"; 

const Shoptecrube = () => {
 const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/teslaApi.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setShopData(data.shop);
        setLoading(false);
        console.log(shopData);
        
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!shopData) return <p>Failed to load shop data.</p>;

  return (
    <div className="p-4">
      {shopData.map((section) => (
        <div key={section.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{section.name}</h2>

          {section.cars?.map((car) => (
            <div key={car.id} className="mb-6 ml-4">
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>

              {car.categories.map((cat) => (
                <div key={cat.id} className="mb-4 ml-6">
                  <h4 className="text-lg font-medium mb-1">{cat.name}</h4>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cat.products.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded p-3 flex flex-col items-center"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded"
                        />
                        <p className="font-semibold mt-2">{product.name}</p>
                        <p className="text-gray-600">{product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shoptecrube;
