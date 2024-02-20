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
    <div className='lg:ml-3 lg:mr-5 '>
      {/* Top of Tenant Tab */}
      <h1 className='lg:text-5xl m-4 my-7 ml-8 text-4xl font-bold'>List of Tenant </h1>
      <div className='lg:justify-between md:justify-between flex gap-2 w-full'>
        <SearchBar onSearch={handleSearch} className='lg:w-1/2 flex-1 '/>
        <button onClick={toggleAddTenantForm} className='lg:w-64 lg:mr-10 md:w-56 md:mr-10 w-48 mr-4 px-2  ml-5 text-white rounded-lg bg-dark-blue flex items-center justify-center gap-2 ' >
          <FaPlus/>
          Add Tenant
        </button>
      </div>

      {/* Body of Tenant Tab */}
      <div className='lg:grid-cols-2 md:grid-cols-2 grid  grid-cols-1'>
        <TenantCard/>
        <TenantCard/>
        <TenantCard/>
        
  
      </div>
      {isAddTenantFormOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-md'>
            <AddTenantForm />
          </div>
        </div>
      )}
     

   
      
    </div>
  )
}

export default Tenant