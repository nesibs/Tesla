// pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getShopData } from "../service/CarsServices";
import ShopHeader from "./ShopHeader";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      const shopData = await getShopData();

      let allProducts = [];
      shopData.forEach((categoryObj) => {
        Object.values(categoryObj).forEach((categoryValue) => {
          if (Array.isArray(categoryValue)) {
            categoryValue.forEach((model) => {
              if (model.categories) {
                Object.values(model.categories).forEach((items) => {
                  allProducts = [...allProducts, ...items];
                });
              } else {
                allProducts = [...allProducts, ...categoryValue];
              }
            });
          } else if (typeof categoryValue === "object") {
            Object.values(categoryValue).forEach((sub) => {
              if (Array.isArray(sub)) {
                allProducts = [...allProducts, ...sub];
              } else if (typeof sub === "object") {
                Object.values(sub).forEach((items) => {
                  if (Array.isArray(items)) {
                    allProducts = [...allProducts, ...items];
                  }
                });
              }
            });
          }
        });
      });

      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

      const mergedCart = savedCart.map((cartItem) => {
        const product = allProducts.find(
          (p) => String(p.id) === String(cartItem.id)
        );
        return { ...product, quantity: cartItem.quantity };
      });

      setCartItems(mergedCart);
      setLoading(false);
    };

    fetchCartData();
  }, []);

  const updateQuantity = (id, amount) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
      .filter((item) => item.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => {
    const rawPrice = item.price ?? 0; // undefined olarsa 0 elə
    const price = parseInt(String(rawPrice).replace(/\D/g, ""), 10) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  if (loading) return <p>Yüklənir...</p>;
  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Səbət boşdur</h2>
        <Link to="/shop" className="text-blue-600 hover:underline">
          Mağazaya qayıt
        </Link>
      </div>
    );

  return (
    <div className=" w-full">
      <div className="bg-white h-[70px] mb-5">
        <ShopHeader />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cart</h1>

        <div className="flex flex-col  w-full justify-center items-center mx-auto">
          {/* Left - Products */}
          <div className="flex flex-col lg:flex-row gap-8 max-w-[70%]">
            <div className="flex-1 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img1}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      {item.description && (
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <span>Quantity:</span>
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-blue-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg font-semibold">{item.price}</p>
                </div>
              ))}
            </div>

            {/* Right - Order Summary */}
            <div className="lg:w-1/3 w-full">
              <div className="p-6 border rounded-xl shadow-md bg-white">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Shipping</span>
                  <span>$150.00</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>
                    Sales Tax
                    <span className="ml-1 text-gray-400 cursor-pointer">ⓘ</span>
                  </span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <span className="text-lg font-semibold">Subtotal</span>
                  <span className="text-2xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Starting at ${(total / 24).toFixed(0)}/mo. Learn more
                </p>

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Cart;
