import React, { useEffect, useState } from 'react'
import InvoiceFormat from '../../Component/InvoiceFormat'
import plus from '/plus.svg'
import search from '/search.svg'
import { useDispatch, useSelector } from 'react-redux'
import action from '/action.svg'
import eye from '/eye.svg'
import ManualInovoice from '../../Component/ManualInovoice'
import SearchBar from '../../Component/SearchBar'
import { FaPlus } from 'react-icons/fa6'
import { fetchInvoices, searchInvoice } from '../../features/invoice'
import {Link} from 'react-router-dom'
const Invoice = () => {
  const [filter, setFilter] = useState('')
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const invoices = useSelector((state) => state.invoice.data)
  useEffect(() => {
    const handleFilter = () => {}
    document.addEventListener('keydown', handleFilter)
    return document.removeEventListener('keydown', handleFilter)
  }, [])

  useEffect(() => {
    dispatch(fetchInvoices())
  }, [])

  const handleSearch = async (e) => {
    setFilter(e.target.value)
  }
  // useEffect(() => {
  //   dispatch(searchInvoice(filter))
  //   console.log(invoices)
  // }, [filter])

  return (
    <>
      <div className=" w-full h-full bg-gray">
        <div className="w-11/12 m-auto h-full flex flex-col">
          <h1 className="font-bold py-5 tracking-wider">DOCUMENTS / INVOICE</h1>
          <div className="w-full h-full flex flex-col md:flex-row gap-2 items-center justify-between max-h-24 ">
          <SearchBar />
          <div className="flex items-center justify-center my-10  lg:justify-end w-full order-2 ml-auto gap-2">
              <select
                className="border bg-white border-gray rounded-md px-5 py-2"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="" hidden>Filter</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
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
              <table className="w-full h-auto max-h-full ">
                <thead className="sticky top-0 bg-primary-color z-10">
                  <tr className="text-center text-xs md:text-base">
                    <th className="text-white p-3 w-1/5">Reference Number</th>
                    <th className="text-white p-3 w-1/5">Tenant</th>
                    <th className="text-white p-3 w-1/5">Unpaid Balance</th>
                    <th className="text-white p-3 w-1/5">Balance</th>
                    <th className="text-white p-3 w-1/5">Status</th>
                    <th className="text-white p-3 w-1/5">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full h-auto bg-white font-regular">
                  {invoices?.filter(item => item.status === false).map((val, key) => (
                    <tr key={key} className="text-center text-xs md:text-base">
                      <td className="text-primary-color font-regular p-3">
                        {val?.reference}
                      </td>
                      <td className="text-sm md:text-base font-regular text-primary-color p-3">
                        {val?.tenant_id.user_id.name}
                      </td>
                      <td className="p-3">{(val.tenant_id.balance - val.amount).toFixed(2)}</td>
                      <td className="p-3">{(val.amount).toFixed(2)}</td>
                    <th className={`font-semibold ${val.status === false ? 'text-red' : 'text-primary-color'} p-3 w-1/5`}>{val.status === false ? 'Unpaid' : 'Paid'}</th>
                      <td className=" text-primary-color p-3 flex justify-center">
                        <div className="relative">
                          <Link to={`/invoice/${val._id}`} className="w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary-color/20">
                            <figure className="w-full h-full flex items-center max-w-5">
                              <img src={eye} alt="" />
                            </figure>
                            <span className="">View</span>
                          </Link>
                          {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
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
      {modal ? <ManualInovoice setModal={setModal} /> : ''}
    </>
  )
}

export default Invoice
