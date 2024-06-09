import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { uploadRequirements } from '../../features/requirements';

const AddRequirement = ({ setIsAddRequirementForm, user_id }) => {
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const dispatch = useDispatch()
  const error = useSelector(state => state.docs.error)
  const msg = useSelector(state => state.docs.msg)
  const handleChange = (e, index) => {
    const files = e.target.files;
    setRequirements(prevRequirements => {
      const updatedRequirements = [...prevRequirements];
      updatedRequirements[index].file = files[0];
      return updatedRequirements;
    });
  };

  const handleAddRequirement = () => {
    if (newRequirement && !requirements.some(req => req.name === newRequirement)) {
      setRequirements([...requirements, { name: newRequirement, file: null }]);
      setNewRequirement('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(uploadRequirements(user_id, requirements))
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
        {requirements.map((req, index) => (
          <div className="mb-4" key={index}>
            <label
              htmlFor={`file-${index}`}
              className="block text-sm font-bold mb-2 text-dark-gray"
            >
              {req.name}
            </label>
            <input
              type="file"
              id={`file-${index}`}
              name={req.name}
              accept="application/pdf, image/*"
              onChange={(e) => handleChange(e, index)}
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
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>{error || popupMessage}</p>
            <button
              className="mt-4 bg-dark-blue text-white py-2 px-4 rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRequirement;
