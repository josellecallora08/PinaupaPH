import React, { useState } from 'react'
import Cookies from 'js-cookie'
import SuperAdminImage from '/SuperAdmin.png'
import Headbar from '../Component/Headbar'

const CreateAdminPage = () => {
  const token = Cookies.get('token')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  })
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    setError('')
    setMsg('')
    e.preventDefault()
    if (!formData.username || !formData.password || !formData.email) {
      setError('Please fill in all fields.')
      return
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/user/create/superadmin`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )
      if (!response.ok) {
        const json = await response.json()
        throw new Error(json.error)
      }
      console.log('Creating admin:', formData)
      setMsg('Successfully created account for Admin')
      setFormData({
        username: '',
        password: '',
        email: '',
      })
    } catch (err) {
      setError(err.message)
      return
    }
  }

  return (
    <>
      <Headbar />
      <div className="w-full h-screen py-4 px-10">
        <div className="lg:flex-row  flex flex-col items-center justify-center ">
          <div className="lg:w-1/2 lg:mt-0 mt-5">
            <img
              src={SuperAdminImage}
              alt="Super Admin Picture"
              className="lg:w-9/12"
            />
          </div>

          <div className="lg:w-1/2 lg:shadow-md lg:rounded-md lg:shadow-dark-gray p-5">
            <div className="">
              <h1 className="lg:text-xl text-lg font-bold text-primary-color">
                Create Admin
              </h1>
              {error && (
                <p className="capitalize border-2 p-2 rounded-md border-red">
                  {error}
                </p>
              )}
              {msg && (
                <p className="capitalize border-2 p-2 rounded-md border-lime">
                  {msg}
                </p>
              )}
              <p className="text-sm mt-3 font-regular text-dark-gray">
                Fill in the details to create a new admin account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full mt-2">
              <label
                htmlFor="username"
                className="text-primary-color font-semibold "
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="mr-10 rounded-md py-2 font-regular border-2 px-3 border-dark-gray w-full mt-2"
                required
              />

              <label
                htmlFor="password"
                className="text-primary-color font-semibold "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mr-10 rounded-md py-2 font-regular border-2 px-3 border-dark-gray w-full mt-2"
                required
              />

              <label
                htmlFor="email"
                className="text-primary-color font-semibold "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="mr-10 rounded-md py-2 font-regular border-2 px-3 border-dark-gray w-full mt-2"
                required
              />
              <button className="lg:mt-6 lg:mb-2 bg-primary-color font-semibold text-white w-full mt-3 py-3 px-2 rounded-md hover:opacity-80">
                Create Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateAdminPage
