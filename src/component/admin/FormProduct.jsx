import React, { useEffect, useState } from "react";
import useCameraStore from "../../store/camera-store";
import { createProduct } from "../../api/product-api";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

export default function FormProduct() {
  const token = useCameraStore((state) => state.token);
  const getCategory = useCameraStore((state) => state.getCategory);
  const categories = useCameraStore((state) => state.categories);
  const getProduct = useCameraStore((state) => state.getProduct);
  const products = useCameraStore((state) => state.products);
  console.log(products)

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory(token)
    getProduct(token,50)

  }, []);

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
  })
}

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await createProduct(token, form);
        toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black shadow-lg rounded-lg">
      <form onSubmit={hdlSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">
          เพิ่มข้อมูลสินค้า
        </h1>
        <input
          className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
          value={form.title}
          onChange={hdlOnChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
          value={form.description}
          onChange={hdlOnChange}
          placeholder="Description"
          name="description"
        />
        <input
          type="number"
          className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
          value={form.price}
          onChange={hdlOnChange}
          placeholder="Price"
          name="price"
        />
        <input
          type="number"
          className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
          value={form.quantity}
          onChange={hdlOnChange}
          placeholder="Quantity"
          name="quantity"
        />
        <select className="border" name="categoryId" onChange={hdlOnChange} required>
          <option value="">Please Select</option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500 mt-4">
          เพิ่มสินค้า
        </button>

<hr />
<br />
<table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
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

                        {
                            products.map((item, index) => {
                                console.log(item.category?.name) 
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.title}</td>
                                        <td>{item.category?.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <p>แก้ไข</p>
                                            <p>ลบ</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>



      </form>
    </div>
  );
}
