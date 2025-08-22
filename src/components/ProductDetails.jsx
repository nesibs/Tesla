import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShopData } from "../service/CarsServices";
import ShopHeader from "./ShopHeader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // User yoxlama
    const user = JSON.parse(localStorage.getItem("user"));
    setIsSignedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
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

      const foundProduct = allProducts.find(
        (item) => String(item.id) === String(id)
      );

      setProduct(foundProduct || null);
      setSelectedImg(foundProduct?.img1 || null);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleButtonClick = () => {
    if (!isSignedIn) {
      navigate("/signin"); // sign in səhifəsinə yönləndir
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Məhsul səbətə əlavə olundu ✅");
  };

  if (loading) return <p>Yüklənir...</p>;
  if (!product) return <p>Məhsul tapılmadı</p>;

  const images = [
    product.img1,
    product.img2,
    product.img3,
    product.img4,
  ].filter(Boolean);

  // Statik bölmələr
  const features = [
    "Durable aluminum frame",
    "Weather-resistant coating",
    "Easy installation",
    "Lightweight & portable",
  ];

  const includes = ["Carrying bag", "User manual", "Warranty card"];

  const description = `This is a premium product designed with high-quality materials. 
It ensures durability, modern aesthetics, and ease of use. Perfect choice for everyday lifestyle.`;

  return (
    <div>
      <div className="bg-white h-[70px] mb-5">
        <ShopHeader />
      </div>
      <main className="container mx-auto px-4 py-8 flex flex-col-reverse md:flex-row gap-10">
        {/* Sol şəkil hissəsi */}
        <div className="w-full md:w-[70%]">
          <img
            src={selectedImg}
            alt={product.name}
            className="rounded-lg w-full object-cover shadow-md"
          />

          <div className="flex gap-3 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImg(img)}
                className={`w-32 h-32  sm:w-40 sm:h-40 lg:w-64 lg:h-52 rounded-md object-cover cursor-pointer border-2 transition ${
                  selectedImg === img ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sağ product detalları */}
        <div className=" w-ful md:w-[30%] flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold">{product.price}</p>
          </div>

          <button
            onClick={handleButtonClick}
            className="bg-black text-white  py-3 w-full rounded-md hover:bg-gray-800 transition "
          >
            {isSignedIn ? "Add to Cart" : "Sign In"}
          </button>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-bold mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Includes */}
          <div>
            <h2 className="text-xl font-bold mb-2">Includes</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {includes.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
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

export default ProductDetails;
