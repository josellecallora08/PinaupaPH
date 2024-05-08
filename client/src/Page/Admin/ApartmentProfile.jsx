import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import ApartmentStatusCard from '../../Component/AdminComponent/ApartmentStatusCard'
import AddRoom from '../../Component/AdminComponent/AddRoom'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import EditApartmentDetails from '../../Component/AdminComponent/EditApartmentDetails'
import { fetchUnitsApartment } from '../../features/unit'
import { deleteApartment, editApartment, fetchApartment } from '../../features/apartment'
const ApartmentProfile = () => {
  const [update, setUpdate] = useState(false)
  const [isAddRoomFormOpen, setIsAddRoomFormOpen] = useState(false)
  const [isEditApartmentFormOpen, setIsEditApartmentFormOpen] = useState(false)
  const apartment = useSelector((state) => state.apartment.single)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const units = useSelector((state) => state.unit.data)


  const toggleAddRoomForm = () => {
    setIsAddRoomFormOpen(!isAddRoomFormOpen)
  }
  const toggleEditApartmentForm = () => {
    setIsEditApartmentFormOpen(!isEditApartmentFormOpen)
  }



  useEffect(() => {
    dispatch(fetchUnitsApartment(id))
  }, [])

  useEffect(() => {
    dispatch(fetchApartment(id))
    setUpdate(false)
  }, [update, setUpdate])

  const handleDelete = async () => {
    if (window.confirm(
      'Are you sure you want to delete this apartment?',
    )) {
      dispatch(deleteApartment(id))
      navigate('/apartment')
    }
  }


  return (
    <>
      <div className="w-full h-full pb-10  bg-white1">
        <div className="w-[95%] m-auto">
          {/* Upper part of Apartment Profile */}
          <h1 className="uppercase font-bold py-5">View Apartment</h1>
          <div className=" flex gap-10  py-4 rounded-md md:shadow-md md:shadow-gray ">
            <div className="lg:w-1/2">
              <h1 className="lg:text-3xl md:text-3xl font-semibold text-black text-lg mb-3">
                {apartment?.name}
              </h1>
              <p className="lg:text-base md:text-base text-sm">
                Total Unit : {apartment?.units?.length}
              </p>
              <div className="flex gap-5 mt-16 ">
                <button
                  onClick={toggleEditApartmentForm}
                  className="lg:text-xl lg:px-5 lg:py-1 bg-dark-blue text-white  py-2 px-6 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="lg:text-base lg:px-5 lg:py-2 uppercase bg-red text-white  py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:text-xl md:w-1/2 md:text-xl md:ml-16 flex flex-col ">
              <div className="lg:justify-between lg:flex md:justify-between md:flex ">
                <h1 className="lg:text-xl md:text-xl text-md font-semibold">
                  Address
                </h1>
                <p className="lg:text-lg md:text-lg font-regular lg:mt-2 text-sm">
                  {apartment?.address}
                </p>
              </div>
              <div className="lg:justify-between lg:mt-0 lg:flex md:justify-between md:flex mt-4">
                <h1 className="lg:text-xl md:text-xl text-md font-semibold">
                  Province/City
                </h1>
                <p className="lg:text-lg md:text-lg lg:mt-1 font-regular text-sm">
                  {apartment?.province}
                </p>
              </div>
              <div className="lg:justify-between lg:mt-0 lg:flex md:justify-between md:flex mt-4 ">
                <h1 className="lg:text-xl md:text-xl text-md font-semibold">
                  Barangay
                </h1>
                <p className="lg:text-lg md:text-lg lg:mt-2 font-regular text-sm">
                  {apartment?.barangay}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 w-full">
            <button
              onClick={toggleAddRoomForm}
              className="w-full flex gap-2 items-center justify-center bg-primary-color text-white font-semibold uppercase py-2 rounded-md lg:px-2 mt-5 lg:w-fit"
            >
              <FaPlus />
              Add Unit
            </button>
          </div>
          <div className="lg:grid-cols-3 mt-5 grid grid-cols-1 gap-2 mx-5">
            {units?.map((val, key) => (
              <ApartmentStatusCard apartmentId={id} val={val} key={key} />
            ))}
          </div>
        </div>
      </div>
      {isAddRoomFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="lg:w-auto lg:h-auto lg:mt-16 pb-5 bg-white  rounded-md">
            <AddRoom
              apartment_id={apartment._id}
              setIsAddRoomFormOpen={setIsAddRoomFormOpen}
            />
          </div>
        </div>
      )}
      {isEditApartmentFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="lg:w-auto lg:h-auto mt-14 bg-white rounded-lg">
            <EditApartmentDetails
              setUpdate={setUpdate}
              apartmentId={apartment._id}
              setIsEditApartmentFormOpen={setIsEditApartmentFormOpen}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ApartmentProfile
