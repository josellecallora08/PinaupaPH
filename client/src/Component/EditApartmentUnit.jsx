import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUnit } from '../features/unit'
import { IoMdClose } from 'react-icons/io'
const EditApartmentUnit = ({ apartment_id, setIsEditApartmentUnit }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedApartmentOption, setSelectedApartmentOption] = useState('')
  const handleApartmentOptionChange = (e) => {
    setSelectedApartmentOption(e.target.value)
  }
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    name: '',
    rent: '',
    unit_no: '',
  })
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleSubmit = (e) => {
    dispatch(createUnit(fields, apartment_id))
    console.log('Form submitted')
    toggleForm()
  }
  return (
    <>
      <div className="relative">
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
          <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
            Edit Apartment Unit
          </h1>
        </div>
        <form className="lg:w-[30rem] w-[22rem] h-[20rem] px-4 ">
          <button className="absolute top-4 right-6">
            <IoMdClose
              onClick={() => setIsEditApartmentUnit((prevState) => !prevState)}
              size={25}
              color="white"
            />
          </button>


          <div className="">
            <div>
              <h1 className='my-2 font-bold'>Apartment Unit Details</h1>
              <div className='mb-2'>Apartment</div>
              <select
                className="   bg-white text-black w-full h-10 mb-3 p-1 rounded-lg border-2 z-50"
                value={selectedApartmentOption}
                onChange={handleApartmentOptionChange}
                required
                style={{ color: selectedApartmentOption ? 'black' : 'gray', borderColor:'black' }}
              >
                <option style={{ color: 'gray' }} value="" hidden>
                  Select Building
                </option>
                <option value="option1" className=" rounded-none">
                  Option 1
                </option>
                <option value="option2" className="">
                  Option 2
                </option>
                <option value="option3" className="">
                  Option 3
                </option>
              </select>
            </div>
          </div>



          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Apartment Unit
            </label>
            <input
              type="text"
              id="rent"
              name="rent"
              required
              placeholder="Enter Amount Rent"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Monthly Rent
            </label>
            <input
              type="number"
              id="unit_no"
              name="unit_no"
              required
              placeholder="Enter Apartment Unit"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end mt-5 gap-3">
            <button
              onClick={handleSubmit}
              className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>

            <button
              className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditApartmentUnit((prevState) => !prevState)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditApartmentUnit
