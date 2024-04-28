import React, { useState, useEffect } from 'react';
import gcashlogo from '/Gcashlogo.png';
import paymayalogo from '/Paymayalogo.png';
import grabpaylogo from '/Grabpaylogo.png';

const TenantPayment = () => {
  const [selectedOption, setSelectedOption] = useState('ewallet'); // Default selected option is 'ewallet'
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    amount: '',
  });

  useEffect(() => {
    // Set the selected option to 'cash' when the component mounts
    setSelectedOption('cash');
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Reset form data when changing payment method
    setFormData({
      name: '',
      contactNumber: '',
      email: '',
      amount: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="w-full h-full bg-white1 px-5 overflow-y-scroll">
        <h1 className="font-bold my-4">PAY INVOICE/DOCUMENTS</h1>
        <div className="lg:flex-row lg:gap-2 w-full flex flex-col">
          <div className="lg:w-1/2 lg:h-auto">
            <h1 className="bg-[#183044] p-2 text-white rounded-tl-md rounded-tr-md">
              SELECT PAYMENT METHOD
            </h1>
            
            <div className="flex flex-col pb-3 bg-white rounded-md text-primary-color ">
              <div className="form-control mb-1 ">
                <div className='flex items-center  p-2'>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="ewallet"
                    value="ewallet"
                    checked={selectedOption === 'ewallet'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer'
                  />
                  <label htmlFor="ewallet" className="cursor-pointer text-lg">E-wallet</label>
                </div>
              </div>
              <div className="form-control">
                <div className='flex items-center  p-2'>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="cash"
                    value="cash"
                    checked={selectedOption === 'cash'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer'
                  />
                  <label htmlFor="cash" className="cursor-pointer text-lg">Cash</label>
                </div>
              </div>
              <div>
                {selectedOption === 'ewallet' && (
                  <div className=" mb-5 pt-3">
                    <div className="flex items-center justify-center gap-5 my-5  ">
                      <button className=" w-32 h-20 flex justify-center items-center focus:outline-none focus:scale-110 shadow-md shadow-dark-gray rounded-md focus:ring-2 focus:ring-blue-500">
                        <img
                          src={gcashlogo}
                          alt="GCash"
                          className="max-w-full max-h-full "
                        />
                      </button>
                      <button className="w-32 h-20 flex justify-center items-center focus:outline-none focus:scale-110 shadow-md shadow-dark-gray rounded-md focus:ring-2 focus:ring-lime">
                        <img
                          src={paymayalogo}
                          alt="Paymaya"
                          className="max-w-full max-h-full"
                        />
                      </button>
                      <button className="w-32 h-20 flex justify-center items-center focus:outline-none focus:scale-110 shadow-md shadow-dark-gray rounded-md focus:ring-2 focus:ring-primary-color">
                        <img
                          src={grabpaylogo}
                          alt="GrabPay"
                          className="max-w-full max-h-full"
                        />
                      </button>
                    </div>
                    <div className="p-5 lg:h-auto bg-white shadow-md shadow-dark-gray">
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
                          placeholder='Enter Name'
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          autoComplete="off"
                          className="mt-1 px-2 py-1 text-primary-color border bg-white border-dark-gray rounded-md w-full"
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
                          placeholder='Enter Contact Number'
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          autoComplete="off"
                          className="mt-1 px-2 py-1 border text-primary-color bg-white border-dark-gray rounded-md w-full"
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
                          placeholder='Enter Email'
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="off"
                          className="mt-1 px-2 py-1 text-primary-color border bg-white border-dark-gray rounded-md w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

  
            </div>
            
            {selectedOption === 'cash' && (
              <div className=" py-7 px-5 my-3 bg-white">
                <h1 className="text-primary-color font-bold mb-4 ">
                  CASH PAYMENT
                </h1>
                <h1 className="mb-3 text-primary-color ">Personal Information</h1>
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
                          className="mt-1 px-2 py-1 text-primary-color border bg-white border-dark-gray rounded-md w-full"
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
                          className="mt-1 px-2 py-1 border text-primary-color bg-white border-dark-gray rounded-md w-full"
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
                          className="mt-1 px-2 py-1 text-primary-color border bg-white border-dark-gray rounded-md w-full"
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
                  className="mt-1 p-2 border bg-white text-primary-color border-dark-gray rounded-md w-full"
                />
              </div>
            )}
          </div>
          <div className=" lg:w-1/2 lg:h-5/6 lg:mb-0 mb-5 bg-white shadow-md shadow-dark-gray">
            <h1 className=" bg-primary-color p-2 text-white rounded-tl-md rounded-tr-md">
              PAYMENT AMOUNT
            </h1>
            <div className="px-5">
              <h1 className="text-light-blue  text-4xl py-8 border-b-2 border-dark-gray mb-4 pb-4 ">
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
                <div className="text-end my-5 text-3xl text-primary-color">
                  <span className=" mr-4">Total:</span>Php 10,000
                </div>
              </div>
            </div>
            <button className="lg:mt-0  lg:ml-24 lg:mb-8  bg-primary-color text-white w-9/12 ml-12 mb-5 py-3 px-2 rounded-md hover:opacity-80 ">
              Pay
            </button>
            <div className="lg:p-4 flex flex-col p-10 items-center justify-center gap-2 bg-gray">
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
    </>
  );
};

export default TenantPayment;
