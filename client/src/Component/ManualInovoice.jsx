import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice } from '../features/invoice'
import { fetchUsers } from '../features/user'
import Select from 'react-select'

const ManualInvoice = ({ setModal }) => {
  const dispatch = useDispatch()
  const [selectedUser, setSelectedUser] = useState(null)
  const modal = useRef(null)
  const loading = useSelector((state) => state.invoice.loading)
  const error = useSelector((state) => state.invoice.error)
  const msg = useSelector((state) => state.invoice.msg)
  const users = useSelector((state) => state.user.data)

  const handleInvoice = (e) => {
    e.preventDefault()
    dispatch(createInvoice(selectedUser.value))
    if ( msg || error) {
      setModal((state) => !state)
    }
  }

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape') {
        setModal((state) => !state)
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

  const options = users
    ? users.map((user) => ({
        value: user.user_id._id,
        label: user.user_id.name,
      }))
    : []

  // Custom styles for the Select component
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%',
      maxHeight: '8.5rem',
      overflowY: 'auto',
    }),
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        onClick={() => setModal((state) => !state)}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      ></div>
      <div className="w-full md:w-1/3 bg-white z-10 rounded-md shadow-md overflow-hidden">
        <h1 className="bg-primary-color uppercase font-bold tracking-wider text-white p-3">
          Prepare Invoice
        </h1>
        <div className="p-5 h-[13rem]">
          <form onSubmit={handleInvoice} className="flex flex-col gap-4">
            <Select
              value={selectedUser}
              onChange={(selectedOption) => setSelectedUser(selectedOption)}
              options={options}
              isClearable
              className="font-semibold"
              styles={{
                ...customStyles,
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              placeholder="Select Tenant"
            />
            <div className="flex mt-5 gap-2">
              <button
                type="submit"
                className="flex-1 border border-primary-color text-white rounded-md bg-primary-color py-2"
              >
                {loading ? 'Downloading...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => setModal((prevState) => !prevState)}
                className="flex-1 border border-primary-color text-primary-color rounded-md py-2"
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

export default ManualInvoice
