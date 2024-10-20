import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import useCameraStore from "../../store/camera-store";
import { useNavigate } from "react-router-dom";


export default function Login() {


const navigate = useNavigate()
const actionLogin = useCameraStore((state)=> state.actionLogin)
const user = useCameraStore((state)=> state.user)



const [form,setForm] = useState({
  email:"",
  password:"",
})

const hdlOnChange = (e) => {
setForm({
  ...form,
  [e.target.name] : e.target.value
})
}

const hdlSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await actionLogin(form)
    const role = res.data.payload.role
    roleRedirect(role)
    toast.success('Login Success')
  } catch (err) {

    const errMsg = err.response?.data?.message
    toast.error(errMsg)
  }
}

const roleRedirect = (role) => {
  if(role ==='admin') {
    navigate('/')
  } else {
    navigate('/')
  }
}



  return (
    <div className="w-screen flex justify-center items-center">
      <div className=" p-10 rounded-lg shadow-lg w-3/5">
        <h1 className="flex justify-center items-center text-3xl font-bold text-yellow-500 mb-6">
          Login
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
         
         
          <button className="mt-8 w-3/5 bg-yellow-400 text-white p-3 rounded-lg font-bold hover:bg-yellow-600 mx-auto" >
            Login
          </button>
        </form>
        <p className="text-yellow-500 text-center mt-6">
          ถ้ายังไม่มี account ? <Link to={'/register'} className="hover:text-yellow-600 " >สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}
