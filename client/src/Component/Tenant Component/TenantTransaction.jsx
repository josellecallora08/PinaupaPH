import React from 'react'
import TenantTableTransaction from './TenantTableTransaction'
import TenantMobileTrans from './TenantMobileTrans'
import { useSelector } from 'react-redux'

const TenantTransaction = () => {
  const tenant = useSelector((state) => state.auth.user)

  return (
    <div>
      <div className="h-full w-full">
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
