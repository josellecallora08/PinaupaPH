import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";

import { IoMdClose } from 'react-icons/io'

const CreateTicket = ({setisCreateTicket}) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleSubmit = () => {
    console.log('Form submitted')
    toggleForm()
  }

  return (
    <div className="relative">
      <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Create Ticket</h1>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="lg:w-full lg:pt-4 w-[20rem] h-[20rem] px-4 overflow-y-auto"
      >
        <h1 className='lg:mt-1 my-5'>Problem Details</h1>
        <button onClick={() => setisCreateTicket((prevState) => !prevState)} className="absolute top-4 right-6">
          <IoMdClose size={25} color="white" />
        </button>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block  text-sm font-bold mb-2 text-dark-gray"
          >
            Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
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
            name="maintenanceType"
            value={selectedType}
            onChange={handleTypeChange}
            style={{
              color: selectedType ? 'black' : 'gray',
              borderColor: 'black',
            }}
            className="mt-1 block w-full p-2 bg-white border text-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="" disabled selected hidden>
              Maintenance Request
            </option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="general">General</option>
            {/* Add more options as needed */}
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
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
            rows={5}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="attachment"
            className="mt-4 block text-sm font-medium text-dark-gray"
          >
            Attachment
          </label>
          <div className="mt-1 flex justify-center items-center">
            <label
              htmlFor="addImage"
              className=" cursor-pointer bg-white border border-gray-300 p-2 rounded-md w-full"
            >
              <span className="text-dark-gray flex items-center gap-2"><CiImageOn color='black' size={25} />Attach your photo here.</span>
              <input
                type="file"
                id="addImage"
                name="addImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Attached Image"
                className="max-w-full h-auto"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end my-5 gap-3">
          <button
            onClick={handleSubmit}
            className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>

          <button onClick={() => setisCreateTicket((prevState) => !prevState)} className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTicket
