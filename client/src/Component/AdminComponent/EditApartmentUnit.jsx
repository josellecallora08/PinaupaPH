import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createUnit } from '../../features/unit';
import { IoMdClose } from 'react-icons/io';

const EditApartmentUnit = ({ apartment_id, setIsEditApartmentUnit }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedApartmentOption, setSelectedApartmentOption] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    name: '',
    rent: '',
    unit_no: '',
  });

  // Ref for the modal wrapper
  const modalRef = useRef(null);

  // Function to toggle the form visibility
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    dispatch(createUnit(fields, apartment_id));
    setError(
      'An error occurred while submitting the form. An error occurred while submitting the form An error occurred while submitting the form An error occurred while submitting the form '
    );
    console.log('Form submitted');
    toggleForm();
  };

  // Function to handle clicks outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsEditApartmentUnit(false);
    }
  };

  // Effect to listen for clicks outside the modal and close it
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={modalRef}>
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center ">
          <h1 className="lg:text-xl ml-5 text-lg font-bold ">Edit Apartment Unit</h1>
        </div>
        <form className="lg:w-[30rem] w-[22rem] h-auto pt-5 px-4 overflow-y-auto ">
          <button className="absolute top-4 right-6">
            <IoMdClose
              onClick={() => setIsEditApartmentUnit((prevState) => !prevState)}
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
              id="rent"
              name="rent"
              required
              placeholder="Enter Amount Rent"
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
              id="unit_no"
              name="unit_no"
              required
              placeholder="Enter Apartment Unit"
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="lg:mb-3 flex justify-end mt-5 gap-3">
            <button
              onClick={handleSubmit}
              className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>

            <button
              className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditApartmentUnit((prevState) => !prevState)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditApartmentUnit;
