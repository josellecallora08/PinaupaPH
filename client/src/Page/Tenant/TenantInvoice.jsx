import React from 'react'
import TenantTransactionTable from '../../Component/Tenant Component/TenantTransactionTable'
import TenantTransactionMobile from '../../Component/Tenant Component/TenantTransactionMobile'

const TenantInvoice = () => {
  return (
    <>
   <div className="h-screen w-full bg-white1">
    <h1 className="lg:mx-10 lg:my-5 font-bold m-4">VIEW RECEIPT/DOCUMENTS</h1>
            <div className="lg:block hidden">
              <TenantTransactionTable />
            </div>
            <div className="lg:hidden">
              <TenantTransactionMobile />
              <TenantTransactionMobile />
            </div>
          </div>
    </>
  )
}

export default TenantInvoice
