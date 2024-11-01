import React from "react";
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  
import useCameraStore from "../store/camera-store";

export default function ProductCard(props) {
  const actionAddtoCart = useCameraStore((state) => state.actionAddtoCart);
  const { item } = props;
  const navigate = useNavigate();  

  // ฟังก์ชันสำหรับนำไปหน้ารายละเอียดสินค้า
  const handleProductClick = () => {
    navigate(`/product/${item.id}`);  
  };


  return (
    <div className="flex flex-wrap justify-around gap-12 text-black">
      <div 
        className="card bg-white w-80 shadow-xl mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-yellow-100 cursor-pointer"
        onClick={handleProductClick}  
      >
        <figure className="px-10 pt-10">
          {/* ตรวจสอบว่ามีรูปภาพหรือไม่ ถ้าไม่มีแสดงข้อความ No Image */}
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              alt={item.title}
              className="object-cover h-48 w-full rounded-xl"
            />
          ) : (
            <div className="w-full h-48 bg-slate-800 rounded-md text-center flex items-center justify-center shadow">
              No Image
            </div>
          )}
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="text-xl font-bold text-gray-800">฿ {item.price.toLocaleString()}</h1>
          <h2 className="card-title text-lg font-semibold mt-2 text-gray-700">
            {item.title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          <div className="card-actions mt-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();  
                actionAddtoCart(item);
              }}
              className="btn btn-warning flex items-center space-x-2 px-4 py-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
