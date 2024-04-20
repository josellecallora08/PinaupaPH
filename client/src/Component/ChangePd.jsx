import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const ChangePd = ({ setChangeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleConfirm = () => {
    // Logic to handle confirmation
    // For example, you can dispatch an action to update the profile picture
    // or call an API to update the profile picture on the server
    // After handling the confirmation, close the modal
    setChangeModal(false);
  };

  return (
    <div className="flex h-full fixed items-center justify-center w-full bg-gray-200 backdrop-blur-sm">
      <div className="absolute w-full h-full flex items-center justify-center bg-black opacity-20 backdrop-blur-sm" onClick={() => setChangeModal(false)}></div>
      <div className="relative md:w-[550px] w-[360px] h-[360px] py-12 rounded-md shadow-md bg-white overflow-hidden ">
        <IoMdClose className="absolute top-5 right-5 text-3xl cursor-pointer text-black"  />
        <label htmlFor="fileInput" className="w-60 h-60  mx-auto bg-black flex justify-center items-center cursor-pointer rounded-full">
          {selectedFile ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-60 h-60 rounded-full" />
          ) : (
            <img src="/pfp.svg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          )}
        </label>
        <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />

        <button className="absolute bottom-0 h-full w-full max-h-16 bg-[#183044] text-white text-lg" onClick={handleConfirm}>
          Change Profile
        </button>
      </div>
    </div>
  );
};

export default ChangePd;
