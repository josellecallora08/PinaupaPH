import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../features/user';
import Popup from '../Component/PopUp'; 
const EditTenantDetails = ({ setIsEditTenantDetailForm, tenant }) => {
  const error = useSelector((state) => state.user.error);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    name: tenant?.user_id.name || '',
    birthday: tenant?.user_id.birthday || '',
    mobile_no: tenant?.user_id.mobile_no || '',
    email: tenant?.user_id.email || '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editUser(tenant?.user_id?._id, fields));
      setPopupMessage('Tenant details updated successfully!');
      setShowPopup(true);
      setTimeout(() => {
        setIsEditTenantDetailForm((prevState) => !prevState);
        setShowPopup(false);
      }, 2000); // Close the pop-up after 2 seconds
    } catch (error) {
      console.error(error);
      setPopupMessage('Failed to update tenant details. Please try again.');
      setIsError(true);
      setShowPopup(true);
      setTimeout(() => {
        setIsEditTenantDetailForm(true)
        setShowPopup(false);
      }, 2000); // Close the pop-up after 2 seconds
    }
  };
  
  return (
    <div className="relative">
      <div className="relative w-full h-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
          Edit Tenant Detail
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-full h-full w-[20rem]  p-3 overflow-y-auto"
      >
        <button className="absolute top-4 right-6">
          <IoMdClose
            onClick={() => setIsEditTenantDetailForm((prevState) => !prevState)}
            size={25}
            color="white"
          />
        </button>
        {error && (
          <div className=" w-auto bg-light-red text-dark-blue p-4 m-4 rounded ">
            {error}
          </div>
        )}
        <h1 className="text-xl font-bold mb-2">Personal Details</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInput}
            value={fields.name}
            required
            placeholder="Enter your name"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="birthday"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            required
            onChange={handleInput}
            value={new Date(fields?.birthday).toISOString().split('T')[0]}
            placeholder="Enter your birthday"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Contact
          </label>
          <input
            type="tel"
            id="mobile_no"
            name="mobile_no"
            required
            onChange={handleInput}
            value={fields.mobile_no}
            placeholder="Enter your contact number"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2 "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            name="email"
            onChange={handleInput}
            value={fields.email}
            placeholder="Enter your email"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-end mt-3 gap-3">
          <button className=" bg-dark-blue text-white font-bold py-2 px-4 rounded">
            Submit
          </button>

          <button
            onClick={() => setIsEditTenantDetailForm((prevState) => !prevState)}
            className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
        
      </form>
      {showPopup && (
          <Popup 
            message={popupMessage} 
            onClose={() => setShowPopup(false)} 
            error={error}
          />
        )}
    </div>
  );
};

export default EditTenantDetails;
