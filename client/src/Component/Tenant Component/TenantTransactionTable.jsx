import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const TenantTransactionTable = () => {
  return (
    <div className="lg:my-3 m-10 h-screen">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-white bg-dark-blue">
            <th className="px-4 py-2">Reference No.</th>
            <th className="px-4 py-2">Apartment No.</th>
            <th className="px-4 py-2">Rent</th>
            <th className="px-4 py-2">Balance</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr className="text-dark-blue">
            <td className="px-4 py-2 border-b">01</td>
            <td className="px-4 py-2 border-b">Unit A1-421B </td>
            <td className="px-4 py-2 border-b">10,000</td>
            <td className="px-4 py-2 border-b">500</td>
            <td className="px-4 py-2 border-b">Unpaid</td>
            <td className="px-4 py-2 border-b">
              <button className="flex gap-1 mx-auto items-center py-1 px-3 text-primary rounded-md">
                <div>
                  <HiOutlineDotsVertical size={25} />
                </div>
              </button>
            </td>
          </tr>
          <tr className="text-dark-blue">
            <td className="px-4 py-2 border-b">01</td>
            <td className="px-4 py-2 border-b">Unit A1-421B </td>
            <td className="px-4 py-2 border-b">10,000</td>
            <td className="px-4 py-2 border-b">500</td>
            <td className="px-4 py-2 border-b">Unpaid</td>
            <td className="px-4 py-2 border-b">
              <button className="flex gap-1 mx-auto items-center py-1 px-3 text-primary rounded-md">
                <div>
                  <HiOutlineDotsVertical size={25} />
                </div>
              </button>
            </td>
          </tr>
          <tr className="text-dark-blue">
            <td className="px-4 py-2 border-b">01</td>
            <td className="px-4 py-2 border-b">Unit A1-421B </td>
            <td className="px-4 py-2 border-b">10,000</td>
            <td className="px-4 py-2 border-b">500</td>
            <td className="px-4 py-2 border-b">Unpaid</td>
            <td className="px-4 py-2 border-b">
              <button className="flex gap-1 mx-auto items-center py-1 px-3 text-primary rounded-md">
                <div>
                  <HiOutlineDotsVertical size={25} />
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TenantTransactionTable
