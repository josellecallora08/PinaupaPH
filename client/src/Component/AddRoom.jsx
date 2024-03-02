
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { createUnit } from "../features/unit";
import { IoIosArrowBack } from "react-icons/io";
const AddRoom = ({apartment_id}) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [Open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    name: '',
    rent: '',
    unit_no: ''
  })
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleSubmit = (e) => {
    
    dispatch(createUnit(fields, apartment_id))
    console.log('Form submitted')
    toggleForm()
  }
  return (
    <>
        <div className='relative'>
    
      <form className="lg:w-[30rem] w-[20rem] h-[25rem] px-3 ">
          <div className='flex items-center mb-5 gap-4'>
            <button className=''><IoIosArrowBack onClick={toggleForm} size={30} color='blue' /></button>
            <h1 className="lg:text-3xl text-2xl font-bold ">Add Apartment building</h1>
          </div>
          <div className="mb-4">
            <label htmlFor="aptname" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
              Apartment Name
            </label>
            <input
              type="text"
              id="aptname"
              name="aptname"
              placeholder="Enter your Apartment Name"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
              Address
            </label>
            <input
              type="text"
              id="Address"
              name="address"
              
              placeholder="Enter your Address"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
              Province/City
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter your Province/City"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="brgy" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
              Baranggay
            </label>
            <input
              type="text"
              id="brgy"
              name="brgy"

              placeholder="Enter your email"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className='flex justify-end mt-5 gap-3'>

                  <button onClick={handleSubmit} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                    Submit
                  </button>

                  <button
                    className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded' onClick={toggleForm}>
                    Close
                  </button>
                
          </div>
      </form>
   
</div>
    </>
  )
}

export default AddRoom