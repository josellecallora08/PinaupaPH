import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { changeProfile } from '../features/user'

const ChangePd = ({ userImage, selectedFile, setSelectedFile, handleFileChange, setChangeModal, handleConfirm }) => {


  return (
    <div className="flex h-full fixed items-center justify-center w-full bg-gray-200 backdrop-blur-sm">
      <div
        className="absolute w-full h-full flex items-center justify-center bg-black opacity-20 backdrop-blur-sm"
        onClick={() => setChangeModal((prevState) => !prevState)}
      ></div>
      <div className="relative md:w-[550px] w-[360px] h-[360px] py-12 rounded-md shadow-md bg-white overflow-hidden ">
        <IoMdClose
          onClick={() => setChangeModal((prevState) => !prevState)}
          className="absolute top-5 right-5 text-3xl cursor-pointer text-black"
        />
        <label
          htmlFor="fileInput"
          className="w-60 h-60  mx-auto bg-black flex justify-center items-center cursor-pointer rounded-full"
        >
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="w-60 h-60 rounded-full"
            />
          ) : (
            <img
              src={userImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </label>
        <form onSubmit={handleConfirm} method="PATCH"  >
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <button
            className="absolute bottom-0 h-full w-full max-h-16 bg-[#183044] text-white text-lg"
          >
            Change Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePd
