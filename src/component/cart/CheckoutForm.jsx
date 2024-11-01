import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"; 
import '../../stripe.css' 
import { saveOrder } from "../../api/cart-api"; 
import useCameraStore from "../../store/camera-store"; 
import { useNavigate } from "react-router-dom"; 

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe(); // สร้าง Stripe instance
  const elements = useElements(); // สร้าง Elements instance
  const token = useCameraStore((state) => state.token); 
  const clearCart = useCameraStore((state) => state.clearCart); // ฟังก์ชันล้างข้อมูลตะกร้าสินค้า
  const [message, setMessage] = useState(null); // state สำหรับข้อความแจ้งเตือน
  const [isLoading, setIsLoading] = useState(false); // state สำหรับสถานะการโหลด

  const navigate = useNavigate(); 

  // ฟังก์ชันที่ทำงานเมื่อผู้ใช้กดยืนยันการชำระเงิน
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // ถ้า Stripe.js ยังโหลดไม่เสร็จ ให้หยุดการส่งฟอร์ม
      return;
    }

    setIsLoading(true); // ตั้งค่าการโหลดเป็น true ระหว่างที่รอผลการชำระเงิน

    const payload = await stripe.confirmPayment({
      elements, // ส่ง elements เพื่อทำการชำระเงิน
      redirect: 'if_required' // ไม่ redirect หากไม่จำเป็น
    });

    if (payload.error) {
      setMessage(payload.error.message); // แสดงข้อความ error ถ้าการชำระเงินล้มเหลว
    } else {
      // ถ้าการชำระเงินสำเร็จ ให้บันทึกข้อมูลการสั่งซื้อและล้างตะกร้าสินค้า
      saveOrder(token, payload)
        .then((res) => {
          console.log(res); 
          clearCart(); // ล้างตะกร้าสินค้า
          navigate('/user/order-success'); 
        })
        .catch((err) => {
          console.log(err); 
        });
    }

    setIsLoading(false); // ตั้งค่าสถานะการโหลดกลับเป็น false หลังจากทำเสร็จสิ้น
  };

  const paymentElementOptions = {
    layout: "tabs", // กำหนดเลย์เอาต์ของ PaymentElement ให้เป็นแบบ "tabs"
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        {/* แสดง PaymentElement สำหรับการชำระเงิน */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        
        {/* ปุ่มสำหรับยืนยันการชำระเงิน */}
        <button
          className="stripe-button"
          disabled={isLoading || !stripe || !elements} // ปิดการใช้งานปุ่มถ้าอยู่ในสถานะโหลดหรือไม่มีข้อมูล stripe
          id="submit"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"} {/* แสดง spinner ขณะกำลังโหลด */}
          </span>
        </button>
        
        {/* แสดงข้อความแจ้งเตือน (ถ้ามี) */}
        {message && <div id="payment-message">{message}</div>}
      </form>

      {/* [DEV]: แสดงลิงก์เพื่อเช็ค Payment Methods */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
          <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</a>
        </p>
      </div>
    </>
  );
}
