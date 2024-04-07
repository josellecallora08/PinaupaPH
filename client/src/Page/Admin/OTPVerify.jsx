import React, { useState, useRef } from 'react';
import logo from '/logo.svg';
import EmailSent1 from '/EmailSent1.svg';

const OTPVerify = () => {
  const [values, setValues] = useState(['', '', '', '', '', '']);
  const refs = Array.from({ length: 6 }, () => useRef(null));

  const handleChange = (index, e) => {
    console.log('handleChange called');
    const inputValue = e.target.value;
    const newValues = [...values];

    if (inputValue === '') {
      newValues[index] = '';
      setValues(newValues);
      
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    } else if (/^\d$/.test(inputValue)) {
      newValues[index] = inputValue;
      setValues(newValues);

      if (index < 5 && inputValue) {
        refs[index + 1].current.focus();
      }
    }
  };

  return (
    <>
      <div className="w-full h-screen py-10 px-10">
        <img src={logo} alt="PinaupaPH logo" className="lg:block lg:ml-10 hidden" />
        <div className="lg:flex-row lg:ml-20  flex flex-col items-center">
          <div className="lg:w-1/2 lg:mt-0 mt-5">
            <img src={logo} alt="PinaupaPH logo" className="lg:hidden mx-auto" />
            <img src={EmailSent1} alt="Forgot Password Picture" className="lg:w-10/12" />
          </div>

          <div className="lg:shadow-md lg:rounded-md lg:w-5/12 lg:shadow-dark-gray p-10">
            <div className="">
              <h1 className="lg:text-3xl text-2xl font-bold text-primary">Check your Email.</h1>
              <p className="text-sm mt-3  text-dark-gray">We’ve sent the OTP to your Email.</p>
            </div>

            <form action="" className="w-full mt-3">
              <div className="flex gap-3 justify-center">
                {values.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="border-2 border-primary w-14 h-16 rounded-md text-3xl text-center"
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    ref={refs[index]}
                  />
                ))}
              </div>

              <button className="lg:mt-10 bg-primary text-white w-full mt-5 py-3 px-2 rounded-md hover:opacity-80">
                Send
              </button>
              <button className="lg:mb-4 bg-white text-primary border-2 border-primary w-full mt-2 py-3 px-2 rounded-md hover:opacity-80">
                Send Again
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerify;
