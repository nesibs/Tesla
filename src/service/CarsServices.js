import axios from "axios";

export const getCars = async () => {
  try {
    const res = await axios.get("/data/teslaApi.json");
    return res.data.cars;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getCarsById = async (id) => {
  const res = await fetch('/data/teslaApi.json');
  const data = await res.json();
  console.log("BÜTÜN CARS", data.cars);  
  return data.cars.find(car => String(car.id) === String(id));
};

export const getAccesuareById = async (id) => {
  const res = await fetch('/data/teslaApi.json');
  const data = await res.json(); 
  console.log("BÜTÜN CARS", data.accessories);  
  return data.accessories.find(acce => String(acce.id) === String(id));
};

export const getShop = async () => {
  try {
    const res = await axios.get("/data/teslaApi.json");
    return res.data.shop;
  } catch (error) {
    console.error("Error fetching theatres:", error);
    return [];
  }
};

export const getShopData = async () => {
  try {
    const res = await fetch("/data/teslaApi.json");
    const data = await res.json();

    if (data && data.shop) {
      return data.shop;
    } else {
      console.error("API data formatı düzgün deyil");
      return [];
    }
  } catch (err) {
    console.error("Data yüklənmədi:", err);
    return [];
  }
};


// Məhsul əlavə et
export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Səbəti oxu
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Məhsul sil
export const removeFromCart = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updated = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(updated));
};