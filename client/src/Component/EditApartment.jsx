import React, { useEffect } from 'react'
import { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { editApartment, fetchApartment } from '../features/apartment';

const EditApartment = ({apartmentId}) => {
const dispatch = useDispatch()
const apartment = useSelector(state => state.apartment.data)
const [fields, setFields] = useState({
  name: apartment?.name || '',
  address: apartment?.address || '',
  location: apartment?.location || '',
  barangay: apartment?.barangay || ''
})
const [isFormOpen, setIsFormOpen] = useState(false)

const toggleForm = () => {
  setIsFormOpen(!isFormOpen);
  setFields({
    name: apartment?.name || '',
    address: apartment?.address || '',
    location: apartment?.location || '',
    barangay: apartment?.barangay || ''
  })
}

useEffect(() => {
  dispatch(fetchApartment(apartmentId))
}, [dispatch])

const handleInput = (e) => {
  const {name, value} = e.target
  setFields((components) => ({
    ...components,
    [name]:value
  }))
}

const handleSubmit = (e) => {
e.preventDefault()
dispatch(editApartment(fields))
console.log('Form submitted');
toggleForm(!isFormOpen);
// setFields({
//   name: '',
//   address: '',
//   province: '',
//   barangay: '',
// })
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
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                    Apartment Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={handleInput}
                    name="name"
                    value={fields.name}                    
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
                    onChange={handleInput}
                    value={fields.address}
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
                    onChange={handleInput}
                    value={fields.location}
                    name="location"
                    placeholder="Enter your Province/City"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="barangay" className="block text-gray-700 text-sm font-bold mb-2 text-dark-gray">
                   Baranggay
                  </label>
                  <input
                    type="text"
                    id="barangay"
                    onChange={handleInput}
                    value={fields.barangay}
                    name="barangay"
                    placeholder="Enter your Baranggay"
                    className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className='flex justify-end mt-5 gap-3'>
                  <button className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
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