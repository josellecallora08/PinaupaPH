import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import SearchBar from '../../Component/SearchBar'
import ApartmentCard from '../../Component/AdminComponent/ApartmentCard'
import AddApartment from '../../Component/AdminComponent/AddApartment'
import { useDispatch, useSelector } from 'react-redux'
import {
  createApartment,
  fetchApartments,
  handleSearchApartment,
} from '../../features/apartment'
import Loading from '../../Component/LoadingComponent/Loading'

const Apartment = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.apartment.error)
  const msg = useSelector((state) => state.apartment.msg)
  const loading = useSelector((state) => state.apartment.loading)
  const apartment = useSelector((state) => state.apartment.data)
  const [isAddApartmentFormOpen, setIsAddApartmentFormOpen] = useState(false)
  const [searchItem, setSearchItem] = useState('')

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  const toggleAddApartmentForm = () => {
    setIsAddApartmentFormOpen(!isAddApartmentFormOpen)
  }

  useEffect(() => {
    if (searchItem && searchItem !== '') {
      dispatch(handleSearchApartment(searchItem))
    } else {
      dispatch(fetchApartments())
    }
  }, [searchItem])

  const [fields, setFields] = useState({
    name: '',
    address: '',
    province: '',
    barangay: '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((components) => ({
      ...components,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createApartment(fields))
    if (error || msg) {
      setIsAddApartmentFormOpen(false)
    }
    
  } 

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
          {loading ? (
            <Loading />
          ) : (
            apartment?.map((val, key) => (
              <ApartmentCard key={key} val={val} num={key} />
            ))
          )}
        </div>
      </div>
      {isAddApartmentFormOpen && (
        <div className="lg:top-9 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="lg:w-auto h-auto  lg:mt-2 mt-14 w-10/12 bg-white  rounded-md">
            <AddApartment
              setIsAddApartmentFormOpen={setIsAddApartmentFormOpen}
              fields={fields}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Apartment
