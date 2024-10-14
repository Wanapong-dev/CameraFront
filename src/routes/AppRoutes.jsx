import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SellPage from "../pages/SellPage";
import CartPage from "../pages/CartPage";
import History from "../pages/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/authpage/Login";
import Register from "../pages/authpage/Register";
import Layout from "../Layouts/Layout";
import LayoutAdmin from "../Layouts/LayoutAdmin";
import Dashboard from "../pages/adminpage/Dashboard";
import Category from "../pages/adminpage/Category";
import Product from "../pages/adminpage/Product";
import Manage from "../pages/adminpage/Manage";
import LayoutUser from "../Layouts/LayoutUser";
import HomeUser from "../pages/userpage/HomeUser"
import ProtectRouteUser from "../routes/ProtectRouteUser";
import ProtectRouteAdmin from "../routes/ProtectRouteAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <SellPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> }, 
      { path:"category", element: <Category />},
      { path:"product", element: <Product />},
      { path:"manage", element: <Manage />},
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> }, 
    
    ],
  },
]);

export default function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
