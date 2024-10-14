import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
     <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition: Bounce
    />
      <AppRoutes />
    </>
  )
}

export default App
