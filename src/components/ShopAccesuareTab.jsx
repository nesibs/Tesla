import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ShopAccesuareTab = () => {
  const { id } = useParams();
  const [acces, setAcces] = useState(null);
  const [apparel, setApparel] = useState(null);
  const [lifestyle, setLifestyle] = useState(null);

  useEffect(() => {
    fetch("/data/teslaApi.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.accessories && data.apparel) {
          setAcces(data.accessories);
          setApparel(data.apparel);
          setLifestyle(data.lifestyle);

          console.log(data.accessories);
        } else {
          console.error("API data formatı düzgün deyil və ya id tapılmadı");
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!acces) return <div>Loading...</div>;

  return (
    <>
      <div>
        <div>
          {/* bestSeller məhsullarını göstərəcəyik */}
          {acces.map((product) => (
            <div className="w-full h-[90vh] relative" key={product.id}>
              <img
                className="w-full h-full object-cover"
                src={product.best_seller.img}
                alt={product.name}
              />
              <div className="w-full flex justify-center flex-col z-50 absolute bottom-10 left-0">
                <h2 className="text-center text-xl md:text-3xl lg:text-5xl font-semibold text-white px-4 py-4 rounded-md">
                  {product.name} Accesuare
                </h2>
                <div className="mx-auto">
                  <button className="bg-white px-20 py-2 text-black text-[13px] font-semibold rounded-[5px]">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 flex-col md:flex-row " >
          {apparel.map((product) => (
            <div className="w-full h-[90vh] ">
              <div className="w-full h-[90vh] relative">
                <img className="w-full h-full object-cover " src={product.img} alt="" />
                <div className="w-full flex justify-center flex-col z-50 absolute bottom-10 left-0">
                  <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-black px-4 py-4 rounded-md">
                    {product.name}  
                  </h2>
                  <div className="mx-auto">
                    <button className="bg-white px-20 py-2 border-2 text-black text-[13px] font-semibold rounded-[3px]   hover:bg-black hover:text-white transition hover:rounded-[3px]   ">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {lifestyle.map((product) => (
             <div className="w-full h-[90vh] relative" key={product.id}>
              <img
                className="w-full h-full object-cover"
                src={product.img}
                alt={product.name}
              />
              <div className="w-full flex justify-center flex-col z-50 absolute bottom-20 left-0">
                <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-black px-4 py-4 rounded-md">
                  {product.name}  
                </h2>
                <div className="mx-auto">
                  <button className="bg-white px-28 py-2 text-black text-[13px] font-semibold rounded-[5px]">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="w-full py-12">
          <div className="flex justify-center items-center flex-col md:flex-row gap-5 text-[13px] font-semibold">
            <Link>Tesla © 2025</Link>
            <Link>Privacy & Legal</Link>
            <Link>Locations</Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ShopAccesuareTab;
