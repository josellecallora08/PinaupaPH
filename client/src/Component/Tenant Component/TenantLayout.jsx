import React from 'react'


import TenantSideBar from '../TenantSideBar'
import Headbar from '../Headbar'
const TenantLayout = ({children}) => {
  return (
    <div className="flex">
        <TenantSideBar />
    <div className='w-full flex flex-col'>
     <Headbar/>
      {children}
    </div>
  </div>
  )
}

export default TenantLayout