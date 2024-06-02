import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineRestartAlt } from 'react-icons/md'

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { RxDotsVertical } from 'react-icons/rx'
import { GrFormView, GrFormAdd } from 'react-icons/gr'
import { MdOutlineFileDownload } from 'react-icons/md'
import Popup from '../../Component/PopUp'
import AddHousehold from '../../Component/AddHousehold'
import EditApartment from '../../Component/AdminComponent/EditApartment'
import TransactionTable from '../../Component/TransactionTable'
import TransactionMobile from '../../Component/TransactionMobile'
import TenantProfileInfo from '../../Data/TenantProfileInfo'
import EditTenantDetails from '../../Component/EditTenantDetails'
import EditTenantAccount from '../../Component/EditTenantAccount'
import EditFamMemTable from '../../Component/EditFamMemTable'
import AddPet from '../../Component/AddPet'
import EditPetTable from '../../Component/EditPetTable'

import {
  deleteTenant,
  deleteUser,
  fetchUser,
  recoverTenant,
  resetUserStatus,
} from '../../features/user'
import {
  createHousehold,
  deleteHousehold,
  fetchHouseholds,
  resetHouseholdStatus,
} from '../../features/household'
import { fetchPets, resetPetStatus } from '../../features/pet'
import { generateDocument, resetDocumentStatus } from '../../features/documents'

