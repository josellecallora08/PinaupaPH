import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvoices, generateInvoice } from './../features/invoice'
import { MdCloudDownload } from 'react-icons/md'

const TransactionMobile = ({ tenant }) => {
  const dispatch = useDispatch()
  const invoices = useSelector((state) => state.invoice.data)

  useEffect(() => {
    dispatch(fetchInvoices())
  }, [])

  const handleDownload = async (id) => {
    if (confirm('Continue download invoice pdf?')) {
      dispatch(generateInvoice(id))
    }
  }

  return (
    <div>
      {invoices &&
        invoices
          .filter(
            (item) => item?.tenant_id?.user_id._id === tenant?.user_id._id,
          )
          .map((val, key) => (
            <div
              key={key}
              className="flex h-20 mt-5  items-center rounded-lg mx-4 shadow-md shadow-gray relative"
            >
              <div
                className={`flex items-center justify-center ${val?.isPaid ? 'bg-lime' : 'bg-red'} rounded-tl-lg rounded-bl-lg h-full min-w-28 text-center text-xl font-bold p-3  text-white capitalize`}
              >
                {val?.status === 'succeeded'
                  ? 'Paid'
                  : val?.status === 'awaiting_for_action'
                    ? 'Pending'
                    : 'Unpaid'}
              </div>
              <div className="flex w-full gap-2 justify-between px-4 items-center">
                <div className="flex flex-col text-lg">
                  <div className="font-semibold text-left text-xs">
                    {val?.pdf.reference}
                  </div>
                  <div className="font-regular text-left text-xs">
                    Unit {val?.tenant_id.unit_id.unit_no} |{' '}
                    <span className="capitalize text-xs">
                      {val?.payment.method}
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="font-extralight text-xs">
                    {new Date(val?.tenant_id.monthly_due).toLocaleDateString()}
                  </div>
                  <div className="font-bold text-sm">
                    {val?.amount?.toLocaleString('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    })}
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleDownload(val?._id)}
                className="hover:duration-500 cursor-pointer absolute top-0 right-0 h-full flex items-center justify-center pr-4 text-white opacity-0 transition-opacity  hover:bg-primary-color hover:opacity-100"
              >
                <span className="text-xs ml-5">Download</span>
                <MdCloudDownload className="text-lg ml-1" />
              </div>
            </div>
          ))}
    </div>
  )
}

export default TransactionMobile
