import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import LeaseView from '../../Page/Admin/LeaseView'
import 'react-datepicker/dist/react-datepicker.css'

const AddLease = ({ setModal }) => {
  const [startDate, setStartDate] = useState(null)

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex
        justify-center items-center z-10"
      >
        <div className="lg:w-[600px] md:w-[500px] bg-white p5 rounded-md ">
          <div className="bg-[#183044] p-5 rounded-t-md text-white">Modal</div>
          <div className="p-5 mt-3">
            <h1 className="mb-3">Date of Agreement</h1>
            <ReactDatePicker
              showYearDropdown
              isClearable
              scrollableYearDropdown
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border border-black rounded-md lg:w-[550px] md:w-[450px] h-[50px]"
            />
          </div>
          <div className="flex flex-row justify-end gap-3 mr-3 mb-3">
            <button className="bg-[#183044] flex flex-row items-center py-2 px-6 rounded-md text-white"
            >
              SUBMIT
            </button>
            <button
              className="bg-[#F2F2F2] flex flex-row items-center py-2 px-6 rounded-md"
              onClick={()=> setModal(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>

    </>
  )
}


export default AddLease
