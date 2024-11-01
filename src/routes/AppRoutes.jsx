import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SellPage from "../pages/SellPage";
import CartPage from "../pages/cartpage/CartPage";
import History from "../pages/History";
import Checkout from "../pages/cartpage/Checkout";
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
import EditProduct from "../pages/adminpage/EditProduct"
import Payment from "../pages/cartpage/Payment";
import OrderSuccess from "../pages/userpage/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:id", element: <SellPage />},
      { path: "cart", element: <CartPage /> },
      { path: "history", element: <History /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

    ],
  },
  {
    path: "/checkout",
    element: <ProtectRouteUser element={<Layout/>}/>,
    children: [
      { index: true, element: <Checkout /> }, 
      { path: "payment", element: <Payment /> }, 
    ]
  },

  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> }, 
      { path:"category", element: <Category />},
      { path:"product", element: <Product />},
      { path:"product/:id", element: <EditProduct />},
      { path:"manage", element: <Manage />},
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> }, 
      { path: "order-success", element: <OrderSuccess /> },

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
