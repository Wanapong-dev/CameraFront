import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Register() {

const [form,setForm] = useState({
  email:"",
  password:"",
  confirmPassword:""
})

const hdlOnChange = (e) => {
setForm({
  ...form,
  [e.target.name] : e.target.value
})
}

const hdlSubmit = async (e) => {
  e.preventDefault()
  if(form.password !== form.confirmPassword) {
    return alert("Confirm Password is not Match!!")
  }

  try {
    const res = await axios.post('http://localhost:8000/api/register',form)
    toast.success(res.data)
  } catch (err) {
    const errMsg = err.response?.data?.message 
    toast.error(errMsg)
    console.log(err)  
  }
}



  return (
    <div className="w-screen  flex justify-center items-center">
      <div className=" p-10 rounded-lg shadow-lg w-3/5">
        <h1 className="flex justify-center items-center text-3xl font-bold text-yellow-500 mb-6">
          Create account
        </h1>
        <form onSubmit={hdlSubmit} className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label className="block text-yellow-500 mb-2">Email</label>
            <input
              onChange={hdlOnChange}
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-yellow-500 mb-2">Password</label>
            <input
              onChange={hdlOnChange}
              name="password"
              type="text"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4 relative w-full">
            <label className="block text-yellow-500 mb-2">Confirm Password</label>
            <input
              onChange={hdlOnChange}
              name="confirmPassword"
              type="text"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-6">
            <p className="text-yellow-500 text-center">
              I accept the terms and privacy policy
            </p>
          </div>
          <button className="w-3/5 bg-yellow-400 text-white p-3 rounded-lg font-bold hover:bg-yellow-600 mx-auto" >
            Sign Up
          </button>
        </form>
        <p className="text-yellow-500 text-center mt-6">
          ถ้ามี account แล้ว ? <Link to={'/login'} className="hover:text-yellow-600 " >เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}
