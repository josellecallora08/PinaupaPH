import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchInvoices, generateInvoice
} from './../features/invoice'
import { useParams } from 'react-router-dom';
const TransactionMobile = () => {
  const dispatch = useDispatch()
  const invoices = useSelector((state) => state.invoice.data)
  const { id } = useParams()
  console.log(id)
  console.log(invoices)
  useEffect(() => {
    dispatch(fetchInvoices())
  }, [])

  const handleDownload = async (id) => {
    if (confirm("Cotinue download invoice pdf?")) {
      dispatch(generateInvoice(id))
    }
  }
  const paid = false
  return (
    <div>
      {invoices && invoices.filter(item => item.tenant_id.user_id._id === id).map((val, key) => (
        <div onClick={() => handleDownload(val?._id)} key={key} className="flex h-20 mt-5 items-center rounded-lg mx-4 shadow-md shadow-gray-600">
          <div className={`flex items-center justify-center ${val?.isPaid ? 'bg-lime' : 'bg-red'} rounded-tl-lg rounded-bl-lg h-full min-w-28 text-center text-xl font-bold p-3  text-white capitalize`}>{val?.status}</div>
          <div className='flex w-full justify-between px-4 items-center'>
            <div className="flex flex-col text-lg">
              <div className='font-bold text-left text-sm'>Unit {val?.tenant_id.unit_id.unit_no}</div>
              <div className='capitalize text-xs'>{val?.payment.method}</div>
            </div>
            
            <div className=''>
              <div className='font-extralight text-xs'>{new Date(val?.tenant_id.monthly_due).toLocaleDateString()}</div>
              <div className='text-lg font-bold text-sm'>{(val?.amount)?.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionMobile
