import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import { RxDotsVertical } from 'react-icons/rx'
import TenantProfileInfo from '../../Data/TenantProfileInfo'
import EditTenantDetails from '../../Component/EditTenantDetails'
import EditTenantAccount from '../../Component/EditTenantAccount'
import EditFamMemTable from '../../Component/EditFamMemTable'
import { payment_url } from '../../utils/constants'
import DocumentCard from '../../Component/DocumentCard'
import AddHousehold from '../../Component/AddHousehold'
import EditApartment from '../../Component/EditApartment'
import TransactionTable from '../../Component/TransactionTable'
import TransactionMobile from '../../Component/TransactionMobile'
import { GrFormView, GrFormAdd } from 'react-icons/gr'
import AddPet from '../../Component/AddPet'
import EditPetTable from '../../Component/EditPetTable'
import { deleteUser, fetchUser } from '../../features/user'
import { fetchHousehold, fetchHouseholds } from '../../features/household'
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
  const households = useSelector((state) => state.household.data)
  console.log(households)
  const navigate = useNavigate()
  const handleDeleteTenant = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this tenant?',
    )
    if (isConfirmed) {
      dispatch(deleteUser(id))
      navigate('/tenant')
      console.log('Tenant deleted')
    } else {
      console.log('Deletion cancelled')
    }
  }
  const toggleEditTenantDetailForm = () => {
    setIsEditTenantDetailForm(!isEditTenantDetailForm)
  }
  const toggleEditTenantAccountForm = () => {
    setIsEditTenantAccountForm(!isEditTenantAccountForm)
  }
  const toggleEditFamilyMemForm = () => {
    setIsEditFamilyMemForm(!isEditFamilyMemForm)
  }
  const toggleEditPetForm = () => {
    setIsEditPetForm(!isEditPetForm)
  }
  const toggleRemoveDot = () => {
    setIsRemovedot(!isRemovedot)
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  useEffect(() => {
    dispatch(fetchUser(id))
    console.log(tenant)
  }, [])

  useEffect(() => {
    dispatch(fetchHouseholds(id))
  }, [])
  
  const birthday = new Date(tenant?.birthday).toLocaleDateString()
  return (
    <div className="bg-white1 ">
      {/* Tenant Profile Header */}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="lg:mt-4 uppercase font-bold  p-5 mx-4">
          <h1 className="">Tenant/Profile</h1>
        </div>

        {/* Tab Navigation */}
        <div className=" lg:mt-0 lg:mr-14 lg:text-dark-gray flex justify-evenly gap-3 ">
          <button
            onClick={() => handleTabClick('profile')}
            className={
              activeTab === 'profile'
                ? ' text-white py-2 px-5 bg-primary rounded-full '
                : ''
            }
          >
            Profile
          </button>
          <button
            onClick={() => handleTabClick('documents')}
            className={
              activeTab === 'documents'
                ? 'text-white py-2 px-5 bg-primary rounded-full'
                : ''
            }
          >
            Documents
          </button>
          <button
            onClick={() => handleTabClick('transaction')}
            className={
              activeTab === 'transaction'
                ? 'text-white py-2 px-5 bg-primary rounded-full'
                : ''
            }
          >
            Transaction
          </button>
        </div>
      </div>

      <div className="rounded-md">
        {/* Content based on Active Tab */}
        {activeTab === 'profile' && (
          <div className=" lg:mt-5 mt-10   ">
            {TenantProfileInfo.map((profile, index) => (
              <div className="lg:flex lg:gap-5 p-5" key={index}>
                {/* Upper section */}
                {/* Left profile */}
                <div className="lg:w-1/2  lg:rounded-lg lg:origin-left  ">
                  <div className="lg:items-center flex gap-3 relative mb-7 ">
                    <figure>
                      <img
                        src={tenant?.image}
                        alt="Profile"
                        className="lg:w-24 rounded-full object-fill lg:h-24 w-14 h-14"
                      />
                    </figure>
                    <div>
                      <h2 className="lg:text-2xl text-xl font-bold mb-2">
                        {tenant?.name}
                      </h2>
                      <h2 className="lg:text-2xl">Unit - {tenant?.unit_no}</h2>
                    </div>
                    <button
                      onClick={handleDeleteTenant}
                      className="hidden lg:flex lg:py-2 lg:px-3 absolute top-0 right-3  items-center gap-2 bg-red text-white py-1 px-2 rounded-md hover:opacity-80"
                    >
                      <MdDelete />
                      Delete
                    </button>
                    <div className="lg:hidden absolute top-1 right-2">
                      <button
                        className="relative text-xl rotate-90"
                        onClick={toggleRemoveDot}
                      >
                        <RxDotsVertical />
                      </button>

                      {isRemovedot && (
                        <button
                          onClick={handleDeleteTenant}
                          className="flex items-center gap-2 absolute  rounded-md -right-1 bg-red text-white p-2 hover:opacity-80 "
                        >
                          <MdDelete /> Delete
                        </button>
                      )}
                    </div>
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
                          className="lg:text-2xl text-lg cursor-pointer"
                          onClick={toggleEditTenantAccountForm}
                        />
                      </div>
                    </div>

                    <div className="mb-4 text-sm mt-3 ml-2 flex flex-col items-start">
                      <p className="lg:text-lg flex gap-[4.8rem] items-center">
                        Username
                        <span className="lg:text-base lg:ml-7 ml-6">
                          {tenant?.username}
                        </span>
                      </p>
                      <p className="lg:text-lg flex gap-20 items-center">
                        Password
                        <span className="lg:text-base lg:ml-7 ml-6 ">
                          ******************
                        </span>
                      </p>
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

                  {/*Personal Details */}

                  <div>
                    <div className="flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                      <h1 className="lg:p-3 lg:pl-2 lg:border-2 lg:border-dark-blue lg:text-xl font-bold ">
                        Personal Details
                      </h1>
                      <FaEdit
                        className="lg:text-2xl lg:mr-3 text-lg cursor-pointer"
                        onClick={toggleEditTenantDetailForm}
                      />
                    </div>

                    <div className="mb-4 text-sm mt-3 ml-2 ">
                      <div className=" flex gap-20">
                        <div className="lg:text-lg">
                          <p>Name</p>
                          <p>Date of Birth</p>
                          <p>Contact</p>
                          <p>Email</p>
                        </div>
                        <div className="lg:text-base lg:flex lg:flex-col lg:gap-1">
                          <p className="">{tenant?.name}</p>
                          <p className="">{birthday}</p>
                          <p className="">{tenant?.phone}</p>
                          <p className="">{tenant?.email}</p>
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
                    <div className="lg:p-3 lg:border-2 lg:border-dark-blue flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                      <h1 className="lg:text-xl font-bold ">
                        Apartment Details
                      </h1>
                      <FaEdit
                        className="lg:text-2xl text-lg cursor-pointer"
                        onClick={() =>
                          setIsEditApartmentForm(!isEditApartmentForm)
                        }
                      />
                    </div>
                    {isEditApartmentForm && (
                      <div className="fixed top-0 left-0 w-full z-50 h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="lg:w-1/2   h-auto bg-white  rounded-lg">
                          <EditApartment
                            setIsEditApartmentForm={setIsEditApartmentForm}
                            tenant={tenant}
                          />
                        </div>
                      </div>
                    )}

                    <div className=" mb-4 text-sm mt-3 ml-2 ">
                      <div className="flex gap-14">
                        <div className="lg:text-lg ">
                          <p>Apartment Unit</p>
                          <p>Deposit</p>
                          <p>Date of Move-in</p>
                        </div>
                        <div className="lg:text-base lg:flex lg:flex-col lg:gap-1">
                          <p className="">Unit - {tenant?.unit_no}</p>
                          <p className="">{tenant?.deposit}</p>
                          <p className="">{tenant?.monthly_due}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right profile */}
                <div className="lg:w-1/2  lg:overflow-y-auto lg:origin-left lg:border-l-4 lg:border-dark-blue ">
                  {/*Family Members */}
                  <div className="relative lg:mb-24">
                    <div className="lg:p-3 relative flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                      <h1 className="lg:text-xl font-bold">
                        Household Details
                      </h1>
                      <RxDotsVertical
                        className="lg:text-2xl text-lg cursor-pointer"
                        onClick={() => setIsHouseDotOpen(!isHousedotOpen)}
                      />
                    </div>
                    {isHousedotOpen && (
                      <div className="absolute right-0 flex flex-col items-center bg-white w-36 h-auto cursor-pointer gap-3 rounded-bl-md rounded-br-md shadow-md shadow-gray-400">
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

                    <div className="text-sm md:text-base p-3 flex flex-col gap-5 ">
                      {households?.map((val, key) => (
                        <div className="w-full flex flex-col md:gap-2">
                          <div className="flex gap-5">
                            <p className="w-1/4">Name:</p>
                            <span className="w-3/4">{val.name}</span>
                          </div>
                          <div className="flex gap-5">
                            <p className="w-1/4">Birthday:</p>
                            <span className="w-3/4">Joselle</span>
                          </div>
                          <div className="flex gap-5">
                            <p className="w-1/4">Relationship:</p>
                            <span className="w-3/4">Joselle</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {isEditFamilyMemForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-9/12 bg-white  rounded-lg relative">
                        <EditFamMemTable
                          setIsEditFamilyMemForm={setIsEditFamilyMemForm}
                        />
                      </div>
                    </div>
                  )}
                  {isAddHouseholdForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-1/2 h-auto bg-white rounded-md relative">
                        <AddHousehold
                          setIsAddHouseholdForm={setIsAddHouseholdForm}
                        />
                      </div>
                    </div>
                  )}

                  {/*Pets */}
                  <div className="lg:overflow-y-auto ">
                    <div className="lg:p-3 relative flex items-center justify-between px-2 py-1 bg-dark-blue text-white">
                      <h1 className="lg:text-xl font-bold">Pet Details</h1>
                      <RxDotsVertical
                        className="lg:text-2xl text-lg cursor-pointer"
                        onClick={() => setIsPetDotOpen(!isPetdotOpen)}
                      />
                    </div>
                    {isPetdotOpen && (
                      <div className=" absolute right-5 flex flex-col items-center bg-white w-36 h-auto cursor-pointer gap-3 rounded-bl-md rounded-br-md shadow-md shadow-gray-400">
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

                    <div className="lg:p-3 flex gap-28 ml-2">
                      <div className="lg:text-base ">
                        <p>Name</p>
                        <p>Species</p>
                        <p>Birthday</p>
                      </div>
                      <div>
                        <p className="">{profile.Pets[0].name}</p>
                        <p className="">{profile.Pets[0].species}</p>
                      </div>
                    </div>
                  </div>
                  {isEditPetForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-9/12 bg-white rounded-lg relative">
                        <EditPetTable setIsEditPetForm={setIsEditPetForm} />
                      </div>
                    </div>
                  )}
                  {isAddPetForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-1/2 bg-white rounded-lg relative">
                        <AddPet setIsAddPetForm={setIsAddPetForm} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Documents content goes here */}
            {/* ... display documents */}
            <DocumentCard />
            <DocumentCard />
            <DocumentCard />
          </div>
        )}

        {activeTab === 'transaction' && (
          <div className="h-full w-full">
            <div className="lg:block hidden">
              <TransactionTable />
            </div>
            <div className="lg:hidden">
              <TransactionMobile />
              <TransactionMobile />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TenantProfile
