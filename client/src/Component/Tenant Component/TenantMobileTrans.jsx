import React, { useEffect } from 'react'
import { MdCloudDownload } from 'react-icons/md'
import { fetchInvoices, generateInvoice } from '../../features/invoice'
import { useDispatch, useSelector } from 'react-redux'
const TenantMobileTrans = ({ tenant }) => {
  const dispatch = useDispatch()
  const invoices = useSelector((state) => state.invoice.data)
  useEffect(() => {
    dispatch(fetchInvoices())
  }, [])

  const handleDownload = async (id) => {
    dispatch(generateInvoice(id))
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
              className="flex h-20 mt-5 items-center rounded-lg mx-4 shadow-md shadow-gray relative overflow-hidden"
            >
              <div
                className={`flex items-center justify-center ${val?.isPaid ? 'bg-lime' : 'bg-red'} rounded-tl-lg rounded-bl-lg h-full min-w-[90px] text-center text-xl font-bold p-3 text-white capitalize`}
              >
                {val?.status === 'succeeded'
                  ? 'Paid'
                  : val?.status === 'awaiting_for_action'
                    ? 'Pending'
                    : 'Unpaid'}
              </div>
              <div className="flex w-full gap-2 justify-between px-4 items-center overflow-hidden">
                <div className="flex flex-col text-lg overflow-hidden">
                  <div className="font-semibold text-left text-xs truncate">
                    {val?.pdf.reference}
                  </div>
                  <div className="font-regular text-left text-xs truncate">
                    Unit {val?.tenant_id.unit_id.unit_no} |{' '}
                    <span className="capitalize text-xs">
                      {val?.payment.method}
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-extralight truncate">
                    {new Date(val?.tenant_id.monthly_due).toLocaleDateString()}
                  </div>
                  <div className="font-bold truncate">
                    {val?.payment?.amountPaid?.toLocaleString('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    })}
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleDownload(val?._id)}
                className="hover:duration-500 cursor-pointer absolute top-0 right-0 h-full max-w-[90px] flex items-center justify-center pr-4 text-white opacity-0 transition-opacity hover:bg-primary-color hover:opacity-100"
              >
                <span className="text-xs ml-5">Download</span>
                <MdCloudDownload className="text-lg ml-1" />
              </div>
            </div>
          ))}
    </div>
  )
}

export default TenantMobileTrans
