
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { createUnit } from "../features/unit";
import { IoMdClose } from "react-icons/io";
const AddRoom = ({apartment_id,setIsAddRoomFormOpen}) => {
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
        <div className='relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center '>
            <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Add Room Details</h1>
      </div>
      <form className="lg:w-[30rem] w-[22rem] h-[20rem] px-4 ">
          <button className='absolute top-4 right-6'><IoMdClose onClick={() => setIsAddRoomFormOpen(prevState => !prevState)} size={25} color='white' /></button>
          <div className="mb-4">
            <label htmlFor="aptname" className="block text-gray-700 text-sm font-bold my-4 ">
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
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2 ">
              Apartment Unit
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
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2 ">
              Monthly Rent
            </label>
            <input
              type="number"
              id="location"
              name="location"
              placeholder="Enter your Province/City"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className='flex justify-end mt-5 gap-3'>

                  <button onClick={handleSubmit} className=' bg-dark-blue text-white font-bold py-2 px-4 rounded'>
                    Submit
                  </button>

                  <button
                    className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded' onClick={() => setIsAddRoomFormOpen(prevState => !prevState)}>
                    Close
                  </button>
                
          </div>
      </form>
   
</div>
    </>
  )
}

export default AddRoom