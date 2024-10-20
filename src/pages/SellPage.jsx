import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useCameraStore from "../store/camera-store";

export default function SellPage() {
  const { id } = useParams();  // ดึง product id จาก URL
  const [product, setProduct] = useState(null);
  const actionAddtoCart= useCameraStore((state)=>state.actionAddtoCart)

  useEffect(() => {
    // ดึงข้อมูลสินค้าจาก API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${id}`);  
        setProduct(response.data);  
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen  text-white p-8">
    <div className=" ">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row items-center ml-60 ">
        
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img
            src={product.images && product.images[0].url}      
            alt={product.title}
            className=" w-[500px] h-[500px] "
          />
        </div>
  
        {/* Product Details */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-6">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-semibold mb-2">฿ {product.price.toLocaleString()}</p>
  
          {/* Product Specs */}
          <ul className="space-y-2 text-lg">
            <li>Currently In Stock</li>
            <li>Expeed 6 Chip</li>
            <li>Works with 24-50mm Lens</li>
            <li>24.3 million Effective Pixels</li>
            <li>EN-EL15c rechargeable Li-ion battery</li>
          </ul>
  
          {/* Add to Cart & Buy Now Buttons */}
          <div className="mt-8 flex space-x-4 justify-center lg:justify-start">
            <button 
              onClick={()=>actionAddtoCart(product)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
  
      {/* Additional Details */}
      <div className="mt-10 max-w-4xl mx-auto">
        <details className="border-t border-gray-600 pt-4">
          <summary className="cursor-pointer text-xl font-semibold">
            Description
          </summary>
          <p className="mt-4 text-gray-400 text-lg">{product.description || "Product Description"}</p>
        </details>
  
        <details className="border-t border-gray-600 pt-4 mt-4">
          <summary className="cursor-pointer text-xl font-semibold">
            Shipping & Warranty
          </summary>
          <p className="mt-4 text-gray-400 text-lg">Shipping and warranty details here.</p>
        </details>
      </div>
    </div>
  </div>
  
  );
}
