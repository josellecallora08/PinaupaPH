import React, { useState, useEffect, useRef } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { createAnnouncement } from '../../features/announcement'
import { fetchUsers } from '../../features/user'
import Popup from '../../Component/PopUp' // Import the Popup component

const socket = io(`${import.meta.env.VITE_URL}/`)

const AnnouncementForm = ({
  setisAddAnnouncementFormOpen,
  handleSubmit,
  formData,
  setFormData,
  handleChange,
}) => {
  const dispatch = useDispatch()
  const modalRef = useRef(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setisAddAnnouncementFormOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setisAddAnnouncementFormOpen])

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full" ref={modalRef}>
        <div className="flex justify-between items-center w-full p-4 bg-primary-color text-white">
          <h1 className="text-xl font-semibold">Create Announcement</h1>
          <IoMdClose
            onClick={() => setisAddAnnouncementFormOpen(false)}
            size={25}
            color="white"
            className="cursor-pointer"
          />
        </div>
        <div className="w-full py-2">
          {Object.entries(formData).map(([name, value]) => (
            <div key={name} className="mb-1 px-2">
              <label
                htmlFor={name}
                className="block mb-1 text-primary-color capitalize"
              >
                {name.replace(/([A-Z])/g, ' $1').toLowerCase() === 'datetime'
                  ? 'Date and Time'
                  : name.replace(/([A-Z])/g, ' $1').toLowerCase()}
                :
              </label>
              {name === 'type' ? (
                <select
                  id={name}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className=" w-full border border-black text-black rounded p-2  cursor-pointer"
                  placeholder="Select announcement type"
                >
                  <option hidden>Select Type</option>
                  <option value="announcement">General Announcement</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="Rent Increase">Rent Increase</option>
                  <option value="Policy Change">Policy Change</option>
                  <option value="event">Event</option>
                  <option value="emergency">Emergency</option>
                  <option value="reminder">Reminder</option>
                  <option value="renovation">Renovation</option>
                  <option value="inspection">Inspection</option>
                  <option value="Lease Renewal">Lease Renewal</option>
                  <option value="noise">Noise</option>
                  <option value="parking">Parking</option>
                  <option value="amenities">Amenities</option>
                  <option value="utilities">Utilities</option>
                  <option value="security">Security</option>
                  <option value="community">Community</option>
                </select>
              ) : name === 'description' ? (
                <textarea
                  id={name}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  required
                  placeholder="Enter description"
                />
              ) : (
                <input
                  type={name === 'title' ? 'text' : 'text'}
                  id={name}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required={name !== 'announcementType'}
                  placeholder={`Enter ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mr-2 mb-5 gap-2">
          <button
            type="submit"
            className="bg-primary-color text-white px-4 py-2 rounded hover:bg-primary-color/50"
          >
            Submit
          </button>
          <button
            onClick={() => setisAddAnnouncementFormOpen(false)}
            className="bg-red text-white py-2 px-4 rounded hover:bg-red/50"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default AnnouncementForm
