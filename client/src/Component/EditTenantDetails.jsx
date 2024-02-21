import React from 'react'
import { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
const EditTenantDetails = () => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [apartment_unit, setApartment_unit] = useState('')
  const [deposit, setDeposit] = useState('')
  const [dateofin, setDateofin] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const toggleForm = (e) => {

    setIsFormOpen(!isFormOpen);
  }
  const handleSubmit = () => {
  console.log('Form submitted');
  toggleForm();
  }
  
  return (
  <div className='relative'>
      
        <form action="" className="lg:w-full w-[20rem] h-[20rem] px-3 overflow-y-auto">
          <div className='flex items-center mb-5 gap-4'>
            <button className=''><IoIosArrowBack onClick={toggleForm} size={30} color='blue' /></button>
            <h1 className="lg:text-3xl text-2xl font-bold ">Edit Tenant Detail</h1>
          </div>
        
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birthday" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Birthday
              </label>
              <input
                type="text"
                id="birthday"
                name="birthday"
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Enter your birthday"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Contact
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter your contact number"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          <h1 className="text-xl font-bold mb-4">Apartment Details</h1>
          <div className="mb-4">
              <label htmlFor="apartment_unit" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
              Apartment Unit
              </label>
              <input
                type="text"
                id="apartment_unit"
                name="apartment_unit"
                onChange={(e) => setApartment_unit(e.target.value)}
                placeholder="Enter your Apartment Unit"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deposit" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Deposit
              </label>
              <input
                type="text"
                id="deposit"
                name="deposit"
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="Enter your Deposit"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateofin" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Date of Occupant In 
              </label>
              <input
                type="text"
                id="dateofin"
                name="dateofin"
                onChange={(e) => setDateofin(e.target.value)}
                placeholder="Enter your Date of Occupant In"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className='flex justify-end mt-8 gap-3'>

              <button onClick={handleSubmit} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                Submit
              </button>

              <button onClick={toggleForm} className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'>
                Close
              </button>

            </div>
        </form>
     
  </div>
  )
}

export default EditTenantDetails