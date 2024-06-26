import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InvoiceFormat from '../../Component/InvoiceFormat';
import { RiDeleteBin6Line } from 'react-icons/ri';
import search from '/search.svg';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEye, FaCheck, FaPlus } from 'react-icons/fa';
import ManualInovoice from '../../Component/ManualInovoice'; // Correct component name
import SearchBar from '../../Component/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from '../../Component/PopUp';
import {
  deleteInvoices,
  editInvoices,
  fetchInvoices,
  searchInvoice,
  resetInvoiceStatus,
} from '../../features/invoice';
import { createCashPayment } from '../../features/payment';

const Invoice = () => {
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const msg = useSelector((state) => state.invoice.msg);
  const [modal, setModal] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Cash' || '');
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoice.data);
  const errorInvoice = useSelector((state) => state.invoice.error);
  const msgInvoice = useSelector((state) => state.invoice.msg);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      dispatch(deleteInvoices(id));
      setUpdate(true);
    }
  };

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const handlePaid = (id) => {
    setPaymentModal(true);
    setPaymentId(id);
  };

  const handlePaymentSubmit = () => {
    dispatch(editInvoices(paymentId, { amount, method, isPaid: true }));
    setUpdate(true);
    setPaymentModal(false);
  };
  const handleCashSubmit = (e) => {
    e.preventDefault()
    dispatch(createCashPayment(paymentId, amount, method))
    setPaymentModal(prevState => !prevState)
  }

  useEffect(() => {
    if (msgInvoice || errorInvoice) {
      setPopupMessage(msgInvoice || errorInvoice);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        dispatch(resetInvoiceStatus());
        setModal(false);
      }, 3000);
    }
  }, [msgInvoice, errorInvoice, dispatch]);

  useEffect(() => {
    if (filter) {
      dispatch(searchInvoice(filter));
    } else {
      dispatch(fetchInvoices());
    }
  }, [filter, update, msg, status, dispatch]);

  const handleDropdownClick = (id) => {
    setDropdownIndex(id === dropdownIndex ? null : id);
  };


  return (
    <>
      {showPopup && (
        <PopUp
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          isError={errorInvoice}
        />
      )}
      <div className="w-full h-full bg-white1">
        <div className="w-11/12 m-auto h-full flex flex-col gap-2">
          <h1 className="font-bold pt-5 tracking-wider">DOCUMENTS / INVOICE</h1>
          <div className="w-full h-full max-h-20 flex flex-col md:flex-row gap-2 py-5 items-center justify-between">
            <div className="w-full md:w-fit">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex items-center justify-center lg:justify-end w-full order-2 ml-auto gap-2">
              <div className="w-full md:w-fit">
                <select
                  onChange={(e) => setStatus(JSON.parse(e.target.value))}
                  className="select font-semibold select-bordered w-full max-w-xs"
                >
                  <option defaultValue="false" hidden>
                    Select Status
                  </option>
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
              </div>
              {user?.role === 'Admin' && (
                <button
                  onClick={() => setModal((prevState) => !prevState)}
                  className="btn md:btn-wide w-1/2 bg-primary-color text-white hover:text-primary-color"
                >
                  <FaPlus />
                  Prepare Invoice
                </button>
              )}
            </div>
          </div>
          <div className="w-full h-full mt-10 md:mt-0 mb-5 pb-5">
            <div className="relative w-full h-full max-h-[600px] lg:max-h-[660px] bg-white overflow-y-scroll border-primary-color border-l-4 border-b-4">
              <table className="w-full h-auto overflow-y-auto">
                <thead className="sticky top-0 bg-primary-color z-10">
                  <tr className="text-center text-xs md:text-base">
                    <th className="text-white p-3">Reference Number</th>
                    <th className="text-white p-3">Tenant</th>
                    <th className="text-white p-3">Unpaid Balance</th>
                    <th className="text-white py-3 px-10">Due Date</th>
                    {status === true && (
                      <>
                        <th className="text-white p-3">Date Paid</th>
                        <th className="text-white p-3">Amount Paid</th>
                      </>
                    )}
                    <th className="text-white p-3">Status</th>
                    <th className="text-white py-3 lg:px-5">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full h-full bg-white font-regular">
                  {user && user.role === 'Admin'
                    ? invoices
                      ?.filter((item) => item?.isPaid === status)
                      .map((val, index) => (
                        <tr
                          key={index}
                          className="text-center bg-white text-xs md:text-base"
                        >
                          <td className="text-primary-color font-regular p-2">
                            {val?.pdf?.reference || '-'} {/* Add a fallback */}
                          </td>
                          <td className="text-xs md:text-base font-regular text-primary-color p-2">
                            {val?.tenant_id?.user_id?.name || '-'} {/* Add a fallback */}
                          </td>
                          <td className="p-2">
                            {(!val?.isPaid
                              ? val?.tenant_id?.balance
                              : val?.payment?.unpaidBalance
                            )?.toLocaleString('en-PH', {
                              style: 'currency',
                              currency: 'PHP',
                            })}
                          </td>
                          <td className="p-2 md:text-base text-xs">
                            {val?.due === null
                              ? '-'
                              : new Date(val?.due)?.toDateString()}
                          </td>
                          {val?.isPaid === true && (
                            <>
                              <td className="py-2 px-1">
                                {val?.datePaid === null
                                  ? '-'
                                  : new Date(val?.datePaid)?.toDateString()}
                              </td>
                              <td className="p-2">
                                {val?.payment?.amountPaid?.toLocaleString(
                                  'en-PH',
                                  {
                                    style: 'currency',
                                    currency: 'PHP',
                                  },
                                )}
                              </td>
                            </>
                          )}
                          <th
                            className={`capitalize font-semibold ${val?.isPaid === false
                              ? 'text-red'
                              : 'text-lime'
                              } p-2 w-1/5`}
                          >
                            {val?.isPaid === false ? 'Unpaid' : 'Paid'}
                          </th>
                          <td className="text-primary-color p-2 flex justify-center">
                            <div className="relative">
                              <button
                                className=" focus:outline-none my-3"
                                onClick={() => handleDropdownClick(val?._id)}
                              >
                                <BsThreeDotsVertical size={25} />
                              </button>
                              {dropdownIndex === val?._id && (
                                <ul
                                  className={`absolute top-0 w-36 right-5 bg-white shadow-md rounded-md z-auto`}
                                >
                                  {val?.isPaid === false && (
                                    <>
                                      <li>
                                        <button
                                          onClick={() => handlePaid(val?._id)}
                                          className="px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full"
                                        >
                                          <FaCheck /> Paid
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          onClick={() =>
                                            handleDelete(val?._id)
                                          }
                                          className="px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full"
                                        >
                                          <RiDeleteBin6Line /> Delete
                                        </button>
                                      </li>
                                    </>
                                  )}
                                  <li>
                                    <Link
                                      to={`/invoice/${val?._id}`}
                                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary-color hover:bg-gray w-full"
                                    >
                                      <FaRegEye /> View
                                    </Link>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    : invoices
                      ?.filter(
                        (item) =>
                          item.isPaid === status &&
                          item.tenant_id.user_id._id === user.id,
                      )
                      .map((val, index) => (
                        <tr
                          key={index}
                          className="text-center text-xs md:text-base"
                        >
                          <td className="text-primary-color font-regular p-3">
                            {val?.pdf?.reference || '-'} {/* Add a fallback */}
                          </td>
                          <td className="text-sm md:text-base capitalize font-regular text-primary-color p-3">
                            {val?.tenant_id?.user_id?.name || '-'} {/* Add a fallback */}
                          </td>
                          <td className="p-3">
                            {(val?.tenant_id?.balance === 0
                              ? 0
                              : val?.tenant_id?.balance - val?.amount
                            ).toFixed(2)}
                          </td>
                          <td className="p-2">{val?.amount.toFixed(2)}</td>
                          <th
                            className={`font-semibold ${val?.isPaid === false
                              ? 'text-red'
                              : 'text-primary-color'
                              } p-3 w-1/5`}
                          >
                            {val?.isPaid === false ? 'Unpaid' : 'Paid'}
                          </th>
                          <td className="text-primary-color p-3 flex justify-center">
                            <div className="relative">
                              <button
                                className="relative focus:outline-none my-3"
                                onClick={() => handleDropdownClick(val?._id)}
                              >
                                <BsThreeDotsVertical size={25} />
                              </button>
                              {dropdownIndex === val?._id && (
                                <ul
                                  className={`absolute w-36 right-0 bg-white shadow-md rounded-md z-10 ${index === invoices.length - 1
                                    ? 'bottom-12'
                                    : index === invoices.length - 2
                                      ? 'bottom-24'
                                      : 'top-12'
                                    }`}
                                >
                                  {val?.isPaid === false && (
                                    <>
                                      <li>
                                        <button
                                          onClick={() => handlePaid(val?._id)}
                                          className="px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full"
                                        >
                                          <FaCheck /> Paid
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          onClick={() =>
                                            handleDelete(val?._id)
                                          }
                                          className="px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full"
                                        >
                                          <RiDeleteBin6Line /> Delete
                                        </button>
                                      </li>
                                    </>
                                  )}
                                  <li>
                                    <Link
                                      to={`/invoice/${val?._id}`}
                                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary-color hover:bg-gray w-full"
                                    >
                                      <FaRegEye /> View
                                    </Link>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal && <ManualInovoice setModal={setModal} />}
      {paymentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <form onSubmit={handleCashSubmit} className="bg-white p-5 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Manual Payment</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                placeholder='Enter amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Method
              </label>
              <input
                type="text"
                disabled
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-1 block bg-gray w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPaymentModal(false)}
                className="bg-gray text-primary-color px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                className="bg-primary-color text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Invoice;
