import React from "react";
import nikon from "../assets/nikon.svg";

export default function Categories() {
  const categories = [
    { name: "Camera" },
    { name: "Lens" },
    { name: "Accessories" },
  ];

  return (
    <div className="flex flex-wrap w-full ">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center w-[400px] mx-auto border border-gray-300 mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-red-100"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <h2 className="text-3xl text-gray-800">{category.name}</h2>
            </div>

            <div className="flex-shrink-0 w-1/6">
              <img src={nikon} alt={category.name} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
