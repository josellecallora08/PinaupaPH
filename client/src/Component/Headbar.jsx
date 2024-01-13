import React from 'react'
import pfp from '../Image/pfp.png'
import { useState } from 'react'
import { TbBellRinging } from "react-icons/tb";
import { Link } from 'react-router-dom';
const pfpmenu = [
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Logout",
    path: "/logout",

  }
]
const Headbar = () => {
  const [Open, setOpen] = useState(false);
  const togglepfp = () => {
    setOpen(!Open);
  };
  return (
    
<div className='hidden lg:bg-dark-blue lg:flex justify-end items-center px-10 pt-5 pb-3 w-auto relative   '>
      <div className='flex items-center'>
        <TbBellRinging size={25} color='white' />
        <img src={pfp} alt='' className=' w-10 h-10 rounded-full ml-2  cursor-pointer' onClick={togglepfp} />
      </div>
      {
        Open&&(
          <ul>
      <div className='absolute top-full right-2 text-black rounded-bl-md rounded-br-md shadow-2xl bg-white shadow-light-gray   '>
          <ul>
        {}
           {
            pfpmenu.map((menu, index) => (
              <li key={index} className='text-sm font-medium w-32 py-1  hover:bg-gray pl-3 '><Link to={menu.path}>{menu.title}</Link></li>
            ))
           }  
          </ul>
        </div>
      </ul>
        )
      }
      

    </div>
  );
}

export default Headbar