import React from 'react'

import Sidebar from './Sidebar'
import Headbar from './Headbar'
const Layout = ({ children }) => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full flex flex-col overflow-y-auto">
        <Headbar />
        {children}
      </div>
    </div>
  );
};

export default Layout