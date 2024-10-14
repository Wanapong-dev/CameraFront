import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../component/admin/SidebarAdmin'
import HeaderAdmin from '../component/admin/HeaderAdmin'



export default function LayoutAdmin() {
  return (
    <div className='flex h-screen'>
        <SidebarAdmin />
        <div className='flex-1 flex flex-col'>
            <HeaderAdmin />
            <main className='flex-1 p-6
           overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    </div>
)
}
