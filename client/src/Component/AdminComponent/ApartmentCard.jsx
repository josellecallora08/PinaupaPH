import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchApartments } from '../../features/apartment'
const ApartmentCard = ({ val, num }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.apartment.data)
  const loading = useSelector((state) => state.apartment.loading)
  // useEffect(() => {
  //   dispatch(fetchApartments())
  // }, [])
  return (
    <>
      <Link
        to={`/apartment/${val._id}`}
        className="col-span-1 rounded-md row-span-1 hover:scale-105  hover:z-10 hover:duration-300   bg-white  overflow-hidden flex"
      >
        <div className="p-5 h-full w-full flex items-center ">
          <div className="flex flex-col max-w-fit">
            <p className="flex ">
              {/* <p className="w-28 text-xs lg:text-base">Name : </p> */}
              <span className="font-bold font-sans text-sm uppercase md:w-full lg:text-lg w-52 xl:w-[200px] 2xl:w-[250px] text-black/60 text-nowrap text-ellipsis overflow-hidden">
                {val.name}
              </span>
            </p>
            <p className="flex ">
              {/* <p className="w-28 text-xs lg:text-base">Address : </p> */}
              <span className="text-xs lg:text-base w-52 md:w-full xl:w-[200px] 2xl:w-[250px]  font-semibold text-black/60 text-nowrap text-ellipsis overflow-hidden">
                {val.address}
              </span>
            </p>
            <p className="flex ">
              {/* <p className="w-28 text-xs lg:text-base">Subdivision : </p> */}
              <span className=" text-xs lg:text-base  text-black/50">
                {val.barangay}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full h-full max-w-32 border bg-primary-color">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="font-semibold text-2xl text-white font-serif">APT</p>
            <p className="font-bold text-4xl text-white">00{num + 1}</p>
          </div>
        </div>
      </Link>
      {/* check */}

      {/* <div className='flex shadow-md shadow-dark-gray relative '>
      <div className=' lg:text-base lg:pl-10 text-sm flex gap-9 py-4  w-80 pl-5 pr-1 rounded-tl-lg rounded-bl-lg'>
        <div className=' '>
          <p className=' font-black'>Name</p>
          <p>Address</p>
          <p>Subdivision</p>
        </div>
        <div className=''>
          <p className='font-black'>{val.name}</p>
          <p>{val.address}</p>
          <p>{val.subdivision}</p>
        </div>
       
      </div>
     
      <div className=' lg:w-28 lg:h-[106px] absolute right-0 h-[94px] bg-dark-blue w-24  pt-4 rounded-tr-lg rounded-br-lg text-center'>
          <p className='text-white text-xl '>Apt</p>
          <p className='text-white font-black text-2xl'>00{num}</p>
        </div>
      
    </div> */}
    </>
  )
}

export default ApartmentCard
