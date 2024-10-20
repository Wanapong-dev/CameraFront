import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import useCameraStore from "../../store/camera-store";
import { Link } from "react-router-dom";

export default function HeaderAdmin() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()
    const actionLogout = useCameraStore((state) => state.actionLogout);
    
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    }
    const hdlLogout = ()=>{
        actionLogout()
        navigate('/')
    }

    return (
        <div className="bg-black text-white h-[100px] px-4 items-center flex justify-between">
         <Link to="/" className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200">Home</Link>

        <div className="relative bg-neutral-900">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between gap-2
                      hover:text-green-500 hover:scale-110 hover:-translate-y-1 hover:duration-200"
          >
            <img
              src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
              className="w-8 h-8"
              alt="Profile Icon"
            />
            Admin
            <IoIosArrowDown />
          </button>
          {isOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg z-10 shadow-lg">
              <li 
                onClick={hdlLogout}
                className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-700 hover:duration-200 active:bg-green-400">
                LogOut
              </li>
            </ul>
          )}
        </div>
      </div>
      
    );
  };
