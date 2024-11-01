import React, { useEffect, useState } from 'react' 
import useCameraStore from '../store/camera-store' 
import { currentAdmin } from '../api/auth-api' 
import LoadingToRedirect from './LoadingToRedirect' 

// ฟังก์ชัน ProtectRouteAdmin รับ element เป็น props ซึ่งเป็น component ที่จะถูก render ถ้าผ่านการตรวจสอบ
export default function ProtectRouteAdmin({element}) {
    // สร้าง state ok สำหรับเก็บสถานะว่าเป็นแอดมินหรือไม่ เริ่มต้นเป็น false
    const [ok,setOk] = useState(false)


    const user = useCameraStore((state)=> state.user)
    const token = useCameraStore((state)=> state.token)

    // ใช้ useEffect เพื่อตรวจสอบว่า user และ token มีหรือไม่ ถ้ามีจะเรียกใช้ API เพื่อตรวจสอบสิทธิ์การเป็นแอดมิน
    useEffect(()=>{
        if(user && token) { // ถ้ามี user และ token
            currentAdmin(token) // เรียกใช้ API currentAdmin เพื่อตรวจสอบสถานะแอดมิน
            .then((res)=>setOk(true)) // ถ้าเป็นแอดมิน ให้ตั้งค่า ok เป็น true
            .catch((err)=>setOk(false)) // ถ้าไม่ใช่แอดมินหรือเกิดข้อผิดพลาด ให้ตั้งค่า ok เป็น false
        }
    },[])

    // ถ้า ok เป็น true (ผ่านการตรวจสอบว่าเป็นแอดมิน) จะ render element ที่ถูกส่งมา
    // ถ้า ok เป็น false จะ render LoadingToRedirect เพื่อเปลี่ยนเส้นทางไปหน้าอื่น
  return (
      ok ?  element : <LoadingToRedirect /> 
  )
}
