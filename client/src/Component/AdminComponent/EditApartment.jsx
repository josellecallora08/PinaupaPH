import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUnits, fetchUnitsApartment } from '../../features/unit'
import { fetchApartments } from '../../features/apartment'
import { editUser, editUserApartment } from '../../features/user'
import Popup from '../../Component/PopUp'
const EditApartment = ({ setIsEditApartmentForm, tenant }) => {
  const dispatch = useDispatch()
  const apartment = useSelector((state) => state.apartment.data)
  const unit = useSelector((state) => state.unit.data)
  const error = useSelector((state) => state.user.error)
  const msg = useSelector((state) => state.user.msg)
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [apartmentBldg, setApartmentBldg] = useState('')
  const [fields, setFields] = useState({
    unit_no: tenant?.unit_id?.unit_no || '',
    deposit:
      tenant?.deposit !== null && tenant?.deposit !== undefined
        ? String(tenant?.deposit)
        : '',
    occupancy: new Date(tenant?.monthly_due)?.toISOString().split('T')[0] || '',
  })

  useEffect(() => {
    // dispatch(fetchUnits(tenant.unit_id._id))
    // dispatch(fetchUnitsApartment(tenant.apartment_id._id))
    dispatch(fetchApartments())
  }, [])

  useEffect(() => {
    dispatch(fetchUnitsApartment(apartmentBldg))
  }, [apartmentBldg, setApartmentBldg])

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((components) => ({
      ...components,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editUserApartment(tenant?.user_id?._id, fields));
      setPopupMessage('Apartment added successfully!');
      setShowPopup(true);
      setTimeout(() => {
        setIsEditApartmentForm((prevState) => !prevState);
        setShowPopup(false);
      }, 3000);
    } catch (error) {
        console.error(error);
      setPopupMessage('Failed to add apartment. Please try again.');
      setIsError(true);
      setShowPopup(true);
  };
  }
  
  


  return (
    <>
      <div className="relative">
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
          <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
            Edit Apartment Details
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-full w-[20rem] h-auto px-3 py-5 "
        >
          <button type="button" className="absolute top-4 right-6">
            <IoMdClose
              onClick={() => setIsEditApartmentForm((prevState) => !prevState)}
              size={25}
              color="white"
            />
          </button>
          {error && (
            <div className=" hidden w-auto bg-light-red text-dark-blue p-4 m-4 rounded ">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="apartment_unit"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Apartment Bldg
            </label>
            <select
              name="apartment"
              id="apartment"
              onChange={(e) => setApartmentBldg(e.target.value)}
              className="w-full py-2 px-3 border-2 border-[#9e9e9e] rounded"
            >
              <option className="rounded-none">Select Apartment</option>
              {apartment
                // ?.filter((item) => item.occupied === false)
                ?.map((val, key) => (
                  <option key={key} className="rounded-none" value={val._id}>
                    {val.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="apartment_unit"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Apartment Unit
            </label>
            <select
              name="unit_id"
              id="unit_id"
              onChange={handleInput}
              className="w-full py-2 px-3 border-2 border-[#9e9e9e] rounded"
              disabled={apartmentBldg === '' ? true : false}
            >
              <option className="rounded-none" value={fields.unit_no}>
                {fields.unit_no}
              </option>
              {unit
                ?.filter((item) => item.occupied === false)
                .map((val, key) => (
                  <option key={key} className="rounded-none" value={val._id}>
                    {val.unit_no}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Deposit
            </label>
            <input
              type="number"
              id="deposit"
              onChange={handleInput}
              name="deposit"
              required
              value={fields.deposit}
              placeholder="Enter your Deposit"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Date of Move In
            </label>
            <input
              type="date"
              id="occupancy"
              onChange={handleInput}
              name="occupancy"
              required
              value={fields.occupancy}
              placeholder="Enter your Date of Move In"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end mt-5 gap-3">
            <button
              type="submit"
              className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              onClick={() => setIsEditApartmentForm((prevState) => !prevState)}
              className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
        {showPopup && (
          <Popup 
            message={popupMessage} 
            onClose={() => setShowPopup(false)} 
          />
        )}
      </div>
    </>
  )
}

export default EditApartment
