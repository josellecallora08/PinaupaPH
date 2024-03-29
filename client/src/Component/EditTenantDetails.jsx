import React from 'react'
import { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
const EditTenantDetails = ({setIsEditTenantDetailForm}) => {
  const user = useSelector((state) => state.user.data)
  const [fields, setFields] = useState({
    name: user?.name || '',
    birthday: user?.birthday || '',
    mobile_no: user?.mobile_no || '',
    email: user?.email || '',
    
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const toggleForm = (e) => {

    setIsFormOpen(!isFormOpen);
  }
  const handleInput = (e) => {

  }
  const handleSubmit = () => {
  console.log('Form submitted');
  toggleForm();
  }
  
  return (
  <div className='relative'>
    <div className='relative w-full h-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center '>
            <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Edit Tenant Detail</h1>
      </div>
        <form onSubmit={handleSubmit} className="lg:w-full h-full w-[20rem]  p-3 overflow-y-auto">
        <button className='absolute top-4 right-6'><IoMdClose onClick={() => setIsEditTenantDetailForm(prevState => !prevState)} size={25} color='white' /></button>
        <h1 className="text-xl font-bold mb-2">Personal Details</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 ">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInput}
                value = {fields.name}
                placeholder="Enter your name"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birthday" className="block text-gray-700 text-sm font-bold mb-2 ">
                Birthday
              </label>
              <input
                type="text"
                id="birthday"
                name="birthday"
                onChange={handleInput}
                value={fields.birthday}
                placeholder="Enter your birthday"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2 ">
                Contact
              </label>
              <input
                type="tel"
                id="contact"
                name="mobile_no"
                onChange={handleInput}
                value={fields.mobile_no}
                placeholder="Enter your contact number"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 ">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInput}
                value={fields.email}
                placeholder="Enter your email"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          
            <div className='flex justify-end mt-3 gap-3'>

              <button className=' bg-dark-blue text-white font-bold py-2 px-4 rounded'>
                Submit
              </button>

              <button onClick={() => setIsEditTenantDetailForm(prevState => !prevState)} className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'>
                Close
              </button>

            </div>
        </form>
     
  </div>
  )
}

export default EditTenantDetails