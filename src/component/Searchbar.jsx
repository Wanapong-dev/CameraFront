import React, { useEffect, useState } from 'react'
import useCameraStore from '../store/camera-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';



export default function Searchbar() {
    const getProduct = useCameraStore((state)=>state.getProduct)
    const products = useCameraStore((state)=>state.products)
    const actionSearchFilter = useCameraStore((state)=>state.actionSearchFilter)

    const getCategory = useCameraStore((state)=>state.getCategory)
    const categories = useCameraStore((state)=>state.categories)
    
    const [text,setText] = useState('')
    const [price,setPrice] = useState([100,200000])
    const [ok,setOk] = useState(false)

    useEffect(()=>{
        getCategory()
    },[])



    // Search text 
    useEffect(()=>{
        const delay = setTimeout(()=>{
          if(text) {
              actionSearchFilter({query:text})
            } else {
              getProduct()
            }
        },300)

        return ()=> clearTimeout(delay)
    },[text])
   

    // Search by Price
    useEffect(()=>{
      actionSearchFilter({ price })
    },[ok])
    
    const hdlPrice = (value) => {
      console.log(value)
      setPrice(value)

      setTimeout(() => {
        setOk(!ok)
      },300)
    }

  return (
<div className="flex flex-col w-full h-full items-center justify-center p-4 gap-4 mt-8 mb-8">
  <label className="input input-bordered flex items-center gap-2 w-3/5 bg-gray-800 text-yellow-400 rounded-md focus-within:ring-2 focus-within:ring-yellow-500">
    <input
      onChange={(e)=>setText(e.target.value)}
      type="text"
      className="grow px-4 py-2 bg-gray-800 text-yellow-400 placeholder-yellow-500 focus:outline-none"
      placeholder="Search"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70 text-yellow-400"
    >
      <path
        fillRule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clipRule="evenodd"
      />
    </svg>
  </label>

<br />
    <div className='w-4/5 ' >
        <h1 className='flex justify-center text-center text-xl font-bold text-yellow-400 '>Price</h1>
        <div>
          <div className='flex justify-between'>
            <span className='text-yellow-400'>Min : {price[0]}</span>
            <span className='text-yellow-400'>Max : {price[1]}</span>
          </div>
          <Slider 
        onChange={hdlPrice}
        range
        min={0}
        max={200000}
        defaultValue={[0, 30000]}
        trackStyle={[{ backgroundColor: '#FFD700' }]}  // แถบสีของ slider
        handleStyle={[
          { borderColor: '#FFD700', backgroundColor: 'black' }, // ปุ่มเลื่อน
          { borderColor: '#FFD700', backgroundColor: 'black' }
        ]}
        railStyle={{ backgroundColor: 'gray' }}  // แถบที่ไม่ได้ใช้งาน
      />
        </div>
    </div>


</div>

  )
}
