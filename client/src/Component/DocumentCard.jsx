import React from 'react'
import TenantProfileInfo from '../Data/TenantProfileInfo'
import { GrFormView } from "react-icons/gr";
import { FiRefreshCcw } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
const DocumentCard = () => {
  return (
    <div>
      {/* Document Card */}
      <div className='p-5 rounded-md shadow-sm shadow-light-gray '>
        <h1 className='text-3xl font-bold mb-3'>Least Agreement</h1>
        <div className='flex gap-5'>
          <div>
            <img src={TenantProfileInfo[0].Account[0].pfp} alt="Profile" className='w-14' />
          </div>
          <div className='mb-4'>
            <h2 className='text-xl font-black'>{TenantProfileInfo[0].PersonalDetails[0].name}</h2>
            <p className=' bg-dark-blue w-20 text-sm text-center text-white rounded-lg py-1 my-3 font-black'>{TenantProfileInfo[0].ApartmentDetails[0].aparmentunit}</p>
            <p className='text-xl font-black'>Date of Renewal</p>
            <p className='text-light-gray mt-2 font-lg'>{TenantProfileInfo[0].ApartmentDetails[0].dateofrenewal}</p>
          </div>
        </div>
        <div className='flex gap-3 justify-end'>
          <button className='flex items-center gap-1 bg-dark-blue justify-center text-white py-2 px-4 rounded'>View<GrFormView color='white' size={25} className=''/></button>
          <button className='bg-lime text-white py-2 px-4 rounded'><FiRefreshCcw color='white' /></button>
          <button className='bg-red text-white py-2 px-4 rounded'><IoClose color='white' /></button>
        </div>
      </div>
    </div>
  )
}

export default DocumentCard