import React, { useState, useRef, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'

const CreateDepositReq = ({ setisCreateDepositReq, onSubmit }) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const modalRef = useRef(null)

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsCreateDepositReq(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.')
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 3000)
      return
    }

    if (!description.trim()) {
      setError('Please enter a description.')
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 3000)
      return
    }

    const newRequest = {
      amount: parseFloat(amount),
      description: description.trim(),
      dateRequested: new Date().toISOString(),
    }

    onSubmit(newRequest)
    setAmount('')
    setDescription('')
    setError('')
    setIsCreateDepositReq(false)
  }

  return (
    <div className="fixed top-36 left-1/4 w-1/2 h-auto flex items-center justify-center bg-opacity-50 z-50">
      <div ref={modalRef} className="lg:w-9/12 bg-white rounded-lg relative">
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center">
          <h1 className="lg:text-xl ml-5 text-lg font-bold">
            Create Deposit Request
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-full lg:pt-4 w-[20rem] bg-white h-auto px-4 overflow-y-auto"
        >
          <button
            type="button"
            className="absolute top-4 right-6"
            onClick={() => setisCreateDepositReq((prevState) => !prevState)}
          >
            <IoMdClose size={25} color="white" />
          </button>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-bold mb-2 text-dark-gray"
            >
              Requested Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="text-sm bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-dark-gray"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
              rows={5}
            ></textarea>
          </div>
          <div className="flex justify-end mt-5 mb-3 gap-3">
            <button
              type="submit"
              className="bg-dark-blue text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red text-white font-bold py-2 px-4 rounded"
              onClick={() => setisCreateDepositReq((prevState) => !prevState)}
            >
              Close
            </button>
          </div>
        </form>
        {showPopup && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateDepositReq
