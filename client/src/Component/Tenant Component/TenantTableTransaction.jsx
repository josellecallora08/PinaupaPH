import React from 'react';

const TenantTableTransaction = () => {
  return (
    <div className="m-10">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
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
          <tbody className="text-center">
            <tr className="text-dark-blue">
              <td className="border px-4 py-2 capitalize">IN01231231231</td>
              <td className="border px-4 py-2 capitalize">Unpaid</td>
              <td className="border px-4 py-2">11/23/2024</td>
              <td className="border px-4 py-2">Not Paid</td>
              <td className="border px-4 py-2">Unit -100</td>
              <td className="border px-4 py-2 capitalize">Not Paid</td>
              <td className="border px-4 py-2">Not Paid</td>
              <td className="border px-4 py-2">
                <button className="btn hover:text-primary-color flex gap-1 mx-auto items-center py-1 px-3 bg-dark-blue text-white rounded-md">
                  <div>Download PDF</div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantTableTransaction;
