import React from 'react'
import { useState } from 'react'
const EditTenantAccount = () => {
const [newUsername, setNewUsername] = useState('')
const [oldPassword, setOldPassword] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const handleSubmit = (e) => {

 console.log( setConfirmPassword)
}
  return (
  <div className=''>
      <h1 className="text-3xl font-bold mb-4">Edit Personal Details</h1>
        <form action="" className="lg:w-[30rem] w-[20rem] h-[20rem] px-3 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">Personal Details</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                New Username
              </label>
              <input
                type="text"
                id="newusername"
                name="newusername"
                placeholder="Enter your new username"
                onChange={(e) => setNewUsername(e.target.value)}
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birthday" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
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
        </form>
     
  </div>
  )
}

export default EditTenantAccount