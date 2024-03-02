import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { base_url } from '../utils/constants'

import { useDispatch } from 'react-redux';
import { createTenant } from '../features/user';
import { IoIosArrowBack } from "react-icons/io";
const AddTenantForm = () => {
  
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    "name": '',
    "username":'',
    "birthday": '',
    "contact": '',
    "email": '',
    "password": '',
    "unit_id": '',
    "deposit": ''
  })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectUnit, setSelectUnit] = useState('')
  

  const handleSelect = (e) => {
    setSelectUnit(e.target.value)
  }
  const toggleForm = (e) => {
    
    setIsFormOpen(!isFormOpen);
  }
  const handleInput = (e) => {
    const {name, value} = e.target
    setFields((fields) => ({
      ...fields,
      [name]:value
    }))
  } 

  const handleSubmit = async (e) => {
  e.preventDefault()
  dispatch(createTenant(fields))
  setFields({
    "name": '',
    "username":'',
    "birthday": '',
    "contact": '',
    "email": '',
    "password": '',
    "unit_id": '',
    "deposit": ''
  })
  }

  return (
  <div className='relative'>
      
        <form className="lg:w-[30rem] w-[20rem] h-[25rem] px-3 overflow-y-auto">
        <div className='flex sticky top-0 pb-3 bg-white items-center mb-5 gap-4'>
            <button className=''><IoIosArrowBack onClick={toggleForm} size={30} color='blue' /></button>
            <h1 className="lg:text-3xl text-2xl font-bold ">Add Tenant</h1>
          </div>
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
              <select name='ApartmentUnit' defaultValue="Room1" className='w-full py-2 px-3 border rounded'>
                <option className='rounded-none' value="someOption">Some option</option>
                <option value="otherOption">Other option</option>
                <option value="otherOption">Other option</option>
                <option value="otherOption">Room1</option>
              </select>
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
            <div className='flex justify-end mt-5 gap-3'>

                    <button type='submit' className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                      Submit
                    </button>

                    <button
                      onClick={toggleForm}
                      className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded' >
                      Close
                    </button>
                  
            </div>
        </form>
     
  </div>
  )
}

export default AddTenantForm