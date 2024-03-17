import React from 'react'

import Sidebar from './Sidebar'
import Headbar from './Headbar'
const Layout = ({children}) => {
  return (
    <div className="flex">
        <Sidebar/>
    <div className='w-full flex flex-col'>
      <Headbar />
      {children}
    </div>
  </div>
  )
}

export default Layout