import React from 'react'
import DepositReqCard from './DepositReqCard'

const DepositReq = () => {
  return (
    <>
    <div className=" ml-4 mt-5 mb-4">
      <h1 className='text-xl font-semibold'>Deposit Request</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        <DepositReqCard />
        <DepositReqCard />
        <DepositReqCard />
      </div>
    </div>
    </>
  )
}

export default DepositReq