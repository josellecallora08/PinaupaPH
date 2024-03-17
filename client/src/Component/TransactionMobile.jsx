import React from 'react'

const TransactionMobile = () => {
  const paid=true
  return (
    <div>
      <div className="flex h-20 mt-5 items-center rounded-lg mx-4 shadow-md shadow-gray-600">
        <div className={`flex items-center justify-center ${paid?'bg-lime':'bg-red-700'} rounded-tl-lg rounded-bl-lg h-full w-28 text-center text-xl font-bold p-3  text-white`}>{paid?'Paid':'Unpaid'}</div>
        <div className='flex w-full justify-between px-4 items-center'>
          <div className="flex flex-col text-lg">
            <div className='font-bold'>Unit 406</div>
            <div className='font-extralight text-base'>July 30,2023</div>
          </div>
          <div className='text-lg font-bold'>Php 10,000</div>
        </div>

      </div>
    </div>
  )
}

export default TransactionMobile
