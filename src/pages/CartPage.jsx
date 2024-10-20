import React from "react";
import { Trash2 } from 'lucide-react';
import useCameraStore from "../store/camera-store";
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const carts = useCameraStore((state) => state.carts);
  const actionUpdateQuantity = useCameraStore((state) => state.actionUpdateQuantity);
  const actionRemoveProduct = useCameraStore((state) => state.actionRemoveProduct);
  const getTotalPrice = useCameraStore((state) => state.getTotalPrice);
  const user = useCameraStore((state)=>state.user);
  const navigate = useNavigate();  

  const hdlGoCart = () =>{
    navigate('/')
  }

  const hdlLogin = () =>{
    navigate('/login')
  }

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6 text-white">ตะกร้าสินค้า</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* รายการสินค้า */}
        <div className="col-span-2">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead className="text-white text-left bg-black">
              <tr>
                <th className="p-4">สินค้า</th>
                <th className="p-4">ราคา</th>
                <th className="p-4">จำนวน</th>
                <th className="p-4">ยอดรวม</th>
                <th className="p-4">ลบ</th>
              </tr>
            </thead>

            <tbody>
              {carts.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">
                    <img
                      src={item.images[0]?.url}
                      className="w-16 h-16 inline-block bg-gray-200 rounded-md"
                      />
                    <div className="inline-block ml-4">
                      <p>{item.title}</p>
                    </div>
                  </td>
                  <td className="p-4">฿{item.price}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.count}</span>
                      <button
                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4">฿{(item.price * item.count).toLocaleString()}</td> 
                  <td className="p-4">
                    <button
                      onClick={() => actionRemoveProduct(item.id)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ยอดรวมตะกร้า */}
        <div className="flex flex-col h-[250px] bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">ยอดรวมตะกร้าสินค้า</h2>
          <div className="flex justify-between mb-4">
            <span>ยอดรวมสินค้า</span>
            <span>฿{getTotalPrice().toLocaleString()}</span> 
          </div>
        
        {
          user 
          ? <button className="bg-black text-white w-full py-2 rounded hover:bg-gray-800">
            สั่งซื้อสินค้า
          </button>

          : <button 
              onClick={hdlLogin} // เพิ่มฟังก์ชันเพื่อเปลี่ยนไปยังหน้าล็อกอิน
              className="bg-yellow-400 text-black w-full py-2 rounded hover:bg-yellow-700">
              กรุณา Login
            </button>
        }
          <button 
          onClick={hdlGoCart}
          className="mt-4 w-full py-2 rounded border hover:bg-yellow-400">
            เลือกซื้อสินค้าต่อ
          </button>
        </div>
      </div>
    </div>
  );
}