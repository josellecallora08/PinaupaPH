import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice, resetInvoiceStatus } from '../features/invoice'
import { fetchUsers } from '../features/user'
import Select from 'react-select'
import PopUp from "../Component/PopUp"

const ManualInvoice = ({ setModal }) => {
  const dispatch = useDispatch()
  const [selectedUser, setSelectedUser] = useState(null)
  const loading = useSelector((state) => state.invoice.loading)
  const error = useSelector((state) => state.invoice.error)
  const msg = useSelector((state) => state.invoice.msg)
  const users = useSelector((state) => state.user.data)
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const errorInvoice = useSelector((state) => state.invoice.error)
  const msgInvoice = useSelector((state) => state.invoice.msg)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleInvoice = (e) => {
    e.preventDefault()
    if (selectedUser) {
      dispatch(createInvoice(selectedUser.value))
    }
  }

useEffect(() => { 
  console.log('msgInvoice', msgInvoice)
  console.log('errorInvoice', errorInvoice)

}, [msgInvoice, errorInvoice])

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
  }, [setModal])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (msgInvoice !== null) {
      setPopupMessage(msgInvoice)
    } else if (errorInvoice !== null) {
      setPopupMessage(errorInvoice)
    }

    if (msgInvoice !== null || errorInvoice !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetInvoiceStatus())
        setModal(false)
      }, 3000)
    }
  }, [msgInvoice, errorInvoice, dispatch, setModal])

  const options = users
    ? users.map((user) => ({
        value: user.user_id._id,
        label: user.user_id.name,
      }))
    : []

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      {showPopup && (
        <PopUp
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          isError={error}
        />
      )}
      <div
        onClick={() => setModal((state) => !state)}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      ></div>
      <div className="w-full md:w-1/3 bg-white z-20 rounded-md shadow-md overflow-y-auto max-h-[90vh]">
        <h1 className="bg-primary-color uppercase font-bold tracking-wider text-white p-3">
          Prepare Invoice
        </h1>
        <div className="p-5">
          <form onSubmit={handleInvoice} className="flex flex-col gap-4">
            <Select
              value={selectedUser}
              onChange={(selectedOption) => setSelectedUser(selectedOption)}
              options={options}
              isClearable
              className="font-semibold"
              placeholder="Select Tenant"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
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
