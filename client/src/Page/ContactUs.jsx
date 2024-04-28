import React, { useState } from 'react';
import logo from '/logo.svg';

const ContactUsAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full h-screen bg-gray-100">
      <div className="bg-white px-8 py-2 rounded-lg shadow-md w-full max-w-md flex items-center">
        <div className="absolute top-0 left-0 p-6 mr-6">
          <img src={logo} alt="Company Logo" className="lg:block hidden w-48 h-auto" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className='flex justify-end'>
            <button type="submit" className="bg-primary-color hover:bg-primary-color/50 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">Submit</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsAdmin;
