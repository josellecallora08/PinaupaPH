import React from 'react'
import { useState } from 'react'

import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
const EditTenantAccount = ({setIsEditTenantAccountForm}) => {
  const user = useSelector((state) => state.user.data)
  const [fields, setFields] = useState({
    username: user?.username || '',
    password: '',
    confirmPassword: ''
  })
const [isFormOpen, setIsFormOpen] = useState(false)

const toggleForm = () => {

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
      <div className='relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center '>
            <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Edit Tenant Detail</h1>
      </div>
        <form action="" onSubmit={handleSubmit} className="lg:w-full w-[20rem] h-auto px-3 py-4 ">
        <button className='absolute top-4 right-6'><IoMdClose onClick={() => setIsEditTenantAccountForm(prevState => !prevState)} size={25} color='white' /></button>
                <div className="mb-4">
                  <label htmlFor="oldpassword" className="block text-gray-700 text-sm font-bold mb-2 ">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={handleInput}
                    name="password"
                    value={fields.password}
                    placeholder="Enter your Old Password"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="newpassword" className="block text-gray-700 text-sm font-bold mb-2 ">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newpassword"
                    name="confirmPassword"
                    onChange={handleInput}
                    value={fields.confirmPassword}
                    placeholder="Enter your New Password"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 ">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    onChange={handleInput}
                    name="consfirmPassword"
                    value={fields.confirmPassword}
                    placeholder="Enter your Confirm Password"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className='flex justify-end mt-5 gap-3'>

                  <button className=' bg-dark-blue text-white font-bold py-2 px-4 rounded'>
                    Submit
                  </button>

                  <button onClick={() => setIsEditTenantAccountForm(prevState => !prevState)} className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'>
                    Close
                  </button>
                
                  
                </div>
  </form>
     
  </div>
  )
}

export default EditTenantAccount