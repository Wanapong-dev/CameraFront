import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderUser from '../component/user/HeaderUser'
import SidebarUser from '../component/user/SidebarUser'


export default function Layoutuser() {
  return (
    <div className='flex h-screen'>
    <SidebarUser />
    <div className='flex-1 flex flex-col'>
        <HeaderUser />
        <main className='flex-1 p-6
       overflow-y-auto'>
            <Outlet />
        </main>
    </div>
</div>
  )
}
