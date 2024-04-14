import React, { useEffect } from 'react'
import TenantCard from '../../Component/TenantCard'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import AddTenantForm from '../../Component/AddTenantForm'
import { useDispatch, useSelector } from 'react-redux'
import { createTenant, fetchUsers, handleSearchUser } from '../../features/user'
import { fetchApartments } from '../../features/apartment'
import { fetchUnits } from '../../features/unit'

const Tenant = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isAddTenantFormOpen, setIsAddTenantFormOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const [fields, setFields] = useState({
    name: '',
    username: '',
    birthday: '',
    mobile_no: '',
    email: '',
    password: '',
    unit_id: '',
    deposit: '',
    occupancy: '',
  })
  const dispatch = useDispatch()
  const tenant = useSelector((state) => state.user.data)
  const error = useSelector((state) => state.user.error)
  const apartment = useSelector((state) => state.apartment.data)
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTenant(fields))
    setFields({
      name: '',
      username: '',
      birthday: '',
      mobile_no: '',
      email: '',
      password: '',
      unit_id: '',
      deposit: '',
      occupancy: '',
    })
    if (error !== null) {
      setIsAddTenantFormOpen((prevState) => !prevState)
    }
  }

  const toggleAddTenantForm = () => {
    setIsAddTenantFormOpen(!isAddTenantFormOpen)
  }
  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  useEffect(() => {
    if (searchItem && searchItem !== '') {
      dispatch(handleSearchUser(searchItem))
    } else {
      dispatch(fetchUsers())
    }
  }, [searchItem])

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }))
  }

  useEffect(() => {
    dispatch(fetchUnits())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchApartments())
  }, [])

  return (
    <div className="w-full h-full">
      <div className="w-11/12 flex flex-col m-auto">
        {/* Top of Tenant Tab */}
        <h1 className="uppercase font-bold py-5 ">List of Tenant </h1>
        <div className="lg:w-full lg:flex-nowrap  flex flex-wrap justify-end lg:justify-between items-center">
          <div className="w-full md:max-w-60 max-w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex items-center gap-5 py-5">
            <div className="lg:text-sm flex items-center justify-center">
              <select className="select select-bordered w-full max-w-xs">
                {apartment?.map((val, key) => (
                  <option value={val._id} selected>
                    {val.name}
                  </option>
                ))}

               
              </select>
            </div>
            <button
              onClick={toggleAddTenantForm}
              className="btn btn-wide bg-primary-color text-white hover:text-primary-color"
            >
              <FaPlus />
              Add Tenant
            </button>
          </div>
        </div>

        {/* Body of Tenant Tab */}
        <div className="lg:grid-cols-3 md:grid-cols-2 grid grid-cols-1 ">
          {tenant?.map((val, key) => (
            <TenantCard key={key} data={val} />
          ))}
        </div>
        {isAddTenantFormOpen && (
          <div className="fixed top-6 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white  rounded-md rounded-tl-lg rounded-tr-lg">
              <AddTenantForm
                // setFields={setFields}
                handleSubmit={handleSubmit}
                error={error}
                handleInput={handleInput}
                setIsAddTenantFormOpen={setIsAddTenantFormOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tenant
