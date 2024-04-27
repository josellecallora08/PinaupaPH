import React, { useEffect } from 'react'
import City from '/city.svg'
import renew from '/renew.svg'
import pfp from '/pfp.svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isLoggedin } from '../../features/authentication'
import Calendar from '../../Component/Tenant Component/Calendar'

const TenantHome = () => {
  const loading = useSelector((state) => state.auth.loading)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isLoggedin())
  }, [])

  return (
    <>
      {loading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        <div className="w-full h-full md:h-auto xl:h-full xl:max-h-auto flex flex-col items-start bg-white1">
          <div className="w-11/12 h-fit m-auto py-5 lg:py-0 ">
            <Link
              to="/dashboard"
              className="uppercase font-bold hover:underline"
            >
              Home
            </Link>
          </div>
          <div className="w-11/12 xl:max-h-[800px] flex flex-col m-auto md:grid  grid-cols-3 grid-rows-1 gap-x-2 gap-y-3 pb-5">
            {/* Header */}
            <div className="md:pt-4 md:pb-0 flex justify-between items-center md:order-none order-1 col-span-3 row-span-3 pb-7 rounded-md overflow-hidden shadow-md bg-white ">
              {' '}
              <figure className="w-full h-full max-w-max md:max-w-fit md:pt-4">
                <img
                  src={City}
                  className="md:w-40 md:h-full md:pb-0 w-28 pb-10 object-contain"
                  alt=""
                />
              </figure>
              <div className="md:pt-0 pr-5 pt-5">
                <span className="text-base xl:text-2xl  font-semibold">
                  Hey, <span className="capitalize">{user?.name}!</span>
                </span>
              </div>
            </div>

            {/* Issue Card */}
            <div className="md:order-none col-span-2 row-span-4 bg-white order-3 shadow-md shadow-dark-gray">
              <div className="w-full h-fit bg-primary-color text-white p-2 ">
                Issue Card
              </div>
              <div className=" overflow-y-auto h-40">
                <table className="w-full">
                  <tbody className="text-primary-color">
                    <tr className="border-b border-dark-gray">
                      <td className=" px-4 py-2   ">
                        <div className="flex items-center gap-3 w-fit">
                          <div className="md:w-2 md:h-2 w-2 h-2 rounded-full bg-red "></div>
                          <div className="md:text-sm text-xs">
                            Water Leaking
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 md:text-sm text-xs">
                        12/12/2022
                      </td>
                      <td className="px-4 py-2 flex items-center gap-3">
                        <div className=" flex items-center gap-3 bg-gray rounded-full w-fit md:pr-20  p-2">
                          <img
                            src={pfp}
                            alt="tenantlogo"
                            className="w-6 h-6 rounded-full "
                          />
                          <div className="md:text-sm text-xs">
                            Landlord Message You
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-gray">
                      <td className=" px-4 py-2   ">
                        <div className="flex items-center gap-3 w-fit">
                          <div className="md:w-2 md:h-2 w-2 h-2 rounded-full bg-red "></div>
                          <div className="md:text-sm text-xs">
                            Water Leaking
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 md:text-sm text-xs">
                        12/12/2022
                      </td>
                      <td className="px-4 py-2 flex items-center gap-3">
                        <div className=" flex items-center gap-3 bg-gray rounded-full w-fit md:pr-20  p-2">
                          <img
                            src={pfp}
                            alt="tenantlogo"
                            className="w-6 h-6 rounded-full "
                          />
                          <div className="md:text-sm text-xs">
                            Landlord Message You
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className=" md:order-none col-span-1 row-span-5 h-full bg-white flex flex-col order-3">
              <div className="w-full h-fit bg-primary-color text-white p-2">
                Payment
              </div>
              <div className="text-primary-color mt-5 px-2">
                <h1 className="text-lg">Invoice Number</h1>
                <p className="text-xl font-semibold my-5">INV-123456789</p>
                <div className="flex justify-between my-8 font-thin">
                  <div>Rent</div>
                  <div>10,000php</div>
                </div>
                <div className="flex justify-between my-8 font-thin">
                  <div>Date</div>
                  <div>March 31, 2024</div>
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-col mt-auto">
                <div className="flex justify-around bg-light-gray p-5 text-white">
                  <h1>Invoice Payable:</h1>
                  <p>10,000php</p>
                </div>
                <div className="flex justify-center w-full">
                  <button className="bg-primary-color w-full text-white p-5">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Card */}
            <div className="md:order-none col-span-1 row-span-1 bg-white h-fit order-last ">
              <div className="w-full h-10 bg-primary-color text-white p-2">
                Calendar
              </div>
              <div className="w-full h-fit">
                <Calendar />
              </div>
            </div>

            {/* Announcement Card */}
            <div className="md:order-none col-span-1 row-span-1 bg-white order-2">
              <div className="w-full h-fit bg-primary-color text-white p-2">
                Announcement
              </div>
              <div className="w-full h-fit py-4">
                <div className="md:mt-2 flex p-3 justify-between text-primary-color mr-5  ">
                  <div className="flex items-center gap-4">
                    <img src={pfp} alt="" className="w-10 h-10" />
                    <div>
                      <p>Michelle Marquez</p>
                      <p className="text-dark-gray">Landlord</p>
                    </div>
                  </div>
                  <div>Today</div>
                </div>
                <div className="text-primary-color  px-5">
                  <h1 className="text-center mb-2 text-xl">Electric Power Outage</h1>

                  <p className="text-sm overflow-y-auto h-[200px] ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Fugit, eos! Nesciunt tempore rerum magni corporis a velit
                    provident facilis, adipisci magnam quaerat aperiam, quia
                    odit sapiente. At ipsam dolore qui!
                 
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TenantHome
