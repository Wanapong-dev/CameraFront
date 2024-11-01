import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react';
import { House } from 'lucide-react';

export default function SidebarUser() {
    return (
        <div className='bg-black w-64 text-gray-100 
        flex flex-col h-screen'>
    
          <div className='h-24 bg-black flex items-center
          justify-center text-2xl font-bold'>
           User Panel
          </div>
    
          <nav className='flex-1 px-4 py-4 space-y-2'>
            <NavLink
              to={'/user'}
              end
              className={({ isActive }) =>
                isActive
                  ? 'bg-yellow-400 rounded-md text-white px-4 py-2 flex items-center'
                  : 'text-gray-300 px-4 py-2 hover:bg-yellow-700 hover:text-white rounded flex items-center'
              }
            >
              <House className='mr-2' />
              Home
            </NavLink>


            <NavLink
              to={'/user/order-success'}
              end
              className={({ isActive }) =>
                isActive
                  ? 'bg-yellow-400 rounded-md text-white px-4 py-2 flex items-center'
                  : 'text-gray-300 px-4 py-2 hover:bg-yellow-700 hover:text-white rounded flex items-center'
              }
            >
              <House className='mr-2' />
              History
            </NavLink>
           
    
    
      
    
          </nav>
    
    
        </div>
      )
    }

