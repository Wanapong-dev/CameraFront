import React, { useState } from "react";
import { toast } from "react-toastify"; 
import Resize from "react-image-file-resizer"; // ใช้ปรับขนาดไฟล์รูปภาพ
import { removeFiles, uploadFiles } from "../../api/product-api"; 
import useCameraStore from "../../store/camera-store"; 

export default function Uploadfile(props) {
    const { form, setForm } = props; 
    const token = useCameraStore((state) => state.token); 
    const [isLoading, setIsLoading] = useState(false); // state สำหรับแสดงสถานะการโหลด

    // ฟังก์ชันสำหรับจัดการการอัปโหลดไฟล์เมื่อมีการเลือกไฟล์
    const hdlOnChange = (e) => {
      setIsLoading(true); // ตั้งสถานะการโหลดเป็น true
      const files = e.target.files; // ดึงไฟล์จาก input
      
      if (files) {
        let allFiles = form.images; // กำหนด array สำหรับเก็บภาพ
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          // ตรวจสอบว่าไฟล์เป็นรูปภาพหรือไม่
          if (!file.type.startsWith("image/")) {
            toast.error(`File ${file.name} requires an image`); 
            continue;
          }

          // ปรับขนาดรูปภาพ
          Resize.imageFileResizer(
            file,
            1000,
            1000,
            "PNG",
            100,
            0,
            (data) => {
              // อัปโหลดรูปภาพที่ปรับขนาดแล้ว
              uploadFiles(token, data)
                .then((res) => {
                  allFiles.push(res.data); // เพิ่มรูปภาพใหม่ลงใน array
                  setForm({
                    ...form,
                    images: allFiles, // อัปเดตค่าในฟอร์ม
                  });
                  setIsLoading(false); // ยกเลิกสถานะการโหลด
                  toast.success("Upload image Success!!"); 
                })
                .catch((err) => {
                  console.log(err);
                  setIsLoading(false); 
                });
            },
            "base64"
          );
        }
      }
    };

    // ฟังก์ชันสำหรับลบรูปภาพ
    const hdlDelete = (public_id) => {
      const images = form.images; // ดึงรูปภาพจากฟอร์ม
      removeFiles(token, public_id) // เรียก API เพื่อลบไฟล์
        .then((res) => {
          const filterImages = images.filter((item) => {
            return item.public_id !== public_id; // ลบรูปภาพที่ถูกเลือกออกจาก array
          });
          setForm({
            ...form,
            images: filterImages, // อัปเดตค่าในฟอร์มหลังจากลบรูปภาพ
          });
          toast.error(res.data); 
        })
        .catch((err) => {
          console.log(err); 
        });
    };
  
    return (
      <div className="bg-black text-yellow-500">
        <div className="flex mx-4 gap-4 my-4">
          {/* แสดงสถานะการโหลด */}
          {isLoading && <span className="loading loading-spinner text-warning w-16 h-16"></span>}

          {/* แสดงรูปภาพที่อัปโหลด */}
          {form.images.map((item, index) => (
            <div key={index} className="relative p-1">
              <img src={item.url} className="w-36 h-36 rounded-md shadow-lg hover:scale-105" />
              <span
                className="absolute top-0 right-0 p-1 text-yellow-500 cursor-pointer hover:text-red-500"
                onClick={() => hdlDelete(item.public_id)} 
              >
                X
              </span>
            </div>
          ))}
        </div>
      
        {/* Input สำหรับอัปโหลดรูปภาพ */}
        <div className="my-4">
          <input
            type="file"
            name="images"
            multiple
            className="file:bg-yellow-500 file:text-black file:rounded-md file:py-2 file:px-4 cursor-pointer hover:file:bg-yellow-600"
            onChange={hdlOnChange} // เรียกฟังก์ชันเมื่อมีการเลือกไฟล์
          />
        </div>
      </div>
    );
  }
