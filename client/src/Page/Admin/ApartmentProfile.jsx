import React, { useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from 'react-icons/io';
import ApartmentStatusCard from '../../Component/ApartmentStatusCard';
import AddRoom from '../../Component/AddRoom';
import EditApartment from '../../Component/EditApartment';
const ApartmentProfile = () => {
  const [searchItem, setSearchItem] = useState("")
  const [isAddRoomFormOpen, setIsAddRoomFormOpen] = useState(false)
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [isEditApartmentFormOpen, setIsEditApartmentFormOpen] = useState(false);
  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  }
  
 
  const toggleAddRoomForm = () => {

    setIsAddRoomFormOpen(!isAddRoomFormOpen);
  }
  const toggleEditApartmentForm = () => {
    setIsEditApartmentFormOpen(!isEditApartmentFormOpen);
  }


  const toggledropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };


  const dropdownItems = ['Available Units', 'Occupied Units'];


  return (
    <div>
      <div className='mb-10'>
        {/* Upper part of Apartment Profile */}
        <h1 className='text-3xl font-black m-5'>
          View Apartment
        </h1>
        <div className=' flex bg-white gap-10 mx-5 px-5 py-4 rounded-md shadow-md shadow-gray '>
          <div className='lg:w-1/2'>
            <h1 className='lg:text-3xl md:text-3xl text-black text-2xl mb-3'>
              Facebook Apartment
            </h1>
            <p className='lg:text-base md:text-base text-sm'>
              Total Unit : 2
            </p>
            <div className='flex gap-5 mt-16 '>
              <button onClick={toggleEditApartmentForm} className='lg:text-xl lg:px-5 lg:py-2 bg-light-blue text-white  py-2 px-6 rounded-md'>Edit</button>
              <button className='lg:text-xl lg:px-5 lg:py-2 bg-red text-white  py-2 px-4 rounded-md'>Delete</button>
            </div>
          </div>
        <div className='lg:w-1/2 lg:text-xl md:w-1/2 md:text-xl md:ml-16 flex flex-col '>
              <div className='lg:justify-between lg:flex md:justify-between md:flex '>
                <h1 className='lg:text-xl md:text-xl text-lg font-black'>Address</h1>
                <p className='lg:text-lg md:text-lg lg:mt-2 text-sm'>Cavite</p>
              </div>
              <div className='lg:justify-between lg:mt-0 lg:flex md:justify-between md:flex mt-4'>
                <h1 className='lg:text-xl md:text-xl text-lg font-black'>Province/City</h1>
                <p className='lg:text-lg md:text-lg lg:mt-1 text-sm'>Sampaloc St.</p>
              </div>
              <div className='lg:justify-between lg:mt-0 lg:flex md:justify-between md:flex mt-4 '>
                <h1 className='lg:text-xl md:text-xl text-lg font-black'>Baranggay</h1>
                <p className='lg:text-lg md:text-lg lg:mt-2 text-sm'>Cavite</p>
              </div>
        </div>

        </div>
        <div className='lg:justify-between md:justify-between flex gap-2 w-full mb-5 mt-5'>
            <SearchBar onSearch={handleSearch} className='lg:w-1/2 flex-1 '/>
            <button onClick={toggleAddRoomForm} className='lg:w-64 lg:mr-10 lg:text-base md:text-base md:w-56 md:mr-10 w-56 mr-4 px-2  ml-5 text-sm text-white rounded-lg bg-dark-blue flex items-center justify-center gap-2 ' >
              <FaPlus/>
              Add Room
            </button>
        </div>

      <div className='relative'>
        <div className=' flex justify-between items-center mt-10 ml-5'>
          <button
            onClick={toggledropdown}
            className='lg:ml-auto lg:mr-32 flex items-center border-2 border-gray  mr-4 justify-between w-48 p-2 text-base rounded-tr-lg rounded-tl-lg'
          >
            Apartment Status
            <IoIosArrowDown size={25} className={dropdownOpen ? 'rotate-180' : ''} />
          </button>

        </div>


        {dropdownOpen && (
          <div className='lg:left-3/4 lg:-ml-3 absolute top-full z-50 w-48 left-5 bg-white shadow-sm shadow-light-gray '>
            {dropdownItems.map((item, index) => (
              <div key={index}>
                <button className='flex items-center gap-5 px-4 text-left py-2 hover:bg-gray w-full'>{item}</button>
              </div>
            ))}
          </div>
        )}
      </div>
        <div className='lg:grid-cols-2 mt-5 grid grid-cols-1 gap-2 mx-5'>
          <ApartmentStatusCard/>
          <ApartmentStatusCard/>
          <ApartmentStatusCard/>
        </div>
      </div>
      {isAddRoomFormOpen && (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-md'>
          <AddRoom />
        </div>
      </div>
    )}
          {isEditApartmentFormOpen && (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-md'>
          <EditApartment />
        </div>
      </div>
    )}
    </div>
  )
}

export default ApartmentProfile