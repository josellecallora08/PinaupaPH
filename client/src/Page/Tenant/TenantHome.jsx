import React, { useEffect } from 'react'
import City from '/city.svg'
import renew from '/renew.svg'
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
        <div className="w-full h-full md:h-auto xl:h-full xl:max-h-auto flex flex-col items-start bg-gray ">
          <div className='w-11/12 m-auto'>
            <div className="w-full h-fit m-auto py-3 ">
              <h1 className="uppercase font-bold hover:underline">Dashboard</h1>
              {/* Inserted code here */}
              <div className="lg:pt-4 flex justify-between items-center col-span-3 row-span-1  rounded-md overflow-hidden shadow-md bg-white ">
                <figure className="w-full h-full max-w-max md:max-w-fit">
                  <img
                    src={City}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </figure>
                <div className="pr-5">
                  <span className="text-base xl:text-2xl font-semibold">
                    Hey, <span className="capitalize">{user?.name}!</span>
                  </span>
                </div>
              </div>
              {/* End of inserted code */}
            </div>
            {/* Container to make both sides equal */}
            <div className="w-full flex flex-col md:flex-row gap-2 flex-grow">
              {/* First Column */}
              <div className="w-full md:w-1/2">
                {/* Calendar */}
                <div className="bg-white rounded-md overflow-hidden shadow-md mb-2">
                  <div className="w-full p-2 bg-primary-color text-white font-semibold text-xl">
                    Calendar
                  </div>
                  <div className="w-full">
                    <Calendar />
                  </div>
                </div>
                {/* Issue Card */}
                <div className="bg-white rounded-md overflow-hidden shadow-md">
                  <div className="w-full p-2 bg-primary-color text-white font-semibold text-xl">
                    Issue Card
                  </div>
                  <div className="p-4">
                    <div className="bg-gray-200 p-2 rounded-md">
                      <h1 className="text-xl">Sink Leaking</h1>
                      <p className="text-gray-600">Maintenance Report</p>
                      <p className="text-gray-600">January 10, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Second Column */}
              <div className="w-full md:w-1/2">
                {/* Notifications */}
                <div className="h-full bg-white rounded-md overflow-hidden shadow-md">
                  <div className="w-full p-2 bg-primary-color text-white font-semibold text-xl">
                    Notifications
                  </div>
                  <div className="p-4 overflow-y-auto max-h-full">
                    <div className="flex justify-between p-2 rounded-full md:rounded-md hover:bg-gray">
                      <article className="flex items-center gap-2">
                        <figure className="w-10 h-10 overflow-hidden">
                          <img
                            src={user}
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        </figure>
                        <div className="">
                          <p className="font-semibold">Joselle E. Callora</p>
                          <p className="text-xs overflow-hidden max-w-[160px] text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat, eligendi.
                          </p>
                        </div>
                      </article>
                      <div>
                        <span className="text-xs">01/02/24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of container */}
          </div>
        </div>
      )}
    </>
  )
}

export default TenantHome
