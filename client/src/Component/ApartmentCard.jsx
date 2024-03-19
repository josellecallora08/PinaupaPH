import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchApartments } from '../features/apartment'
const ApartmentCard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.apartment.data)
  const loading = useSelector(state => state.apartment.loading)
  useEffect(() => {
    dispatch(fetchApartments())
  }, [dispatch, loading])
  return (
    <>
     <Link to={"/apartmentprofile"}>
    <div className='flex shadow-md shadow-dark-gray relative '>
      <div className=' lg:text-base lg:pl-10 text-sm flex gap-9 py-4  w-80 pl-5 pr-1 rounded-tl-lg rounded-bl-lg'>
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
     
      <div className=' lg:w-28 lg:h-[106px] absolute right-0 h-[94px] bg-dark-blue w-24  pt-4 rounded-tr-lg rounded-br-lg text-center'>
          <p className='text-white text-xl '>Apt</p>
          <p className='text-white font-black text-2xl'>001</p>
        </div>
      
    </div>
    </Link>
    </>
  )
}

export default ApartmentCard