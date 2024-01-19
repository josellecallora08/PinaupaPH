import React from 'react'
import TenantCard from '../../Component/TenantCard'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react'
import AddTenantForm from '../../Component/AddTenantForm';

const Tenant = () => {
 const [searchItem, setSearchItem] = useState("")
 const [isAddTenantFormOpen, setIsAddTenantFormOpen] = useState(false)
 

 const handleSubmit = (e) => {
  e.preventDefault()
  console.log('Form submitted')
  setIsAddTenantFormOpen(!isAddTenantFormOpen)
}
 const toggleAddTenantForm = () => {
   setIsAddTenantFormOpen(!isAddTenantFormOpen);
 }
 const handleSearch = (e) => {
   setSearchItem(e.target.value);
 }

  return (
    <div className='lg:ml-3'>
      {/* Top of Tenant Tab */}
      <h1 className='lg:text-5xl m-4 my-7 ml-8 text-4xl font-bold'>List of Tenant </h1>
      <div className='lg:justify-between flex gap-2 w-full'>
        <SearchBar onSearch={handleSearch} className='lg:w-1/2 flex-1 '/>
        <button className='lg:w-32 lg:mr-10 w-1/3  ml-5 text-white rounded-lg bg-dark-blue flex items-center justify-center gap-2 ' onClick={toggleAddTenantForm}>
          <FaPlus/>
          Add Tenant
        </button>
      </div>

      {/* Body of Tenant Tab */}
      <div>
        <TenantCard/>
      </div>
      {isAddTenantFormOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-md'>
            <AddTenantForm />
            <div className='flex justify-end mt-5 gap-3'>

                <button onClick={handleSubmit} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                  Submit
                </button>

                <button
                  className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'
                  onClick={toggleAddTenantForm}
                >
                  Close
                </button>
               
            </div>
            
          </div>
        </div>
      )}
     

   
      
    </div>
  )
}

export default Tenant