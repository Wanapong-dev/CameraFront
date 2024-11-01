import React from "react";
import nikon from "../assets/nikon.svg"

export default function ProductBanner() {
    return (
      <div className="bg-yellow-300 flex items-center justify-between rounded-3xl p-8 mx-auto max-w-7xl gap-8 text-black ">
      


        {/* Product Image */}
        <div className="flex items-center w-2/6">
  <img
    src={nikon}
    alt="Nikon Camera"
    className="transition-transform transform hover:scale-105  rounded-lg border-2 border-transparent hover:border-none"
  />
</div>

  
        {/* Middle Section: Product Details */}
        <div className=" flex flex-col gap-4 h-full w-3/5 ">
          <h2 className="text-5xl ">$60,000</h2>
          <h3 className="text-2xl  my-2">
            Canon EOS R6 Mark II Mirrorless Camera Body
          </h3>
          <p className="">
            Portraits or action, events or landscapes  this photo and video
            camera's blend of performance and image quality lets creativity
            thrive
          </p>




            {/* Features */}
          <div className="flex space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <span>6K RAW - Capture 6K RAW</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>40 fps electronic shutter</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Dual Pixel CMOS AF II - Intelligent</span>
            </div>
          </div>



          {/* View Button */}
          {/* <button className="btn btn-info w-2/5">
            View
          </button> */}
        </div>
  
       
      </div> 
    );
  };
  

  