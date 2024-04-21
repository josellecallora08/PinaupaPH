import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
const LeaseCard = () => {
  return (
    <div className="flex flex-row shadow-sm shadow-light-gray rounded-md items-center">
      <div className='w-[95%] flex gap-2 items-center m-auto'>
        <figure className="w-[70px] items-center">
          <img src="/pfp.svg" alt="Profile" />
        </figure>
        <div className="py-6 align-middle">
          <h1 className="text-nowrap">LOREM IPSUM</h1>
          <p className="bg-primary-color rounded-md w-[70px] content-center text-white text-center">
            317
          </p>
        </div>

        <div className="flex items-center justify-end gap-3  w-full">
          <button className="bg-primary-color p-2 inline-flex flex-row items-center rounded-md">
            <h1 className="text-white text-xs">View</h1>
            <MdOutlineRemoveRedEye color="white" size={20} />
          </button>
          <button className="bg-red inline-flex p-2 flex-row items-center rounded-md">
            <MdOutlineClose color="white" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeaseCard
