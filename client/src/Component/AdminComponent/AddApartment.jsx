import React, { useEffect, useRef } from 'react';

const AddApartment = ({
  setIsAddApartmentFormOpen,
  fields,
  handleInput,
  handleSubmit,
  error,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsAddApartmentFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsAddApartmentFormOpen]);
  return (
    <>
      <div className="relative w-full flex py-4 rounded-t-md bg-dark-blue text-white items-center ">
        <h1 className="lg:text-md  ml-5 text-lg font-bold uppercase ">
          Add Apartment Building
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        ref={modalRef}
        className="lg:w-[40rem] py-2 w-full h-[25rem] px-3 overflow-y-auto  "
      >
        {error && (
          <p className="text-red border border-red/50 font-regular mt-5 rounded-xl shadow-md bg-red/10 p-5">
            {error}
          </p>
        )}

        <div className="py-5">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-black text-sm font-bold mb-2 "
            >
              Apartment Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={fields.name}
              placeholder="Enter your Apartment Name"
              onChange={handleInput}
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={fields.address}
              onChange={handleInput}
              placeholder="Enter your Address"
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="">
            <label
              htmlFor="province"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Province/City
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={fields.province}
              onChange={handleInput}
              placeholder="Enter your Province/City"
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mt-2">
            <label
              htmlFor="barangay"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Barangay
            </label>
            <input
              type="text"
              id="barangay"
              name="barangay"
              value={fields.barangay}
              onChange={handleInput}
              placeholder="Enter your barangay"
              className="text-sm shadow appearance-none border-2 border-[#9e9e9e] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex justify-end mt-2 gap-3">
          <button
            type="submit"
            className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddApartmentFormOpen((prevState) => !prevState)}
          >
            Close
          </button>
        </div>
      </form>
    </>
  )
}

export default AddApartment
