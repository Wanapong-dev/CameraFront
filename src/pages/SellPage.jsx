import React from "react";
import nikon from "../assets/nikon.svg"



export default function SellPage() {
  return (
    
<div>
  <div className="flex items-center justify-center">
     <div className="w-1/3">
            <img
              src={nikon}      
              alt="Nikon Z5"
              className=""
              />
     </div>

     <div className=" pl-20">
            <h1 className="text-4xl font-bold">Nikon Z5</h1>
            <p className="text-2xl font-semibold mt-4">$899</p>

            {/* Options */}
            <div className="flex space-x-4 mt-6">
              <button className="px-4 py-2 btn btn-warning text-black font-bold rounded">
                Z 5 Body Only
              </button>
            </div>

            {/* Status and Specs */}
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                Currently In Stock
              </li>
              <li className="flex items-center">
                Expeed 6 Chip
              </li>
              <li className="flex items-center">
                Works with 24-50mm Lens
              </li>
              <li>24.3 million Effective Pixels</li>
              <li>EN-EL15c rechargeable Li-ion battery</li>
            </ul>

            {/* Action Buttons */}
            <div className="mt-8 space-x-4">
              <button className="btn btn-warning">Add To Cart</button>
              <button className="btn btn-warning">Buy It Now</button>
            </div>  
    </div>
  </div>

  <div className="flex flex-col justify-center items-center mx-auto w-full max-w-4xl gap-5">
  <details className="border-t border-gray-600 pt-4 w-full">
    <summary className="">
      Description
    </summary>
    <p className="mt-2">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium corporis deserunt sit modi ipsam eveniet nam inventore atque, impedit, quia mollitia ratione itaque neque tenetur! Explicabo nihil ratione omnis libero!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, quasi reiciendis ab molestias obcaecati veniam perferendis dicta harum quos dolore ducimus placeat fugit possimus aspernatur saepe illum eligendi reprehenderit aperiam?
    </p>
  </details>

  <details className="border-t border-gray-600 pt-4 w-full">
    <summary className="">
      Shipping & Warranty
    </summary>
    <p className="mt-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse autem voluptas libero dolore. Expedita, consectetur dolorem culpa accusantium at, quis error, perspiciatis dolor tempore deserunt eaque eligendi perferendis iste saepe!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dolorum minus inventore quaerat fugit sunt! Obcaecati id fugiat, neque voluptas animi odit, libero voluptates qui harum alias corrupti in eum.

    </p>
  </details>
</div>




</div>
  );
}
