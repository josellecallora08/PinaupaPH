import React, { useState, useEffect } from 'react'
import gcashlogo from '/Gcashlogo.png'
import paymayalogo from '/Paymayalogo.png'
import grabpaylogo from '/Grabpaylogo.png'
import { useDispatch } from 'react-redux'
import { createPayment, createPaymentIntent } from '../../features/payment'
import { useParams } from 'react-router-dom'
import '../../index.css'
const TenantPayment = () => {
  const { id } = useParams()
  const [selectedOption, setSelectedOption] = useState('ewallet') // Default selected option is 'ewallet'
  const [selectedEwallet, setSelectedEwallet] = useState(null);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    mobile_no: '',
    email: '',
    amount: '',
    method: ''
  })

  useEffect(() => {
    setSelectedOption('ewallet')
  }, [])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
    setSelectedEwallet(null);
    setFormData({
      name: '',
      mobile_no: '',
      email: '',
      amount: '',
      method: ''
    })
  }
  const handleEwalletChange = (event) => {
    setSelectedEwallet(event.target.value); // Update selected e-wallet option
  };
  const handlePayment = () => {
    dispatch(createPaymentIntent(id,formData))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="w-full h-full bg-white1 px-5 overflow-y-scroll">
        <h1 className="font-bold my-4">PAY INVOICE/DOCUMENTS</h1>
        <div className="flex lg:flex-row flex-col lg:gap-2  w-full h-full">
          <div className="flex-grow flex flex-col">
            <h1 className="bg-[#183044] p-2 text-white rounded-tl-md rounded-tr-md">
              SELECT PAYMENT METHOD
            </h1>

            <div className="flex flex-col pb-3 bg-white rounded-md text-primary-color ">
              <div className="form-control mb-1 ">
                <div className="flex items-center  p-2">
                  <input
                    type="radio"
                    id="ewallet"
                    value="ewallet"
                    checked={selectedOption === 'ewallet'}
                    onChange={handleOptionChange}
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor="ewallet" className="cursor-pointer text-lg">
                    E-wallet
                  </label>
                </div>
              </div>
              <div className="form-control">
                <div className="flex items-center  p-2">
                  <input
                    type="radio"
                    name="method"
                    id="cash"
                    value="cash"
                    checked={selectedOption === 'cash'}
                    onChange={handleChange}
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor="cash" className="cursor-pointer text-lg">
                    Cash
                  </label>
                </div>
              </div>
              <div>
                {selectedOption === 'ewallet' && (
                  <div className=" flex flex-col lg:gap-10">
                    <div className="mb-5 pt-3">
                      <div className="form-control flex justify-center items-center">
                        <div className="flex items-center gap-5 my-5">
                          <label className="radio-container">
                            <input
                              type="radio"
                              name="method"
                              id="method"
                              value="gcash"
                              onChange={handleChange}
                              className="hidden"
                            />
                            <img
                              src={gcashlogo}
                              alt="GCash"
                              className="w-40 h-20 cursor-pointer rounded-md shadow-md shadow-gray "
                            />
                          </label>
                          <label className="radio-container">
                            <input
                              type="radio"
                              name="method"
                              id="method"
                              value="paymaya"
                              onChange={handleChange}
                              className="hidden"
                            />
                            <img
                              src={paymayalogo}
                              alt="Paymaya"
                              className="w-40 h-20 cursor-pointer rounded-md "
                            />
                          </label>
                          <label className="radio-container">
                            <input
                              type="radio"
                              name="method"
                              onChange={handleChange}
                              value="grabpay"
                              className="hidden"
                            />
                            <img
                              src={grabpaylogo}
                              alt="GrabPay"
                              className={`h-20 w-40 cursor-pointer rounded-md p-2`}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="p-5 bg-white ">
                        <h1 className="mb-3">Personal Information</h1>

                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block font-medium text-primary-color"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Name"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 px-4 py-3 text-xl text-primary-color border bg-white border-dark-gray rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="contactNumber"
                            className="block font-medium text-primary-color"
                          >
                            Contact Number
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Contact Number"
                            id="mobile_no"
                            name="mobile_no"
                            value={formData.mobile_no}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 px-4 py-3 border text-xl text-primary-color bg-white border-dark-gray rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="amount"
                            className="block font-medium text-primary-color"
                          >
                            Amount
                          </label>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 p-4 border bg-white text-xl text-primary-color border-dark-gray rounded-md w-full"
                          />
                        </div>

                        <div className="">
                          <label
                            htmlFor="email"
                            className="block font-medium text-primary-color"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="Enter Email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 px-4 py-3 text-xl text-primary-color border bg-white border-dark-gray rounded-md w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedOption === 'cash' && (
              <div className=" py-7 mb-8 px-5 my-3 h-full bg-white">
                <h1 className="text-primary-color font-bold mb-4 ">
                  CASH PAYMENT
                </h1>
                <h1 className="mb-3 text-primary-color ">
                  Personal Information
                </h1>

                <div className="flex flex-col lg:gap-2">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block font-medium text-primary-color"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="off"
                      className="mt-1 px-4 py-3 text-xl text-primary-color border bg-white border-dark-gray rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="contactNumber"
                      className="block font-medium text-primary-color"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Contact Number"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      autoComplete="off"
                      className="mt-1 px-4 py-3 border text-xl text-primary-color bg-white border-dark-gray rounded-md w-full"
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="email"
                      className="block font-medium text-primary-color"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                      className="mt-1 px-4 py-3 text-xl text-primary-color border bg-white border-dark-gray rounded-md w-full"
                    />
                  </div>
                  <label
                    htmlFor="amount"
                    className="block font-medium text-primary-color"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter amount"
                    className="mt-1 p-4 border bg-white text-xl text-primary-color border-dark-gray rounded-md w-full"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex-grow flex bg-white flex-col">
            <div className="flex flex-col h-full">
              <h1 className="bg-primary-color p-2 text-white rounded-tl-md rounded-tr-md">
                PAYMENT AMOUNT
              </h1>
              <div className="px-5 flex-grow flex flex-col">
                <h1 className="text-light-blue text-4xl py-8 border-b-2 border-dark-gray mb-4 pb-4 ">
                  {parseInt('10000').toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  })}
                </h1>
                <div className="flex-grow">
                  <p className="my-3 text-dark-gray font-bold text-lg">
                    Payment for Rent
                  </p>
                  <div className="flex justify-between text-lg mb-6 text-dark-gray">
                    <p>Title</p>
                    <p>Price</p>
                  </div>
                  <div className="flex justify-between text-lg pb-10 border-b-2 border-dark-gray">
                    <p>Rent</p>
                    <p>
                      {parseInt('10000').toLocaleString('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      })}
                    </p>
                  </div>
                  <div className="text-end my-5 text-3xl text-primary-color">
                    <span className="mr-4">Total:</span>
                    {parseInt('10000').toLocaleString('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    })}
                  </div>
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-end mb-10  items-center">
                <div className="w-full px-10">
                  <button
                    onClick={handlePayment}
                    className="lg:mt-0 md:mt-4 w-full  lg:mb-8 bg-primary-color text-white mb-5 py-3 rounded-md hover:opacity-80"
                  >
                    Pay
                  </button>
                </div>
                <div className=" flex flex-col w-full p-4  items-center gap-2 bg-gray">
                  <h1 className="text-primary-color font-bold text-lg">
                    Wednesday
                  </h1>
                  <h1 className="text-primary-color font-bold text-lg">
                    March 3, 2024 | 11:45 AM
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TenantPayment
