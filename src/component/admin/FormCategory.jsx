import React, { useEffect, useState } from "react";
import { createCategory,removeCategory } from "../../api/category-api";
import useCameraStore from "../../store/camera-store";
import { toast } from "react-toastify";

export default function FormCategory() {
  const token = useCameraStore((state) => state.token);
  const [name, setName] = useState("");
  const categories = useCameraStore((state)=>state.categories)
  const getCategory = useCameraStore((state)=>state.getCategory)

  useEffect(() => {
    getCategory(token);
  }, []);


  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please fill data");
    }
    try {
      const res = await createCategory(token, { name });
      console.log(res.data.name);
      toast.success(`Add Category ${res.data.name} Success!!`);
      getCategory(token)
    } catch (err) {
      console.log(err);
    }
  };

  const hdlRemove = async(id)=>{
    try {
        const res = await removeCategory(token,id)
        toast.success(`Deleted ${res.data.name} Success`)
        getCategory(token)
    } catch (err) {
        console.log(err)
    }
  }


  return (
    <div className="container mx-auto p-6 bg-black shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-6 text-yellow-400">Category Management</h1>
    
    <form className="my-4 flex space-x-4" onSubmit={hdlSubmit}>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
        placeholder="Enter category name"
      />
      <button className="btn bg-yellow-400 text-black hover:bg-yellow-500">Add Category</button>
    </form>
  
    <hr className="my-6 border-gray-700" />
  
   


    <ul className="list-none">
      {categories.map((item, index) => (
        <li key={index} className="flex justify-between items-center my-3 p-2 bg-gray-800 rounded-md shadow-md  hover:bg-yellow-700">
          <span className="text-lg text-white">{item.name}</span>
          <button 
            onClick={() => hdlRemove(item.id)} 
            className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
  
  );
}
