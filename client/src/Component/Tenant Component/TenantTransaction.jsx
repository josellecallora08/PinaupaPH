import React from 'react'
import TenantTableTransaction from './TenantTableTransaction'
import TenantMobileTrans from './TenantMobileTrans'

const TenantTransaction = () => {
  return (
    <div>
      <div className="h-full w-full">
        <div className="lg:block hidden">
          <TenantTableTransaction />
        </div>
        <div className="lg:hidden">
          <TenantMobileTrans />
        </div>
      </div>
    </div>
  )
}

export default TenantTransaction
