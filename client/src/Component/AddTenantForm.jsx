import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { base_url } from '../utils/constants'

const AddTenantForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [field, setField] = useState({
    "name": null,
    "username":null,
    "birthday": null,
    "contact": null,
    "email": null,
    "password": null,
    "unit_id": null,
    "deposit": null
  })

  const handleChange = (name, value) => {
    setField((fields) => ({
      ...fields,
      [name]:value
    }))
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()

    const Token = Cookies.get('Token');
    const details = Object.entries(fields).reduce((acc,[key, value]) => {
      if(value !== null){
        acc[key] = value
      }
      return acc;
    }, {})
    
    try{
      const request = await fetch(`${base_url}/`,{
        method: POST,
        headers: {
          Auhorization: `Bearer ${Token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
      })
      if(!request.ok){
        throw new Error("Unable to add tenant")
      }
    }
    catch(err){
      console.log({error: err.message})
    }
  }

  return (
  <div className=''>
      <h1 className="text-3xl font-bold mb-4">Add Tenant</h1>
        <form onSubmit={handleSubmit} className="lg:w-[30rem] w-[20rem] h-[20rem] px-3 overflow-y-auto">
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