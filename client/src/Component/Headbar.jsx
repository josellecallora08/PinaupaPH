import React from 'react'
import pfp from '/pfp.svg'
import { useState } from 'react'
import { TbBellRinging } from "react-icons/tb";
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { toggleProfile, toggleSidebar } from '../features/menu';
import menu from '/menu.svg'
import close from '/close.svg'
import { logout } from '../features/authentication';

const Headbar = () => {
  const sidebar = useSelector(state => state.toggle.sidebar) //for sidebar ternary
  const profile = useSelector(state => state.toggle.profile) //for profile ternary
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  //function for sidebar toggle buttons
  const handleSidebar = () => { 
    dispatch(toggleSidebar())
  }

  //function for profile toggle buttons
  const handleProfile = () => {
    dispatch(toggleProfile())
  }

  const pfpmenu = [
    {
      title: "Profile",
      path: "/profile",
    },
    {
      title: "Logout",
      path: handleLogout,
  
    }
  ]
    
  return (
    
<div className='w-full h-full max-h-20 sticky top-0 z-20 bg-primary'>
  <div className=' flex justify-between items-center p-5 w-full relative m-auto  '>
    <button onClick={handleSidebar} className='flex items-center'>
      <figure className='w-full h-full max-w-5 max-h-5'>
        <img src={sidebar ? close : menu} className='w-full h-full' alt="" />
      </figure>
    </button>
      <div className='flex items-center'>
        <TbBellRinging size={25} color='white' />
        <img src={pfp} alt='' className=' w-10 h-10 rounded-full ml-2  cursor-pointer' onClick={handleProfile} />
        {profile ?   <ul>
      <div className='absolute top-full right-2 text-black rounded-bl-md rounded-br-md shadow-2xl bg-white shadow-light-gray   '>
          <ul>
           {
            pfpmenu.map((menu, index) => (
              <li key={index} className='text-sm font-medium w-32 py-1  hover:bg-gray pl-3 '><Link to={menu.path}>{menu.title}</Link></li>
            ))
           }  
          </ul>
        </div>
      </ul> : '' }
      </div>
    </div>
</div>
  );
}

export default Headbar