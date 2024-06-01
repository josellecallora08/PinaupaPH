import React from 'react'
import TenantTableTransaction from './TenantTableTransaction'
import TenantMobileTrans from './TenantMobileTrans'
import { useSelector } from 'react-redux'

const TenantTransaction = () => {
  const tenant = useSelector((state) => state.auth.user)

  return (
    <div>
      <div className="h-full lg:w-11/12 w-full m-auto">
      <div className="lg:mt-10 mt-5 uppercase font-bold  mx-4">
          <h1 className="">Payment Transaction</h1>
        </div>
        <div className="lg:block hidden">
          <TenantTableTransaction tenant={tenant} />
        </div>
        <div className="lg:hidden">
          <TenantMobileTrans tenant={tenant} />
        </div>
      </div>
    </div>
  )
}

export default TenantTransaction
