import React, { useState } from 'react'
import logo from '/logo.svg'

import ForgotPass1 from '/ForgotPass1.svg'
import { useNavigate } from 'react-router-dom'
import { base_url } from '../utils/constants'
const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      const response = await fetch(
        `${base_url}/forgot-password?email=${email}`,
        {
          method: 'POST',
        },
      )
      if (!response.ok) {
        setError('Email does not exists.')
        return
      }
      const json = await response.json()
      console.log(json)
      navigate(`/otp-verify/${json.otp}`)
    } catch (err) {
      setError('Email does not exists.')
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
              src={ForgotPass1}
              alt="Forgot Password Picture"
              className="lg:w-11/12"
            />
          </div>

          <div className="lg:shadow-md lg:rounded-md lg:shadow-dark-gray p-10">
            <div className="">
              <h1 className="lg:text-3xl text-2xl font-bold text-primary">
                Password Recovery
              </h1>
              <p className="text-sm mt-3  text-dark-gray">
                Enter your Email to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="  w-full mt-3 ">
              <label htmlFor="email" className="text-primary font-bold text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g juan.delacruz@gmail.com"
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

export default ForgotPass
