import React, { useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
 import { useDispatch, useSelector } from 'react-redux'
import { resetHouseholdStatus } from '../features/household'
import Popup from '../Component/PopUp'
const AddHousehold = ({
  id,
  setIsAddHouseholdForm,
  fields,
  handleInput,
  handleSubmit,
}) => {
  // const error = useSelector((state) => state.household.error)
  
  const error = useSelector((state) => state.apartment.error)
  const msg = useSelector((state) => state.apartment.msg)
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  useEffect(() => {
    if (msg !== null) {
      setPopupMessage(msg)
    } else if (error !== null) {
      setPopupMessage(error)
      
    }

    if (msg !== null || error !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        resetHouseholdStatus
        dispatch(resetHouseholdStatus())
      }, 3000)
    }
  }, [msg, error])
  return (
    <div className="relative">
      <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
          Add Family Member
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-full lg:pt-4 w-[20rem] h-[20rem] px-4 overflow-y-auto"
      >
        <button className="absolute top-4 right-6">
          <IoMdClose
            onClick={() => setIsAddHouseholdForm((prevState) => !prevState)}
            size={25}
            color="white"
          />
        </button>
        {/* 
        {error && (
          <div className=" w-auto bg-light-red text-dark-blue p-4 m-4 rounded ">
            {error}
          </div>
        )} */}

        <div className="mt-5 lg:mt-0 mb-4">
          <label
            htmlFor="name"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={fields?.name}
            placeholder="Enter your name"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Contact
          </label>
          <input
            type="text"
            name="mobile"
            value={fields.mobile}
            onChange={handleInput}
            placeholder="Enter your contact number"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthday"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Birthday
          </label>
          <input
            type="date"
            name="birthday"
            onChange={handleInput}
            value={fields.birthday}
            placeholder="Enter your Birthday"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="relationship"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Relationship
          </label>
          <input
            type="text"
            name="relationship"
            onChange={handleInput}
            value={fields.relationship}
            placeholder="Enter Tenant's relationship"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end mt-5 mb-3 gap-3">
          <button className=" bg-dark-blue text-white font-bold py-2 px-4 rounded">
            Submit
          </button>

          <button
            className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddHouseholdForm((prevState) => !prevState)}
          >
            Close
          </button>
        </div>
      </form>
      {showPopup && (
        <Popup message={popupMessage} onClose={handleClosePopup} isError={error} />
      )}
    </div>
  )
}

export default AddHousehold
