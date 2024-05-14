import React, { useState, useRef, useEffect } from 'react'
import { CiImageOn } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { createReport } from '../../features/report'

const CreateTicket = ({ id, setisCreateTicket }) => {
  const [type, setSelectedType] = useState('')
  const [description, setDescription] = useState('')
  const [attached_image, setImage] = useState(null)
  const dispatch = useDispatch()
  const error = useSelector(state => state.report.error) 
  const msg = useSelector(state => state.report.msg) 
  const modalRef = useRef(null)
  const [title, setTitle] = useState('')
  const handleImageChange = (event) => {
    console.log('asd')
    const file = event.target.files[0]
    setImage(file)
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
    dispatch(createReport(id, title, description, attached_image, type))
    // Add form submission logic here
    if (msg || error) {
      setisCreateTicket((prevState) => !prevState)
    }

  }


  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setisCreateTicket((prevState) => !prevState)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className="fixed top-10 left-1/4 w-1/2 h-auto  flex items-center justify-center bg-opacity-50 z-50">
      <div ref={modalRef} className="lg:w-9/12 bg-white rounded-lg relative">
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center">
          <h1 className="lg:text-xl ml-5 text-lg font-bold">Create Ticket</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-full lg:pt-4 w-[20rem] bg-white h-[30rem] px-4 overflow-y-auto"
        >
          <button className="absolute top-4 right-6" onClick={() => setisCreateTicket(prevState => !prevState)}>
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
              <option value="" disabled selected hidden>
                Maintenance Request
              </option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="general">General</option>
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
          <div>
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
                  Attach your photo here.
                </span>
                <input
                  type="file"
                  id="attached_image"
                  name="attached_image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {attached_image && (
            <div className="flex justify-center mt-2">
              <img
                src={URL.createObjectURL(attached_image)}
                alt="Attached Image"
                className="w-[10rem] h-auto"
              />
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
              className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
              onClick={() => setisCreateTicket(prevState => !prevState)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTicket
