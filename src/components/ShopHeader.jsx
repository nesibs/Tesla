import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getCart } from "../service/CarsServices";

const ShopHeader = ({ id }) => {
  const [shop, setShop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // İlk dəfə səbət sayını oxu
  useEffect(() => {
    setCartCount(getCart().length);
  }, []);

  useEffect(() => {
    const getShopDatas = async () => {
      await fetch("/data/teslaApi.json")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.shop) {
            setShop(data.shop);
          } else {
            console.error("API data formatı düzgün deyil");
            setShop([]);
          }
        })
        .catch((err) => {
          console.error("Data yüklənmədi:", err);
          setShop([]);
        })
        .finally(() => setLoading(false));
    };
    getShopDatas();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Yüklənir...</p>
      </div>
    );
  }

  if (!shop || !shop[0] || !shop[0].header) {
    return <div>Məlumat tapılmadı</div>;
  }

  const header = shop[0].header;

  return (
    <header className="fixed top-0 w-full bg-white shadow text-black transition h-[70px] flex justify-center items-center z-50">
      <div className="container flex justify-between items-center px-4">
        {/* Logo */}
        <div className="font-bold cursor-pointer flex justify-center items-center gap-2">
          <img className="w-28" src="/teslalogo.svg" alt="Tesla Logo" />
          <p className="hidden sm:block">| Shop</p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center gap-5 text-[14px] font-semibold cursor-pointer">
          {header.map((item, idx) => (
            <Link
              key={idx}
              to={`/shop/${item.key}`}
              className="hover:text-red-600 transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex justify-center items-center gap-5 cursor-pointer relative">
          <FaSearch
            className="hidden sm:block cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          {searchOpen && (
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearch(e.target.value); // parent-ə göndəririk
              }}
              placeholder="Search products..."
              className="absolute top-10 right-10 border rounded p-1 text-sm w-40"
            />
          )}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop menu text */}
          <p className="hidden md:block text-[13px] font-semibold">Menu</p>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-start p-5 md:hidden">
          {header.map((item, idx) => (
            <Link
              key={idx}
              to={`/shop/${item.key}`}
              className="w-full py-2 text-gray-700 font-semibold hover:text-red-600  "
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default ShopHeader;
