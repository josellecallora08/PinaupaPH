import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toggleCloseSidebar, toggleDocs } from '../features/menu'
import { isLogout } from '../features/authentication'
import logo from '/logo.svg'
import m_logo from '/m_logo.svg'
import dashboard from '/dashboard.svg'
import dashboard_ from '/dashboard_white.svg'
import tenant from '/Tenant_black.svg'
import tenant_ from '/tenant_white.svg'
import apartment from '/apartment.svg'
import apartment_ from '/apartment_white.svg'
import security from '/Cctv_black.svg'
import security_ from '/Cctv_white.svg'
import documents from '/Document_black.svg'
import document_ from '/document_white.svg'
import concern from '/concern.svg'
import concern_ from '/concern_white.svg'
import down from '/down.svg'
import Report_ from '/Report-white.svg'
import Report from '/Report-black.svg'
import logout from '/logout.svg'
import announcement from '/announcement.svg'
import announcement_ from '/announcement_.svg'

const Sidebar = ({sidebarRef, handleOutsideClick}) => {
  const menu = useSelector((state) => state.toggle.sidebar)
  const docs = useSelector((state) => state.toggle.doc_dropdown)
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleDocs = () => {
    dispatch(toggleDocs())
  }

  const handleLogout = () => {
    const isConfirmed = window.confirm('Continue Logging out?')
    if (isConfirmed) {
      dispatch(isLogout(navigate))
    }
  }

  const isActive = (route) => {
    return location.pathname === route
  }

  return (
    <div
      ref={sidebarRef}
      className={`fixed z-50 md:static w-3/5 max-h-screen h-full left-0 top-20 bg-white ${
        menu ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 flex flex-col md:max-w-[300px] ${menu ? 'md:w-full' : 'md:w-16'} duration-300 ease-in-out shadow-xl md:shadow-md`}
    >
      <div className="sticky top-0 size-full flex flex-col overflow-y-auto ">
        <Link className="w-full h-full max-h-20 flex justify-center items-center">
          {menu ? (
            <img
              src={logo}
              alt=""
              className="duration-300 w-full max-w-44 max-h-20 h-full object-fill ease-in-out mt-10"
            />
          ) : (
            <img
              src={m_logo}
              alt=""
              className="duration-300 w-full max-w-28 max-h-8 pt-2 h-full object-fill  ease-in-out"
            />
          )}
        </Link>
        <nav className="relative w-full h-full pt-2">
          <ul className="w-full m-auto flex flex-col gap-1 items-center text-xs ">
            <li className="w-full h-fit">
              <Link
                to={'/dashboard'}
                className={`flex items-center ${!menu && 'justify-center'} w-4/5 gap-5 m-auto h-full hover:bg-primary-color/40 rounded-md ${
                  menu ? 'p-3 md:p-5' : 'p-3'
                } ${isActive('/dashboard') ? 'bg-primary-color' : ''} `}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                >
                  <img
                    src={isActive('/dashboard') ? dashboard_ : dashboard}
                    alt=""
                    className="size-full object-contain "
                  />
                </figure>
                {menu ? (
                  <span
                    className={`lg:font-semibold text-primary-color ${isActive('/dashboard') ? 'text-white' : ''}`}
                  >
                    Dashboard
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>
            {user?.role === 'Admin' && (
              <>
                <li className="w-full h-fit">
                  <Link
                    to={'/apartment'}
                    className={`flex items-center ${!menu && 'justify-center'} w-4/5 gap-5 m-auto h-full hover:bg-primary-color/40 rounded-md ${
                      menu ? 'p-3 md:p-5' : 'p-3'
                    } ${isActive('/apartment') ? 'bg-primary-color' : ''}`}
                  >
                    <figure
                      className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                    >
                      <img
                        src={isActive('/apartment') ? apartment_ : apartment}
                        alt=""
                        className="size-full object-contain"
                      />
                    </figure>
                    {menu ? (
                      <span
                        className={`lg:font-semibold text-primary-color ${isActive('/apartment') && 'text-white'}`}
                      >
                        Apartment
                      </span>
                    ) : (
                      ''
                    )}
                  </Link>
                </li>
                <li className="w-full h-fit">
                  <Link
                    to={'/reportpayer'}
                    className={`flex items-center ${!menu && 'justify-center'} w-4/5 gap-5 m-auto h-full hover:bg-primary-color/40 rounded-md ${
                      menu ? 'p-3 md:p-5' : 'p-3'
                    } ${isActive('/reportpayer') ? 'bg-primary-color' : ''}`}
                  >
                    <figure
                      className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                    >
                      <img
                        src={isActive('/reportpayer') ? Report_ : Report}
                        alt=""
                        className="size-full object-contain"
                      />
                    </figure>
                    {menu ? (
                      <span
                        className={`lg:font-semibold text-primary-color ${isActive('/reportpayer') && 'text-white'}`}
                      >
                        Reports
                      </span>
                    ) : (
                      ''
                    )}
                  </Link>
                </li>
                <li className="w-full h-fit">
                  <Link
                    to={'/tenant'}
                    className={`flex items-center ${!menu && 'justify-center'} w-4/5 gap-5 m-auto h-full hover:bg-primary-color/40 rounded-md ${
                      menu ? 'p-3 md:p-5' : 'p-3'
                    } ${isActive('/tenant') ? 'bg-primary-color' : ''} `}
                  >
                    <figure
                      className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                    >
                      <img
                        src={isActive('/tenant') ? tenant_ : tenant}
                        alt=""
                        className="size-full object-contain"
                      />
                    </figure>
                    {menu ? (
                      <span
                        className={`lg:font-semibold text-primary-color ${isActive('/tenant') && 'text-white'}`}
                      >
                        Tenant
                      </span>
                    ) : (
                      ''
                    )}
                  </Link>
                </li>
              </>
            )}
            {user?.role !== 'Superadmin' && (
              <li className="w-full h-fit">
                <Link
                  to={`/security`}
                  className={`flex items-center ${!menu && 'justify-center'} w-4/5 m-auto h-full hover:bg-primary-color/40 rounded-md ${
                    menu ? 'p-3 md:p-5' : 'p-3'
                  } ${isActive('/security') ? 'bg-primary-color' : ''}`}
                >
                  <figure
                    className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                  >
                    <img
                      src={isActive('/security') ? security_ : security}
                      alt=""
                      className="max-w-5 max-h-5 object-contain"
                    />
                  </figure>
                  {menu ? (
                    <span
                      className={`lg:font-semibold text-primary-color ${isActive('/security') && 'text-white'}`}
                    >
                      Security
                    </span>
                  ) : (
                    ''
                  )}
                </Link>
              </li>
            )}
            {user?.role === 'Admin' && (
              <li className="w-full h-fit flex flex-col cursor-pointer">
                <div
                  onClick={handleDocs}
                  className={`flex items-center justify-between gap-5 w-4/5 m-auto h-auto hover:bg-primary-color/40 rounded-md ${
                    menu ? 'p-3 md:p-5' : 'p-3'
                  } ${isActive('/document/lease-agreement') ? 'bg-primary-color' : isActive('/document/invoice') ? 'bg-primary-color' : ''}`}
                >
                  <div className="flex justify-between items-center gap-5">
                    <figure
                      className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                    >
                      <img
                        src={
                          isActive('/document/lease-agreement')
                            ? document_
                            : isActive('/document/invoice')
                              ? document_
                              : documents
                        }
                        alt=""
                        className="size-full  object-contain"
                      />
                    </figure>
                    {menu ? (
                      <span
                        className={`lg:font-semibold text-primary-color ${
                          isActive('/document/lease-agreement')
                            ? 'text-white'
                            : isActive('/document/invoice')
                              ? 'text-white'
                              : ''
                        } `}
                      >
                        Document
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                  {menu ? (
                    <span className="lg:font-semibold text-primary-color w-full h-full max-w-3 max-h-3">
                      <img
                        src={down}
                        className={`${docs ? 'rotate-180' : ''} duration-300`}
                        alt=""
                      />
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className={`${docs ? '' : 'hidden'} w-full m-auto`}>
                  <ul className="">
                    <li
                      className={`flex items-center ${!menu && 'justify-center'} w-4/5 m-auto h-full hover:bg-primary-color/40 rounded-md`}
                    >
                      <Link
                        className={`${menu ? 'p-3' : 'p-3'} w-full h-full`}
                        to={'/document/lease-agreement'}
                      >
                        <span className="lg:font-semibold">Lease Agreement</span>
                      </Link>
                    </li>
                    <li
                      className={`flex items-center center w-4/5 m-auto h-full hover:bg-primary-color/40 rounded-md`}
                    >
                      <Link
                        className={` ${menu ? 'p-3' : 'p-3'} w-full h-full`}
                        to={'/document/invoice'}
                      >
                        <span className="lg:font-semibold">Invoices</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            {user?.role === 'Admin' && (
              <li className="w-full h-fit">
                <Link
                  to={`/announcement`}
                  className={`flex items-center ${!menu && 'justify-center'} w-4/5 gap-5 mx-auto h-full hover:bg-primary-color/40 rounded-md ${
                    menu ? 'p-3 md:p-5' : 'p-3'
                  } ${isActive('/announcement') && 'bg-primary-color'}`}
                >
                  <figure
                    className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                  >
                    <img
                      src={
                        isActive('/announcement') ? announcement_ : announcement
                      }
                      alt=""
                      className="size-full object-contain"
                    />
                  </figure>
                  {menu ? (
                    <span
                      className={`lg:font-semibold text-primary-color ${isActive('/announcement') && 'text-white'}`}
                    >
                      Create Announcement
                    </span>
                  ) : (
                    ''
                  )}
                </Link>
              </li>
            )}
            {user?.role !== 'Superadmin' && (
              <li className="w-full h-fit">
                <Link
                  to={`/concern&issue`}
                  className={`flex items-center gap-5 ${!menu && 'justify-center'} w-4/5 mx-auto h-full hover:bg-primary-color/40 rounded-md ${
                    menu ? 'p-3 md:p-5' : 'p-3'
                  } ${isActive('/concern&issue') ? 'bg-primary-color' : ''}`}
                >
                  <figure
                    className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                  >
                    <img
                      src={isActive('/concern&issue') ? concern_ : concern}
                      alt=""
                      className="size-full object-contain"
                    />
                  </figure>
                  {menu ? (
                    <span
                      className={`lg:font-semibold text-primary-color ${isActive('/concern&issue') ? 'text-white' : ''}`}
                    >
                      Concern and Issues
                    </span>
                  ) : (
                    ''
                  )}
                </Link>
              </li>
            )}

            <li className="w-full h-fit">
              <button
                onClick={handleLogout}
                className={`flex items-center ${!menu && 'justify-center'} w-4/5 gap-5 mx-auto h-full hover:bg-primary-color/40 rounded-md ${
                  menu ? 'mt-2 p-3 md:p-5' : ' mt-14 p-3'
                }`}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-5 max-h-5 w-full h-full`}
                >
                  <img
                    src={logout}
                    alt=""
                    className="rotate-180 size-full object-contain"
                  />
                </figure>
                {menu ? (
                  <span className="lg:font-semibold text-primary-color">
                    Logout
                  </span>
                ) : (
                  ''
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Add an empty div to create padding at the bottom */}
    </div>
  )
}

export default Sidebar
