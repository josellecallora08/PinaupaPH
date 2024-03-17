import React from 'react'
import { GrFormView } from "react-icons/gr";
const TransactionTable = () => {
  return (
    <div className=" m-10 h-screen  ">
      <table className="table-auto w-full   ">
        <thead>
          <tr className="text-white bg-dark-blue">
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Due Dates</th>
            <th className="px-4 py-2">Apartment No.</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Total Paid</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          <tr className="text-dark-blue">
            <td className="border px-4 py-2">Paid</td>
            <td className="border px-4 py-2">19/12/2024 </td>
            <td className="border px-4 py-2">Unit A1-421B</td>
            <td className="border px-4 py-2">PayPal</td>
            <td className="border px-4 py-2">Php 6,600</td>
            <td className="border px-4 py-2">
              <button className="flex gap-1 mx-auto items-center py-1 px-3 bg-dark-blue text-white rounded-md">
                <div>View</div>
                <div><GrFormView size={25}/></div>
              </button>
            </td>
          </tr>
          <tr className="text-dark-blue">
            <td className="border px-4 py-2">Paid</td>
            <td className="border px-4 py-2">19/12/2024 </td>
            <td className="border px-4 py-2">Unit A1-421B</td>
            <td className="border px-4 py-2">PayPal</td>
            <td className="border px-4 py-2">Php 6,600</td>
            <td className="border px-4 py-2">
              <button className="flex gap-1 mx-auto items-center py-1 px-3 bg-dark-blue text-white rounded-md">
                <div>View</div>
                <div><GrFormView size={25}/></div>
              </button>
            </td>
          </tr>
          <tr className="text-dark-blue">
            <td className="border px-4 py-2">Paid</td>
            <td className="border px-4 py-2">19/12/2024 </td>
            <td className="border px-4 py-2">Unit A1-421B</td>
            <td className="border px-4 py-2">PayPal</td>
            <td className="border px-4 py-2">Php 6,600</td>
            <td className="border px-4 py-2">
              <button className="flex gap-1 mx-auto items-center py-1 px-3 bg-dark-blue text-white rounded-md">
                <div>View</div>
                <div><GrFormView size={25}/></div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable