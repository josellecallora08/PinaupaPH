import React from 'react'
import Sidebar from './Sidebar'
import Headbar from './Headbar'
const Layout = ({children}) => {
  return (
    <div className='flex w-screen h-screen'>
      <Sidebar/>
    <div className='w-full h-full'>
        <Headbar/>
      {children}
    </div>
  </div>
  )
}

export default Layout