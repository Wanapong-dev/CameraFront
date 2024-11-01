import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'


export default function LoadingToRedirect() {

    // นับถอยหลัง เริ่มที่ 3 วินาที
    const [count,setCount] = useState(3)

    // สร้าง state redirect สำหรับตรวจสอบว่าให้ทำการ redirect หรือไม่
    const [redirect,setRedirect] = useState(false)

    // ใช้ useEffect เพื่อเริ่มการนับถอยหลังเมื่อ component ถูก mount
    useEffect(()=>{
        // สร้าง interval ที่จะทำการนับถอยหลังทุกๆ 1 วินาที (1000ms)
        const interval = setInterval(()=>{
            setCount((currentCount)=>{
                // ถ้าการนับถอยหลังเหลือ 1 วินาที จะเคลียร์ interval และทำการ redirect
                if(currentCount === 1) {
                    clearInterval(interval) // หยุดการนับถอยหลัง
                    setRedirect(true) // ตั้งค่าให้ทำการ redirect
                }
                // ลดค่า count ลงทีละ 1
                return currentCount - 1
            })

        },1000) // ทำงานทุกๆ 1000 มิลลิวินาที (1 วินาที)

        // เมื่อ component ถูกทำลาย (unmount) จะทำการเคลียร์ interval ด้วย
        return () => clearInterval(interval)
    },[])

    // ถ้า state redirect เป็น true จะทำการ redirect ไปหน้า '/'
    if(redirect){
        return <Navigate to={'/'} />
    }

    // ถ้ายังไม่ถึงเวลา redirect จะแสดงข้อความพร้อมนับถอยหลัง
  return (
    <div>No Permission, Redirect in {count}</div>
  )
}
