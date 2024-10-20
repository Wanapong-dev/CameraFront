import React, { useEffect, useState } from "react";
import useCameraStore from "../store/camera-store";

export default function Categories() {
  const getCategory = useCameraStore((state) => state.getCategory);
  const categories = useCameraStore((state) => state.categories);
  const actionSearchFilter = useCameraStore((state)=>state.actionSearchFilter)
  const getProduct = useCameraStore((state)=>state.getProduct)
  const products = useCameraStore((state)=>state.products)



  useEffect(() => {
    getCategory();
    getProduct()
  }, []);



  const hdlCheck = (id) => {
    actionSearchFilter({ category : [id] })
  };


  return (
    <div className="flex flex-wrap w-full">
      {categories.map((item, index) => (
        <div
          key={index}
          onClick={() => hdlCheck(item.id)} // ส่ง item.id ไปยังฟังก์ชัน hdlCheck
          className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center w-[400px] mx-auto border border-gray-300 mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-red-100 cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <h2 className="text-3xl text-gray-800">{item.name}</h2>
            </div>
            <div className="flex-shrink-0 w-1/6">
              <img src={item.imageurl} alt={item.name} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
