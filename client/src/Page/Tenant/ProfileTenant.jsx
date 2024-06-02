import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { RxDotsVertical } from 'react-icons/rx'
import TenantProfileInfo from '../../Data/TenantProfileInfo'
import ChangePd from '../../Component/ChangePd'
import EditTenantAccount from '../../Component/EditTenantAccount'
import EditFamMemTable from '../../Component/EditFamMemTable'
import { MdOutlineFileDownload } from 'react-icons/md'
import AddHousehold from '../../Component/AddHousehold'
import { IoDownloadOutline } from 'react-icons/io5'
import { IoEyeOutline } from 'react-icons/io5'

import TransactionTable from '../../Component/TransactionTable'
import TransactionMobile from '../../Component/TransactionMobile'
import { GrFormView, GrFormAdd } from 'react-icons/gr'
import Addpet from '../../Component/AddPet'
import EditPetTable from '../../Component/EditPetTable'
import { generateDocument, resetDocumentStatus } from '../../features/documents'
import {
  createHousehold,
  deleteHousehold,
  fetchHousehold,
  fetchHouseholds,
  resetHouseholdStatus,
} from '../../features/household'
import { fetchPets, resetPetStatus } from '../../features/pet'
import EditTenantDetails from '../../Component/EditTenantDetails'
import { isLoggedin } from '../../features/authentication'
import { changeProfile, resetUserStatus } from '../../features/user'
import PopUp from '../../Component/PopUp'
const TenantProfile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditTenantDetailForm, setIsEditTenantDetailForm] = useState(false)
  const [isEditTenantAccountForm, setIsEditTenantAccountForm] = useState(false)
  const [isEditFamilyMemForm, setIsEditFamilyMemForm] = useState(false)
  const [isEditPetForm, setIsEditPetForm] = useState(false)
  const [isHousedotOpen, setIsHouseDotOpen] = useState(false)
  const [isPetdotOpen, setIsPetDotOpen] = useState(false)
  const [isAddHouseholdForm, setIsAddHouseholdForm] = useState(false)
  const [isAddPetForm, setIsAddPetForm] = useState(false)
  const errorDocument = useSelector((state) => state.docs.error)
  const msgDocument = useSelector((state) => state.docs.msg)
  const msgHousehold = useSelector((state) => state.household.msg)
  const errorHousehold = useSelector((state) => state.household.error)
  const msgPet = useSelector((state) => state.pet.msg)
  const errorPet = useSelector((state) => state.pet.error)
  const [isRemovedot, setIsRemovedot] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()
  const tenant = useSelector((state) => state.auth.user)
  const households = useSelector((state) => state.household.data)
  const pets = useSelector((state) => state.pet.data)
  const error = useSelector((state) => state.user.error)
  const single = useSelector((state) => state.user.single)
  const msg = useSelector((state) => state.user.msg)
  const dropdownRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [changeModal, setChangeModal] = useState(false)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  // const navigate = useNavigate()
  // const handleDeleteTenant = () => {
  //   const isConfirmed = window.confirm(
  //     'Are you sure you want to delete this tenant?',
  //   )
  //   if (isConfirmed) {
  //     dispatch(deleteUser(tenant?.user_id?._id))
  //     navigate('/tenant')
  //   }
  // }

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
  // const toggleEditFamilyMemForm = () => {
  //   setIsEditFamilyMemForm(!isEditFamilyMemForm)
  // }
  // const toggleEditPetForm = () => {
  //   setIsEditPetForm(!isEditPetForm)
  // }
  // const toggleRemoveDot = () => {
  //   setIsRemovedot(!isRemovedot)
  // }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(
      changeProfile(
        tenant?.user_id._id,
        tenant?.user_id?.profile_image.public_id,
        selectedFile,
      ),
    )
    setChangeModal(false)
    // setIsVisible((prevState) => !prevState)
  }
  const [fields, setFields] = useState({
    name: '',
    mobile: '',
    birthday: '',
    relationship: '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((states) => ({
      ...states,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createHousehold(tenant?.user_id._id, fields))
    setIsVisible((prevState) => !prevState)
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
      setIsVisible((prevState) => !prevState)
    }
  }
  useEffect(() => {
    dispatch(isLoggedin())
  }, [handleConfirm])
  useEffect(() => {
    dispatch(fetchHouseholds(tenant?.user_id?._id))
    dispatch(fetchPets(tenant?.user_id?._id))
  }, [])
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const toggleChangeModal = () => {
    setChangeModal(!changeModal)
  }

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsHouseDotOpen(false)
      setIsPetDotOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown)
    }
  }, [])
  const handleDownload = () => {
    const isConfirmed = window.confirm('Download Lease Agreement?')
    if (isConfirmed) {
      dispatch(generateDocument(tenant.user_id._id))
    }
  }
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

  const birthday = new Date(tenant?.user_id.birthday).toLocaleDateString()
  return (
    <div className="bg-white1  w-full  h-full overflow-y-auto ">
      {/* Tenant Profile Header */}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="lg:mt-2 pl-16  uppercase font-bold  p-5 mx-4">
          <h1 className="">Tenant/Profile</h1>
        </div>
      </div>
      {changeModal ? (
        <ChangePd
          userImage={tenant?.user_id?.profile_image.image_url}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          handleFileChange={handleFileChange}
          setChangeModal={setChangeModal}
          handleConfirm={handleConfirm}
        />
      ) : (
        ''
      )}
      <div className="lg:w-11/12 lg:m-auto rounded-md">
        <div className="     ">
          {TenantProfileInfo.map((profile, index) => (
            <div className="lg:flex lg:gap-5 p-5 lg:pb-2" key={index}>
              <div className="lg:w-1/2  lg:rounded-lg lg:origin-left  ">
                <div className=" relative lg:items-center flex gap-3  mb-7 ">
                  <figure>
                    <img
                      src={tenant?.user_id.profile_image.image_url}
                      alt="Profile"
                      className="lg:w-24 rounded-full object-fill lg:h-24 w-14 h-14 cursor-pointer"
                      onClick={toggleChangeModal}
                    />
                  </figure>
                  <div>
                    <h2 className="lg:text-2xl text-xl font-bold mb-2">
                      {tenant?.user_id.name}
                    </h2>
                    <h2 className="lg:text-2xl">
                      Unit - {tenant?.unit_id.unit_no}
                    </h2>
                  </div>

                  <div
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                    className="absolute top-1 right-2 text-2xl cursor-pointer"
                  >
                    <RxDotsVertical />
                  </div>

                  {isDropDownOpen && (
                    <div className="absolute right-5 mt-10 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 w-max animate-slideIn">
                      <div className="py-1">
                        <button className="flex items-center  gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300">
                          <IoEyeOutline size={20} className="inline mr-2" />{' '}
                          View Lease
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex items-center justify-between gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300"
                        >
                          <MdOutlineFileDownload
                            size={20}
                            className="inline mr-2"
                          />
                          Lease Agreement
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/*Profile Content */}
                {/*Account */}
                <div>
                  <div className="lg:p-3 lg:border-2 lg:border-dark-blue flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                    <div>
                      <h1 className="lg:text-xl font-bold ">Account</h1>
                    </div>
                    <div>
                      <FaEdit
                        className="lg:text-2xl text-lg cursor-pointer hover:scale-125 duration-200"
                        onClick={toggleEditTenantAccountForm}
                      />
                    </div>
                  </div>

                  <div className="mb-4  mt-3 ml-2 flex flex-col items-start">
                    <p className="lg:text-lg text-xs flex gap-[4.8rem] items-center">
                      Username
                      <span className="lg:text-base text-sm lg:ml-7 ml-6">
                        {tenant?.user_id.username}
                      </span>
                    </p>
                    <p className="lg:text-lg text-xs flex gap-20 items-center">
                      Password
                      <span className="lg:text-base text-xs lg:ml-7 ml-6 ">
                        ******************
                      </span>
                    </p>
                  </div>
                </div>
                {isEditTenantAccountForm && (
                  <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="lg:w-1/2 bg-white rounded-lg">
                      <EditTenantAccount
                        setIsEditTenantAccountForm={setIsEditTenantAccountForm}
                        tenant={tenant}
                      />
                    </div>
                  </div>
                )}

                {/*Personal Details */}

                <div>
                  <div className="flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                    <h1 className="lg:p-3 lg:pl-2 lg:border-2 lg:border-dark-blue lg:text-xl font-bold ">
                      Personal Details
                    </h1>
                    <FaEdit
                      className="lg:text-2xl lg:mr-3 text-lg cursor-pointer hover:scale-125 duration-200"
                      onClick={toggleEditTenantDetailForm}
                    />
                  </div>

                  <div className="mb-4  mt-3 ml-2 ">
                    <div className=" flex gap-20">
                      <div className="lg:text-lg text-xs">
                        <p>Name</p>
                        <p>Date of Birth</p>
                        <p>Contact</p>
                        <p>Email</p>
                      </div>
                      <div className="lg:text-base text-xs lg:flex lg:flex-col lg:gap-1">
                        <p>{tenant?.user_id.name}</p>
                        <p>{birthday}</p>
                        <p>+63{tenant?.user_id.mobile_no}</p>
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap w-full sm:w-48 md:w-64 lg:w-80">
                          {tenant?.user_id.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {isEditTenantDetailForm && (
                  <div className="fixed top-0 left-0 w-full z-50 h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="lg:w-1/2 lg:h-[30rem] h-auto bg-white  rounded-lg">
                      <EditTenantDetails
                        setIsEditTenantDetailForm={setIsEditTenantDetailForm}
                        tenant={tenant}
                      />
                    </div>
                  </div>
                )}

                {/*Apartment Details */}
                <div>
                  <div className="lg:p-3 lg:border-2 lg:border-dark-blue flex items-center  w-full justify-between  py-1 bg-dark-blue text-white">
                    <h1 className="lg:text-xl pl-2 font-bold ">
                      Apartment Details
                    </h1>
                  </div>

                  <div className=" mb-4 text-sm mt-3 ml-2 ">
                    <div className="flex gap-14">
                      <div className="lg:text-lg text-xs ">
                        <p>Apartment Unit</p>
                        <p>Deposit</p>
                        <p>Date of Move-in</p>
                      </div>
                      <div className="lg:text-base text-xs lg:flex lg:flex-col lg:gap-1">
                        <p className="">Unit - {tenant?.unit_id.unit_no}</p>
                        <p className="">
                          {tenant?.deposit?.toLocaleString('en-PH', {
                            style: 'currency',
                            currency: 'PHP',
                          })}
                        </p>
                        <p className="">
                          {new Date(tenant?.monthly_due)?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right profile */}
              <div className="lg:w-1/2  lg:overflow-y-auto lg:origin-left lg:border-l-4 lg:border-dark-blue ">
                {/*Family Members */}
                <div className="relative h-[15rem] lg:mb-3">
                  <div className="lg:p-3 relative flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                    <h1 className="lg:text-xl font-bold">Household Details</h1>
                    <RxDotsVertical
                      className="lg:text-2xl text-lg cursor-pointer"
                      onClick={() => toggleDropdown('household')}
                    />
                  </div>
                  {isHousedotOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0  flex flex-col items-center bg-white w-36 h-auto cursor-pointer gap-3 rounded-bl-md rounded-br-md shadow-md shadow-gray-400"
                    >
                      <div
                        className="flex items-center justify-center gap-2 w-full hover:bg-dark-blue hover:text-white p-2 text-center"
                        onClick={() => {
                          setIsEditFamilyMemForm(!isEditFamilyMemForm)
                          setIsHouseDotOpen(false)
                        }}
                      >
                        <GrFormView size={25} />
                        View
                      </div>
                      <div
                        className="flex items-center justify-center gap-2 w-full hover:bg-dark-blue hover:text-white p-2 text-center"
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

                  <div className="text-xs md:text-base p-3 flex flex-col gap-5 overflow-y-auto lg:h-[12.4rem] h-[13rem]">
                    {households && households.length > 0 ? (
                      households.map((val, key) => (
                        <div
                          key={key}
                          className="w-full flex flex-col md:gap-2"
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
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <p className="text-2xl">No Household</p>
                      </div>
                    )}
                  </div>
                </div>
                {isEditFamilyMemForm && (
                  <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                    <div className="lg:w-9/12 bg-white  rounded-lg relative">
                      <EditFamMemTable
                        id={tenant?.user_id._id}
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
                <div className=" relative">
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
                      className=" absolute right-0 top-15 flex flex-col items-center bg-white w-36 h-auto cursor-pointer gap-3 rounded-bl-md rounded-br-md shadow-md shadow-gray"
                    >
                      <div
                        className="flex items-center justify-center gap-2 w-full hover:bg-dark-blue hover:text-white p-2 text-center"
                        onClick={() => {
                          setIsEditPetForm(!isEditPetForm)
                          setIsPetDotOpen(false)
                        }}
                      >
                        <GrFormView size={25} />
                        View
                      </div>
                      <div
                        className="flex items-center justify-center gap-2 w-full hover:bg-dark-blue hover:text-white p-2 text-center"
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

                  <div className="text-xs md:text-base p-3 lg:h-[20rem] h-[10rem] flex flex-col gap-5 overflow-y-auto">
                    {pets && pets.length > 0 ? (
                      pets.map((pet, index) => (
                        <div
                          key={index}
                          className="w-full flex flex-col md:gap-2"
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
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <p className='text-2xl'>No Pet</p>
                      </div>
                    )}
                  </div>
                </div>
                {isEditPetForm && (
                  <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                    <div className="lg:w-9/12 mx-2 bg-white rounded-lg relative">
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
                      <Addpet
                        id={tenant?.user_id._id}
                        setIsAddPetForm={setIsAddPetForm}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {showPopup && (
          <PopUp
            message={popupMessage}
            onClose={() => setShowPopup(false)}
            isError={error || errorDocument || errorHousehold || errorPet}
          />
        )}
      </div>
    </div>
  )
}

export default TenantProfile
