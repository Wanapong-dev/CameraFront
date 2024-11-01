import React, { useEffect, useState } from "react";
import { createCategory, removeCategory } from "../../api/category-api";
import useCameraStore from "../../store/camera-store";
import { toast } from "react-toastify";

export default function FormCategory() {
  const token = useCameraStore((state) => state.token); 
  const categories = useCameraStore((state) => state.categories); 
  const getCategory = useCameraStore((state) => state.getCategory); 

  const [form, setForm] = useState({
    name: "", 
    imageurl: null, 
  });

  
  useEffect(() => {
    getCategory(token);
  }, []);

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงค่าในฟอร์ม
  const hdlOnChange = (e) => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value, // อัปเดตค่าตาม input ที่เปลี่ยนแปลง
    });
  };

  // ฟังก์ชันสำหรับอัปโหลดไฟล์รูปภาพ
  const hdlUpload = (e) => {
    const file = e.target.files[0]; // เลือกไฟล์แรกจาก input
    setForm({
      ...form, 
      imageurl: file, 
    });
  };

 
  const hdlSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการ reload หน้าเว็บ
    if (!form.imageurl) {
      return toast.error("Please upload an image file!"); 
    }

    const formdata = new FormData(); // ใช้ FormData สำหรับส่งไฟล์และข้อมูล
    formdata.append("file", form.imageurl); // เพิ่มไฟล์รูปภาพใน formdata
    formdata.append("name", form.name); // เพิ่มชื่อ category ใน formdata

    try {
      const res = await createCategory(token, formdata); // เรียก API เพื่อสร้าง category ใหม่
      toast.success(`Add Category ${res.data.name} Success!!`); 
      setForm({ name: "", imageurl: null }); // รีเซ็ตฟอร์ม
      getCategory(token); // ดึง category ใหม่หลังจากเพิ่ม
    } catch (err) {
      console.log(err); 
    }
  };

  // ฟังก์ชันสำหรับลบ category
  const hdlRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await removeCategory(token, id); 
        toast.success(`Deleted ${res.data.name} Success`); 
        getCategory(token); // ดึง category ใหม่หลังจากลบ
      } catch (err) {
        console.log(err); 
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">
        Category Management
      </h1>

      <form className="my-4 flex space-x-4" onSubmit={hdlSubmit}>
        <input
          type="text"
          name="name"
          value={form.name} // ค่าจาก state form
          onChange={hdlOnChange} // เรียกใช้ฟังก์ชันเมื่อเปลี่ยนค่า input
          className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
          placeholder="Enter category name" 
        />
        <input
          type="file"
          onChange={hdlUpload} // เรียกใช้ฟังก์ชันเมื่อมีการอัปโหลดไฟล์
          className="file:bg-yellow-500 file:text-black file:rounded-md file:py-2 file:px-4 cursor-pointer hover:file:bg-yellow-600"
          placeholder="Add PictureURL" 
        />
        <button className="btn bg-yellow-400 text-black hover:bg-yellow-500">
          Add Category
        </button>
      </form>

      <div className="flex flex-wrap w-full justify-around">
        {categories.map((item, index) => (
          <div
            key={index} 
            className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center w-[400px] h-40 mx-auto border border-gray-300 my-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-red-100"
          >
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <h2 className="text-3xl text-gray-800">{item.name}</h2>
              </div>

              <div className="flex-shrink-0 w-1/6">
                <img
                  src={item.imageurl} // แสดงรูปภาพจาก URL
                  alt={item.name} 
                  className="rounded-lg shadow-md"
                />
              </div>

              <button
                onClick={() => hdlRemove(item.id)} // เรียกใช้ฟังก์ชันลบ category
                className="btn btn-sm bg-red-400 text-black hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
