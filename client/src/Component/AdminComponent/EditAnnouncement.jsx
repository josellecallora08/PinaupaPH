import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { createAnnouncement, deleteAnnouncement, editAnnouncement } from '../../features/announcement';

const EditAnnouncementForm = ({ setUpdate, val, setIsEditAnnouncementFormOpen }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: val?.title || '',
    type: val?.type || '',
    description: val?.description || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAnnouncement(formData,val._id))
    console.log('Form submitted:', formData);
    setUpdate(true)
    setIsEditAnnouncementFormOpen((prevState) => !prevState)
  };



  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex justify-between items-center w-full p-2 bg-primary-color text-white">
          <h1>Edit Announcement</h1>
          <IoMdClose
            onClick={() =>
              setIsEditAnnouncementFormOpen((prevState) => !prevState)
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
                  className="w-full border border-black text-dark-gray rounded  px-2 py-2 cursor-pointer"
                  placeholder="Select announcement type"
                >
                  <option value={val._id}>{val.type}</option>
                  <option value="announcement">General Announcement</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="rent Increase">Rent Increase</option>
                  <option value="policy Change">Policy Change</option>
                  <option value="event">Event</option>
                  <option value="emergency">Emergency</option>
                  <option value="reminder">Reminder</option>
                  <option value="renovation">Renovation</option>
                  <option value="inspection">Inspection</option>
                  <option value="lease Renewal">Lease Renewal</option>
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
          <button onClick={() => setIsEditAnnouncementFormOpen(false)} className='bg-red text-white py-2 px-4 rounded hover:bg-red/50'>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default EditAnnouncementForm;
