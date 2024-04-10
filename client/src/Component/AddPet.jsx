import React from 'react'
import { IoMdClose } from 'react-icons/io'

import { useState } from 'react'

const AddPet = ({setIsAddPetForm}) => {
  const handleSubmit = () => {
    console.log('Form submitted')
    toggleForm()
  }
  return (
    <div className="relative">
    <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
      <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
        Add Pet
      </h1>
    </div>
    <form
      onSubmit={handleSubmit}
      className="lg:w-full lg:pt-4 w-[20rem] h-[20rem] px-4 overflow-y-auto"
    >
          <button className="absolute top-4 right-6">
            <IoMdClose
              onClick={() => setIsAddPetForm((prevState) => !prevState)}
              size={25}
              color="white"
            />
          </button>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block  text-sm font-bold mb-2 text-dark-gray"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter your Pet name"
          className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="species"
          className="block  text-sm font-bold mb-2 text-dark-gray"
        >
          Specie
        </label>
        <input
          type="text"
          id="Specie"
          name="Specie"
          required
          placeholder="Enter Specie of pet"
          className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="relationship"
          className="block  text-sm font-bold mb-2 text-dark-gray"
        >
          Birthday
        </label>
        <input
          type="text"
          id="birthday"
          name="birthday"
          required
          placeholder="Enter birthday of pet"
          className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-end mt-5 gap-3">
        <button
          onClick={handleSubmit}
          className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>

        <button
          className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsAddPetForm((prevState) => !prevState)}
        >
          Close
        </button>
      </div>
    </form>
  </div>
  )
}

export default AddPet