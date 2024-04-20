import React, { useEffect, useState } from 'react'
import './Invoice.css'
import Logo from '/logo.svg'
import { MdOutlineFileDownload } from 'react-icons/md'
import { FiPrinter } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvoice, generateInvoice } from '../features/invoice'

const InvoiceFormat = () => {
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.invoice.single)
  const { invoice_id } = useParams()
  const [open, setOpen] = useState(false)

  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchInvoice(invoice_id))
    console.log(invoice_id)
  }, [])
  const toggle = () => {
    setOpen(!open)
  }
  const handleDownload = async () => {
    dispatch(generateInvoice(invoice_id))
  }

  return (
    <div>
      <div className="h-full w-full bg-white p-10 text-primary-color ">
        <div className="relative">
          <div className="flex justify-between items-center mb-5 ">
            <h1 className="lg:ml-24  font-bold  lg:mb-10  tracking-wider uppercase">
              View Invoice
            </h1>
            <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="lg:mr-32 lg:mb-6 lg:p-2 flex font-regular items-center border-2 bg-white border-gray  mr-4 mb-2 justify-between w-30 ml-auto text-base"
              >
                <option value=""hidden >Select Action</option>
                <option value="download">Download</option>
                <option value="print">Print</option>
                <option value="edit"><FiEdit/>Edit</option>
              </select>
 
          </div>
          
        </div>
        <div className="invoice-box mx-auto">
          <table cellPadding="0" cellSpacing="0">
            <tr className="top">
              <td colSpan="2">
                <table>
                  <tr>
                    <td className="title">
                      <img
                        src={Logo}
                        style={{ width: '100%', maxWidth: '300px' }}
                        alt="Logo"
                      />
                    </td>
                    <td className="font-regular">
                      Reference No. : {invoice?.reference}
                      <br />
                      Created: {new Date(invoice?.createdAt).toDateString()}
                      <br />
                      Due:{' '}
                      {new Date(invoice?.tenant_id?.monthly_due).toDateString()}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="information">
              <td colSpan="2">
                <table>
                  <tr className="font-regular">
                    <td>
                      <span className='font-semibold'>Wendell Ibias</span>
                      <br />
                      W. Ibias Apartment
                      <br />
                      Saint Anthony Village
                    </td>
                    <td className="my-5">
                      <span className="font-semibold">Invoice To: </span>
                      <br />
                      {invoice?.tenant_id?.user_id.name}
                      <br />
                      {invoice?.tenant_id?.user_id.email}
                      <br />0{invoice?.tenant_id?.user_id.mobile_no}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading bill font-regular">
              <td>Billing Details</td>
              <td></td>
            </tr>
            <tr className="font-regular">
              <td colSpan="2">
                House Number:{' '}
                <span className="font-semibold">
                  Unit - {invoice?.tenant_id.unit_id.unit_no}
                </span>
                <br />
                House Type: PentHouse
                <br />
                Status:{' '}
                <span
                  className={`${invoice?.status === false ? 'text-red/70' : 'text-lime'} font-bold`}
                >
                  {invoice?.status === false ? 'Unpaid' : 'Paid'}
                </span>
              </td>
            </tr>

            <tr className="heading font-regular">
              <td>Payment</td>
              <td>Amount</td>
            </tr>

            <tr className="item font-regular">
              <td>Monthly Rent</td>
              <td>
                {invoice && (invoice?.amount).toLocaleString('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                })}
              </td>
            </tr>
            <tr className="item font-regular">
              <td>Previous Balance</td>
              <td>
                {invoice && (invoice?.tenant_id?.balance - invoice?.amount).toLocaleString(
                  'en-PH',
                  { style: 'currency', currency: 'PHP' },
                )}
              </td>
            </tr>

            <tr className="total">
              <td></td>
              <td>
                Total Amount:{' '}
                {invoice && (invoice?.tenant_id?.balance).toLocaleString('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                })}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InvoiceFormat
