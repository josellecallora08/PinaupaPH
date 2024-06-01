import React from 'react';
import error from '/Error.jpg';

const ErrorPage = () => {
    return (
        <div className="error-page bg-white w-full h-full flex flex-col md:flex-row items-center justify-center min-h-screen overflow-hidden">
            <div className="error-content bg-white rounded-lg shadow-md p-8 text-center md:w-1/2 md:order-1">
                <h1 className="text-4xl font-bold text-primary-color mb-4">Oops! Page Not Found</h1>
                <p className="text-lg text-primary-color mb-6">The page you are looking for cannot be found.</p>
                <div className="text-left mb-6">
                    <p className="font-semibold text-center">Possible Reasons:</p>
                    <ul className="pl-5 text-primary-color text-center">
                        <li>The address may have been typed incorrectly.</li>
                        <li>It may be a broken or outdated link.</li>
                    </ul>
                </div>
                <button onClick={() => window.location.href = '/'} className="bg-primary-color text-white rounded-md px-6 py-3 font-semibold hover:bg-primary-color-dark transition-colors duration-300">
                    Go to Home
                </button>
            </div>
            <img src={error} className="w-full md:w-1/2 md:order-2 max-h-screen md:max-h-full object-contain" alt="Error" />
        </div>
    );
}

export default ErrorPage;
