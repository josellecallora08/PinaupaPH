import React from 'react'

const DepositReqCard = () => {
  
  return (
    
    <div>
      <div className="w-full bg-white border-2 border-gray py-3 px-5 rounded-md">
        <div className="text-lg font-semibold mb-3 text-primary-color">
          
        </div>
        <p className="text-base mb-2">
          <strong>Requested Amount:</strong>{' '}
      php 10,000.00
        </p>
        <p className="text-base mb-2">
          <strong>Date Requested:</strong>{' '}
         January 01 2024
        </p>
        <p className="text-base mb-4 text-gray-700">
          <strong>Remarks:</strong>{' '}
         For Rent
        </p>
        <div className="flex justify-between">
          <button
           
            className="bg-lime hover:bg-lime/55 text-white font-bold py-2 px-4 rounded"
          >
            Accept
          </button>
          <button
            
            className="bg-red hover:bg-red/55 text-white font-bold py-2 px-4 rounded"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  )
}

export default DepositReqCard
