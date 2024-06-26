import { useDispatch, useSelector } from 'react-redux'
import logo from '/logo.svg'
import m_logo from '/m_logo.svg'
import { Link } from 'react-router-dom'
import dashboard from '/dashboard.svg'
import tenant from '/tenant.svg'
import security from '/Security.svg'
import document from '/document.svg'
import report from '/concern.svg'
import down from '/down.svg'
import { toggleDocs } from '../features/menu'

const TenantSideBar = () => {
  const menu = useSelector((state) => state.toggle.sidebar)
  const docs = useSelector((state) => state.toggle.doc_dropdown)
  const dispatch = useDispatch()

  const handleDocs = () => {
    dispatch(toggleDocs())
  }

  return (
    <div
      className={`fixed z-50 md:static w-3/5 min-h-screen h-auto left-0 top-20 bg-white ${menu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col md:max-w-[200px] ${menu ? 'md:w-full' : 'md:w-16'} duration-100 ease-in-out shadow-xl md:shadow-md`}
    >
      <div className="sticky top-0">
        <figure className="max-h-20 h-full w-full flex justify-center items-center">
          <Link>
            <img
              src={menu ? logo : m_logo}
              alt=""
              className="duration-300 ease-in-out"
            />
          </Link>
        </figure>
        <nav className="w-full h-full">
          <ul className="w-full m-auto flex flex-col items-center gap-5 mt-5 md:mt-10 text-sm">
            <li className="w-full h-full ">
              <Link
                to={'/tenant/home'}
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
                  <span className="font-semibold text-primary-color">Home</span>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <li className="w-full h-full">
              <Link
                to={`/tenant/profile`}
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
                    Tenant Profile
                  </span>
                ) : (
                  ''
                )}
              </Link>
            </li>

            <li className="w-full h-full">
              <Link
                to={`/tenant/security`}
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
            <li className="w-full h-full flex flex-col cursor-pointer">
              <div
                onClick={handleDocs}
                className={`flex items-center justify-between w-4/5  m-auto h-auto hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
              >
                <div className="flex justify-between items-center gap-2">
                  <figure
                    className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}
                  >
                    <img
                      src={document}
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
                    className={`flex items-center center text-primary-color w-4/5  m-auto h-full hover:bg-primary-color/5 rounded-md `}
                  >
                    <Link
                      className={`${menu ? 'p-3' : 'p-3'} w-full h-full`}
                      to={'/tenant/document/lease'}
                    >
                      <span>Lease Agreement</span>
                    </Link>
                  </li>
                  <li
                    className={`flex items-center center w-4/5 text-primary-color  m-auto h-full hover:bg-primary-color/5 rounded-md`}
                  >
                    <Link
                      className={` ${menu ? 'p-3' : 'p-3'} w-full h-full`}
                      to={'/tenant/document/invoice'}
                    >
                      <span>Invoices</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="w-full h-full">
              <Link
                to={`/tenant/concern`}
                className={`flex items-center center w-4/5  m-auto h-full hover:bg-primary-color/5 rounded-md ${menu ? 'p-5' : 'p-3'}`}
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
          </ul>
        </nav>
      </div>
    </div>
  )
}
export default TenantSideBar
