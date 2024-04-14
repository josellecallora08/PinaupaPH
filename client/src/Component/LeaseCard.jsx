import React from 'react'
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineRemoveRedEye } from 'react-icons/md'
const LeaseCard = () => {
  return (
    <div className="flex flex-row shadow-sm shadow-light-gray rounded-md m-2 items-center">
      <figure className="w-[70px] mx-6 items-center">
        <img src="/pfp.svg" alt="Profile" />
      </figure>
      <div className="py-6 align-middle">
        <h1 className='text-nowrap'>LOREM IPSUM</h1>
        <p className="bg-primary-color rounded-md w-[70px] content-center text-white text-center">317</p>
      </div>

      <div className="flex items-center justify-end gap-3  w-full mr-6">
        <button className="bg-primary-color inline-flex lg:px-3 py-2 px-6 flex-row items-center rounded-md">
          <h1 className="text-white mr-3 text-xs">View</h1>
          <MdOutlineRemoveRedEye color="white" size={20} />
        </button>
        <button className="bg-red inline-flex py-2 px-6 flex-row items-center rounded-md">
          <MdOutlineClose color="white" size={18} />
        </button>
      </div>
    </div>
  )
}

export default LeaseCard
