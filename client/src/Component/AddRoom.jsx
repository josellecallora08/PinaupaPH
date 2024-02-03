import { IoClose } from "react-icons/io5";
import React, { useState } from 'react'

const AddRoom = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }
  const handleSubmit = (e) => {
 
    console.log('Form submitted')
    setIsFormOpen(!isFormOpen)
  }
  return (
    <>
        <div className='relative'>
    <h1 className="lg:text-3xl text-2xl font-bold mb-4">Add Apartment building</h1>
      <form onSubmit={handleSubmit} className="lg:w-[30rem] w-[20rem] h-[22rem] px-3 ">
      <button className='absolute top-1 right-0'><IoClose onClick={toggleForm} size={30} color='red' /></button>
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