import { Link, useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import useCameraStore from "../store/camera-store";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { ShoppingCart } from 'lucide-react';
import { UserPen } from 'lucide-react';
import { House } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useCameraStore((state) => state.user);
  const actionLogout = useCameraStore((state) => state.actionLogout);
  const carts = useCameraStore((state) => state.carts);
  const navigate = useNavigate();  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hdlLogout = () => {
    actionLogout();
    setIsOpen(false);
    navigate("/");  
  };

  const hdlNavigate = () => {
    navigate("/user");  
  };

  // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
  const totalItemsInCart = carts.reduce((total, item) => total + item.count, 0);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-6 bg-black text-white h-[100px] w-full ">
      <Link to={"/"} className="text-lg font-bold">
        LOGO
      </Link>
      <div className="flex items-center space-x-6">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200"
        >
          <House className="h-8 w-8" />
          <span>Home</span>
        </Link>

        {/* Shopping Cart */}
        <Link
          to="/cart"
          className="flex items-center gap-2 hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200 relative"
        >
          <div className="relative">
            <ShoppingCart className="h-8 w-8" />
            {totalItemsInCart > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {totalItemsInCart}
              </span>
            )}
          </div>
          <span>Cart</span>
        </Link>

        {/* Admin */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="flex items-center gap-2 hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            <UserPen className="h-8 w-8" />
            <span>Admin</span>
          </Link>
        )}
      </div>

      {user ? (
        <div className="relative bg-neutral-900">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between gap-2
                    hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            <img
              src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
              className="w-8 h-8"
              alt="Profile Icon"
            />
            Profile
            <IoIosArrowDown />
          </button>
          {isOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg z-10 shadow-lg">
              <li
                onClick={hdlNavigate}
                className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-700 hover:duration-200 active:bg-green-400"
              >
                Setting
              </li>
              <li
                onClick={hdlLogout}
                className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-700 hover:duration-200 active:bg-green-400"
              >
                LogOut
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="flex space-x-4 items-center">
          <Link
            to={"/register"}
            className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
