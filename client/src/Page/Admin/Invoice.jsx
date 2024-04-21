// Invoice.js

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InvoiceFormat from '../../Component/InvoiceFormat'
import { RiDeleteBin6Line } from 'react-icons/ri'

import search from '/search.svg'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { FaRegEye, FaCheck } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa6'
import ManualInovoice from '../../Component/ManualInovoice'
import SearchBar from '../../Component/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInvoices, fetchInvoices } from '../../features/invoice'

const Invoice = () => {
  const [deleteInvoice, setDeleteInvoice] = useState(false)
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState('')
  const user = useSelector((state) => state.auth.user)
  const [modal, setModal] = useState(false)
  const [dropdownIndex, setDropdownIndex] = useState(null) // To keep track of which dropdown is open
  const dispatch = useDispatch()
  const invoices = useSelector((state) => state.invoice.data)
  const handleDelete = async (id) => {
    dispatch(deleteInvoices(id))
    setDeleteInvoice(true)
  }

  useEffect(() => {
    dispatch(fetchInvoices())
    setDeleteInvoice(false)
  }, [deleteInvoice])
  
  const handleSearch = (e) => {
    setFilter(e.target.value)
  }
  const handleDropdownClick = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index)
  }

  return (
    <>
      <div className="w-full h-full bg-gray">
        <div className="lg:px-10 px-4 w-full m-auto h-full flex flex-col ">
          <h1 className="font-bold pb-3 pt-4 tracking-wider">
            DOCUMENTS / INVOICE
          </h1>
          <div className="w-full h-full max-h-20 flex flex-col md:flex-row gap-2 py-3 items-center justify-between ">
            <div className="w-full md:w-fit">
              <SearchBar />
            </div>
            <div className="flex items-center justify-center lg:justify-end w-full order-2 ml-auto gap-2">
              <div className="w-full md:w-fit">
                <select
                  onChange={() => setStatus(e.target.value)}
                  className="select font-semibold select-bordered w-full max-w-xs"
                >
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
              </div>
              <button
                onClick={() => setModal((prevState) => !prevState)}
                className="btn md:btn-wide w-1/2  bg-primary-color text-white hover:text-primary-color"
              >
                <FaPlus />
                Prepare Invoice
              </button>
            </div>
          </div>
          <div className="w-full h-full py-5 mt-4">
            <div className="relative w-full h-full max-h-[660px] bg-white overflow-y-scroll border-primary-color border-l-4 border-b-4">
              <table className="w-full h-auto  ">
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
                        ?.filter((item) => item.status === false)
                        .map((val, index) => (
                          <tr
                            key={index}
                            className="text-center text-xs md:text-base"
                          >
                            <td className="text-primary-color font-regular p-3">
                              {val?.reference}
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
                              className={`font-semibold ${val?.status === false ? 'text-red' : 'text-primary-color'} p-3 w-1/5`}
                            >
                              {val?.status === false ? 'Unpaid' : 'Paid'}
                            </th>
                            <td className=" text-primary-color p-3 flex justify-center">
                              <div className="relative">
                                <button
                                  className="relative focus:outline-none my-3"
                                  onClick={() => handleDropdownClick(index)}
                                >
                                  <BsThreeDotsVertical size={25} />
                                </button>
                                {dropdownIndex === index && (
                                  <ul className="absolute w-36 right-0 top-7 bg-white shadow-md rounded-md z-10">
                                    <li>
                                      <button className=" px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full">
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
                        ?.filter((item) => item.status === false && item.tenant_id.user_id._id === user.id)
                        .map((val, index) => (
                          <tr
                            key={index}
                            className="text-center text-xs md:text-base"
                          >
                            <td className="text-primary-color font-regular p-3">
                              {val?.reference}
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
                              className={`font-semibold ${val?.status === false ? 'text-red' : 'text-primary-color'} p-3 w-1/5`}
                            >
                              {val?.status === false ? 'Unpaid' : 'Paid'}
                            </th>
                            <td className=" text-primary-color p-3 flex justify-center">
                              <div className="relative">
                                <button
                                  className="relative focus:outline-none my-3"
                                  onClick={() => handleDropdownClick(index)}
                                >
                                  <BsThreeDotsVertical size={25} />
                                </button>
                                {dropdownIndex === index && (
                                  <ul className="absolute w-36 right-0 top-7 bg-white shadow-md rounded-md z-10">
                                    <li>
                                      <button className=" px-4 py-2 text-sm text-primary-color flex items-center gap-3 hover:bg-gray w-full">
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
  )
}

export default Invoice
