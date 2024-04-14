import React from 'react'
import pfp from '/pfp.svg'
import { Link } from 'react-router-dom'
const TenantConcernCard = () => {
  return (
    <>

    <Link to={"/tenant/viewconcern"}>
      <div className=' flex h-28 w-full mt-5 items-center rounded-tl-lg rounded-bl-lg  shadow-md shadow-dark-gray'>
        <div className='h-28 w-4 rounded-tl-lg rounded-bl-lg bg-lime'></div>
        <div className='flex justify-evenly w-full'>
            <div><img src={pfp} className='w-16 h-auto' alt="" /></div>
            <div className=''>
                <div className='font-bold text-lg'>Joselle Callora</div>
                <div className='text-sm text-dark-gray'>Maintenance Request</div>
                <div className='text-sm'>Unit 315</div>
            </div>
            <div className='text-sm mt-1'>03/13/2024</div>
        </div>
      </div>
      </Link>
    </>
  )
}

export default TenantConcernCard
