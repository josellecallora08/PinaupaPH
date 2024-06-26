import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConcernCard = ({ val, num }) => {
  const [isDotOpen, setIsDotOpen] = useState(false)

  const toggleDot = () => {
    setIsDotOpen(!isDotOpen)
  }

  return (
    <>
      <style jsx>{`
        .truncate-title {
          display: block;
          max-width: 200px; /* Adjust this value as needed */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      <Link to={`/view-concern/${val?._id}`}>
        <div className="hover:scale-105 pr-2 hover:duration-300 flex h-28 w-full mt-5 items-center rounded-tl-lg rounded-bl-lg bg-white shadow-md shadow-gray">
          <div
            className={`h-28 w-4 rounded-tl-lg rounded-bl-lg ${val?.status ? 'bg-lime' : 'bg-red'}`}
          ></div>
          <div className="flex justify-evenly w-full">
            <figure className="w-16 h-16 overflow-hidden rounded-full">
              <img
                src={val?.sender_id?.user_id?.profile_image.image_url}
                className="size-full"
                alt=""
              />
            </figure>
            <div className="">
              <div className="font-bold text-lg">
                {val?.sender_id?.user_id?.name}
              </div>
              <div className="text-sm w-fit text-dark-gray truncate-title">
                {val.title}
              </div>
              <div className="text-sm">
                Unit - <span>{val?.sender_id?.unit_id.unit_no}</span>
              </div>
            </div>
            <div className="text-sm mt-1">
              {new Date(val?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ConcernCard
