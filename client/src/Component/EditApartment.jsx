import React from 'react'
import { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";

const EditApartment = () => {
  const [newUsername, setNewUsername] = useState('')
const [aptname, setaptname] = useState('')
const [address, setaddress] = useState('')
const [location, setlocation] = useState('')
const [baranggay, setbaranggay] = useState('')
const [isFormOpen, setIsFormOpen] = useState(false)

const toggleForm = () => {

  setIsFormOpen(!isFormOpen);
}
const handleSubmit = () => {
console.log('Form submitted');
toggleForm();
 
}
  return (
    <>
     <div className='relative'>
        <form action="" onSubmit={handleSubmit} className="lg:w-[30rem] w-[20rem] h-auto px-3 ">
        <div className='flex items-center mb-5 gap-4'>
            <button className=''><IoIosArrowBack onClick={toggleForm} size={30} color='blue' /></button>
            <h1 className="lg:text-3xl text-2xl font-bold ">Edit Apartment</h1>
          </div>
                <div className="mb-4">
                  <label htmlFor="aptname" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                    Apartment Name
                  </label>
                  <input
                    type="text"
                    id="aptname"
                    onChange={(e) => setaptname(e.target.value)}
                    name="aptname"
                    
                    placeholder="Enter your Apartment Name"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder="Enter your Address"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                    Province/City
                  </label>
                  <input
                    type="text"
                    id="location"
                    onChange={(e) => setlocation(e.target.value)}
                    name="location"

                    placeholder="Enter your Province/City"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="brgy" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                   Baranggay
                  </label>
                  <input
                    type="text"
                    id="brgy"
                    onChange={(e) => setlocation(e.target.value)}
                    name="brgy"

                    placeholder="Enter your Baranggay"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className='flex justify-end mt-5 gap-3'>

                  <button onClick={handleSubmit} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                    Submit
                  </button>

                  <button onClick={toggleForm} className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'>
                    Close
                  </button>
                
                  
                </div>
        </form>
     
  </div>
    </>
  )
}

export default EditApartment