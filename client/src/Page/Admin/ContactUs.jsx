// ContactUsAdmin.js

import React, { useState } from 'react';

import logo from '/logo.svg'

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
    <div className="p-10 ">
      
      <h1 className="text-3xl font-bold mb-4">Contact Us (Admin)</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-blue-500"
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
            className="w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-blue-500"
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
            className="w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-primary-color text-white px-6 py-3 rounded hover:opacity-80">Submit</button>
      </form>
    </div>
  );
};

export default ContactUsAdmin;
