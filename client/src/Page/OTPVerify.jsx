import React, { useState, useRef, useEffect } from 'react'
import logo from '/logo.svg'
import { useParams, useNavigate, Link } from 'react-router-dom'
import EmailSent1 from '/EmailSent1.svg'
const OTPVerify = () => {
  const [values, setValues] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef([])
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    // Focus the first input field when component mounts
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index, e) => {
    const inputValue = e.target.value
    if (/^\d$/.test(inputValue) || inputValue === '') {
      const newValues = [...values]
      newValues[index] = inputValue
      setValues(newValues)

      // If the input is empty and not the first input, move focus to the previous input field
      if (inputValue === '' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      // If the input is not empty and not the last input, move focus to the next input field
      else if (inputValue !== '' && index < values.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const pin = values.join('')
    console.log(pin)
    if (values.some(value => value.trim() === '')) {
      setError("Pins cannot be empty...")
      return
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/user/otp?id=${id}&pin=${pin}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        setError('Invalid Pin')
        setLoading(false)
        return
      }
      const json = await response.json()
      setLoading(false)
      navigate(`/reset-password/${json}`)
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/otp-alive?id=${id}`,
        )
        if (!response.ok) {
          const error = await response.json()
          navigate('/')
          throw new Error(error)
        }
      } catch (error) {
        console.log(err.message)
      }
    }
  }, [])
  return (
    <>
      <div className="w-full h-screen py-10 px-10 flex flex-col">
        <div className="hidden w-11/12 h-full max-h-40 m-auto lg:flex justify-center lg:justify-start">
          <Link to={'/'} className='size-full max-w-40 flex justify-center'>
            <img
              src={logo}
              alt="PinaupaPH logo"
              className="w-full my-10"
            />
          </Link>
        </div>
        <div className="lg:flex-row h-full  flex flex-col justify-center items-center">
          <div className="lg:w-1/2 lg:mt-0 mt-5">
            <Link to="/" className='w-full h-full lg:max-w-10 max-h-20'>
              <img
                src={logo}
                alt="PinaupaPH logo"
                className="lg:hidden max-w-52 mx-auto"
              />
            </Link>
            <img
              src={EmailSent1}
              alt="Forgot Password Picture"
              className="lg:w-10/12"
            />
          </div>

          <div className="lg:shadow-md lg:rounded-md lg:w-1/3 lg:shadow-dark-gray p-10">
            <div className="">
              <h1 className="lg:text-3xl text-2xl font-bold text-primary-color">
                Check your Email.
              </h1>
              <p className="text-sm mt-3  text-dark-gray">
                We’ve send the OTP to your Email.
              </p>
            </div>
            {error && (
              <div className="shadow-xl border border-red/50 rounded-lg bg-red/10 h-full max-h-auto p-5 my-5">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="w-full mt-3">
              <div className="flex gap-3 justify-around">
                {values.map((value, index) => (
                  <input
                    key={index}
                    type="number"
                    className="border-2 border-primary-color w-full max-w-16 h-16 rounded-md text-3xl text-center"
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>

              <button className="lg:mt-10 font-semibold bg-primary-color text-white w-full mt-5 py-3 px-2 rounded-md hover:opacity-80">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default OTPVerify
