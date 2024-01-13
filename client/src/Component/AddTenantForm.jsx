import React from 'react'
import { useState } from 'react'
const AddTenantForm = () => {

  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
  <div className=''>
      <h1 className="text-3xl font-bold mb-4">Add Tenant</h1>
        <form action="" className="lg:w-[30rem] w-[20rem] h-[20rem] px-3 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">Personal Details</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
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

                placeholder="Enter your email"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                
                placeholder="Enter your password"
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
                placeholder="Enter your Date of Occupant In"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
        </form>
     
  </div>
  )
}

export default AddTenantForm