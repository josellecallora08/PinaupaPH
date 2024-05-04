import React from 'react'
import { MdOutlineClose, MdOutlineRemoveRedEye } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDocument } from '../features/documents'

const LeaseCard = ({ val }) => {
  const dispatch = useDispatch()
  console.log(val._id)
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteDocument(val._id))
      console.log('Deleting item...')
    }
  }

  return (
    <div className="flex flex-row shadow-sm shadow-light-gray rounded-md items-center bg-white">
      <div className="w-[95%] flex gap-2 items-center m-auto">
        <figure className="w-[70px] items-center">
          <img src="/pfp.svg" alt="Profile" />
        </figure>
        <div className="py-6 align-middle">
          <h1 className="text-nowrap">{val?.tenant_id?.user_id.name}</h1>
          <p className="bg-primary-color rounded-md w-[70px] content-center text-white text-center">
            {val?.tenant_id?.unit_id?.unit_no}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3  w-full">
          <Link
            to={`/agreement/${val._id}/${val.pdf.reference}`}
            className="bg-primary-color p-2 inline-flex gap-1 flex-row items-center rounded-md"
          >
            <h1 className="text-white text-xs">View</h1>
            <MdOutlineRemoveRedEye color="white" size={15} />
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red inline-flex p-2 flex-row items-center rounded-md"
          >
            <MdOutlineClose color="white" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeaseCard
