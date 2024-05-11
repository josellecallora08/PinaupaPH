import React from 'react'
import { MdOutlineClose, MdOutlineRemoveRedEye } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDocument } from '../features/documents'

const LeaseCard = ({ val }) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteDocument(val._id))
      console.log('Deleting item...')
    }
  }

  return (
    <Link to={`/agreement/${val._id}/${val.pdf.reference}`}>
      <div className="relative hover:scale-105 hover:duration-300 cursor-pointer flex flex-row shadow-sm shadow-light-gray rounded-md items-center bg-white">
        <div className="w-[95%] flex gap-2 items-center m-auto">
          <figure className="w-[70px] items-center">
            <img
              src={val?.tenant_id?.user_id?.profile_image?.image_url}
              alt="Profile"
            />
          </figure>
          <div className="py-6 align-middle">
            <h1 className="text-nowrap">{val?.tenant_id?.user_id?.name}</h1>
            <p className="bg-primary-color rounded-md w-[70px] content-center text-white text-center">
              {val?.tenant_id?.unit_id?.unit_no}
            </p>
          </div>
          <div className='flex justify-end'>
            <button
              onClick={handleDelete}
              className="bg-red inline-flex p-2 rounded-md absolute top-8 right-4 hover:bg-red/55"
            >
              <MdOutlineClose color="white" size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default LeaseCard
