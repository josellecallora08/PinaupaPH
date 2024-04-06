import React, { useEffect, useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import ApartmentStatusCard from '../../Component/ApartmentStatusCard'
import AddRoom from '../../Component/AddRoom'
import EditApartment from '../../Component/EditApartment'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import EditApartmentDetails from '../../Component/EditApartmentDetails'
import { fetchUnitsApartment } from '../../features/unit'
const ApartmentProfile = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isAddRoomFormOpen, setIsAddRoomFormOpen] = useState(false)
  const [dropdownOpen, setdropdownOpen] = useState(false)
  const [isEditApartmentFormOpen, setIsEditApartmentFormOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const units = useSelector((state) => state.unit.data)

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }
  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  const toggleAddRoomForm = () => {
    setIsAddRoomFormOpen(!isAddRoomFormOpen)
  }
  const toggleEditApartmentForm = () => {
    setIsEditApartmentFormOpen(!isEditApartmentFormOpen)
  }

  useEffect(() => {
    dispatch(fetchUnitsApartment(id))
    console.log(units)
  }, [])

  const dropdownItems = ['Available Units', 'Occupied Units']

  return (
    <div>
      <div className="mb-10">
        {/* Upper part of Apartment Profile */}
        <h1 className="uppercase font-bold px-10 p-5">View Apartment</h1>
        <div className=" flex bg-white gap-10 mx-5 px-5 py-4 rounded-md shadow-md shadow-gray ">
          <div className="lg:w-1/2">
            <h1 className="lg:text-3xl md:text-3xl text-black text-2xl mb-3">
              Facebook Apartment
            </h1>
            <p className="lg:text-base md:text-base text-sm">Total Unit : 2</p>
            <div className="flex gap-5 mt-16 ">
              <button
                onClick={toggleEditApartmentForm}
                className="lg:text-xl lg:px-5 lg:py-1 bg-dark-blue text-white  py-2 px-6 rounded-md"
              >
                Edit
              </button>
              <button className="lg:text-base lg:px-5 lg:py-2 uppercase bg-red text-white  py-2 px-4 rounded-md">
                Delete
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 lg:text-xl md:w-1/2 md:text-xl md:ml-16 flex flex-col ">
            <div className="lg:justify-between lg:flex md:justify-between md:flex ">
              <h1 className="lg:text-xl md:text-xl text-lg font-black">
                Address
              </h1>
              <p className="lg:text-lg md:text-lg lg:mt-2 text-sm">Cavite</p>
            </div>
            <div className="lg:justify-between lg:mt-0 lg:flex md:justify-between md:flex mt-4">
              <h1 className="lg:text-xl md:text-xl text-lg font-black">
                Province/City
              </h1>
              <p className="lg:text-lg md:text-lg lg:mt-1 text-sm">
                Sampaloc St.
              </p>
            </div>
            <div className="lg:justify-between lg:mt-0 lg:flex md:justify-between md:flex mt-4 ">
              <h1 className="lg:text-xl md:text-xl text-lg font-black">
                Baranggay
              </h1>
              <p className="lg:text-lg md:text-lg lg:mt-2 text-sm">Cavite</p>
            </div>
          </div>
        </div>
        <div className="lg:justify-between lg:ml-9 md:justify-between flex gap-2 w-full mb-5 mt-5 ml-6">
          <SearchBar onSearch={handleSearch} className="lg:w-1/2  flex-1  " />
          <button
            onClick={toggleAddRoomForm}
            className="lg:w-64 lg:mr-20 lg:text-base md:text-base md:w-56 md:mr-10 uppercase w-36 ml-14 px-2 mr-10   text-sm text-white rounded-lg bg-dark-blue flex items-center justify-center gap-2 "
          >
            <FaPlus />
            Add Unit
          </button>
        </div>

        <div>
          <select
            className="lg:ml-10 lg:w-48 lg:h-12  ml-7  bg-white text-black w-40 h-10 p-1 rounded-lg border-2"
            value={selectedOption}
            onChange={handleOptionChange}
            style={{ color: selectedOption ? 'black' : 'gray' }}
          >
            <option style={{ color: 'gray' }} value="">
              Select Building
            </option>
            <option value="option1" className=" rounded-none">
              Option 1
            </option>
            <option value="option2" className="">
              Option 2
            </option>
            <option value="option3" className="">
              Option 3
            </option>
          </select>
        </div>
        <div className="lg:grid-cols-3 mt-5 grid grid-cols-1 gap-2 mx-5">
            {units?.map((val, key) => (
              <ApartmentStatusCard apartmentId = {id} val={val} key={key}/>
            ))}
        </div>
      </div>
      {isAddRoomFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="pb-5 bg-white  rounded-md">
            <AddRoom setIsAddRoomFormOpen={setIsAddRoomFormOpen} />
          </div>
        </div>
      )}
      {isEditApartmentFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="lg:w-1/2 mt-14 bg-white rounded-lg">
            <EditApartmentDetails
              setIsEditApartmentFormOpen={setIsEditApartmentFormOpen}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ApartmentProfile
