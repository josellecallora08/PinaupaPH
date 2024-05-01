import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InvoiceFormat from '../../Component/InvoiceFormat';
import { RiDeleteBin6Line } from 'react-icons/ri';
import search from '/search.svg';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEye, FaCheck } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import ManualInovoice from '../../Component/ManualInovoice';
import SearchBar from '../../Component/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteInvoices,
  editInvoices,
  fetchInvoices,
  searchInvoice,
} from '../../features/invoice';

const Invoice = () => {
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const msg = useSelector((state) => state.invoice.msg);
  const [modal, setModal] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null); // To keep track of which dropdown is open for each item
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoice.data);

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
    dispatch(editInvoices(id, true));
    setUpdate(true);
  };

  useEffect(() => {
    if (filter && filter !== '') {
      dispatch(searchInvoice(filter));
    } else {
      dispatch(fetchInvoices());
      setUpdate(false);
    }
  }, [filter, update, msg, status]);

  const handleDropdownClick = (id) => {
    setDropdownIndex(id === dropdownIndex ? null : id);
  };

  return (
    <>
      <div className="w-full h-full bg-white1">
        <div className=" w-11/12 m-auto h-full flex flex-col gap-2  ">
          <h1 className="font-bold pt-5 tracking-wider">DOCUMENTS / INVOICE</h1>
          <div className="w-full h-full max-h-20 flex flex-col md:flex-row gap-2 py-5 items-center justify-between ">
            <div className="w-full md:w-fit">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex items-center justify-center lg:justify-end w-full order-2 ml-auto gap-2">
              <div className="w-full md:w-fit">
                <select
                  onChange={(e) => setStatus(JSON.parse(e.target.value))}
                  className="select font-semibold select-bordered w-full max-w-xs"
                >
                  <option defaultValue="false">Select Status</option>
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
              </div>
              {user?.role === "Admin" && <button
                onClick={() => setModal((prevState) => !prevState)}
                className="btn md:btn-wide w-1/2  bg-primary-color text-white hover:text-primary-color"
              >
                <FaPlus />
                Prepare Invoice
              </button>}
            </div>
          </div>
          <div className="w-full h-80 ">
            <div className="relative w-full h-full max-h-[660px] bg-white overflow-y-scroll border-primary-color border-l-4 border-b-4">
              <table className="w-full h-fit  overflow-y-auto  ">
                <thead className="sticky top-0 bg-primary-color z-10">
                  <tr className="text-center text-xs md:text-base">
                    <th className="text-white p-3 w-1/5">Reference Number</th>
                    <th className="text-white p-3 w-1/5">Tenant</th>
                    <th className="text-white p-3 w-1/5">Unpaid Balance</th>
                    <th className="text-white p-3 w-1/5">Balance</th>
                    <th className="text-white p-3 w-1/5">Status</th>
                    <th className="text-white py-3 lg:px-5 w-1/5">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full h-full bg-white font-regular">
                  {user && user.role === 'Admin'
                    ? invoices
                        ?.filter((item) => item.status === status)
                        .map((val, index) => (
                          <tr
                            key={index}
                            className="text-center text-xs md:text-base"
                          >
                            <td className="text-primary-color font-regular p-2">
                              {val?.pdf?.reference}
                            </td>
                            <td className="text-sm md:text-base font-regular text-primary-color p-2">
                              {val?.tenant_id?.user_id.name}
                            </td>
                            <td className="p-2">
                              {(val?.tenant_id?.balance - val?.amount).toFixed(
                                2,
                              )}
                            </td>
                            <td className="p-2">{(val?.amount).toFixed(2)}</td>
                            <th
                              className={`font-semibold ${
                                val?.status === false
                                  ? 'text-red'
                                  : 'text-primary-color'
                              } p-2 w-1/5`}
                            >
                              {val?.status === false ? 'Unpaid' : 'Paid'}
                            </th>
                            <td className=" text-primary-color p-2 flex justify-center">
                              <div className="relative">
                                <button
                                  className="relative focus:outline-none my-3"
                                  onClick={() => handleDropdownClick(val?._id)}
                                >
                                  <BsThreeDotsVertical size={25} />
                                </button>
                                {dropdownIndex === val?._id && (
                                  <ul className={`absolute w-36 right-0 bg-white shadow-md rounded-md z-10 `}>
                                    {val?.status === false && (
                                      <>
                                        <li>
                                          <button
                                            onClick={() =>
                                              handlePaid(val?._id)
                                            }
                                            className=" px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full"
                                          >
                                            <FaCheck /> Paid
                                          </button>
                                        </li>
                                        <li>
                                          <button
                                            onClick={() => handleDelete(val?._id)}
                                            className=" px-4 py-2 text-sm text-primary-color flex items-center gap-3  hover:bg-gray w-full"
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
                            item.status === status &&
                            item.tenant_id.user_id._id === user.id,
                        )
                        .map((val, index) => (
                          <tr
                            key={index}
                            className="text-center text-xs md:text-base"
                          >
                            <td className="text-primary-color font-regular p-3">
                              {val?.pdf?.reference}
                            </td>
                            <td className="text-sm md:text-base font-regular text-primary-color p-3">
                              {val?.tenant_id?.user_id.name}
                            </td>
                            <td className="p-3">
                              {(val?.tenant_id?.balance - val?.amount).toFixed(
                                2,
                              )}
                            </td>
                            <td className="p-2">{(val?.amount).toFixed(2)}</td>
                            <th
                              className={`font-semibold ${
                                val?.status === false
                                  ? 'text-red'
                                  : 'text-primary-color'
                              } p-3 w-1/5`}
                            >
                              {val?.status === false ? 'Unpaid' : 'Paid'}
                            </th>
                            <td className=" text-primary-color p-3 flex justify-center">
                              <div className="relative">
                                <button
                                  className="relative focus:outline-none my-3"
                                  onClick={() => handleDropdownClick(val?._id)}
                                >
                                  <BsThreeDotsVertical size={25} />
                                </button>
                                {dropdownIndex === val?._id && (
                                  <ul className={`absolute w-36 right-0 bg-white shadow-md rounded-md z-10 ${index === invoices.length - 1 ? 'bottom-12' : (index === invoices.length - 2 ? 'bottom-24' : 'top-12')}`}>
                                    {val?.status === false && (
                                      <>
                                        <li>
                                          <button
                                            onClick={() =>
                                              handlePaid(val?._id)
                                            }
                                            className=" px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full"
                                          >
                                            <FaCheck /> Paid
                                          </button>
                                        </li>
                                        <li>
                                          <button
                                            onClick={() => handleDelete(val?._id)}
                                            className=" px-4 py-2 text-sm text-primary-color flex items-center gap-3  hover:bg-gray w-full"
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
    </>
  );
};

export default Invoice;
