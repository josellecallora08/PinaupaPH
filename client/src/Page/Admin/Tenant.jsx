import React from 'react'
import TenantCard from '../../Component/TenantCard'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import AddTenantForm from '../../Component/AddTenantForm'



const Tenant = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isAddTenantFormOpen, setIsAddTenantFormOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [open, setOpen] = useState(false)


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }
  const toggle = () => {
    setOpen(!open)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
    setIsAddTenantFormOpen(!isAddTenantFormOpen)
  }
  const toggleAddTenantForm = () => {
    setIsAddTenantFormOpen(!isAddTenantFormOpen)
  }
  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  return (
    <div className='w-full h-full'>
    <div className="w-11/12 flex flex-col m-auto">
      {/* Top of Tenant Tab */}
      <h1 className="uppercase font-bold py-5 ">List of Tenant </h1>
      <div className="lg:w-full lg:flex-nowrap  flex flex-wrap justify-end lg:justify-between items-center">
        <div className="w-full md:max-w-60 max-w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
           <div className='flex items-center gap-5 py-5'>
           <button
              onClick={toggleAddTenantForm}
              className="lg:text-xs h-full lg:order-last p-3 uppercase text-sm text-white rounded-md bg-primary flex items-center justify-center gap-2 "
            >
              <FaPlus />
              Add Tenant
            </button>

            <div className="lg:text-sm flex items-center justify-center">
              <select
                className=" lg:p-3 bg-white border  border-gray-400 hover:border-gray-500 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline p-2 cursor-pointer"
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ color: selectedOption ? 'black' : 'gray' }}
              >
                <option style={{ color: 'gray' }}  value="">Select Building</option>
                <option value="option1" className=' rounded-none'>Option 1</option>
                <option value="option2" className=''>Option 2</option>
                <option value="option3" className=''>Option 3</option>
              </select>
            </div>
           </div>
      </div>

      {/* Body of Tenant Tab */}
      <div className="lg:grid-cols-2 md:grid-cols-2 grid grid-cols-1 ">
        <TenantCard />
        <TenantCard />
        <TenantCard />
      </div>
      {isAddTenantFormOpen && (
        <div className="fixed top-6 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white  rounded-md rounded-tl-lg rounded-tr-lg">
            <AddTenantForm setIsAddTenantFormOpen={setIsAddTenantFormOpen} />
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Tenant
