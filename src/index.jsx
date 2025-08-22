import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./components/App.jsx";
import Details from "./components/Details.jsx";
import Order from "./components/Order.jsx";
import Shop from "./components/Shop.jsx";
import ShopProduct from "./components/ShopProduct.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Cart from "./components/Cart.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Inventory from "./components/Inventory.jsx";
import AdminPanel from "./components/AdminPanel"; 
import ProfilePage from "./components/ProfilePage.jsx";

 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/order/:id",
    element: <Order />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shopProduct/:id",
    element: <ShopProduct />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/shop/:category",
    element: <ShopProduct />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/productDetails/:id",
    element: <ProductDetails />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/AdminPanel",
    element:  <AdminPanel />,
  },
  {
    path: "/app",
    element: <App/>,
  },
  {
    path: "/profilePage",
    element: <ProfilePage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
