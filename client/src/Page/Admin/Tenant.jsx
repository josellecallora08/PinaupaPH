import React, { useEffect } from 'react'
import TenantCard from '../../Component/TenantCard'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import AddTenantForm from '../../Component/AdminComponent/AddTenantForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  createTenant,
  fetchUsers,
  handleSearchUser,
  resetUserStatus,
} from '../../features/user'
import { fetchApartments } from '../../features/apartment'
import { fetchUnits, fetchUnitsApartment } from '../../features/unit'
import Popup from '../../Component/PopUp'
const Tenant = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isAddTenantFormOpen, setIsAddTenantFormOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('all')
  const menu = useSelector((state) => state.toggle.sidebar)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
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
  const handleSubmit = async (e) => {
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
      apartment_id: '',
      deposit: '',
      occupancy: '',
    })
    setIsAddTenantFormOpen((prevState) => !prevState)
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
  useEffect(() => {
    if (msg !== null) {
      setPopupMessage(msg)
    } else if (error !== null) {
      setPopupMessage(error)
    }

    if (msg !== null || error !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetUserStatus())
      }, 3000)
    }
  }, [msg, error])
  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (fields.apartment_id === '') return
    console.log(fields.apartment_id)
    dispatch(fetchUnitsApartment(fields.apartment_id))
  }, [fields.apartment_id])
  useEffect(() => {
    if (msg !== null) {
      setPopupMessage(msg)
    } else if (error !== null) {
      setPopupMessage(error)
    }

    if (msg !== null || error !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetUserStatus())
      }, 3000)
    }
  }, [msg, error])
  useEffect(() => {
    dispatch(fetchApartments())
  }, [])
  return (
    <>
      {/* {isVisible && <MessageToast message={msg} error={error} isVisible={isVisible} setIsVisible={setIsVisible} />} */}
      {/* Add condition if unread it wont show as well */}
      {/* <NotificationToast/> */}
      <div className="w-full h-full bg-white1 overflow-y-auto">
        <div className="w-11/12 flex flex-col m-auto">
          {/* Top of Tenant Tab */}
          <h1 className="uppercase font-bold pt-5">List of Tenant </h1>
          <div className="lg:w-full lg:flex-nowrap py-5 flex gap-5 flex-wrap justify-end lg:justify-between items-center">
            <div className="w-full md:max-w-60 max-w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="w-full lg:w-fit flex items-center gap-5">
              <div className="w-full lg:text-sm flex items-center justify-center">
                <select
                  onChange={handleDropdown}
                  className="select capitalize font-semibold select-bordered w-full max-w-xs"
                >
                  <option value="all">All Tenants</option>
                  <option value="deleted">Deleted Tenants</option>
                  {apartment
                    ?.filter((item) => item.units.some((unit) => unit.occupied))
                    .map((val, key) => (
                      <option key={key} value={val._id}>
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
          <div
            className={`${menu ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}   grid grid-cols-1 md:mr-10 gap-4 pb-5`}
          >
            {(() => {
              let filteredTenants = []
              if (selectedOption === 'all') {
                filteredTenants = tenant?.filter(
                  (item) => !item?.user_id?.isDelete,
                )
              } else if (selectedOption === 'deleted') {
                filteredTenants = tenant?.filter(
                  (item) => item?.user_id?.isDelete,
                )
              } else {
                filteredTenants = tenant?.filter(
                  (item) =>
                    !item?.user_id?.isDelete &&
                    item?.apartment_id?._id === selectedOption,
                )
              }
              return filteredTenants?.map((val, key) => (
                <TenantCard menu={menu} key={key} data={val} />
              ))
            })()}
          </div>
          {isAddTenantFormOpen && (
            <div className="fixed top-6 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white  rounded-md rounded-tl-lg rounded-tr-lg">
                <AddTenantForm
                  fields={fields}
                  handleSubmit={handleSubmit}
                  handleInput={handleInput}
                  setIsAddTenantFormOpen={setIsAddTenantFormOpen}
                  error={error}
                  togglePopup={setShowPopup}
                  setPopupMessage={setPopupMessage}
                />
              </div>
            </div>
          )}
          {showPopup && (
            <Popup
              message={popupMessage}
              onClose={() => setShowPopup(false)}
              error={error}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Tenant
