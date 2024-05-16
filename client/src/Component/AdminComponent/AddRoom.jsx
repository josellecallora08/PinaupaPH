import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createUnit } from '../../features/unit'
import { IoMdClose } from 'react-icons/io'
const AddRoom = ({ apartment_id, setIsAddRoomFormOpen }) => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.unit.error)
  const msg = useSelector((state) => state.unit.msg)
  const modalRef = useRef(null);
  const [fields, setFields] = useState({
    name: '',
    rent: '',
    unit_no: '',
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsAddRoomFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsAddRoomFormOpen]);
  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((components) => ({
      ...components,
      [name]: value,
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createUnit(fields, apartment_id))
    if (error || msg) {
      setIsAddRoomFormOpen(false)
    }
  }
  return (
    <>
      <div className="relative" ref={modalRef}>
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
          <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
            Add Apartment Unit Details
          </h1>
        </div>
      {/* check */}

        <form onSubmit={handleSubmit} className="lg:w-[30rem] w-[22rem] h-auto pt-8 px-4 ">
          <button className="absolute top-4 right-6">
            <IoMdClose
              onClick={() => setIsAddRoomFormOpen((prevState) => !prevState)}
              size={25}
              color="white"
            />
          </button>
          {error && (
            <div className=" w-auto bg-light-red text-dark-blue p-4 m-4 rounded ">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Apartment Unit
            </label>
            <input
              type="text"
              id="unit_no"
              name="unit_no"
              required
              value={fields.unit_no}
              onChange={handleInput}
              placeholder="Enter Apartment Unit"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Monthly Rent
            </label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={fields.rent}
              onChange={handleInput}
              required
              placeholder="Enter Amount Rent"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end mt-5 gap-3">
            <button
              className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
              
            >
              Submit
            </button>

            <button
              className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsAddRoomFormOpen((prevState) => !prevState)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddRoom
