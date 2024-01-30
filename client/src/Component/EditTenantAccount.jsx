import React from 'react'
import { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
const EditTenantAccount = () => {
const [newUsername, setNewUsername] = useState('')
const [oldPassword, setOldPassword] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [isFormOpen, setIsFormOpen] = useState(false)

const toggleForm = () => {
  console.log('Form toggled');
  setIsFormOpen(!isFormOpen);
}
const handleSubmit = () => {
console.log('Form submitted');
toggleForm();
 
}
  return (
  <div className='relative'>
    <div className='flex justify-between items-center'>
      
    </div>

        <form action="" onSubmit={handleSubmit} className="lg:w-full w-[20rem] h-auto px-3 ">
        <div className='flex items-center mb-5 gap-4'>
            <button className=''><IoIosArrowBack onClick={toggleForm} size={30} color='blue' /></button>
            <h1 className="lg:text-3xl text-2xl font-bold ">Edit Tenant Detail</h1>
          </div>
            

                <div className="mb-4">
                  <label htmlFor="oldpassword" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    name="password"
                    
                    placeholder="Enter your Old Password"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your New Password"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="consfirmPassword"

                    placeholder="Enter your Confirm Password"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className='flex justify-end mt-5 gap-3'>

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

export default EditTenantAccount