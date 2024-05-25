import React, { useState } from 'react'
import { MdOutlineModeEditOutline, MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUnit, fetchUnit } from '../../features/unit'
import EditApartmentUnit from './EditApartmentUnit'
import { MdInfoOutline } from 'react-icons/md'
const ApartmentStatusCard = ({ apartmentId, val }) => {
  const [isEditApartmentUnit, setIsEditApartmentUnit] = useState(false)
  const toggleisEditApartmentUnit = () => {
    setIsEditApartmentUnit(!isEditApartmentUnit)
  }

  const [isTenantInfoOpen, setIsTenantInfoOpen] = useState(false)
  const dispatch = useDispatch()
  const unit = useSelector((state) => state.unit.data)
  const loading = useSelector((state) => state.unit.loading)

  const handleDelete = (unitId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this apartment?',
    )
    if (isConfirmed) {
      dispatch(deleteUnit(apartmentId, unitId))
    }
  }
  const tenants = [
    {
      name: 'John Doe',
      moveInDate: '2023-01-01',
      moveOutDate: '2023-01-10',
      stayDuration: 9,
    },
    {
      name: 'Jane Smith',
      moveInDate: '2023-02-01',
      moveOutDate: '2023-02-20',
      stayDuration: 19,
    },
    {
      name: 'Jane Smith',
      moveInDate: '2023-02-01',
      moveOutDate: '2023-02-20',
      stayDuration: 19,
    },
    {
      name: 'Jane Smith',
      moveInDate: '2023-02-01',
      moveOutDate: '2023-02-20',
      stayDuration: 19,
    },
    {
      name: 'Jane Smith',
      moveInDate: '2023-02-01',
      moveOutDate: '2023-02-20',
      stayDuration: 19,
    },
    {
      name: 'Jane Smith',
      moveInDate: '2023-02-01',
      moveOutDate: '2023-02-20',
      stayDuration: 19,
    },
    {
      name: 'Jane Smith',
      moveInDate: '2023-02-01',
      moveOutDate: '2023-02-20',
      stayDuration: 19,
    },
    {
      name: 'Jane Smith',
      moveInDate: '2023-02-01',
      moveOutDate: '2023-02-20',
      stayDuration: 19,
    },
    // Add more tenants as needed
  ]
  return (
    <>
      <div className=" relative flex  overflow-hidden shadow-md shadow-gray rounded-lg">
        <div
          onClick={() => setIsTenantInfoOpen(!isTenantInfoOpen)}
          className="relative text-white flex items-center justify-center w-32 px-5 bg-dark-blue  hover:bg-primary-color/85 group cursor-pointer"
        >
          <h1 className="text-2xl font-black group-hover:hidden">
            {val?.unit_no}
          </h1>
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <MdInfoOutline size={50} />
          </div>
        </div>
        <div className="relative pt-8 flex-grow bg-white ">
          <p>
            <span className="text-2xl font-black ml-5">
              {val?.rent?.toLocaleString('en-PH', {
                style: 'currency',
                currency: 'PHP',
              })}
            </span>{' '}
            / per month
          </p>
          <div className="lg:justify-end lg:mr-5 md:justify-end md:mr-5  lg:mt-14 flex gap-2 mt-16 ml-44 pb-2">
            <button
              className="lg:p-2 hover:scale-105 hover:duration-300 hover:bg-blue/55 bg-blue p-1 rounded-md"
              onClick={toggleisEditApartmentUnit}
            >
              <MdOutlineModeEditOutline size={15} color="white" />
            </button>
            <button
              onClick={() => handleDelete(val?._id)}
              className="lg:p-2 hover:scale-105 hover:duration-300 hover:bg-red/55  bg-red p-1 rounded-md"
            >
              <MdOutlineClose size={15} color="white" />
            </button>
          </div>
        </div>
        {val.occupied ? (
          <div className="absolute top-3 -right-9 w-28 h-8 bg-dark-blue text-white p-2 rotate-45">
            <p className="text-xs text-center text-white font-bold uppercase">
              Rented
            </p>
          </div>
        ) : (
          ''
        )}
        {isEditApartmentUnit && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="lg:w-auto lg:h-auto  mt-12 bg-white rounded-lg">
              <EditApartmentUnit
                apartmentId={apartmentId}
                val={val}
                setIsEditApartmentUnit={setIsEditApartmentUnit}
              />
            </div>
          </div>
        )}
        {isTenantInfoOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="lg:w-[50rem] lg:h-auto mt-12 bg-white  rounded-md pb-2 ">
              <div className=" p-5 font-bold text-lg text-white bg-primary-color rounded-tl-md rounded-tr-md ">
                Previous Tenant of {val?.unit_no}
              </div>
              <div>
                <div
                  className="overflow-auto m-2"
                  style={{ maxHeight: '300px' }}
                >
                  <table className="min-w-full bg-white">
                    <thead className="bg-primary-color text-white border-b-2 border-white sticky top-0">
                      <tr>
                        <th className="py-2 px-4 border-white">Name</th>
                        <th className="py-2 px-4 border-white">Move In Date</th>
                        <th className="py-2 px-4 border-white">
                          Move Out Date
                        </th>
                        <th className="py-2 px-4 border-white">
                          Stay Duration (days)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenants.map((tenant, index) => (
                        <tr key={index} className="text-center">
                          <td className="border px-4 py-2">{tenant.name}</td>
                          <td className="border px-4 py-2">
                            {tenant.moveInDate}
                          </td>
                          <td className="border px-4 py-2">
                            {tenant.moveOutDate}
                          </td>
                          <td className="border px-4 py-2">
                            {tenant.stayDuration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 mb-2 mx-4 flex justify-between items-center">
                <div className='text-lg'>Number of tenants: {tenants.length}</div>
                <button
                  onClick={() => setIsTenantInfoOpen((prevState) => !prevState)}
                  className="bg-red rounded hover:bg-red/55 text-white px-4 py-2 "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ApartmentStatusCard
