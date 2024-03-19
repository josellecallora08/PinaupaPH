
import { IoMdClose } from "react-icons/io";
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { createApartment } from "../features/apartment";
const AddApartment = ({setIsAddApartmentFormOpen}) => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    name: '',
    address: '',
    province: '',
    barangay: '',
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setFields({
      name: '',
      address: '',
      province: '',
      barangay: '',
    })
  }
  const handleInput = (e) => {
    const {name, value} = e.target
    setFields((components) => ({
      ...components,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createApartment(fields))
    console.log('Form submitted')
    setIsFormOpen(!isFormOpen)
  }

  return (
    <>
    <div className='relative w-full flex py-4 rounded-t-md bg-dark-blue text-white items-center '>
            <h1 className="lg:text-md  ml-5 text-lg font-bold uppercase ">Add Apartment</h1>
      </div>
      <form onSubmit={handleSubmit} className="lg:w-[30rem] py-4 w-[20rem] h-[25rem] px-3  ">
      <button type='button' className='absolute top-4 right-6'><IoMdClose onClick={() => setIsAddApartmentFormOpen(prevState => !prevState)} size={25} color='white' /></button>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 ">
              Apartment Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={fields.name}
              placeholder="Enter your Apartment Name"
              onChange={handleInput}
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2 ">
              Address
            </label>
            <input
              type="text"
              id="Address"
              name="address"
              value={fields.address}
              onChange={handleInput}
              placeholder="Enter your Address"
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="province" className="block text-gray-700 text-sm font-bold mb-2 ">
              Province/City
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={fields.province}
              onChange={handleInput}
              placeholder="Enter your Province/City"
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="barangay" className="block text-gray-700 text-sm font-bold mb-2 ">
              Barangay
            </label>
            <input
              type="text"
              id="barangay"
              name="barangay"
              value={fields.barangay}
              onChange={handleInput}
              placeholder="Enter your email"
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className='flex justify-end mt-5 gap-3'>
            <button type="submit" className=' bg-dark-blue text-white font-bold py-2 px-4 rounded'>
              Submit
            </button>
            <button className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded' onClick={() => setIsAddApartmentFormOpen(prevState => !prevState)}>
              Close
            </button>
          </div>
      </form>
   
</>
  )
}

export default AddApartment