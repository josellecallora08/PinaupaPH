import React from 'react';
import Lottie from 'lottie-react';
import SuccessAnimation from '../Page/Success.json';
import ErrorAnimation from '../Page/Error.json';

const PopUp = ({ message, isError }) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        {isError ? (
          <div>
            <Lottie animationData={ErrorAnimation} className="w-48 mx-auto mb-4" />
            <p className="text-red-600 text-lg font-semibold">{message}</p>
          </div>
        ) : (
          <div>
            <Lottie animationData={SuccessAnimation} className="w-48 mx-auto mb-4" />
            <p className="text-green-600 text-lg font-semibold">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;
