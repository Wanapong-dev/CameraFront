import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useCameraStore from '../../store/camera-store';

const OrderSuccess = () => {
  const [loading, setLoading] = useState(true); // กำหนดสถานะเริ่มต้นให้หน้าจอแสดงการโหลด
  const [error, setError] = useState(null); // สถานะสำหรับจัดการข้อผิดพลาด

  const orders = useCameraStore((state) => state.order); 
  const fetchOrders = useCameraStore((state) => state.fetchOrders); 
  const token = useCameraStore((state) => state.token) || localStorage.getItem('authToken'); // ตรวจสอบ token ของผู้ใช้ ถ้าไม่มีให้ดึงจาก localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          // ถ้าไม่มี token ให้แจ้งข้อผิดพลาด
          throw new Error('No valid token found. Please log in again.');
        }
        await fetchOrders(token); // ดึงข้อมูลคำสั่งซื้อด้วย token
        setLoading(false); // หลังจากดึงข้อมูลเสร็จ ให้หยุดการโหลด
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized: Please log in again.');
        } else {
          setError(err.message); 
        }
        setLoading(false); // หยุดการโหลดเมื่อเกิดข้อผิดพลาด
      }
    };

    fetchData(); // เรียกใช้ฟังก์ชันสำหรับดึงข้อมูล
  }, [fetchOrders, token]);

  if (loading) {
    return <div>Loading...</div>; // ถ้ายังโหลดข้อมูลอยู่ จะแสดงข้อความนี้
  }

  if (error) {
    return <div>Error: {error}</div>; // ถ้ามีข้อผิดพลาด จะแสดงข้อความนี้
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      {orders && orders.length > 0 ? ( // ตรวจสอบว่ามีคำสั่งซื้อหรือไม่ ถ้ามีจะแสดงรายการคำสั่งซื้อ
        orders.map((order, index) => (
          <div key={index} className="mb-6 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')} {/* แสดงวันที่คำสั่งซื้อถูกสร้าง */}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {order?.status} 
            </p>
            <p className="text-sm text-gray-600">
              <strong>Amount:</strong> B{order?.amount} 
            </p>

            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-700">Items:</h3>
              <ul>
                {order.products.map((item) => (
                  <li key={item.id} className="text-sm text-gray-600">
                    {item.product.title} - {item.count} x B{item.price} {/* แสดงรายละเอียดสินค้าแต่ละรายการ */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p> 
      )}
    </div>
  );
};

export default OrderSuccess;
