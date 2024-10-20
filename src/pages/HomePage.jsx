import { useEffect } from "react";
import Categories from "../component/Categories";
import ProductBanner from "../component/ProductBanner";
import ProductCard from "../component/ProductCard";
import useCameraStore from "../store/camera-store";
import Searchbar from "../component/Searchbar";



export default function HomePage() {
  const getProduct = useCameraStore((state)=>state.getProduct)
  const products = useCameraStore((state)=>state.products)

  useEffect(()=>{
    getProduct(12)
  },[])


    return (
      <div className="h-full bg-black  ">
        <ProductBanner />

        <div className="flex w-3/4 mx-auto mt-12">
        <Categories />
        </div>

        <div className="flex w-3/4  mx-auto justify-center">
          <Searchbar />
        </div>

        <div className="flex flex-wrap justify-center gap-12 mx-auto">
         
         {
          products.map((item,index)=>
            <ProductCard key={index} item={item}/>
          )
         }
         
        </div>
      </div>
    );
  };
  