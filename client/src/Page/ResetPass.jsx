import React, { useState } from 'react'
import logo from '/logo.svg'
import { useParams, useNavigate } from 'react-router-dom'
import Password1 from '/Password1.svg'
const ResetPass = () => {
  const navigate = useNavigate()
  const [pass, setPass] = useState({
    password: '',
    confirmpassword: '',
  })

  const { id} = useParams()

  const handleInput = (e) => {
    const { name, value } = e.target
    setPass((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/api/user/reset-password/user?id=${id}`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pass)
      })

      if (!response.ok) {
        console.log('Password does not match - client')
        return
      }

      navigate(`/`)
      return
    } catch (err) {
      console.log(err.message)
    }
  }


  return (
    <>
      <div className=" w-full h-screen py-10 px-10">
        <img
          src={logo}
          alt="PinaupaPH logo"
          className="lg:block lg:ml-10 hidden  "
        />
        <div className="lg:flex-row lg:ml-20  flex flex-col items-center">
          <div className="  lg:w-1/2 lg:mt-0 mt-5">
            <img
              src={logo}
              alt="PinaupaPH logo"
              className="lg:hidden mx-auto"
            />
            <img
              src={Password1}
              alt="Forgot Password Picture"
              className="lg:w-9/12"
            />
          </div>

          <div className="lg:shadow-md lg:rounded-md lg:shadow-dark-gray lg:w-1/3 p-10">
            <div className="">
              <h1 className="lg:text-3xl text-2xl font-bold text-primary">
                Reset your password
              </h1>
              <p className="text-sm mt-3  text-dark-gray">
                Please enter your new password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="  w-full mt-3 ">
              <label
                htmlFor="new password"
                className="text-primary font-bold text-lg"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                placeholder="Enter your new password"
                className="mr-10 rounded-md py-3 border-2 px-3 border-dark-gray w-full mt-2 mb-5"
              />

              <label
                htmlFor="confirmpassword"
                className="text-primary font-bold text-lg"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                onChange={handleInput}
                placeholder="Confirm your new password"
                className="mr-10 rounded-md py-3 border-2 px-3 border-dark-gray w-full mt-2"
              />
              <button className="lg:mt-10 lg:mb-4 bg-primary text-white w-full mt-5 py-3 px-2 rounded-md hover:opacity-80">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPass
