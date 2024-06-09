import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

const RequirementCard = ({ val }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleView = () => {
    // Logic for viewing the requirement
    window.open(val.url, '_blank')
    console.log('Viewing:', val.name);
  };

  const handleDownload = () => {
    // Logic for downloading the requirement
    console.log('Downloading:', val.name);
  };

  return (
    <div className="relative bg-white shadow-md rounded p-4 m-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{val?.name}</h2>
        <div className="relative">
          <button
            className="focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FiMoreVertical size={20} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white  rounded shadow-md z-10">
              <button
                onClick={handleView}
                className="block w-full text-left px-4 py-2  hover:bg-primary-color hover:text-white duration-300 animate-slideIn" 
              >
                View
              </button>
              {/* <button
                onClick={handleDownload}
                className="block w-full text-left px-4 py-2 hover:bg-primary-color hover:text-white duration-300 animate-slideIn"
              >
                Download
              </button> */}
            </div>
          )}
        </div>
      </div>
   
      <p className="text-gray-500 text-sm mt-1">{new Date(val.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default RequirementCard;
