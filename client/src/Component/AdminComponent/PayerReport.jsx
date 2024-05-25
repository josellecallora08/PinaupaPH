import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const PayerReport = () => {
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
    // Logic to generate report
    console.log(`Generating report for ${title}...`, payers)
  }

  // State for date pickers for each table
  const [tenantPaymentDateRange, setTenantPaymentDateRange] = useState({
    from: null,
    to: null,
  })
  const [goodPayersDateRange, setGoodPayersDateRange] = useState({
    from: null,
    to: null,
  })
  const [delinquencyPayersDateRange, setDelinquencyPayersDateRange] = useState({
    from: null,
    to: null,
  })

  // Function to render table
  const renderTable = (title, payers, totalAmount, dateRange, setDateRange) => (
    <div className="mb-8 cursor-default">
      <div className="flex items-center gap-5 mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
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
          className="bg-primary-color hover:bg-primary-color/50 duration-200 text-white px-3 py-2 rounded-md"
        >
          Generate Report
        </button>
      </div>
      <div className="overflow-auto" style={{ maxHeight: '300px' }}>
        <table className="min-w-full bg-white">
          <thead className="bg-primary-color text-white border-b-2 border-white sticky top-0">
            <tr>
              <th className="py-2 px-4 border-white">Tenant Name</th>
              <th className="py-2 px-4 border-white">Unit No.</th>
              <th className="py-2 px-4 border-white">Apartment Name</th>
              <th className="py-2 px-4 border-white">Due Date</th>
              <th className="py-2 px-4 border-white">Date Paid</th>
              <th className="py-2 px-4 border-white">Amount</th>
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
          <tfoot className="bg-white sticky bottom-0">
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
    <div className="container w-11/12 m-auto">
      <div className="my-5 font-bold cursor-default">
        <span onClick={() => window.history.back()} className="cursor-pointer">
          Dashboard
        </span>{' '}
        / Payer Report
      </div>
      {renderTable(
        'Tenant Payment Report',
        tenantPaymentReport,
        tenantPaymentReportTotal,
        tenantPaymentDateRange,
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
  )
}

export default PayerReport
