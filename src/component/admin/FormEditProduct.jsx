import React, { useEffect, useState } from "react";
import useCameraStore from "../../store/camera-store";
import {
  createProduct,
  readProduct,
  updateProduct,
} from "../../api/product-api";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

export default function FormEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useCameraStore((state) => state.token);
  const getCategory = useCameraStore((state) => state.getCategory);
  const categories = useCameraStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id);
  }, []);

  const fetchProduct = async (token, id) => {
    try {
      const res = await readProduct(token, id);
      console.log("res from backend", res);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data", err);
    }
  };

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black shadow-lg rounded-lg">
      <form onSubmit={hdlSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">
          แก้ไขข้อมูลสินค้า
        </h1>

        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 space-y-4">
            <input
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
              value={form.title}
              onChange={hdlOnChange}
              placeholder="Title"
              name="title"
            />
            <input
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
              value={form.description}
              onChange={hdlOnChange}
              placeholder="Description"
              name="description"
            />
            <input
              type="number"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
              value={form.price}
              onChange={hdlOnChange}
              placeholder="Price"
              name="price"
            />
            <input
              type="number"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
              value={form.quantity}
              onChange={hdlOnChange}
              placeholder="Quantity"
              name="quantity"
            />
            <select
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
              name="categoryId"
              onChange={hdlOnChange}
              required
            >
              <option value="">Please Select</option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4">
            <div className="w-full flex justify-center">
              <div className="flex justify-center items-center">
                <Uploadfile form={form} setForm={setForm} />
              </div>
            </div>

            <button className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500 ">
              อัพเดทสินค้า
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
