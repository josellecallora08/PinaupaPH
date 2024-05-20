import React, { useState, useEffect } from 'react';
import gcashlogo from '/Gcashlogo.png';
import paymayalogo from '/maya-logo.jpg';
import grabpaylogo from '/Grabpaylogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../../features/payment';
import { useParams } from 'react-router-dom';
import '../../index.css';
import { fetchInvoice } from '../../features/invoice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ButtonLoading from '../../Component/LoadingComponent/ButtonLoading';

const TenantPayment = () => {
  const { id } = useParams();
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedEwallet, setSelectedEwallet] = useState(null);
  const invoice = useSelector((state) => state.invoice.single);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: invoice?.tenant_id?.user_id?.name || '',
    mobile_no: invoice?.tenant_id?.user_id?.mobile_no || '',
    email: invoice?.tenant_id?.user_id?.email || '',
    amount: invoice?.amount || '',
    method: invoice?.payment?.method || '',
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchInvoice(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (invoice) {
      setFormData({
        name: invoice.tenant_id?.user_id?.name || '',
        mobile_no: invoice.tenant_id?.user_id?.mobile_no || '',
        email: invoice.tenant_id?.user_id?.email || '',
        amount: invoice.amount || '',
        method: invoice.payment?.method || '',
      });
    }
  }, [invoice]);

  const handleEwalletChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedEwallet(selectedValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      method: selectedValue,
    }));
  };

  const handlePayment = async () => {
    if (formData.method !== null && formData.method !== '') {
      setLocalLoading(true);
      await dispatch(createPaymentIntent(id, formData));
      setLocalLoading(false);
    } else {
      console.error('Please select a payment method');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const currentDate = new Date().toLocaleString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const ewallets = [
    { value: 'gcash', label: 'GCash', logo: gcashlogo },
    { value: 'paymaya', label: 'Paymaya', logo: paymayalogo },
    { value: 'grab_pay', label: 'GrabPay', logo: grabpaylogo },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ewallets.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ewallets.length - 1 : prevIndex - 1,
    );
  };

  return (
    <>
      <div className="w-full h-full bg-white1 px-5 overflow-y-scroll">
        <h1 className="font-bold my-4">
          <span
            className="hover:cursor-pointer hover:underline mr-1"
            onClick={() => window.history.back()}
          >
            DASHBOARD
          </span>
          / PAYMENT
        </h1>
        <div className="flex lg:flex-row flex-col lg:gap-2 w-full h-full">
          <div className="flex-grow flex flex-col">
            <h1 className="bg-[#183044] p-2 text-white rounded-tl-md rounded-tr-md">
              SELECT PAYMENT METHOD
            </h1>
            <div className="flex flex-col pb-3 bg-white rounded-md text-primary-color">
              <div className="form-control mb-1">
                <div className="flex items-center p-2">
                  <input
                    type="radio"
                    id="ewallet"
                    value="ewallet"
                    checked={true}
                    onChange={() => {}}
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor="ewallet" className="cursor-pointer text-lg">
                    E-wallet
                  </label>
                </div>
              </div>
              <div>
                <div className="flex flex-col lg:gap-10">
                  <div className="mobile-carousel mb-5 pt-3">
                    <div className="form-control mx-auto flex justify-center items-center">
                      <div className="mx-16 relative w-full flex items-center justify-center">
                        <button
                          className="absolute left-0 text-2xl"
                          onClick={prevSlide}
                        >
                          <IoIosArrowBack />
                        </button>
                        <div className="carousel flex overflow-hidden w-full justify-center items-center">
                          {ewallets.map((ewallet, index) => (
                            <div
                              key={ewallet.value}
                              className={`${
                                index === currentIndex ? 'block' : 'hidden'
                              }`}
                            >
                              <label className="radio-container">
                                <input
                                  type="radio"
                                  name="method"
                                  id="method"
                                  value={ewallet.value}
                                  checked={selectedEwallet === ewallet.value}
                                  onChange={handleEwalletChange}
                                  className="hidden"
                                />
                                <img
                                  src={ewallet.logo}
                                  alt={ewallet.label}
                                  className="w-40 h-20 cursor-pointer rounded-md shadow-md"
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                        <button
                          className="absolute right-0 text-2xl"
                          onClick={nextSlide}
                        >
                          <IoIosArrowForward />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:flex-wrap gap-5 justify-center">
                    {ewallets.map((ewallet) => (
                      <label key={ewallet.value} className="radio-container">
                        <input
                          type="radio"
                          name="method"
                          value={ewallet.value}
                          checked={selectedEwallet === ewallet.value}
                          onChange={handleEwalletChange}
                          className="hidden"
                        />
                        <img
                          src={ewallet.logo}
                          alt={ewallet.label}
                          className="w-40 h-20 cursor-pointer rounded-md shadow-md"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="p-5 bg-white">
                    <h1 className="mb-3">Personal Information</h1>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block font-medium text-primary-color"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 px-4 py-3 text-xl text-primary-color border bg-white border-dark-gray rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="contactNumber"
                        className="block font-medium text-primary-color"
                      >
                        Contact Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Contact Number"
                        id="mobile_no"
                        name="mobile_no"
                        value={formData.mobile_no}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 px-4 py-3 border text-xl text-primary-color bg-white border-dark-gray rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-medium text-primary-color"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 px-4 py-3 text-xl text-primary-color border bg-white border-dark-gray rounded-md w-full"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="email"
                        className="block font-medium text-primary-color"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter Email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 px-4 py-3 text-xl text-primary-color border bg-white border-dark-gray rounded-md w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow flex bg-white flex-col">
            <div className="flex flex-col h-full">
              <h1 className="bg-primary-color p-2 text-white rounded-tl-md rounded-tr-md">
                PAYMENT AMOUNT
              </h1>
              <div className="px-5 flex-grow flex flex-col">
                <h1 className="text-light-blue text-4xl py-8 border-b-2 border-dark-gray mb-4 pb-4">
                  {formData.amount === ''
                    ? (0).toLocaleString('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      })
                    : parseInt(formData.amount)?.toLocaleString('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      })}
                </h1>
                <div className="flex-grow">
                  <p className="my-3 text-dark-gray font-bold text-lg">
                    Payment for Rent
                  </p>
                  <div className="flex justify-between text-lg mb-6 text-dark-gray">
                    <p>Title</p>
                    <p>Price</p>
                  </div>
                  <div className="flex justify-between text-lg pb-10 border-b-2 border-dark-gray">
                    <p>Rent</p>
                    <p>
                      {(invoice?.amount &&
                        invoice?.amount.toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        })) ||
                        parseInt(0)?.toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        })}
                    </p>
                  </div>
                  <div className="text-end my-5 text-3xl text-primary-color">
                    <span className="mr-4">Total:</span>
                    {formData.amount === ''
                      ? (0).toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        })
                      : parseInt(formData.amount)?.toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        })}
                  </div>
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-end mb-10 items-center">
                <div className="w-full px-10">
                  {localLoading ? (
                    <ButtonLoading msg={'Processing...'} />
                  ) : (
                    <button
                      onClick={handlePayment}
                      className="lg:mt-0 md:mt-4 w-full lg:mb-8 bg-primary-color text-white mb-5 py-3 rounded-md hover:opacity-80"
                    >
                      Pay
                    </button>
                  )}
                </div>
                <div className="flex flex-col w-full py-10 items-center gap-2 bg-gray">
                  <h1 className="text-primary-color font-bold text-lg">
                    {currentDate}
                  </h1>
                  <div>
                    Mode of Payment:{' '}
                    <span className="uppercase">
                      {formData.method ? formData.method : 'No selected'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantPayment;
