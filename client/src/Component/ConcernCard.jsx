import React, { useState } from 'react'
import pfp from '/pfp.svg'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

import { Link } from 'react-router-dom'
const ConcernCard = ({ val, num }) => {
  const [isDotOpen, setIsDotOpen] = useState(false)

  const toggleDot = () => {
    setIsDotOpen(!isDotOpen)
  }
  return (
    <>

    <Link to={`/view-concern/${val._id}`}>
        <div className=" flex h-28 w-full mt-5 items-center rounded-tl-lg rounded-bl-lg bg-white  shadow-md shadow-gray">
          <div
            className={` h-28 w-4 rounded-tl-lg rounded-bl-lg ${val?.status ? 'bg-lime' : 'bg-red'}`}
          ></div>
          <div className=" flex justify-evenly w-full ">
            <div className="">
              <img
                src={val?.user?.profile_image.image_url}
                className="rounded-full h-16 w-16"
                alt=""
              />
            </div>
            <div className="">
              <div className="font-bold text-lg">{val.user.name}</div>
              <div className="text-sm text-dark-gray">{val.title}</div>
              <div className="text-sm">
                Unit - <span>{val.unit.unit_no}</span>
              </div>
            </div>
            <div className=" text-sm mt-1">
              {new Date(val.createdAt).toLocaleDateString()}
            </div>
           
          </div>
        </div>
      </Link>

 

   
    </>
  )
}

export default ConcernCard
