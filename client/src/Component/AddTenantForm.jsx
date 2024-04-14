import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { base_url } from '../utils/constants'
import { IoMdClose } from 'react-icons/io'

import { useDispatch, useSelector } from 'react-redux'
import { createTenant } from '../features/user'
import { fetchUnits } from '../features/unit'

const AddTenantForm = ({
  handleSubmit,
  handleInput,
  setIsAddTenantFormOpen,
  error
}) => {
  const unit = useSelector((state) => state.unit.data)

  return (
    <div className="relative">
      <div className="w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
        <h1 className="lg:text-xl relative lg:ml-5 text-2xl font-bold ">
          Add Tenant Details
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="lg:w-[30rem] w-[20rem] h-[25rem] p-3 overflow-y-auto"
      >
            {error && (
            <div className="  w-auto bg-light-red text-dark-blue p-4 my-4 rounded ">
              {error}
            </div>
          )}
        <button className="absolute top-4 right-6">
          <IoMdClose
            onClick={() => setIsAddTenantFormOpen((prevState) => !prevState)}
            size={25}
            color="white"
          />
        </button>
        {/* <h1 className="lg:mt-5 text-xl font-bold mb-4">Personal Details</h1> */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInput}
            required
            placeholder="Enter your name"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleInput}
            required
            placeholder="Enter your username"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="birthday"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            onChange={handleInput}
            required
            placeholder="Enter your birthday"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobile_no"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Contact
          </label>
          <input
            type="tel"
            id="mobile_no"
            name="mobile_no"
            onChange={handleInput}
            required
            placeholder="Enter your contact number"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInput}
            required
            placeholder="Enter your email"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
            required
            placeholder="Enter your password"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* <h1 className="text-xl font-bold mb-4">Apartment Details</h1> */}
        <div className="mb-4">
          <label
            htmlFor="apartment_unit"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Apartment Unit
          </label>
          <select
            name="unit_id"
            id="unit_id"
            onChange={handleInput}
            className="w-full py-2 px-3 border-2 border-[#9e9e9e] rounded"
          >
            <option className="rounded-none" value="someOption">
              Some option
            </option>
            {unit?.filter(item => item.occupied === false).map((val, key) => (
              <option key={key} className="rounded-none" value={`${val._id}`}>
                {val.unit_no}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="deposit"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Deposit
          </label>
          <input
            type="text"
            id="deposit"
            onChange={handleInput}
            required
            name="deposit"
            placeholder="Enter your Deposit"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateofin"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Date of Occupant In
          </label>
          <input
            type="date"
            id="occupancy"
            name="occupancy"
            onChange={handleInput}
            required
            placeholder="Enter your Date of Occupant In"
            className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end my-5 gap-3">
          <button
            type="submit"
            className="active:bg-white active:text-primary active:border-primary border bg-dark-blue text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>

          <button
            onClick={() => setIsAddTenantFormOpen((prevState) => !prevState)}
            className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTenantForm
