import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

const AddHousehold1 = ({ id, setIsAddHouseholdForm }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const error = useSelector((state) => state.household.error)
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    name: '',
    mobile: '',
    relationship: '',
  })
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }
  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((states) => ({
      ...states,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    toggleForm()
  }

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

        {error && (
          <div className=" w-auto bg-light-red text-dark-blue p-4 m-4 rounded ">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block  text-sm font-bold mb-2 text-dark-gray"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={fields.name}
            placeholder="Enter your name"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block  text-sm font-bold mb-2 text-dark-gray"
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
            htmlFor="relationship"
            className="block  text-sm font-bold mb-2 text-dark-gray"
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
    </div>
  )
}

export default AddHousehold1
