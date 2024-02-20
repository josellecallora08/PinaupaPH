import React, { useEffect, useState } from 'react';
import { payment_url } from '../../utils/constants';
import { FaPlus } from "react-icons/fa6"; 
import SearchBar from '../../Component/SearchBar'
import ApartmentCard from '../../Component/ApartmentCard';
import AddApartment from '../../Component/AddApartment';
import {useDispatch, useSelector} from 'react-redux'
import { fetchUnits } from '../../features/unit';

const Apartment = () => { 
  const dispatch = useDispatch()
  const unitLoading = useSelector(state => state.unit.loading)
  const unit = useSelector(state => state.unit.data)
  
   const handleSearch = (e) => {
     setSearchItem(e.target.value);
   }
   const [searchItem, setSearchItem] = useState("")
   const [isAddApartmentFormOpen, setIsAddApartmentFormOpen] = useState(false)
   const toggleAddApartmentForm = () => {
    setIsAddApartmentFormOpen(!isAddApartmentFormOpen);
  }
  console.log(unit)

  return (
    <div className='lg:ml-3 lg:mr-5  '>
    {/* Top of Apartment Tab */}
    <h1 className='lg:text-5xl m-4 my-7 ml-8 text-4xl font-bold'>Apartments Listing </h1>
    <div className='lg:justify-between md:justify-between flex gap-2 w-full mb-5'>
      <SearchBar onSearch={handleSearch} className='lg:w-1/2 flex-1 '/>
      <button onClick={toggleAddApartmentForm} className='lg:w-64 lg:mr-10 lg:text-base md:text-base md:w-56 md:mr-10 w-56 mr-4 px-2  ml-5 text-xs text-white rounded-lg bg-dark-blue flex items-center justify-center gap-2 ' >
        <FaPlus/>
        Add Apartment
      </button>
    </div>
    {/* Body of Tenant Tab */}
    <div className='lg:grid-cols-2 grid grid-cols-1 gap-4 mr-5' >
        <ApartmentCard/>
        <ApartmentCard/>
        <ApartmentCard/>
        <ApartmentCard/>
    </div>
    {isAddApartmentFormOpen && (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-md'>
          <AddApartment />
        </div>
      </div>
    )}
   

 
    
  </div>
  );
};

export default Apartment;
