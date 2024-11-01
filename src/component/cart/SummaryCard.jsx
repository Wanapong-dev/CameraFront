import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/cart-api";
import { useNavigate } from "react-router-dom";
import useCameraStore from "../../store/camera-store";
import { toast } from "react-toastify";

const SummaryCard = () => {
  const navigate = useNavigate(); 
  const token = useCameraStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(""); 
  const [addressSaved, setAddressSaved] = useState(false); 


  useEffect(() => {
    hdlGetUserCart(token); 
  }, []);

  // ฟังก์ชันดึงข้อมูลสินค้าจากตะกร้า
  const hdlGetUserCart = async (token) => {
    try {
      const response = await listUserCart(token); 
      setProducts(response.data.products); // เก็บข้อมูลสินค้าลงใน state
    } catch (error) {
      console.error("Error fetching user cart:", error); 
    }
  };

  // ฟังก์ชันบันทึกที่อยู่
  const hdlSaveAddress = async () => {
    try {
      if (!address) {
        return toast.warning("กรุณากรอกที่อยู่สำหรับจัดส่ง"); 
      }
      const response = await saveAddress(token, address); 
      toast.success(response.data.message); 
      setAddressSaved(true); 
    } catch (err) {
      console.log(err); 
    }
  };

  
  const handleConfirmPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่สำหรับจัดส่ง");
    }
    navigate("/checkout/payment"); 
  };


  const cartTotal = products.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* ฟอร์มสำหรับกรอกและบันทึกที่อยู่ */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg space-y-4">
            <h1 className="font-bold text-2xl text-gray-800">ที่อยู่สำหรับจัดส่ง</h1>
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)} // กำหนดที่อยู่ตามการกรอกของผู้ใช้
              className="w-full textarea textarea-bordered rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="กรอกที่อยู่จัดส่งของคุณ"
            />
            <button
              onClick={hdlSaveAddress} // เรียกฟังก์ชันบันทึกที่อยู่เมื่อกดปุ่ม
              className="btn btn-primary w-full"
            >
              บันทึกที่อยู่
            </button>
          </div>
        </div>

        {/* สรุปยอดสินค้าในตะกร้า */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg space-y-4">
            <h1 className="font-bold text-2xl text-gray-800">สรุปยอด</h1>
            <div className="space-y-2">
              {products?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-bold text-gray-700">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.count} x ฿{item.price}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">
                      ฿{item.price * item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200" />
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <p>ค่าจัดส่ง</p>
                <p>฿0.00</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>ส่วนลด</p>
                <p>฿0.00</p>
              </div>
            </div>
            <hr className="border-gray-200" />
            <div>
              <div className="flex justify-between items-baseline">
                <p className="text-lg font-semibold text-gray-700">
                  ยอดรวมทั้งหมด:
                </p>
                <p className="text-2xl font-bold text-green-600">฿{cartTotal}</p>
              </div>
            </div>

            {/* ปุ่มยืนยันการชำระเงิน */}
            <button
              onClick={handleConfirmPayment} // เรียกฟังก์ชันเมื่อกดปุ่มชำระเงิน
              className="btn btn-success w-full"
            >
              ดำเนินการชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
