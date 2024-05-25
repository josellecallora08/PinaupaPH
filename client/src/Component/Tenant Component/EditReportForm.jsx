import React, { useState } from 'react'

const EditReportForm = ({ concern, setShowEditForm }) => {
  // State for form fields

  // Add more state variables for other fields as needed

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement the logic to update the report with the new data

    // Close the form
  }

  return (
    <div className=" fixed top-0 left-0 w-full z-50 h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="lg:w-[50%]  bg-white rounded-lg relative">
        <div className="relative  w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center">
          <h1 className="lg:text-xl ml-5 text-lg font-bold">Edit Report</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-full lg:pt-4 w-fit bg-white h-fit px-4 overflow-y-auto"
        >
          {/* Form fields */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-bold mb-2 text-dark-gray"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              className="text-sm bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="maintenanceType"
              className="block text-sm font-medium text-dark-gray"
            >
              Type
            </label>
            <select
              id="maintenanceType"
              name="type"
              
           
              className="mt-1 block w-full p-2 bg-white border text-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled hidden>
                Maintenance Request
              </option>
              <option value="Plumbing Request">Plumbing</option>
              <option value="Electrical Request">Electrical</option>
              <option value="General Request">General</option>
              <option value="Painting Request">Painting</option>
              <option value="Roofing Request">Roofing </option>
              <option value=" Safety And Security Request">
                {' '}
                Safety and Security
              </option>
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-dark-gray"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
              rows={5}
            ></textarea>
          </div>

          <div className="flex justify-end mt-5 mb-3 gap-3">
            <button
              type="submit"
              className="bg-dark-blue text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-red text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowEditForm((prevState) => !prevState)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditReportForm
