import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { createAnnouncement, deleteAnnouncement } from '../../features/announcement';

const AnnouncementForm = ({ setisAddAnnouncementFormOpen }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAnnouncement(formData))
    console.log('Form submitted:', formData);
  };



  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex justify-between items-center w-full p-2 bg-primary-color text-white">
          <h1>Create Announcement</h1>
          <IoMdClose
            onClick={() =>
              setisAddAnnouncementFormOpen((prevState) => !prevState)
            }
            size={25}
            color="white"
            className="cursor-pointer"
          />
        </div>
        <div className='w-full py-2'>
          {Object.entries(formData).map(([name, value]) => (
            <div key={name} className="mb-1 px-2">
              <label htmlFor={name} className="block mb-1 text-primary-color capitalize">
                {name.replace(/([A-Z])/g, ' $1').toLowerCase() === 'datetime' ? 'Date and Time' : name.replace(/([A-Z])/g, ' $1').toLowerCase()}:
              </label>
              {name === 'type' ? (
                <select
                  id={name}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Select announcement type"
                >
                  <option >Select Type:</option>
                  <option value="news">News</option>
                  <option value="payment">Payment</option>
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
          <button onClick={() => setisAddAnnouncementFormOpen(false)} className='bg-red text-white py-2 px-4 rounded hover:bg-red/50'>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default AnnouncementForm;
