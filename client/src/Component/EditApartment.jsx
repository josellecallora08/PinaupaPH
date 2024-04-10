import React, { useEffect } from 'react'
import { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { editApartment, fetchApartment } from '../features/apartment';
import { fetchUnits } from '../features/unit';
import { editUser, editUserApartment } from '../features/user';

const EditApartment = ({ setIsEditApartmentForm, tenant }) => {
  const dispatch = useDispatch()
  const unit = useSelector(state => state.unit.data)
  const [fields, setFields] = useState({
    unit_no: tenant?.unit_no || '',
    deposit: tenant?.deposit !== null && tenant?.deposit !== undefined ? String(tenant?.deposit) : '',
    occupancy: new Date(tenant?.monthly_due).toISOString().split('T')[0] || ''
  })
  useEffect(() => {
    dispatch(fetchUnits(tenant.unit_id))
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((components) => ({
      ...components,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(fields)
    dispatch(editUserApartment(tenant.id, fields))
    console.log('Form submitted');
  }

  return (
    <>
      <div className='relative'>
        <div className='relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center '>
          <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Edit Apartment Details</h1>
        </div>
        <form onSubmit={handleSubmit} className="lg:w-full w-[20rem] h-auto px-3 py-5 ">
          <button type='button' className='absolute top-4 right-6'><IoMdClose onClick={() => setIsEditApartmentForm(prevState => !prevState)} size={25} color='white' /></button>
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
              <option className="rounded-none" value={tenant?.unit_id}>
                {tenant?.unit_no}
              </option>
              {unit?.filter(item => item.occupied === false).map((val, key) => (
                <option key={key} className="rounded-none" value={val._id}>
                  {val.unit_no}
                </option>
              ))}

            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Deposit
            </label>
            <input
              type="number"
              id="deposit"
              onChange={handleInput}
              name="deposit"
              required
              value={fields.deposit}
              placeholder="Enter your Deposit"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Date of Move In
            </label>
            <input
              type="date"
              id="occupancy"
              onChange={handleInput}
              name="occupancy"
              required
              value={fields.occupancy}
              placeholder="Enter your Date of Move In"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className='flex justify-end mt-5 gap-3'>
            <button className=' bg-dark-blue text-white font-bold py-2 px-4 rounded'>
              Submit
            </button>
            <button onClick={() => setIsEditApartmentForm(prevState => !prevState)} className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'>
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditApartment