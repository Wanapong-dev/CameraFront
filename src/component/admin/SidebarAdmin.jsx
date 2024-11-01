import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react';
import { ChartNoAxesGantt } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Scroll } from 'lucide-react';

export default function SidebarAdmin() {
    return (
        <div className='bg-black w-64 text-gray-100 
        flex flex-col h-screen'>
    
          <div className='h-24 bg-black flex items-center
          justify-center text-2xl font-bold'>
            Admin Panel
          </div>
    
          <nav className='flex-1 px-4 py-4 space-y-2'>
            <NavLink
              to={'/admin'}
              end
              className={({ isActive }) =>
                isActive
                  ? 'bg-yellow-400 rounded-md text-white px-4 py-2 flex items-center'
                  : 'text-gray-300 px-4 py-2 hover:bg-yellow-700 hover:text-white rounded flex items-center'
              }
            >
              <LayoutDashboard className='mr-2' />
              Dashboard
            </NavLink>
            <NavLink
              to={'manage'}
              className={({ isActive }) =>
                isActive
                  ? 'bg-yellow-400 rounded-md text-white px-4 py-2 flex items-center'
                  : 'text-gray-300 px-4 py-2 hover:bg-yellow-700 hover:text-white rounded flex items-center'
              }
            >
              <ChartNoAxesGantt className='mr-2' />
              Manage
            </NavLink>
    
    
            <NavLink
              to={'category'}
              className={({ isActive }) =>
                isActive
                  ? 'bg-yellow-400 rounded-md text-white px-4 py-2 flex items-center'
                  : 'text-gray-300 px-4 py-2 hover:bg-yellow-700 hover:text-white rounded flex items-center'
              }
            >
              <Scroll className='mr-2' />
              Category
            </NavLink>
    
    
            <NavLink
              to={'product'}
              className={({ isActive }) =>
                isActive
                  ? 'bg-yellow-400 rounded-md text-white px-4 py-2 flex items-center'
                  : 'text-gray-300 px-4 py-2 hover:bg-yellow-700 hover:text-white rounded flex items-center'
              }
            >
              <Camera className='mr-2' />
              Product
            </NavLink>
    
          </nav>
    
    
        </div>
      )
    }

