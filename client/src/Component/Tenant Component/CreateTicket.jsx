import React, { useState, useRef, useEffect } from 'react'
import { CiImageOn } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { createConcern, resetConcernStatus } from '../../features/concern'
import PopUp from '../../Component/PopUp'
const CreateTicket = ({
  id,
  setisCreateTicket,
  title,
  setTitle,
  description,
  setDescription,
  attached_image,
  setImage,
  type,
  setSelectedType,
  handleImageChange,
  handleDescriptionChange,
  handleTypeChange,
  handleSubmit,
}) => {
  const modalRef = useRef(null)
  const [inputKey, setInputKey] = useState(Date.now()) // Add state for input key
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const error = useSelector((state) => state.concern.error);
  const msg = useSelector((state) => state.concern.msg);
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setisCreateTicket((prevState) => !prevState)
    }
  }
  const handleDeleteImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  useEffect(() => {   
    if (msg !== null) {
      setPopupMessage(msg)
    } else if (error !== null) {
      setPopupMessage(error)
    }

    if (msg !== null || error !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetConcernStatus())
      }, 3000)
    }
  }, [msg, error])

  return (
    <div className="fixed top-10 left-1/4 w-1/2 h-auto flex items-center justify-center bg-opacity-50 z-50">
      <div ref={modalRef} className="lg:w-9/12 bg-white rounded-lg relative">
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center">
          <h1 className="lg:text-xl ml-5 text-lg font-bold">Create Ticket</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-full lg:pt-4 w-[20rem] bg-white h-[30rem] px-4 overflow-y-auto"
        >
          <button
            type="button"
            className="absolute top-4 right-6"
            onClick={() => setisCreateTicket((prevState) => !prevState)}
          >
            <IoMdClose size={25} color="white" />
          </button>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-bold mb-2 text-dark-gray"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              maxLength={30}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              className="text-sm bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="maintenanceType"
              className="block text-sm font-medium text-dark-gray"
            >
              Type
            </label>
            <select
              id="maintenanceType"
              name="type"
              value={type}
              onChange={handleTypeChange}
              style={{ color: type ? 'black' : 'gray', borderColor: 'black' }}
              className="mt-1 block w-full p-2 bg-white border text-sm rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled hidden>
                Maintenance Request
              </option>
              <option value="Plumbing Request">Plumbing</option>
              <option value="Electrical Request">Electrical</option>
              <option value="General Request">General</option>
              <option value="Painting Request">Painting</option>
              <option value="Roofing Request">Roofing   </option>
              <option value=" Safety And Security Request"> Safety and Security</option>
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-dark-gray"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
              rows={5}
            ></textarea>
          </div>

          <label
            htmlFor="addImage"
            className="mt-4 block text-sm font-medium text-dark-gray"
          >
            Attachment
          </label>
          <div className="mt-1 flex justify-center items-center">
            <label
              htmlFor="attached_image"
              className="cursor-pointer bg-white border border-gray-300 p-2 rounded-md w-full"
            >
              <span className="text-dark-gray flex items-center gap-2">
                <CiImageOn color="black" size={25} />
                Attach your photos here.
              </span>
              <input
                type="file"
                id="attached_image"
                name="attached_image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
            </label>
          </div>

          {attached_image.length > 0 && (
            <div className="relative flex items-center mt-2">
              {attached_image.map((image, index) => (
                <div
                  key={index}
                  className="relative flex w-[6rem] items-center mt-2"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Attached Image ${index + 1}`}
                    className="w-[15rem] h-auto"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="text-red text-lg font-bold absolute top-0 right-0"
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>
          )}
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
              onClick={() => setisCreateTicket((prevState) => !prevState)}
            >
              Close
            </button>
          </div>
        </form>
        {showPopup && (
        <PopUp
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          error={error}
        />
      )}
      </div>
    </div>
  )
}

export default CreateTicket
