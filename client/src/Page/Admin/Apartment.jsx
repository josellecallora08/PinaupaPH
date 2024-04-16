import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import SearchBar from '../../Component/SearchBar'
import ApartmentCard from '../../Component/AdminComponent/ApartmentCard'
import AddApartment from '../../Component/AdminComponent/AddApartment'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchApartments,
  handleSearchApartment,
} from '../../features/apartment'

const Apartment = () => {
  const dispatch = useDispatch()
  const unitLoading = useSelector((state) => state.unit.loading)
  const apartment = useSelector((state) => state.apartment.data)
  const [searchItem, setSearchItem] = useState('')

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  const [isAddApartmentFormOpen, setIsAddApartmentFormOpen] = useState(false)
  const toggleAddApartmentForm = () => {
    setIsAddApartmentFormOpen(!isAddApartmentFormOpen)
  }

  useEffect(() => {
    if (searchItem && searchItem !== '') {
      dispatch(handleSearchApartment(searchItem))
      console.log(apartment)
    } else {
      dispatch(fetchApartments())
    }
  }, [searchItem])

  // useEffect(() => {
  //   dispatch(fetchUnitsApartment())
  // }, [])

  return (
    <div className="w-full h-screen bg-white1">
      {/* Top of Apartment Tab */}
      <div className="w-11/12 m-auto h-full ">
        <h1 className="uppercase font-bold py-5">Apartments Listing </h1>
        <div className="lg:justify-between md:justify-between flex-wrap justify-end flex items-center gap-2 w-full">
          <div className="w-full md:max-w-60">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={toggleAddApartmentForm}
            className="btn md:btn-wide w-full bg-primary-color text-white hover:text-primary-color"
          >
            <FaPlus />
            Add Apartment
          </button>
        </div>
        {/* Body of Tenant Tab */}
        <div className="lg:grid-cols-2 2xl:grid-cols-3 grid 2xl:grid-rows-4 grid-cols-1 gap-4 py-5">
          {apartment?.map((val, key) => (
            <ApartmentCard key={key} val={val} num={key} />
          ))}
        </div>
      </div>
      {isAddApartmentFormOpen && (
        <div className="lg:top-9 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="lg:w-auto h-auto  lg:mt-2 mt-14 w-10/12 bg-white  rounded-md">
            <AddApartment
              setIsAddApartmentFormOpen={setIsAddApartmentFormOpen}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Apartment
