import axios from 'axios'  
import { create } from 'zustand'  // เพื่อสร้าง store
import { persist, createJSONStorage } from 'zustand/middleware'  // สำหรับการเก็บข้อมูลใน localStorage
import { listCategory } from "../api/category-api";  
import { listProduct, searchFilters } from '../api/product-api';  
import _ from 'lodash'  //ใช้ในการจัดการกับอาร์เรย์และอ็อบเจกต์

// ฟังก์ชันหลักสำหรับสร้าง store ใน Zustand
const cameraStore = (set, get) => ({
 
    user: null, 
    token: null,  
    categories: [],  
    products: [],  
    carts: [],  
    order: [],  

    // ฟังก์ชันล้างข้อมูลตะกร้า
    clearCart: () => {
      set({ carts: [] });  // ตั้งค่าตะกร้าให้เป็นอาร์เรย์ว่าง
    },

    // ฟังก์ชันสำหรับดึงข้อมูลคำสั่งซื้อของผู้ใช้
    fetchOrders: async (token) => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/order", {
          headers: {
            Authorization: `Bearer ${token}`,  // ส่ง token เพื่อยืนยันตัวตน
          },
        });
        console.log("Fetched Orders:", res.data);  // แสดงข้อมูลคำสั่งซื้อที่ได้จาก API
        set({ order: res.data.orders });  // ตั้งค่า state คำสั่งซื้อ
        return res;
      } catch (err) {
        console.error("Error fetching orders:", err.message);  
        if (err.response && err.response.status === 401) {
          console.error("Unauthorized access - check token.");  
        }
      }
    },

    // ฟังก์ชันสำหรับตั้งค่าข้อมูลผู้ใช้
    setUser: (newUserData) => set({ user: newUserData }),

    // ฟังก์ชันเพิ่มสินค้าในตะกร้า
    actionAddtoCart: (product) => {
      const carts = get().carts;  // ดึงข้อมูลตะกร้าปัจจุบันจาก state
      const updateCart = [...carts, { ...product, count: 1 }];  // เพิ่มสินค้าที่เลือกในตะกร้า

      // ทำให้สินค้าที่เพิ่มในตะกร้าไม่ซ้ำกัน
      const unique = _.unionWith(updateCart, _.isEqual);  // ใช้ lodash unionWith เพื่อลบรายการที่ซ้ำ
      set({ carts: unique });  // อัปเดต state carts
    },

    // ฟังก์ชันอัปเดตจำนวนสินค้าที่เลือกในตะกร้า
    actionUpdateQuantity: (productId, newQuantity) => {
      set((state) => ({
        carts: state.carts.map((item) =>
          item.id === productId
            ? { ...item, count: Math.max(1, newQuantity) }  // อัปเดตจำนวนสินค้าในตะกร้า
            : item
        ),
      }));
    },
    
    // ฟังก์ชันลบสินค้าออกจากตะกร้า
    actionRemoveProduct: (productId) => {
      console.log('remove product', productId); 
      set((state) => ({
        carts: state.carts.filter((item) => item.id !== productId),  // ลบสินค้าที่ตรงกับ productId ออกจากตะกร้า
      }));
    },

    // ฟังก์ชันคำนวณราคารวมของสินค้าในตะกร้า
    getTotalPrice: () => {
      return get().carts.reduce((total, item) => {
        return total + item.price * item.count;  // คำนวณราคารวมตามจำนวนสินค้า
      }, 0);
    },

    // ฟังก์ชันสำหรับเข้าสู่ระบบ
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:8000/api/login', form);  // ส่งข้อมูลไปที่ API เพื่อล็อกอิน

        set({
            user: res.data.payload,  // เก็บข้อมูลผู้ใช้ที่ได้รับจาก API
            token: res.data.token,  // เก็บ token ที่ได้รับจาก API
        });
        return res;
    },

    // ฟังก์ชันสำหรับออกจากระบบ
    actionLogout: () => {
      localStorage.clear();  // ล้างข้อมูลใน localStorage
      set({ user: null, token: null });  // ตั้งค่าผู้ใช้และ token ให้เป็น null
    },

    // ฟังก์ชันดึงข้อมูลประเภทสินค้า
    getCategory: async () => {
        try {
          const res = await listCategory();  // เรียก API ดึงข้อมูลประเภทสินค้า
          set({ categories: res.data });  // อัปเดต state categories
        } catch (err) {
          console.log(err);  // แสดง error หากเกิดข้อผิดพลาด
        }
    },

    // ฟังก์ชันค้นหาสินค้าตามฟิลเตอร์
    actionSearchFilter: async (arg) => {
        try {
          const res = await searchFilters(arg);  // เรียก API เพื่อค้นหาสินค้าตามเงื่อนไข
          set({ products: res.data });  // อัปเดต state products ด้วยข้อมูลที่ค้นหาได้
        } catch (err) {
          console.log(err);  // แสดง error หากเกิดข้อผิดพลาด
        }
    },

    // ฟังก์ชันดึงสินค้าตามจำนวนที่ต้องการ
    getProduct: async (count) => {
        try {
          const res = await listProduct(count);  // เรียก API เพื่อดึงสินค้าตามจำนวนที่กำหนด
          set({ products: res.data });  // อัปเดต state products ด้วยสินค้าที่ได้
        } catch (err) {
          console.log(err);  // แสดง error หากเกิดข้อผิดพลาด
        }
    },
});

// การตั้งค่าเพื่อเก็บข้อมูลใน localStorage
const usePersist = {
    name: "camera-store",  // ตั้งชื่อ key สำหรับเก็บใน localStorage
    storage: createJSONStorage(() => localStorage),  // ระบุว่าจะใช้ localStorage เป็นแหล่งเก็บข้อมูล
};

// สร้าง store ของ Zustand โดยใช้ persist middleware
const useCameraStore = create(persist(cameraStore, usePersist));

export default useCameraStore;  // ส่งออก store เพื่อใช้ในคอมโพเนนต์อื่น ๆ
