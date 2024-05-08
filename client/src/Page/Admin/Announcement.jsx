import React, { useEffect, useState, useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import SearchBar from '../../Component/SearchBar'
import AddAnnouncement from '../../Component/AdminComponent/AddAnnouncement'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAnnouncement,
  fetchAnnouncements,
  searchAnnouncement,
} from '../../features/announcement'
import EditAnnouncementForm from '../../Component/AdminComponent/EditAnnouncement'

const Announcement = () => {
  const dispatch = useDispatch()
  const announcement = useSelector((state) => state.announcement.data)
  const [update, setUpdate] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [value, setValue] = useState('')
  const [filter, setFilter] = useState('All')
  const [isAddAnnouncementFormOpen, setisAddAnnouncementFormOpen] =
    useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) // State to track which dropdown is open
  const [isEditAnnouncementFormOpen, setIsEditAnnouncementFormOpen] =
    useState(false)
  const dropdownRef = useRef(null) // Ref for dropdown container

  const toggleAddAnnouncementForm = () => {
    setisAddAnnouncementFormOpen(!isAddAnnouncementFormOpen)
  }
  const toggleEditAnnouncementForm = (val) => {
    setValue(val)
    setIsEditAnnouncementFormOpen(!isEditAnnouncementFormOpen)
  }

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }
  // Function to toggle dropdown for a specific card
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const handleDelete = (id) => {
    const isConfirmed = confirm('Would you like to delete this announcement?')
    if (isConfirmed) {
      dispatch(deleteAnnouncement(id))
    }
  }
  useEffect(() => {
    if (searchItem && searchItem !== '') {
      dispatch(searchAnnouncement(searchItem))
    } else {
      dispatch(fetchAnnouncements())
    }

    setUpdate(false)
  }, [searchItem, update])


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full h-screen bg-white1">
      {/* Top of Announcement Tab */}
      <div className="w-11/12 m-auto h-full ">
        <h1 className="uppercase font-bold py-5">Announcement </h1>
        <div className="lg:justify-between md:justify-between flex-wrap justify-end flex items-center gap-2 w-full">
          <div className="w-full md:max-w-60">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={toggleAddAnnouncementForm}
            className="btn md:btn-wide w-full bg-primary-color text-white hover:text-primary-color"
          >
            <FaPlus />
            Create Announcement
          </button>
        </div>
        {/* Tabs */}
        <div className="flex items-center bg-white gap-7 p-2 pb-6 pt-5 pl-7 mt-5 rounded-tl-lg rounded-tr-lg">
          {/* Filter Tabs */}
          <button
            className={`filter-tab ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
            style={{
              color: filter === 'All' ? '#000' : '#7e7e7e',
              borderBottom: filter === 'All' ? '2px solid #000' : 'none',
              transition: 'color 0.3s ease, border-bottom 0.3s ease',
            }}
          >
            All
          </button>
          <button
            className={`filter-tab ${filter === 'News' ? 'active' : ''}`}
            onClick={() => setFilter('News')}
            style={{
              color: filter === 'News' ? '#000' : '#7e7e7e',
              borderBottom: filter === 'News' ? '2px solid #000' : 'none',
              transition: 'color 0.3s ease, border-bottom 0.3s ease',
            }}
          >
            News
          </button>
          <button
            className={`filter-tab ${filter === 'Payments' ? 'active' : ''}`}
            onClick={() => setFilter('Payments')}
            style={{
              color: filter === 'Payments' ? '#000' : '#7e7e7e',
              borderBottom: filter === 'Payments' ? '2px solid #000' : 'none',
              transition: 'color 0.3s ease, border-bottom 0.3s ease',
            }}
          >
            Payments
          </button>
        </div>
        {/* Body of Announcement Tab */}
        <div className=" md:h-[25rem] min-[1440px]:h-[45rem] min-[1280px]:h-[45rem] min-[1366px]:h-[19rem] w-full h-80 overflow-x-auto px-8 rounded-bl-lg rounded-br-lg bg-white">
          {/* Announcement Cards */}
          <div className="flex flex-wrap mt-5 ">
            {announcement &&
              filter === 'All' &&
              announcement?.map((val, key) => (
                <div
                  key={key}
                  className="relative bg-white p-4 rounded-md shadow-md w-full mb-6"
                >
                  <div className="flex ">
                    <div className="  flex flex-col justify-center md:w-auto  border-r-2 border-gray w-32 pr-1  items-center mr-5">
                      <p className="text-light-gray md:text-base text-xs flex">
                        <span>{new Date(val.createdAt).toDateString()}</span>
                      </p>
                      <p className="text-light-gray md:text-sm text-xs">
                        <span>
                          {new Date(val.createdAt).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col w-[80%] ">
                      <p className="font-semibold text-lg">{val.title}</p>

                      <p className="text-light-gray">{val.description}</p>
                    </div>
                  </div>
                  <div
                    onClick={() => toggleDropdown(val._id)}
                    className="absolute top-3 right-2 text-xl cursor-pointer"
                  >
                    <BsThreeDotsVertical className="relative" />
                  </div>
                  {openDropdown === val._id && (
                    <div
                      ref={dropdownRef}
                      className=" absolute top-2 right-7 flex items-center bg-white w- h-auto cursor-pointer gap-3 rounded-bl-md rounded-br-md shadow-md shadow-gray "
                    >
                      <ul>
                        <li
                          onClick={() => {
                            toggleEditAnnouncementForm(val)
                            setOpenDropdown(null)
                          }}
                          className=" flex items-center justify-center gap-2 w-full hover:bg-dark-blue hover:text-white py-2 px-5 text-center"
                        >
                          <MdOutlineModeEdit />
                          Edit
                        </li>
                        <li
                          onClick={() => {
                            handleDelete(val._id)
                            setOpenDropdown(null)
                          }}
                          className="flex items-center justify-center gap-2 py-2 px-5 w-full hover:bg-dark-blue hover:text-white p-2 text-center"
                        >
                          <MdOutlineDeleteOutline />
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      {isAddAnnouncementFormOpen && (
        <div className="lg:top-9 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="lg:w-1/2 h-auto lg:mt-2 mt-14 w-10/12 bg-white rounded-md">
            <AddAnnouncement
              setisAddAnnouncementFormOpen={setisAddAnnouncementFormOpen}
            />
          </div>
        </div>
      )}
      {isEditAnnouncementFormOpen && (
        <div className="lg:top-9 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="lg:w-1/2 h-auto lg:mt-2 mt-14 w-10/12 bg-white rounded-md">
            <EditAnnouncementForm
              setUpdate={setUpdate}
              val={value}
              setIsEditAnnouncementFormOpen={setIsEditAnnouncementFormOpen}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Announcement
