import React, { useEffect, useState } from "react";
import useCameraStore from "../../store/camera-store"; 
import { createProduct, deleteProduct } from "../../api/product-api"; 
import { toast } from "react-toastify"; 
import Uploadfile from "./Uploadfile"; 
import { Link } from "react-router-dom"; 

// ค่าเริ่มต้นของฟอร์ม
const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

export default function FormProduct() {
  const token = useCameraStore((state) => state.token); 
  const getCategory = useCameraStore((state) => state.getCategory); 
  const categories = useCameraStore((state) => state.categories); 
  const getProduct = useCameraStore((state) => state.getProduct); 
  const products = useCameraStore((state) => state.products); 

  const [form, setForm] = useState(initialState); // กำหนดค่าเริ่มต้นของฟอร์ม

  // ดึงข้อมูลหมวดหมู่และสินค้าทันทีที่ component โหลดขึ้นมา
  useEffect(() => {
    getCategory(); // ดึงข้อมูลหมวดหมู่
    getProduct(50); // ดึงสินค้า
  }, []);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const hdlOnChange = (e) => {
    setForm({
      ...form, // รักษาข้อมูลเดิมในฟอร์ม
      [e.target.name]: e.target.value, // อัปเดตค่าใหม่ที่ถูกเปลี่ยน
    });
  };

  // ฟังก์ชันจัดการการบันทึกข้อมูลสินค้า
  const hdlSubmit = async (e) => {
    e.preventDefault(); 
    try {
      if(form.price > 0) {
        const res = await createProduct(token, form); 
        setForm(initialState); // รีเซ็ตฟอร์ม
        getProduct(); // ดึงข้อมูลสินค้าใหม่หลังจากบันทึก
        toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      } else {
        toast.error('Price must more than be 0')
      }
    } catch (err) {
      console.log(err); 
    }
  };


  const hdlDelete = async (id) => {
    if (window.confirm("Confirm Delete")) {
      try {
        const res = await deleteProduct(token, id); // ส่ง API ลบสินค้า
        console.log(res);
        toast.success("Deleted Product Success"); 
        getProduct(); // ดึงข้อมูลสินค้าใหม่หลังจากลบ
      } catch (err) {
        console.log(err); 
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black shadow-lg rounded-lg">
      <form onSubmit={hdlSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">
          เพิ่มข้อมูลสินค้า
        </h1>

        <div className="flex flex-wrap justify-between">
          {/* ฟอร์มสำหรับกรอกข้อมูลสินค้า */}
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

          {/* อัปโหลดไฟล์รูปภาพ */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4">
            <div className="w-full flex justify-center">
              <div className="flex justify-center items-center">
                <Uploadfile form={form} setForm={setForm} /> 
              </div>
            </div>

            {/* ปุ่มเพิ่มสินค้า */}
            <button className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500">
              เพิ่มสินค้า
            </button>
          </div>
        </div>

        {/* ตารางแสดงสินค้าที่เพิ่ม */}
        <br />
        <br />
        <hr />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">ประเภท</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัปเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {item.images.length > 0 ? (
                    <img
                      className="w-24 h-24 rounded-lg shadow-md hover:scale-105"
                      src={item.images[0].url}
                      alt="product"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-slate-900 rounded-md flex items-center justify-center">
                      No image
                    </div>
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.category?.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.sold}</td>
                <td>{item.updatedAt}</td>
                <td>
                  <Link
                    className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500 hover:-translate-y-1 mt-4 w-4/5"
                    to={"/admin/product/" + item.id}
                  >
                    แก้ไข
                  </Link>
                  <p
                    onClick={() => hdlDelete(item.id)}
                    className="btn btn-sm bg-red-500 text-black hover:bg-red-600 hover:-translate-y-1 mt-4 w-4/5"
                  >
                    ลบ
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
