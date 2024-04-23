import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toggleCloseSidebar, toggleDocs } from '../features/menu'
import { isLogout } from '../features/authentication'
import logo from '/logo.svg'
import m_logo from '/m_logo.svg'
import dashboard from '/dashboard.svg'
import tenant from '/tenant.svg'
import apartment from '/apartments.svg'
import security from '/Security.svg'
import document_svg from '/document.svg'
import report from '/concern.svg'
import down from '/down.svg'
import contact from '/contact.svg'
import term from '/terms.svg'
import logout from '/logout.svg'
const Sidebar = () => {
  const sidebarRef = useRef(null);
  const menu = useSelector((state) => state.toggle.sidebar)
  const docs = useSelector((state) => state.toggle.doc_dropdown)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      // Click occurred outside the sidebar
      dispatch(toggleCloseSidebar()); // Dispatch action to close the sidebar
    }
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const handleDocs = () => {
    dispatch(toggleDocs())
  }

  const handleLogout = () => {
    dispatch(isLogout(navigate))
  }

  return (
    <div
      ref={sidebarRef}
      className={`fixed z-50 md:static w-3/5 max-h-screen h-full left-0 top-20 bg-white ${menu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col md:max-w-[300px] ${menu ? 'md:w-full' : 'md:w-16'} duration-300 ease-in-out shadow-xl md:shadow-md `}
    >
      <div className="sticky top-0 size-full flex flex-col ">
        <Link className='w-full h-full max-h-20 flex justify-center items-center'>
          {menu ? <img
            src={logo}
            alt=""
            className="duration-300 mt-10 md:mt-0 w-full max-w-44 max-h-20 h-full object-fill ease-in-out"
          /> : <img
            src={m_logo}
            alt=""
            className="duration-300 w-full max-w-28 max-h-8 h-full object-fill ease-in-out"
          />
          }
        </Link>
        <nav className="relative  w-full h-full">
          <ul className=" w-full m-auto flex flex-col items-center mt-5 md:mt-10 text-sm">
            <li className="w-full h-fit ">
              <Link
                to={'/dashboard'}
                className={`flex items-center center w-4/5 m-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'} `}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                >
                  <img
                    src={dashboard}
                    alt=""
                    className="max-w-5 max-h-5 object-contain"
                  />
                </figure>
                {menu ? (
                  <span className="font-semibold text-primary-color">
                    Dashboard
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>

            {user?.role === 'Admin' ? (
              <>
                <li className="w-full h-fit ">
                  <Link
                    to={'/tenant'}
                    className={`flex items-center center w-4/5  m-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
                  >
                    <figure
                      className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                    >
                      <img
                        src={tenant}
                        alt=""
                        className="max-w-5 max-h-5 object-contain"
                      />
                    </figure>
                    {menu ? (
                      <span className="font-semibold text-primary-color">
                        Tenant
                      </span>
                    ) : (
                      ''
                    )}
                  </Link>
                </li>
                <li className="w-full h-fit">
                  <Link
                    to={'/apartment'}
                    className={`flex items-center center w-4/5  m-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
                  >
                    <figure
                      className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                    >
                      <img
                        src={apartment}
                        alt=""
                        className="max-w-5 max-h-5 object-contain"
                      />
                    </figure>
                    {menu ? (
                      <span className="font-semibold text-primary-color">
                        Apartment
                      </span>
                    ) : (
                      ''
                    )}
                  </Link>
                </li>
              </>
            ) : (
              ''
            )}
            <li className="w-full h-fit">
              <Link
                to={`/security`}
                className={`flex items-center center w-4/5  m-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                >
                  <img
                    src={security}
                    alt=""
                    className="max-w-5 max-h-5 object-contain"
                  />
                </figure>
                {menu ? (
                  <span className="font-semibold text-primary-color">
                    Security
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <li className="w-full h-fit flex flex-col cursor-pointer">
              <div
                onClick={handleDocs}
                className={`flex items-center justify-between w-4/5  m-auto h-auto hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
              >
                <div className="flex justify-between items-center gap-5">
                  <figure
                    className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                  >
                    <img
                      src={document_svg}
                      alt=""
                      className="max-w-10 max-h-10 object-contain"
                    />
                  </figure>
                  {menu ? (
                    <span className="font-semibold text-primary-color">
                      Document
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                {menu ? (
                  <span className="font-semibold text-primary-color w-full h-full max-w-3 max-h-3">
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
                <ul className="flex flex-col">
                  <li
                    className={`flex items-center center w-4/5  m-auto h-full hover:bg-primary-color/5 rounded-md `}
                  >
                    <Link
                      className={`${menu ? 'p-3' : 'p-3'} w-full h-full`}
                      to={'/document/lease-agreement'}
                    >
                      <span className='font-semibold'>Lease Agreement</span>
                    </Link>
                  </li>
                  <li
                    className={`flex items-center center w-4/5  m-auto h-full hover:bg-primary-color/5 rounded-md`}
                  >
                    <Link
                      className={` ${menu ? 'p-3' : 'p-3'} w-full h-full`}
                      to={'/document/invoice'}
                    >
                      <span className='font-semibold'>Invoices</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="w-full h-fit">
              <Link
                to={`/concern&issue`}
                className={`flex items-center center w-4/5  mx-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                >
                  <img
                    src={report}
                    alt=""
                    className="max-w-5 max-h-5 object-contain"
                  />
                </figure>
                {menu ? (
                  <span className="font-semibold text-primary-color">
                    Reports and Concern
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <li className="w-full h-fit">
              <Link
                to={`/terms&condition`}
                className={`flex items-center center w-4/5  mx-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                >
                  <img
                    src={term}
                    alt=""
                    className="max-w-5 max-h-5 object-contain"
                  />
                </figure>
                {menu ? (
                  <span className="font-semibold text-primary-color">
                    Terms & Condition
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <li className="w-full h-fit">
              <Link
                to={`/contact`}
                className={`flex items-center center w-4/5  mx-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                >
                  <img
                    src={contact}
                    alt=""
                    className="max-w-5 max-h-5 object-contain"
                  />
                </figure>
                {menu ? (
                  <span className="font-semibold text-primary-color">
                    Contact Us
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <li className="w-full h-fit md:[&:last-child]:absolute bottom-5">
              <button
                onClick={handleLogout}
                className={`flex items-center center w-4/5  mx-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
              >
                <figure
                  className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                >
                  <img
                    src={logout}
                    alt=""
                    className="max-w-5 rotate-180 max-h-5 object-contain"
                  />
                </figure>
                {menu ? (
                  <span className="font-semibold text-primary-color">
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
    </div>
  )
}
export default Sidebar
