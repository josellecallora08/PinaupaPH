import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { MdOutlineFileDownload } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  generateDelinquencyReport,
  generateGoodpayerReport,
  generateRevenueReport,
} from '../../features/report'
const PayerReport = () => {
  const currentYear = new Date().getFullYear()
  // State for date pickers for each table
  const [revenueDateRange, setTenantPaymentDateRange] = useState({
    from: null || `${currentYear}-01-01`,
    to: null || `${currentYear}-12-31`,
  })
  const [goodPayersDateRange, setGoodPayersDateRange] = useState({
    from: null || `${currentYear}-01-01`,
    to: null || `${currentYear}-12-31`,
  })
  const [delinquencyPayersDateRange, setDelinquencyPayersDateRange] = useState({
    from: null || `${currentYear}-01-01`,
    to: null || `${currentYear}-12-31`,
  })

  const dispatch = useDispatch()

  // Sample data for Good Payers, Delinquency Payers, and Tenant Payment Report
  const goodPayers = [
    {
      tenantName: 'John Doe',
      unitNo: '101',
      apartmentName: 'Sunset Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-01',
      amount: 1000,
    },
    {
      tenantName: 'Jane Smith',
      unitNo: '102',
      apartmentName: 'Sunset Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-02',
      amount: 1000,
    },
  ]

  const delinquencyPayers = [
    {
      tenantName: 'Bob Brown',
      unitNo: '201',
      apartmentName: 'Sunrise Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-15',
      amount: 1200,
    },
    {
      tenantName: 'Alice Green',
      unitNo: '202',
      apartmentName: 'Sunrise Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-20',
      amount: 1200,
    },
  ]

  const tenantPaymentReport = [
    {
      tenantName: 'Charlie Black',
      unitNo: '301',
      apartmentName: 'Seaside Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-05',
      amount: 1100,
    },
    {
      tenantName: 'Dana White',
      unitNo: '302',
      apartmentName: 'Seaside Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-10',
      amount: 1100,
    },
    {
      tenantName: 'Charlie Black',
      unitNo: '301',
      apartmentName: 'Seaside Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-05',
      amount: 1100,
    },
    {
      tenantName: 'Dana White',
      unitNo: '302',
      apartmentName: 'Seaside Apartments',
      dueDate: '2024-05-01',
      datePaid: '2024-05-10',
      amount: 1100,
    },
  ]

  // Function to calculate total amount
  const calculateTotalAmount = (payers) => {
    return payers.reduce((total, payer) => total + payer.amount, 0)
  }

  const goodPayersTotal = calculateTotalAmount(goodPayers)
  const delinquencyPayersTotal = calculateTotalAmount(delinquencyPayers)
  const tenantPaymentReportTotal = calculateTotalAmount(tenantPaymentReport)

  // Function to generate report
  const generateReport = (title, payers) => {
    if (title === 'Revenue Report') {
      dispatch(generateRevenueReport(revenueDateRange))
    } else if (title === 'Good Payers') {
      dispatch(generateGoodpayerReport(goodPayersDateRange))
    } else if (title === 'Delinquency Payers') {
      dispatch(generateDelinquencyReport(goodPayersDateRange))
    }
  }

  // Function to render table
  const renderTable = (title, payers, totalAmount, dateRange, setDateRange) => (
    <div className="mb-8 cursor-default">
      <div className="flex items-center gap-5 mb-2">
        <h2 className="lg:text-lg lg:w-auto lg:mr-0 text-xs font-semibold w-[24%] mr-1">
          {title}
        </h2>
        <div className="flex lg:w-auto w-full items-center gap-2">
          <label>From:</label>
          <DatePicker
            selected={dateRange.from}
            onChange={(date) =>
              setDateRange((prev) => ({ ...prev, from: date }))
            }
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="border px-2 py-1 rounded"
          />
          <label>To:</label>
          <DatePicker
            selected={dateRange.to}
            onChange={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={() => generateReport(title, payers)}
          className="lg:block hidden bg-primary-color hover:bg-primary-color/50 duration-200 text-white px-3 py-2 rounded-md"
        >
          Generate Report
        </button>
        <div className="lg:hidden mr-5">
          <MdOutlineFileDownload size={25} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border  border-gray-300">
          <thead className="bg-primary-color text-white">
            <tr>
              <th className="border px-4 py-2">Tenant</th>
              <th className="border px-4 py-2">Unit No.</th>
              <th className="border px-4 py-2">Apartment Name</th>
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Date Paid</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payers.map((payer, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{payer.tenantName}</td>
                <td className="border px-4 py-2">{payer.unitNo}</td>
                <td className="border px-4 py-2">{payer.apartmentName}</td>
                <td className="border px-4 py-2">{payer.dueDate}</td>
                <td className="border px-4 py-2">{payer.datePaid}</td>
                <td className="border px-4 py-2">{payer.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-left">
                <strong>Total</strong>
              </td>
              <td className="border px-4 py-2 text-center">
                <strong>{totalAmount}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-5 font-bold cursor-default">
        <span onClick={() => window.history.back()} className="cursor-pointer">
          Dashboard
        </span>{' '}
        / Payer Report
      </div>
      <div className="lg:text-base text-xs">
        {renderTable(
          'Revenue Report',
          tenantPaymentReport,
          tenantPaymentReportTotal,
          revenueDateRange,
          setTenantPaymentDateRange,
        )}
        {renderTable(
          'Good Payers',
          goodPayers,
          goodPayersTotal,
          goodPayersDateRange,
          setGoodPayersDateRange,
        )}
        {renderTable(
          'Delinquency Payers',
          delinquencyPayers,
          delinquencyPayersTotal,
          delinquencyPayersDateRange,
          setDelinquencyPayersDateRange,
        )}
      </div>
    </div>
  )
}

export default PayerReport
;``
