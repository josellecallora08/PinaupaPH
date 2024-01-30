import React from 'react'
import { Link } from 'react-router-dom'
const ApartmentCard = () => {
  return (
    <>
     <Link to={"/apartmentprofile"}>
    <div className='  flex mx-3 shadow-md shadow-dark-gray relative '>
      <div className=' lg:text-base lg:pl-10 flex gap-9 py-4  w-80 pl-5 pr-1 rounded-tl-lg rounded-bl-lg'>
        <div className=' '>
          <p className=' font-black'>Name</p>
          <p>Address</p>
          <p>Subdivision</p>
        </div>
        <div>
          <p className=' font-black'>Facebook Apartment</p>
          <p>Cavite</p>
          <p>Dasma</p>
        </div>
       
      </div>
     
      <div className=' absolute right-0 h-[106px] bg-dark-blue w-24  pt-4 rounded-tr-lg rounded-br-lg text-center'>
          <p className='text-white text-xl '>Apt</p>
          <p className='text-white font-black text-2xl'>001</p>
        </div>
      
    </div>
    </Link>
    </>
  )
}

export default ApartmentCard