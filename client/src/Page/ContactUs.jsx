import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendEmail } from '../features/email';
import logo from '/logo.svg';
import contactImage from '/ContactUs.jpg';

const ContactUsAdmin = () => {
    const dispatch = useDispatch();
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
        dispatch(sendEmail(formData));
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen lg:overflow-hidden">
            <div className=" bg-white rounded-lg shadow-md lg:p-20 px-10 w-full text-center md:w-1/2">
                <div className="flex justify-start mb-9">
                    <img src={logo} alt="Logo" className="w-36" />
                </div>
                <h2 className="text-primary-color font-semibold text-2xl text-left">Contact Us Admin</h2>
                <p className='text-left font-thin text-dark-gray py-2'>Please send your concern and suggestion.</p>
                <form onSubmit={handleSubmit} className="py-2">
                    <div className="mb-4">
                        <label className="block text-left text-primary-color text-sm font-semibold mb-2" htmlFor="name">Name:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-color leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left text-primary-color text-sm font-semibold mb-2" htmlFor="email">Email:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-color leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-left text-primary-color text-sm font-semibold mb-2" htmlFor="message">Message:</label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-color leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder='Enter your message'
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-primary-color w-10/12  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-primary-color/55"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="contact-image-container md:w-1/2 hidden lg:block">
                <img src={contactImage} alt="Contact Us" className="w-full max-h-[35rem] object-contain" />
            </div>
        </div>
    );
};

export default ContactUsAdmin;
