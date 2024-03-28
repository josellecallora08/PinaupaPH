import React, { useEffect } from 'react'
import { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { editApartment, fetchApartment } from '../features/apartment';

const EditApartmentDetails = ({apartmentId,setIsEditApartmentDetails}) => {
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
  
  setFields({
    name: apartment?.name || '',
    address: apartment?.address || '',
    location: apartment?.location || '',
    barangay: apartment?.barangay || ''
  })
  console.log(isFormOpen)
  setIsFormOpen(!isFormOpen);
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
     <div className='relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center '>
            <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Edit Apartment Details</h1>
      </div>
        <form action="" onSubmit={handleSubmit} className="lg:w-full w-[20rem] h-auto px-3 py-5 ">
        <button  className='absolute top-4 right-6'><IoMdClose onClick={() => setIsEditApartmentDetails(prevState => !prevState)}  color='white' /></button>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 ">
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
                  <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2 ">
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
                  <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2 ">
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
                  <label htmlFor="barangay" className="block text-gray-700 text-sm font-bold mb-2 ">
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
                  <button className=' bg-dark-blue text-white font-bold py-2 px-4 rounded'>
                    Submit
                  </button>
                  <button onClick={() => setIsEditApartmentDetails(prevState => !prevState)}  className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'>
                    Close
                  </button>
                </div>
        </form>
  </div>
    </>
  )
}

export default EditApartmentDetails