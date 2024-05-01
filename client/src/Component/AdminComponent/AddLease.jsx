import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import LeaseView from '../../Page/Admin/LeaseView'
import 'react-datepicker/dist/react-datepicker.css'

const AddLease = ({ setModal }) => {
  const [startDate, setStartDate] = useState(null)
  const [username, setUsername] = useState('')
  const [unitNo, setUnitNo] = useState('')
  const [apartmentName, setApartmentName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <>
      <div className="fixed inset-0 mt-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10">
        <form onSubmit={handleSubmit} className="w-full md:w-[80%] lg:w-[60%]">
          <div className="bg-white pb-2 rounded-md">
            <div className="bg-[#183044] p-5 rounded-t-md text-white">
              Add Lease Agreement 
            </div>
            <div className="p-2">
              <h1 className="mb-3">Date of Agreement</h1>
              <ReactDatePicker
                showYearDropdown
                isClearable
                scrollableYearDropdown
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="pl-3 border border-black rounded-md w-full h-[50px]"
              />
            </div>
            <div className="p-2">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-3 border border-black rounded-md w-full h-[50px]"
              />
            </div>
            <div className="p-2">
              <label htmlFor="unitNo">Unit Number:</label>
              <input
                type="text"
                id="unitNo"
                value={unitNo}
                onChange={(e) => setUnitNo(e.target.value)}
                className="border border-black rounded-md w-full h-[50px]"
              />
            </div>
            <div className="p-2">
              <label htmlFor="apartmentName">Apartment Name:</label>
              <input
                type="text"
                id="apartmentName"
                value={apartmentName}
                onChange={(e) => setApartmentName(e.target.value)}
                className="pl-3 border border-black rounded-md w-full h-[50px]"
              />
            </div>
            <div className="flex flex-row justify-end gap-3 mr-3 mb-3">
              <button type="submit" className="bg-[#183044] flex flex-row items-center py-2 px-6 rounded-md text-white">
                SUBMIT
              </button>
              <button
                className="bg-red text-white flex flex-row items-center py-2 px-6 rounded-md"
                onClick={() => setModal(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddLease
