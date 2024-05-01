import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import SearchBar from '../../Component/SearchBar';
import AddAnnouncement from '../../Component/AdminComponent/AddAnnouncement';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineModeEdit, MdOutlineDeleteOutline  } from "react-icons/md";

const Announcement = () => {
  const [searchItem, setSearchItem] = useState('');
  const [filter, setFilter] = useState('All');
  const [isAddAnnouncementFormOpen, setisAddAnnouncementFormOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // State to track which dropdown is open

  const toggleAddAnnouncementForm = () => {
    setisAddAnnouncementFormOpen(!isAddAnnouncementFormOpen);
  };

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  // Fake announcement data
  const announcements = [
    {
      id: 1,
      date: 'April 27, 2024',
      title: 'Important News',
      time: '10:00pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    },
    {
      id: 2,
      date: 'April 26, 2024',
      title: 'Payment Update',
      time: '10:00pm',
      description: 'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    },
    {
      id: 3,
      date: 'April 25, 2024',
      title: 'New Feature Release',
      time: '10:00pm',
      description: 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
    },
    {
      id: 4,
      date: 'April 26, 2024',
      title: 'Payment Update',
      time: '10:00pm',
      description: 'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    },
    {
      id: 5,
      date: 'April 25, 2024',
      title: 'New Feature Release',
      time: '10:00pm',
      description: 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
    },
  ];

  // Function to toggle dropdown for a specific card
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

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
            {announcements
              .filter((announcement) => {
                if (filter === 'All') return true
                return announcement.title
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              })
              .map((announcement) => (
                <div
                  key={announcement.id}
                  className="relative bg-white p-4 rounded-md shadow-md w-full mb-6"
                >
                  <div className="flex ">
                    <div className="  flex flex-col justify-center md:w-auto  border-r-2 border-gray w-32 pr-1  items-center mr-5">
                      <p className="text-light-gray md:text-base text-xs ">
                        {announcement.date}
                      </p>
                      <p className="text-light-gray md:text-sm text-xs">
                        {announcement.time}
                      </p>
                    </div>

                    <p className="flex flex-col w-[80%] ">
                      <p className="font-semibold text-lg">
                        {announcement.title}
                      </p>

                      <p className="text-light-gray">
                        {announcement.description}
                      </p>
                    </p>
                  </div>
                  <div onClick={() => toggleDropdown(announcement.id)} className="absolute top-3 right-2 text-xl cursor-pointer">
                    <BsThreeDotsVertical className="relative" />
                  </div>
                  {openDropdown === announcement.id && (
                    <div className=" absolute top-2 right-7">
                      <ul>
                        <li className='cursor-pointer p-2 border-2 border-primary-color bg-white hover:transition hover:duration-150 hover:bg-primary-color hover:text-white  text-primary-color flex items-center gap-2 hover: '><MdOutlineModeEdit />Edit</li>
                        <li className='cursor-pointer p-2 border-2 border-primary-color bg-white hover:transition hover:duration-150 hover:bg-red hover:text-white  text-red flex items-center gap-2 hover: '><MdOutlineDeleteOutline />Delete</li>
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
    </div>
  );
};

export default Announcement;
