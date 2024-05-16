import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendEmail } from '../features/email';
import contactImage from '/ContactUs.jpg';
import Lottie from 'lottie-react';
import Success from './Success.json';

const ContactUsAdmin = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(sendEmail(formData));
            setSuccessMessage('Message sent successfully!');
            setErrorMessage('');
            setShowPopup(true); 
            
      
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (error) {
            setErrorMessage('Failed to send message. Please try again later.');
            setSuccessMessage('');
        }
    };

    const handleTextareaChange = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto'; // Reset height to auto
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen lg:overflow-hidden">
            <div className=" bg-white ml-8 rounded-lg shadow-md lg:p-20 px-10 w-full text-center md:w-1/2">
               
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
                            onChange={handleTextareaChange} // Use handleTextareaChange instead of handleChange
                            required
                            placeholder='Enter your message'
                            rows="1"
                     // Set initial rows to 1
                            style={{ minHeight: '90px', maxHeight: '150px', resize: 'none' }}
                             // Set a minimum height
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
            {/* Popup */}
            {showPopup && (
                 <div className="lg:top-9 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8">
                        <Lottie animationData={Success} className="w-28 mx-auto mb-4" />
                        <p className="text-lime text-lg">{successMessage}</p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsAdmin;
