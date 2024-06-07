import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const AddRequirement = ({ setIsAddRequirementForm }) => {
  const [requirements, setRequirements] = useState({});
  const [newRequirement, setNewRequirement] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, files } = e.target;
    setRequirements({
      ...requirements,
      [name]: files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(requirements).length === 0) {
      setError('Please add at least one requirement.');
      setShowPopup(true);
    } else {
      setError('');
      setPopupMessage('Requirements submitted successfully!');
      setShowPopup(true);
      // Handle form submission logic here
      console.log('Requirements submitted:', requirements);
    }
  };

  const handleAddRequirement = () => {
    if (newRequirement && !requirements[newRequirement]) {
      setRequirements({
        ...requirements,
        [newRequirement]: null
      });
      setNewRequirement('');
    }
  };

  return (
    <div className="relative">
      <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center">
        <h1 className="lg:text-xl ml-5 text-lg font-bold">Add Requirement</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-full lg:pt-4 w-[20rem] h-[22rem] px-4 overflow-y-auto"
      >
        <button className="absolute top-4 right-6" type="button">
          <IoMdClose
           onClick={() => setIsAddRequirementForm((prevState) => !prevState)}
            size={25}
            color="white"
          />
        </button>

        {error && (
          <div className="w-auto bg-light-red text-dark-blue p-4 m-4 rounded">
            {error}
          </div>
        )}
        <h1 className="text-base font-bold mb-2 lg:mt-0 mt-4">Add Requirement Details</h1>
        {Object.keys(requirements).map((req) => (
          <div className="mb-4" key={req}>
            <label
              htmlFor={req}
              className="block text-sm font-bold mb-2 text-dark-gray"
            >
              {req}
            </label>
            <input
              type="file"
              id={req}
              name={req}
              accept="application/pdf, image/*"
              onChange={handleChange}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Add new requirement"
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleAddRequirement}
            className="bg-dark-blue text-white font-bold py-2 px-4 rounded ml-2"
          >
            Add
          </button>
        </div>
        <div className="flex justify-end mt-5 mb-3 gap-3">
          <button
            type="submit"
            className="bg-dark-blue text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddRequirementForm((prevState) => !prevState)}
          >
            Close
          </button>
        </div>
      </form>

    </div>
  );
};

export default AddRequirement;
