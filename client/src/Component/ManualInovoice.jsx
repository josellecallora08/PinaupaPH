import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice } from '../features/invoice'
import { fetchUsers } from '../features/user'
import { useParams } from 'react-router-dom'

const ManualInovoice = ({ setModal }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState('')
  const modal = useRef(null)
  const users = useSelector((state) => state.user.data)
  const units = useSelector((state) => state.unit.data)
  const handleInvoice = (e) => {
    e.preventDefault()
    console.log(user)
    dispatch(createInvoice(user))
  }

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key == 'Escape') {
        setModal((state) => (state = false))
      }
    }

    document.addEventListener('keydown', closeModal)

    return () => {
      document.removeEventListener('keydown', closeModal)
    }
  }, [])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  


  return (
    <div className="fixed w-full h-full flex  items-center justify-center z-10 ">
      <div
        onClick={() => setModal((state) => (state = false))}
        className="absolute w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm"
      ></div>
      <div className="w-full md:w-1/5 h-fit bg-white z-10 rounded-md shadow-md flex flex-col overflow-hidden">
        <h1 className="bg-primary-color uppercase font-bold tracking-wider text-white p-3">
          Prepare Invoice
        </h1>
        <div className="w-full h-full flex justify-between py-5">
          <form
            onSubmit={handleInvoice}
            method="POST"
            className="w-4/5 m-auto h-full flex flex-col gap-3 z-10"
          >
            <select
              onChange={(e) => setUser(e.target.value)}
              className="select font-semibold select-bordered w-full max-w-xs"
            >
              <option value="">Select Tenant</option>
              {users?.map((val, key) => (
                <option value={`${val._id}`}>{val.name}</option>
              ))}
            </select>
            <div className="w-full h-full flex gap-2 max-h-12">
              <button
                type="submit"
                className="w-full border border-primary-color text-white rounded-md bg-primary-color p-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setModal((prevState) => !prevState)}
                className="w-full border border-primary-color text-primary-color rounded-md p-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ManualInovoice
