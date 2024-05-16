import React, { useEffect } from 'react'
import TenantCard from '../../Component/TenantCard'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import AddTenantForm from '../../Component/AdminComponent/AddTenantForm'
import { useDispatch, useSelector } from 'react-redux'
import { createTenant, fetchUsers, handleSearchUser } from '../../features/user'
import { fetchApartments } from '../../features/apartment'
import { fetchUnits, fetchUnitsApartment } from '../../features/unit'
import SearchLoading from '../../Component/LoadingComponent/Loading'
import MessageToast from '../../Component/ToastComponent/MessageToast'
import NotificationToast from '../../Component/ToastComponent/NotificationToast'

const Tenant = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isAddTenantFormOpen, setIsAddTenantFormOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [isVisible, setIsVisible] = useState(true);

  const [fields, setFields] = useState({
    name: '',
    username: '',
    birthday: '',
    mobile_no: '',
    email: '',
    password: '',
    apartment_id: '',
    unit_id: '',
    deposit: '',
    occupancy: '',
  })
  const dispatch = useDispatch()
  const tenant = useSelector((state) => state.user.data)
  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.error)
  const msg = useSelector((state) => state.user.msg)
  const apartment = useSelector((state) => state.apartment.data)
  const handleDropdown = (e) => {
    setSelectedOption(e.target.value)
  }
  // const [apartmentId, setApartmentId] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTenant(fields))
    if (error || msg) {
      setIsAddTenantFormOpen((prevState) => !prevState)
      setFields({
        name: '',
        username: '',
        birthday: '',
        mobile_no: '',
        email: '',
        password: '',
        unit_id: '',
        apartment_id: '',
        deposit: '',
        occupancy: '',
      })
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
    if (fields.apartment_id === '') return;
    console.log(fields.apartment_id)
    dispatch(fetchUnitsApartment(fields.apartment_id))
  }, [fields.apartment_id])

  useEffect(() => {
    dispatch(fetchApartments())
  }, [])


  return (
    <>
      {/* {isVisible && <MessageToast message={msg} error={error} isVisible={isVisible} setIsVisible={setIsVisible} />} */}
      {/* Add condition if unread it wont show as well */}
      {/* <NotificationToast/> */}
      <div className="w-full h-full bg-white1">
        <div className="w-11/12 flex flex-col m-auto">
          {/* Top of Tenant Tab */}
          <h1 className="uppercase font-bold pt-5">List of Tenant </h1>
          <div className="lg:w-full lg:flex-nowrap py-5 flex gap-5 flex-wrap justify-end lg:justify-between items-center">
            <div className="w-full md:max-w-60 max-w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="w-full lg:w-fit flex items-center gap-5">
              <div className="w-full lg:text-sm flex items-center justify-center">
                <select onChange={handleDropdown} className="select capitalize font-semibold select-bordered w-full max-w-xs">
                  {apartment?.map((val, key) => (
                    <option key={key} value={val._id} >
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={toggleAddTenantForm}
                className="btn w-fit md:btn-wide bg-primary-color font-semibold  text-white hover:text-primary-color"
              >
                <FaPlus />
                Add Tenant
              </button>
            </div>
          </div>

          {/* Body of Tenant Tab */}
          <div className="lg:grid-cols-3  md:grid-cols-1 grid grid-cols-1 md:mr-10 gap-4 pb-5 ">
            {loading ?
              <SearchLoading /> : selectedOption !== '' ? tenant?.filter((item) => !item?.user_id?.isDelete && item?.apartment_id._id === selectedOption).map((val, key) => (
                <TenantCard key={key} data={val} />
              )) : tenant?.filter(item => !item?.user_id?.isDelete).map((val, key) => (
                <TenantCard key={key} data={val} />
              ))}
          </div>
          {isAddTenantFormOpen && (
            <div className="fixed top-6 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white  rounded-md rounded-tl-lg rounded-tr-lg">
                <AddTenantForm
                  fields={fields}
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
    </>
  )
}

export default Tenant
