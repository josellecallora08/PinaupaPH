import React, { useEffect, useState } from 'react'
import './Invoice.css'
import Logo from '/logo.svg'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  editInvoices,
  fetchInvoice,
  generateInvoice,
} from '../features/invoice'

const InvoiceFormat = () => {
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.invoice.single)
  const { invoice_id } = useParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchInvoice(invoice_id))
    console.log(invoice_id)
  }, [])
  const toggle = () => {
    setOpen(!open)
  }
  const handleDownload = async () => {
    dispatch(generateInvoice(invoice_id))
    console.log(invoice_id)
  }

  // const handlePayment = async () => {
  //   dispatch(editInvoices(invoice_id))
  // }
  // const dropdownItems = [
  //   {
  //     title: 'Download',
  //     func: handleDownload,
  //     svg: <MdOutlineFileDownload size={25} />,
  //   },
  //   {
  //     title: 'Paid',
  //     func: handlePayment,
  //     svg: <FiPrinter size={25} />,
  //   },
  //   {
  //     title: 'Edit',
  //     svg: <FiEdit size={25} />,
  //   },
  // ]

  return (
    <div>
      <div className="h-full w-full bg-white p-10 text-primary-color ">
        <div className="relative">
          <div className="flex justify-between items-center mb-5 ">
            <h1 className="lg:ml-24  font-bold flex  lg:mb-10  tracking-wider uppercase">
              <Link
                to="/document/invoice"
                className="hover:underline flex items-center mr-1 text-primary-color"
              >
                <MdOutlineKeyboardArrowLeft size={25} />
                Invoice
              </Link>
              / View Invoice
            </h1>
            <button
              onClick={handleDownload}
              className="btn w-fit md:btn-wide bg-primary-color font-bold uppercase text-white hover:text-primary-color"
            >
              Download PDF
            </button>
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
                        style={{ width: '50%', maxWidth: '300px' }}
                        alt="Logo"
                      />
                    </td>
                    <td className="font-regular">
                      Reference No. : {invoice?.pdf?.reference}
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
                      <span className="font-semibold">{invoice?.tenant_id?.apartment_id?.name}</span>
                      <br />
                      {invoice?.tenant_id?.apartment_id?.address}
                      <br />
                      {invoice?.tenant_id?.apartment_id?.barangay}
                    </td>
                    <td className="my-5">
                      <span className="font-semibold">Invoice To: </span>
                      <br />
                      {invoice?.tenant_id?.user_id.name}
                      <br />
                      {invoice?.tenant_id?.user_id.email}
                      <br />{invoice?.tenant_id?.user_id.mobile_no}
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
                Status:{' '}
                <span
                  className={`${invoice?.isPaid === false ? 'text-red/70' : 'text-lime'} font-bold`}
                >
                  {invoice?.isPaid === false ? 'Unpaid' : 'Paid'}
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
                {invoice &&
                  (invoice?.amount).toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  })}
              </td>
            </tr>
            <br />
            <tr className="item font-regular">
              <td>Total Payment</td>
              <td>
                {invoice &&
                  (
                    invoice?.payment?.amountPaid !== 0 ? invoice?.payment?.amountPaid : 0
                  )?.toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  })}
              </td>
            </tr>

            <tr className="total">
              <td></td>
              <td>
                Total:{' '}
                {invoice &&
                  (invoice?.amount - (invoice?.payment?.amountPaid === null ? 0 : invoice?.payment?.amountPaid) < 0 ? 0 : invoice?.amount - invoice?.payment?.amountPaid).toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  })}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                Advance Rental:{' '}
                {invoice &&
                  (invoice?.payment?.unpaidBalance < 0 ? invoice?.payment?.unpaidBalance : 0).toLocaleString('en-PH', {
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
