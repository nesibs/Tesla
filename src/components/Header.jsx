import React, { useState, useEffect } from "react";
import { Menu, X, Globe, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Shop from "./Shop";
import ShopProduct from "./ShopProduct";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileVehicleOpen, setMobileVehicleOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [charging, setCharging] = useState([]);
  const [shop, setShop] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();

  const handleAccountClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsSignedIn(!!user);
    if (isSignedIn) {
      navigate("/profilePage");
    } else {
      navigate("/signIn");
    }
  };

  useEffect(() => {
    fetch("/data/teslaApi.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.cars && data.energy && data.shop) {
          setVehicles(data.cars);
          setEnergy(data.energy);
          setCharging(data.charging);
          setShop(data.shop);
        } else {
          console.error("API data formatı düzgün deyil");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleMouseEnter = (menuName) => setActiveMenu(menuName);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <header className=" top-0 h-[70px] flex  items-center  w-full bg-white shadow z-50 relative">
      <div className=" flex justify-between items-center w-screen   px-4 py-3">
        <div className=" w-32 font-bold cursor-pointer">
          <Link to="../">
            {" "}
            <img src="/teslalogo.svg" alt="" />
          </Link>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold ">
          {/* Vehicles */}
          <div
            onMouseEnter={() => handleMouseEnter("vehicles")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-[#5c5e62] ">Vehicles</button>
            {activeMenu === "vehicles" && (
              <div className="absolute  left-0 top-11 w-full   bg-white shadow-lg p-6 flex justify-center items-center gap-12 z-40">
                <div className="grid grid-cols-3 lg:grid-cols-4  gap-6 ">
                  {vehicles.map((car) => (
                    <div key={car.id} className="text-center">
                      <img
                        src={car.image.menuImg}
                        alt={car.name}
                        className="max-w-[220px] h-auto object-contain mx-auto"
                      />
                      <p className="mt-2 font-semibold">{car.name}</p>

                      {car.name === "Inventory" ? (
                        // Inventory üçün tək link
                        <div className="flex justify-center gap-2 text-xs text-blue-600 mt-1">
                          <Link to="/inventory">View Inventory</Link>
                        </div>
                      ) : (
                        // Qalan maşınlar üçün Learn + Order
                        <div className="flex justify-center gap-2 text-xs text-blue-600 mt-1">
                          <Link
                            className="border-b text-[#5c5e62] border-[#5c5e62]"
                            to={`/details/${car.id}`}
                          >
                            Learn
                          </Link>
                          <Link
                            className="border-b text-[#5c5e62] border-[#5c5e62]"
                            to={`/order/${car.id}`}
                          >
                            Order
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <ul className="flex flex-col gap-2 text-sm text-gray-700">
                  <li>Current Offers</li>
                  <li>Demo Drive</li>
                  <li>Trade-in</li>
                  <li>Help Me Choose</li>
                  <li>Compare</li>
                  <li>Workshops</li>
                  <li>Help Me Charge</li>
                  <li>Fleet</li>
                  <li>Semi</li>
                  <li>Roadster</li>
                  <li>Federal Tax Credit</li>
                </ul>
              </div>
            )}
          </div>

          {/* Energy */}
          <div
            onMouseEnter={() => handleMouseEnter("energy")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-[#5c5e62]">Energy</button>
            {activeMenu === "energy" && (
              <div className="absolute  left-0 top-11 w-full   bg-white shadow-lg p-6 flex justify-center items-center gap-12 z-40">
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
                  {energy.map((e) => (
                    <div key={e.id} className="text-center">
                      <img
                        src={e.image}
                        alt={e.title}
                        className="max-w-[220px] h-auto object-contain mx-auto"
                      />
                      <p className="mt-2 font-semibold">{e.title}</p>
                      <div className="flex justify-center gap-2 text-xs text-blue-600 mt-1">
                        <Link
                          className="border-b text-[#5c5e62] border-[#5c5e62]"
                          to={`/details/${e.id}`}
                        >
                          Learn
                        </Link>
                        <Link
                          className="border-b text-[#5c5e62] border-[#5c5e62]"
                          to={`/order/${e.id}`}
                        >
                          Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="flex flex-col gap-2 text-sm text-gray-700">
                  <li>Current Offers</li>
                  <li>Demo Drive</li>
                  <li>Trade-in</li>
                  <li>Help Me Choose</li>
                  <li>Compare</li>
                  <li>Workshops</li>
                  <li>Help Me Charge</li>
                </ul>
              </div>
            )}
          </div>

          {/* Digər düymələr */}
          <div
            onMouseEnter={() => handleMouseEnter("charging")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-[#5c5e62]">Charging</button>
            {activeMenu === "charging" && (
              <div className="absolute  left-0 top-11 w-full   bg-white shadow-lg p-6 flex justify-center items-center gap-12 z-40">
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
                  {charging.map((e) => (
                    <div key={e.id} className="text-center">
                      <img
                        src={e.image}
                        alt={e.title}
                        className="max-w-[220px] h-auto object-contain mx-auto"
                      />
                      <p className="mt-2 font-semibold">{e.title}</p>
                      <div className="flex justify-center gap-2 text-xs text-blue-600 mt-1">
                        <Link
                          className="border-b text-[#5c5e62] border-[#5c5e62]"
                          to={`/details/${e.id}`}
                        >
                          Learn
                        </Link>
                        <Link
                          className="border-b text-[#5c5e62] border-[#5c5e62]"
                          to={`/order/${e.id}`}
                        >
                          Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="flex flex-col gap-2 text-sm text-gray-700">
                  <li>Current Offers</li>
                  <li>Demo Drive</li>
                  <li>Trade-in</li>
                  <li>Help Me Choose</li>
                  <li>Compare</li>
                  <li>Workshops</li>
                  <li>Help Me Charge</li>
                </ul>
              </div>
            )}
          </div>
          <button className="hover:text-[#5c5e62]">Discover</button>
          <div
            onMouseEnter={() => handleMouseEnter("shop")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-[#5c5e62]">
              <Link to="/shop">Shop</Link>
            </button>
            {activeMenu === "shop" && (
              <div className="absolute  left-0 top-11 w-full   bg-white shadow-lg p-6 flex justify-center items-center gap-12 z-40">
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
                  {shop[0].header.map((e, i) => (
                    <div key={i} className="text-center">
                      <Link to={`/shop/${e.key}`}>
                        {" "}
                        <img
                          src={e.image}
                          alt={e.title}
                          className="max-w-[220px] h-auto object-contain mx-auto"
                        />
                        <p className="mt-2 font-semibold">{e.title}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex gap-4">
          <Globe className="w-5 h-5 cursor-pointer" />
          <button onClick={handleAccountClick}>
            <User className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white fixed inset-0 z-40 p-6 overflow-y-auto">
          <button className="self-end mb-4" onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>

          {/* Mobile Items */}
          <div className="flex flex-col gap-6 text-lg">
            <button onClick={() => setMobileVehicleOpen(!mobileVehicleOpen)}>
              Vehicles
            </button>

            {mobileVehicleOpen && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {vehicles.map((car) => (
                    <div key={car.id} className="text-center">
                      <img
                        src={car.image.menuImg}
                        alt={car.name}
                        className="w-full h-auto object-contain mx-auto"
                      />
                      <p className="mt-2 font-medium text-sm">{car.name}</p>
                      <div className="flex justify-center gap-2 text-xs text-blue-600 mt-1">
                        <Link
                          className="border-b text-[#5c5e62] border-[#5c5e62]"
                          to={`/details/${car.id}`}
                        >
                          Learn
                        </Link>
                        <Link
                          className="border-b text-[#5c5e62] border-[#5c5e62]"
                          to={`/order/${car.id}`}
                        >
                          Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button>Energy</button>
            <button>Charging</button>
            <button>Discover</button>

            <button onClick={() => setMobileShopOpen(!mobileShopOpen)}>
              Shop
            </button>

            {mobileShopOpen && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {shop[0].header.map((e, i) => (
                    <div key={i} className="text-center">
                      <Link to={`/shop/${e.key}`}>
                        {" "}
                        <img
                          src={e.image}
                          alt={e.title}
                          className="w-full h-auto object-contain mx-auto"
                        />
                        <p className="mt-2 font-semibold text-sm">{e.title}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button>Support</button>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>United States</span>
              </div>
              <button
                onClick={handleAccountClick}
                className="flex items-center gap-2 text-left"
              >
                <User className="w-5 h-5 cursor-pointer" />
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