const TenantProfile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditTenantDetailForm, setIsEditTenantDetailForm] = useState(false)
  const [isEditTenantAccountForm, setIsEditTenantAccountForm] = useState(false)
  const [isEditFamilyMemForm, setIsEditFamilyMemForm] = useState(false)
  const [isEditPetForm, setIsEditPetForm] = useState(false)
  const [isHousedotOpen, setIsHouseDotOpen] = useState(false)
  const [isPetdotOpen, setIsPetDotOpen] = useState(false)
  const [isAddHouseholdForm, setIsAddHouseholdForm] = useState(false)
  const [isEditApartmentForm, setIsEditApartmentForm] = useState(false)
  const [isAddPetForm, setIsAddPetForm] = useState(false)
  const [isRemovedot, setIsRemovedot] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()
  const tenant = useSelector((state) => state.user.single)
  const error = useSelector((state) => state.user.error)
  const errorDocument = useSelector((state) => state.docs.error)
  const msgDocument = useSelector((state) => state.docs.msg)
  const msgHousehold = useSelector((state) => state.household.msg)
  const errorHousehold = useSelector((state) => state.household.error)
  const msgPet = useSelector((state) => state.pet.msg)
  const errorPet = useSelector((state) => state.pet.error)
  const msg = useSelector((state) => state.user.msg)
  const households = useSelector((state) => state.household.data)
  const pets = useSelector((state) => state.pet.data)
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const ApartmentName = useSelector((state) => state.apartment.data)
  const dropdownRef = useRef(null)
  const handleDeleteTenant = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this tenant?',
    )
    if (isConfirmed) {
      navigate('/tenant')
      dispatch(deleteTenant(id))
    }
  }
  const handleForcedDelete = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to permanently delete this tenant?',
    )
    if (isConfirmed) {
      dispatch(deleteUser(id, navigate))
    }
  }
  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsHouseDotOpen(false)
      setIsPetDotOpen(false)
    }
  }

  const toggleDropdown = (menu) => {
    if (menu === 'household') {
      setIsHouseDotOpen(!isHousedotOpen)
      setIsPetDotOpen(false)
    } else if (menu === 'pet') {
      setIsPetDotOpen(!isPetdotOpen)
      setIsHouseDotOpen(false)
    }
  }
  const toggleEditTenantDetailForm = () => {
    setIsEditTenantDetailForm(!isEditTenantDetailForm)
  }
  const toggleEditTenantAccountForm = () => {
    setIsEditTenantAccountForm(!isEditTenantAccountForm)
  }
  const toggleRemoveDot = () => {
    setIsRemovedot(!isRemovedot)
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }
  const handleDownload = (e) => {
    dispatch(generateDocument(id))
  }

  const [fields, setFields] = useState({
    name: '',
    mobile: '',
    birthday: '',
    relationship: '',
  })

  useEffect(() => {
    if (msgDocument !== null) {
      setPopupMessage('Successfully generated Agreement')
    } else if (errorDocument !== null) {
      setPopupMessage('Failed to generate Agreement')
    }

    if (msgDocument !== null || errorDocument !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetDocumentStatus())
      }, 3000)
    }
  }, [dispatch, handleDownload])

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((states) => ({
      ...states,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createHousehold(id, fields))
    setIsAddHouseholdForm((prevState) => !prevState)
    setFields({
      name: '',
      mobile: '',
      birthday: '',
      relationship: '',
    })
  }

  const handleDeleteClick = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this household?')) {
      dispatch(deleteHousehold(tenant?.user_id._id, contactId))
    }
  }
  const handleRecover = async () => {
    if (window.confirm('Continue to recover this tenant?')) {
      dispatch(recoverTenant(tenant?.user_id?._id))
      toggleRemoveDot()
    }
  }

  useEffect(() => {
    dispatch(fetchHouseholds(id))
    dispatch(fetchPets(id))
    dispatch(fetchUser(id))
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown)
    }
  }, [])
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
    if (msgPet !== null) {
      setPopupMessage(msgPet)
    } else if (errorPet !== null) {
      setPopupMessage(errorPet)
    }

    if (msgPet !== null || errorPet !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetPetStatus())
      }, 3000)
    }
  }, [msgPet, errorPet])

  useEffect(() => {
    if (msgHousehold !== null) {
      setPopupMessage(msgHousehold)
    } else if (errorHousehold !== null) {
      setPopupMessage(errorHousehold)
    }

    if (msgHousehold !== null || errorHousehold !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetHouseholdStatus())
      }, 3000)
    }
  }, [msgHousehold, errorHousehold])

  const birthday = tenant?.user_id?.birthday
    ? new Date(tenant?.user_id?.birthday).toLocaleDateString()
    : ''
  return (
    <>
      <div className="bg-white1  h-full overflow-y-auto ">
        {/* Tenant Profile Header */}
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:mt-2 lg:ml-10 uppercase items-center flex font-bold  p-5 mx-4">
            <h1>
              <span
                className=" hover:cursor-pointer hover:underline mr-1"
                onClick={() => window.history.back()}
              >
                Tenant
              </span>
              / Tenant Profile
            </h1>
          </div>

          {/* Tab Navigation */}
          <div className=" lg:mt-0 lg:mr-14 lg:text-dark-gray flex justify-evenly gap-3 ">
            <button
              onClick={() => handleTabClick('profile')}
              className={
                activeTab === 'profile'
                  ? ' text-white py-2 px-5 bg-primary-color rounded-full '
                  : ''
              }
            >
              Profile
            </button>
            <button
              onClick={() => handleTabClick('transaction')}
              className={
                activeTab === 'transaction'
                  ? 'text-white py-2 px-5 bg-primary-color rounded-full'
                  : ''
              }
            >
              Transaction
            </button>
          </div>
        </div>

        <div className="w-11/12 m-auto  rounded-md">
          {activeTab === 'profile' && (
            <div className=" lg:mt-5 mt-10   ">
              <div className="lg:flex lg:gap-5 p-5 lg:pb-2">
                <div className="lg:w-1/2  lg:rounded-lg lg:origin-left  ">
                  <div className="lg:items-center flex gap-3 relative mb-7 ">
                    <figure>
                      <img
                        src={tenant?.user_id?.profile_image?.image_url}
                        alt="Profile"
                        className="lg:w-24 rounded-full object-fill lg:h-24 w-14 h-14"
                      />
                    </figure>
                    <div>
                      <h2 className="lg:text-2xl text-xl font-bold mb-2">
                        {tenant?.user_id?.name}
                      </h2>
                      <h2 className="lg:text-2xl">
                        Unit - {tenant?.unit_id?.unit_no}
                      </h2>
                    </div>
                    <div className=" absolute top-1 right-2">
                      <button
                        className="relative text-xl rotate-90"
                        onClick={toggleRemoveDot}
                      >
                        <RxDotsVertical />
                      </button>

                      {isRemovedot && (
                        <div className="absolute right-0 mt-2 w-max animate-slideIn">
                          <div className="bg-white rounded-md shadow-md">
                            <button
                              onClick={
                                tenant?.user_id?.isDelete
                                  ? handleForcedDelete
                                  : handleDeleteTenant
                              }
                              className="flex items-center justify-between px-4 py-2 text-red-500 hover:bg-red hover:text-white rounded-t-md w-full focus:outline-none transition duration-300"
                            >
                              <span>Delete</span>
                              <MdDelete className="text-lg" />
                            </button>
                            <button
                              onClick={handleDownload}
                              className="flex items-center justify-between gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300"
                            >
                              <span>Lease Agreement</span>
                              <MdOutlineFileDownload size={20} />
                            </button>
                            {tenant?.user_id?.isDelete && (
                              <button
                                onClick={handleRecover}
                                className="flex items-center justify-between px-4 py-2 text-primary-color hover:bg-lime hover:text-white rounded-b-md w-full focus:outline-none transition duration-300"
                              >
                                <span>Recover</span>
                                <MdOutlineRestartAlt size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/*Profile Content */}
                  {/*Account */}
                  <div>
                    {/* Account Details */}
                    <div className="lg:p-3 lg:border-2 lg:border-dark-blue flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                      <div>
                        <h1 className="lg:text-xl font-bold">Account</h1>
                      </div>
                      <div>
                        <FaEdit
                          className="lg:text-2xl text-lg cursor-pointer hover:scale-125"
                          onClick={toggleEditTenantAccountForm}
                        />
                      </div>
                    </div>

                    {isEditTenantAccountForm && (
                      <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50">
                        <div className="lg:w-1/2 bg-white rounded-lg">
                          <EditTenantAccount
                            setIsEditTenantAccountForm={
                              setIsEditTenantAccountForm
                            }
                            tenant={tenant}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mb-4  mt-3 ml-2 grid grid-cols-2 gap-4 lg:gap-20">
                      <div className="lg:text-lg">
                        <p>Username</p>
                        <p>Password</p>
                      </div>
                      <div className="lg:text-lg">
                        <p className="flex items-center gap-4.8rem">
                          {tenant?.user_id?.username}
                        </p>
                        <p className="flex items-center gap-20">
                          ******************
                        </p>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div>
                      <div className="flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                        <h1 className="lg:p-3 lg:pl-2 lg:border-2 lg:border-dark-blue lg:text-xl font-bold">
                          Personal Details
                        </h1>
                        <FaEdit
                          className="lg:text-2xl lg:mr-3 text-lg cursor-pointer hover:scale-125"
                          onClick={toggleEditTenantDetailForm}
                        />
                      </div>

                      <div className="mb-4 text-sm mt-3 ml-2">
                        <div className="grid grid-cols-2 gap-4 lg:gap-20">
                          <div className="lg:text-lg space-y-2">
                            <p>Name</p>
                            <p>Date of Birth</p>
                            <p>Contact</p>
                            <p>Email</p>
                          </div>
                          <div className="lg:text-lg space-y-2">
                            <p>{tenant?.user_id?.name}</p>
                            <p>{birthday}</p>
                            <p>{tenant?.user_id?.mobile_no}</p>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                              {tenant?.user_id?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isEditTenantDetailForm && (
                      <div className="fixed top-0 left-0 w-full z-50 h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="lg:w-1/2 lg:h-[30rem] h-auto bg-white rounded-lg">
                          <EditTenantDetails
                            setIsEditTenantDetailForm={
                              setIsEditTenantDetailForm
                            }
                            tenant={tenant}
                          />
                        </div>
                      </div>
                    )}

                    {/* Apartment Details */}
                    <div>
                      <div className="lg:p-3 lg:border-2 lg:border-dark-blue flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                        <h1 className="lg:text-xl font-bold">
                          Apartment Details
                        </h1>
                        <FaEdit
                          className="lg:text-2xl text-lg cursor-pointer hover:scale-125"
                          onClick={() =>
                            setIsEditApartmentForm(!isEditApartmentForm)
                          }
                        />
                      </div>

                      {isEditApartmentForm && (
                        <div className="fixed top-0 left-0 w-full z-50 h-full flex items-center justify-center bg-black bg-opacity-50">
                          <div className="lg:w-1/2 h-auto bg-white rounded-lg">
                            <EditApartment
                              setIsEditApartmentForm={setIsEditApartmentForm}
                              tenant={tenant}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mb-4 text-sm mt-3 ml-2">
                        <div className="grid grid-cols-2 gap-4 lg:gap-14">
                          <div className="lg:text-lg space-y-2">
                            <p className="whitespace-nowrap">
                              Apartment Building
                            </p>
                            <p>Apartment Unit</p>
                            <p>Deposit</p>
                            <p>Date of Move-in</p>
                          </div>
                          <div className="lg:text-lg space-y-2">
                            <p className="whitespace-nowrap">
                              {tenant?.apartment_id?.name}
                            </p>
                            <p>Unit - {tenant?.unit_id?.unit_no}</p>
                            <p>
                              {tenant?.deposit?.toLocaleString('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                              })}
                            </p>
                            <p>
                              {new Date(
                                tenant?.monthly_due,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right profile */}
                <div className="lg:w-1/2   lg:overflow-y-auto lg:origin-left lg:border-l-4 lg:border-dark-blue ">
                  {/*Family Members */}
                  <div>
                    <div className=" flex items-center justify-between px-2 py-1 bg-dark-blue text-white lg:p-3 lg:border-2 lg:border-dark-blue">
                      <h1 className="text-lg font-bold lg:text-xl">
                        Household Details
                      </h1>

                      <div className="relative">
                        <RxDotsVertical
                          className="  text-lg cursor-pointer lg:text-2xl hover:scale-125"
                          onClick={() => toggleDropdown('household')}
                        />
                      </div>
                    </div>

                    {isHousedotOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-20 top-15 flex flex-col items-center bg-white w-32 h-auto cursor-pointer gap-3 rounded-bl-md rounded-br-md shadow-md shadow-gray-400 animate-slideIn"
                      >
                        <div
                          className="flex items-center justify-center w-full gap-2 p-2 text-center transition duration-300 hover:bg-dark-blue hover:text-white"
                          onClick={() => {
                            setIsEditFamilyMemForm(!isEditFamilyMemForm)
                            setIsHouseDotOpen(false)
                          }}
                        >
                          <GrFormView size={25} />
                          View
                        </div>
                        <div
                          className="flex items-center justify-center w-full gap-2 p-2 text-center transition duration-300 hover:bg-dark-blue hover:text-white"
                          onClick={() => {
                            setIsAddHouseholdForm(!isAddHouseholdForm)
                            setIsHouseDotOpen(false)
                          }}
                        >
                          <GrFormAdd size={25} />
                          Add
                        </div>
                      </div>
                    )}

                    <div className="mb-4 h-64 text-sm overflow-y-auto mt-3 ml-2">
                      {households && households.length > 0 ? (
                        households.map((val, key) => (
                          <div
                            key={key}
                            className="flex mb-2 flex-col space-y-2 lg:text-lg"
                          >
                            <div className="flex gap-5">
                              <p className="w-1/4">Name:</p>
                              <span className="w-3/4">{val.name}</span>
                            </div>
                            <div className="flex gap-5">
                              <p className="w-1/4">Mobile:</p>
                              <span className="w-3/4">{val.mobile}</span>
                            </div>
                            <div className="flex gap-5">
                              <p className="w-1/4">Birthday:</p>
                              <span className="w-3/4">
                                {new Date(val.birthday).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex gap-5">
                              <p className="w-1/4">Relationship:</p>
                              <span className="w-3/4">{val.relationship}</span>
                            </div>
                            <div className="w-full border-dashed border-b border-dark-gray my-2"></div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 flex justify-center items-center h-full">
                          <p className="text-2xl">No Household</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditFamilyMemForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-9/12 bg-white  rounded-lg relative">
                        <EditFamMemTable
                          id={tenant?.user_id?._id}
                          setIsEditFamilyMemForm={setIsEditFamilyMemForm}
                          handleDeleteClick={handleDeleteClick}
                        />
                      </div>
                    </div>
                  )}

                  {isAddHouseholdForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-1/2 h-auto bg-white rounded-md relative">
                        <AddHousehold
                          id={tenant.user_id._id}
                          setIsAddHouseholdForm={setIsAddHouseholdForm}
                          fields={fields}
                          handleInput={handleInput}
                          handleSubmit={handleSubmit}
                        />
                      </div>
                    </div>
                  )}

                  {/*Pets */}
                  <div className="lg:overflow-y-auto relative">
                    <div className="lg:p-3 relative flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                      <h1 className="lg:text-xl font-bold ">Pet Details</h1>
                      <RxDotsVertical
                        className="lg:text-2xl text-lg  cursor-pointer"
                        onClick={() => setIsPetDotOpen(!isPetdotOpen)}
                      />
                    </div>
                    {isPetdotOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 top-15 flex flex-col items-center bg-white w-32 h-auto cursor-pointer gap-3 rounded-bl-md rounded-br-md shadow-md shadow-gray-400 animate-slideIn"
                      >
                        <div
                          className="flex items-center justify-center gap-2 w-full hover:bg-dark-blue hover:text-white p-2 text-center transition duration-300"
                          onClick={() => {
                            setIsEditPetForm(!isEditPetForm)
                            setIsPetDotOpen(false)
                          }}
                        >
                          <GrFormView size={25} />
                          View
                        </div>
                        <div
                          className="flex items-center justify-center gap-2 w-full hover:bg-dark-blue hover:text-white p-2 text-center transition duration-300"
                          onClick={() => {
                            setIsAddPetForm(!isAddPetForm)
                            setIsPetDotOpen(false)
                          }}
                        >
                          <GrFormAdd size={25} />
                          Add
                        </div>
                      </div>
                    )}

                    <div className="text-sm md:text-base p-3 overflow-y-auto h-[20rem]">
                      {pets && pets.length > 0 ? (
                        pets.map((pet, index) => (
                          <div
                            key={index}
                            className="flex flex-col mb-5 space-y-2 lg:text-lg"
                          >
                            <div className="flex gap-5">
                              <p className="w-1/4">Name:</p>
                              <span className="w-3/4">{pet.name}</span>
                            </div>
                            <div className="flex gap-5">
                              <p className="w-1/4">Species:</p>
                              <span className="w-3/4">{pet.species}</span>
                            </div>
                            <div className="flex gap-5">
                              <p className="w-1/4">Birthday:</p>
                              <span className="w-3/4">
                                {new Date(pet.birthday).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="w-full border-dashed border-b border-dark-gray "></div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 flex justify-center items-center h-full">
                          <p className="text-2xl">No Pets</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditPetForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-9/12 bg-white rounded-lg relative">
                        <EditPetTable
                          id={tenant?.user_id._id}
                          setIsEditPetForm={setIsEditPetForm}
                        />
                      </div>
                    </div>
                  )}
                  {isAddPetForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-1/2 h-fit bg-white rounded-lg relative">
                        <AddPet
                          id={tenant.user_id._id}
                          setIsAddPetForm={setIsAddPetForm}
                          error={error}
                          togglePopup={setShowPopup}
                          setPopupMessage={setPopupMessage}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transaction' && (
            <div className="h-full w-full">
              <div className="lg:block hidden">
                <TransactionTable tenant={tenant} />
              </div>
              <div className="lg:hidden">
                <TransactionMobile tenant={tenant} />
              </div>
            </div>
          )}
          {showPopup && (
            <Popup
              message={popupMessage}
              onClose={() => setShowPopup(false)}
              isError={error || errorDocument || errorHousehold || errorPet}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TenantProfile
