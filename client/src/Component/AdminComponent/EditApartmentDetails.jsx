import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { editApartment, fetchApartment } from '../../features/apartment';
import { useParams } from 'react-router-dom';

const EditApartmentDetails = ({ setUpdate, apartmentId, setIsEditApartmentFormOpen }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const apartment = useSelector((state) => state.apartment.single)
  const [fields, setFields] = useState({
    name: apartment?.name || '',
    address: apartment?.address || '',
    province: apartment?.province || '',
    barangay: apartment?.barangay || '',
  })
  const { id } = useParams()
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editApartment(fields, id))
    setIsEditApartmentFormOpen(false)
    setUpdate(true)
  }
  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((components) => ({
      ...components,
      [name]: value,
    }))
  }
  useEffect(() => {
    dispatch(fetchApartment(apartmentId));
  }, [dispatch]);

  useEffect(() => {
    setIsFormOpen(true);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsEditApartmentFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsEditApartmentFormOpen]);



  return (
    <>
      {isFormOpen && (
        <div className="relative">
          <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center ">
            <h1 className="lg:text-xl ml-5 text-lg font-bold ">
              Edit Apartment Details
            </h1>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            ref={modalRef}
            className="lg:w-[40rem] w-[20rem] h-[25rem] px-3 py-5 overflow-y-auto "
          >
            <button className="absolute top-4 right-6 text-lg">
              <IoMdClose
                onClick={() =>
                  setIsEditApartmentFormOpen((prevState) => !prevState)
                }
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
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2 "
              >
                Apartment Name
              </label>
              <input
                type="text"
                id="name"
                onChange={handleInput}
                name="name"
                value={fields.name}
                required
                placeholder="Enter your Apartment Name"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact"
                className="block text-gray-700 text-sm font-bold mb-2 "
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleInput}
                value={fields.address}
                required
                placeholder="Enter your Address"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-2 "
              >
                Province/City
              </label>
              <input
                type="text"
                id="province"
                onChange={handleInput}
                value={fields.province}
                required
                name="province"
                placeholder="Enter your Province/City"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="barangay"
                className="block text-gray-700 text-sm font-bold mb-2 "
              >
                Baranggay
              </label>
              <input
                type="text"
                id="barangay"
                onChange={handleInput}
                value={fields.barangay}
                required
                name="barangay"
                placeholder="Enter your Baranggay"
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end mt-5 gap-3">
              <button
                onClick={handleSubmit}
                type="button"
                className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                onClick={() =>
                  setIsEditApartmentFormOpen((prevState) => !prevState)
                }
                className=" bg-red text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditApartmentDetails;
