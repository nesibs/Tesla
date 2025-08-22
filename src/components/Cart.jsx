// pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getShopData } from "../service/CarsServices";
import ShopHeader from "./ShopHeader";
import { toast, ToastContainer } from "react-toastify";
import ProfilePage from "./ProfilePage";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const navigate = useNavigate();

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
    const rawPrice = item.price ?? 0;
    const price = parseInt(String(rawPrice).replace(/\D/g, ""), 10) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const handlePayment = () => {
    const cleanCard = cardNumber.replace(/\s+/g, "");

    if (cleanCard.length === 16 && /^\d+$/.test(cleanCard)) {
      toast.success("Payment Successful!");  
      setCardNumber("");
    } else {
      toast.error("Please enter a valid 16-digit card number");
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">Səbət boşdur</h2>
        <Link
          to="/shop"
          className="text-white bg-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Mağazaya qayıt
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 ">
        <ShopHeader />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Səbət
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left - Product List */}
          <div className="flex-1 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <img
                    src={item.img1 || item.img}
                    alt={item.name}
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    {item.description && (
                      <p className="text-gray-500 text-sm mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:items-end mt-4 md:mt-0 gap-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                  <p className="text-xl font-bold text-gray-800">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white shadow-md rounded-xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Order Summary
              </h2>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">$150.00</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Sales Tax</span>
                <span className="font-semibold text-gray-400 text-sm">
                  Calculated at checkout
                </span>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Starting at ${(total / 24).toFixed(0)}/mo. Learn more
              </p>

              <div>
                <ToastContainer position="top-right" autoClose={3000} />

                <button
                  className="bg-blue-600 text-white mt-3 px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => setShowModal(true)}
                >
                  Odenisi tamamla
                </button>

                {showModal && (
                  <div className="fixed inset-0  backdrop-blur-sm bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-8 w-96 relative">
                      <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
                      <input
                        type="text"
                        placeholder="Enter 16-digit card number"
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full border p-3 rounded mb-4"
                      />
                      <button
                        onClick={handlePayment}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                      >
                        Pay Now
                      </button>
                      <button
                        onClick={() => {
                          const cartDataToSave = cartItems.map((item) => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            img: item.img1 || item.img,
                            quantity: item.quantity || 1,
                          }));
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(cartDataToSave)
                          );
                          navigate("/profilePage");
                        }}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                      >
                        Profilə keç
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 bg-white mt-12">
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
