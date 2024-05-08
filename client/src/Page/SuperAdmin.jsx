import React, { useState } from 'react';
import logo from '/logo.svg';

const CreateAdminPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'admin',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      setError('Please fill in all fields.');
      return;
    }

    console.log('Creating admin:', formData);

    setFormData({
      username: '',
      password: '',
      email: '',
      role: 'admin',
    });
   
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-hidden ">
      <div className="md:w-1/2 bg-gray-100 flex justify-center items-center">
        <img src={logo} alt="Company Logo" className="mx-auto" style={{ maxWidth: '80%', maxHeight: '80%', filter: 'brightness(0.9)' }} />
      </div>
      <div className="md:w-1/2 bg-white flex justify-center items-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Create Admin</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username:</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role:</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500">
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full">Create Admin</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminPage;
