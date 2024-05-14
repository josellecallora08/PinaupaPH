import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchInvoices, generateInvoice
} from './../features/invoice'
const TransactionTable = ({ tenant }) => {
  const dispatch = useDispatch()
  const invoices = useSelector((state) => state.invoice.data)
  useEffect(() => {
    dispatch(fetchInvoices())
  }, [])

  const handleDownload = async (id) => {
    dispatch(generateInvoice(id))
  }
  return (
    <div className=" m-10 h-full  ">
      <table className="table-auto w-full   ">
        <thead>
          <tr className="text-white bg-dark-blue">
            <th className="px-4 py-2">Transaction No.</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Due Dates</th>
            <th className="px-4 py-2">Date Paid</th>
            <th className="px-4 py-2">Apartment Unit No.</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Total Paid</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {invoices && invoices?.filter((item) => item?.tenant_id?.user_id._id === tenant?.user_id._id).map((val, key) => (
            <tr key={key} className="text-dark-blue">
              <td className="border px-4 py-2 capitalize">{val?.pdf.reference}</td>
              <td className="border px-4 py-2 capitalize">{val?.status}</td>
              <td className="border px-4 py-2">{new Date(val?.tenant_id.monthly_due).toDateString()}</td>
              <td className="border px-4 py-2">{val?.datePaid && new Date(val?.datePaid).toDateString() || 'Not yet paid.'}</td>
              <td className="border px-4 py-2">Unit - {val?.tenant_id?.unit_id?.unit_no}</td>
              <td className="border px-4 py-2 capitalize">{val?.payment?.method}</td>
              <td className="border px-4 py-2">{(val?.amount).toLocaleString('en-PH', { style: "currency", currency: "PHP" })}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDownload(val?._id)} className="btn hover:text-primary-color flex gap-1 mx-auto items-center py-1 px-3 bg-dark-blue text-white rounded-md">
                  <div>Download PDF</div>
                </button>
              </td>
            </tr>
          )) || <tr>
              <td colSpan={8}>
               <span className='font-semibold font-primary'> No data found</span>
              </td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable