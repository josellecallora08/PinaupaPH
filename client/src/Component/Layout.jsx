import React from 'react'

import Sidebar from './Sidebar'
import Headbar from './Headbar'
const Layout = ({children}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:h-full ">
       
      
        <Sidebar/>
      
     
    <div className='w-full'>
      <Headbar />
      {children}
    </div>
  </div>
  )
}

export default Layout