import React, { useState } from 'react'
import gcashlogo from '/Gcashlogo.png'
import paymayalogo from '/Paymayalogo.png'
import grabpaylogo from '/Grabpaylogo.png'

const TenantPayment = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    amount: '',
  })

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
    // Reset form data when changing payment method
    setFormData({
      name: '',
      contactNumber: '',
      email: '',
      amount: '',
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className=" w-full h-screen bg-white1 px-5 ">
        <h1 className="font-bold my-4">PAY INVOICE/DOCUMENTS</h1>
        <div className="lg:flex-row lg:gap-2 w-full flex flex-col ">
          <div className="lg:w-1/2 lg:h-full">
            <h1 className=" bg-primary p-2 text-white rounded-tl-md rounded-tr-md">
              SELECT PAYMENT METHOD
            </h1>

            <div className="flex justify-evenly pb-3  text-primary bg-white rounded-md ">
              <div className="flex items-center py-2 px-4 gap-3 mt-3 rounded-md">
                <input
                  type="radio"
                  id="ewallet"
                  name="paymentMethod"
                  value="ewallet"
                  checked={selectedOption === 'ewallet'}
                  onChange={handleOptionChange}
                  className="form-radio h-5 w-5 text-primary"
                />
                <label htmlFor="ewallet" className="ml-2 ">
                  E-wallet
                </label>
              </div>
              <div className="flex items-center py-2 px-4 gap-3 mt-3 rounded-md">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={selectedOption === 'cash'}
                  onChange={handleOptionChange}
                  className="form-radio h-5 w-5 text-primary"
                />
                <label htmlFor="cash" className="ml-2 ">
                  Cash
                </label>
              </div>
            </div>
            <div>
              {selectedOption === 'ewallet' && (
                <div className=" mb-5 pt-2">
                  <div className="flex items-center justify-center gap-2 my-5 ">
                    <button className="w-32 h-20 flex justify-center items-center focus:outline-none shadow-md shadow-dark-gray rounded-md">
                      <img
                        src={gcashlogo}
                        alt="GCash"
                        className="max-w-full max-h-full"
                      />
                    </button>
                    <button className="w-32 h-20 flex justify-center items-center focus:outline-none shadow-md shadow-dark-gray rounded-md">
                      <img
                        src={paymayalogo}
                        alt="Paymaya"
                        className="max-w-full max-h-full"
                      />
                    </button>
                    <button className="w-32 h-20 flex justify-center items-center focus:outline-none shadow-md shadow-dark-gray rounded-md">
                      <img
                        src={grabpaylogo}
                        alt="GrabPay"
                        className="max-w-full max-h-full"
                      />
                    </button>
                  </div>
                  <div className="p-7 bg-white shadow-md shadow-dark-gray">
                    <h1 className="mb-3">Personal Information</h1>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block font-medium text-primary"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 px-2 py-1 border border-dark-gray rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="contactNumber"
                        className="block font-medium text-primary"
                      >
                        Contact Number
                      </label>
                      <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 px-2 py-1 border border-dark-gray rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block font-medium text-primary"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 px-2 py-1 border border-dark-gray rounded-md w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              {selectedOption === 'cash' && (
                <div className=" py-7 px-5 my-3 bg-white">
                  <h1 className="text-primary font-bold mb-4 ">CASH PAYMENT</h1>
                  <label
                    htmlFor="amount"
                    className="block font-medium text-primary"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter amount"
                    className="mt-1 p-2 border border-dark-gray rounded-md w-full"
                  />
                </div>
              )}
            </div>
          </div>
          <div className=" lg:w-1/2 lg:h-full mb-5 bg-white shadow-md shadow-dark-gray">
            <h1 className=" bg-primary p-2 text-white rounded-tl-md rounded-tr-md">
              PAYMENT AMOUNT
            </h1>
            <div>
              <div className="p-5">
                <h1 className="text-primary font-bold text-xl border-b-2 border-dark-gray mb-4 pb-4 ">
                  Php 10,000
                </h1>
                <div>
                  <p className="my-3 text-dark-gray font-bold text-lg">
                    Payment for Rent
                  </p>
                  <div className="flex justify-between text-lg mb-6 text-dark-gray">
                    <p>Title</p>
                    <p>Price</p>
                  </div>
                  <div className="flex justify-between text-lg pb-10 border-b-2 border-dark-gray">
                    <p>Rent</p>
                    <p>Php 10,000</p>
                  </div>
                  <div className="text-end my-5 text-3xl">
                    <span className="text-dark-gray mr-4">Total:</span>Php
                    10,000
                  </div>
                </div>
              </div>
              <button className='lg:mt-0  lg:ml-20 lg:mb-8  bg-primary text-white w-9/12 ml-12 mb-5 py-3 px-2 rounded-md hover:opacity-80 '>Pay</button>
              <div className="lg:p-4 flex flex-col p-10 items-center justify-center gap-2 bg-gray">
                <h1 className="text-primary font-bold text-lg">Wednesday</h1>
                <h1 className="text-primary font-bold text-lg">
                  March 3, 2024 | 11:45 AM
                </h1>
                
              </div>
            </div>
      
          </div>
          
          
         
        </div>
      </div>
    </>
  )
}

export default TenantPayment
