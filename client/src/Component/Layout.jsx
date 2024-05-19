import React, { useRef } from 'react'

import Sidebar from './Sidebar'
import Headbar from './Headbar'
import { toggleCloseSidebar } from '../features/menu'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Layout = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sidebarRef = useRef(null)
  const menuBtnRef = useRef(null)
  const handleOutsideClick = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      !menuBtnRef
    ) {
      dispatch(toggleCloseSidebar())
    }
  }
  return (
    <div className="h-screen flex">
      <Sidebar
        sidebarRef={sidebarRef}
        handleOutsideClick={handleOutsideClick}
      />
      <div className="w-full flex flex-col overflow-y-auto">
        <Headbar
          menuBtnRef={menuBtnRef}
          handleOutsideClick={handleOutsideClick}
        />
        {children}
      </div>
    </div>
  )
}

export default Layout
