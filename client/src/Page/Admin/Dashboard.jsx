import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Line } from 'react-chartjs-2'

import { fetchApartments } from '../../features/apartment'
import { isLoggedin } from '../../features/authentication'
import {
  fetchReports,
  fetchRevenue,
  fetchTotalOccupancy,
  fetchTotalPaid,
  fetchTotalPayer,
} from '../../features/dashboard'
import { fetchUnitsApartment } from '../../features/unit'

import City from '/city.svg'
import renew from '/AvailRoom.svg'
import occupancy from '/occupancy.svg'
import pay from '/PayDate.svg'
import Loading from '../../Component/LoadingComponent/Loading'

import 'chartkick/chart.js'
import 'react-circular-progressbar/dist/styles.css'
import 'react-circular-progressbar/dist/styles.css'
import Select from 'react-select'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const Dashboard = () => {
  const dispatch = useDispatch()
  const apartment = useSelector((state) => state.apartment.data)
  const units = useSelector((state) => state.unit.data)
  const loading = useSelector((state) => state.auth.loading)
  const user = useSelector((state) => state.auth.user)
  const totalPaid = useSelector((state) => state.dash.totalpaid)
  const totalOccupancy = useSelector((state) => state.dash.occupancy)
  const totalPayer = useSelector((state) => state.dash.goodpayer)
  const totalReports = useSelector((state) => state.dash.reports)
  const notifications = useSelector((state) => state.notif.data)
  const revenue = useSelector((state) => state.dash.chart)
  const menu = useSelector((state) => state.toggle.sidebar)
  const [selectedOption, setSelectedOption] = useState(null)
  const [date, setDate] = useState(formatDate(new Date()))

  useEffect(() => {
    dispatch(isLoggedin())
    dispatch(fetchApartments())
  }, [])

  const percentage = totalReports?.percentage?.toFixed(2)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: `Rental Paid for ${new Date(date).getFullYear()}`,
        data: revenue,
        backgroundColor: '#183044',
        borderWidth: 1,
      },
    ],
  }
  useEffect(() => {
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()
    dispatch(fetchTotalOccupancy(year))
    dispatch(fetchTotalPaid(year))
    dispatch(fetchTotalPayer(year))
    dispatch(fetchReports(year))
    dispatch(fetchRevenue(month, year))
  }, [date, setDate])

  function formatDate(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${year}-${month}`
  }

  const availableRoom = apartment
    ?.filter((item) => item.units?.some((unit) => !unit.occupied))
    .map((val, key) => {
      return {
        value: val?._id,
        label: val?.name,
      }
    })
  useEffect(() => {
    if (selectedOption?.value) {
      dispatch(fetchUnitsApartment(selectedOption.value))
    }
  }, [selectedOption, dispatch])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full h-full md:h-auto xl:h-full xl:max-h-auto flex flex-col items-start bg-white1">
            <div className="w-11/12 h-fit m-auto py-5 lg:py-0">
              <Link
                to="/dashboard"
                className="uppercase font-bold hover:underline"
              >
                Dashboard
              </Link>
            </div>
            <div className="w-11/12 xl:max-h-[800px] bg-white1 flex flex-col m-auto xl:grid grid-cols-3 gap-5 grid-rows-7">
              <div className="lg:pt-4 flex justify-between items-center col-span-3 row-span-1  rounded-md overflow-hidden shadow-md bg-white pr-5 ">
                <figure className="w-full h-full max-w-max md:max-w-fit">
                  <img
                    src={City}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </figure>
                <div className="pr-">
                  <span className="text-base xl:text-2xl font-semibold">
                    Hey, <span className="capitalize">{user?.name}!</span>
                  </span>
                </div>
              </div>
              <div className="order-last md:order-none col-span-3 row-span-4 flex flex-col md:grid grid-cols-3 grid-rows-1 gap-5 ">
                <div className="col-span-3 md:col-span-2 row-span-auto xl:row-span-1 bg-white h-fit md:h-full flex items-center justify-center flex-col rounded-md overflow-hidden shadow-md">
                  <div className="w-11/12 h-fit flex justify-between items-center xl:max-h-fit m-auto md:py-2">
                    <p className="font-bold text-[#9e9e9e] lg:text-xl">
                      Revenue Overview
                    </p>
                    <div className="flex gap-2 mt-2">
                      <div className="border-2 p-2  rounded-xl shadow-md bg-white">
                        <input
                          type="month"
                          name="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-fit px-2 h-full outline-none rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-fit xl:h-full flex">
                    <figure className="flex justify-center items-center h-full w-11/12 m-auto">
                      <Line
                        data={data}
                        options={{
                          ...options,
                          elements: {
                            line: {
                              borderColor: '#183044',
                              borderWidth: 5,
                            },
                          },
                          scales: {
                            y: {
                              grid: {
                                color: 'rgba(0, 0, 0, .3)',
                              },
                            },
                            x: {
                              grid: {
                                color: 'rgba(0, 0, 0, 0.3)',
                              },
                            },
                          },
                        }}
                        className="py-2 md:py-5 h-60 md:h-auto"
                      />
                    </figure>
                  </div>
                </div>
                <div className="bg-white pb-3 col-span-3 md:col-span-1 rounded-md overflow-hidden shadow-md">
                  <div className="w-11/12 h-full m-auto flex flex-col group">
                    <h1 className="text-[#9e9e9e] font-semibold py-2 lg:text-xl">
                      Recent Activity
                    </h1>
                    <div className=" w-full h-full max-h-[400px]  overflow-hidden group-hover:overflow-y-scroll">
                      {notifications &&
                        notifications
                          ?.filter(
                            (item) => item?.receiver_id?._id === user?._id,
                          )
                          .map((val, key) => (
                            <div
                              key={key}
                              className="hover:scale-105 p-2 duration-300 cursor-pointer w-full h-auto md:max-h-[200px]"
                            >
                              <div className="flex justify-between p-2 rounded-full md:rounded-md hover:bg-gray">
                                <article className="flex items-center gap-2">
                                  <figure
                                    className={`${menu ? 'hidden' : 'block'} w-full h-full max-w-10 max-h-10 rounded-full overflow-hidden`}
                                  >
                                    <img
                                      src={
                                        val?.sender_id?.profile_image?.image_url
                                      }
                                      className={` w-full h-full object-contain`}
                                      alt=""
                                    />
                                  </figure>
                                  <div className="flex flex-col mr-1">
                                    <p className="font-semibold">
                                      {val?.sender_id?.name}
                                    </p>
                                    <p className="text-xs overflow-hidden w-40 text-ellipsis text-nowrap">
                                      {val?.description}
                                    </p>
                                  </div>
                                </article>
                                <div>
                                  <span className={`text-xs`}>
                                    {new Date(val?.createdAt).toDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 row-span-2 grid grid-cols-4 md:grid-cols-3 grid-flow-row md:grid-rows-2 gap-5 pb-7">
                <div className="col-span-4 md:col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-5">
                  <div className="col-span-4 md:col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md">
                    <div className="w-full bg-primary-color max-w-20 flex items-center justify-center">
                      <div className="rounded-full p-2 xl:p-3 bg-gray">
                        <figure className="w-full h-full max-w-16 max-h-16">
                          <img src={pay} className="w-full h-full" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="w-full h-full">
                      <div className="relative w-11/12 m-auto h-full flex items-center">
                        {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold  xl:text-sm 2xl:text-lg'>Total Amount</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>9,000</span>
                    </div> */}
                        <div className=" w-full flex flex-col gap-2 xl:gap-5 py-2">
                          <div className="w-11/12 m-auto flex justify-between">
                            <p className="text-[#9e9e9e]  text-center font-semibold">
                              Revenue
                            </p>
                            <p className="font-bold text-center text-base xl:text-2xl">
                              {(totalPaid &&
                                totalPaid?.totalPayment?.toLocaleString(
                                  'en-PH',
                                  {
                                    style: 'currency',
                                    currency: 'PHP',
                                  },
                                )) ||
                                (0).toLocaleString('en-PH', {
                                  style: 'currency',
                                  currency: 'PHP',
                                })}
                            </p>
                          </div>
                          <p
                            className={`relative w-11/12 m-auto xl:w-full h-2 bg-primary-color/20 rounded-full overflow-hidden shadow-inner`}
                          >
                            <span
                              style={{
                                width: `${totalPaid?.percentage ? (totalPaid?.percentage < 0 ? 100 : totalPaid?.percentage) : 0}%`,
                              }}
                              className={`absolute h-2 bg-primary-color animate-in slide-in-from-left-20 duration-1000`}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md">
                    <div className="bg-primary-color w-full max-w-20 flex items-center justify-center">
                      <div className="rounded-full p-2 xl:p-3 bg-gray">
                        <figure className="w-full h-full max-w-5 xl:max-w-6 xl:max-h-6">
                          <img src={renew} className="w-full h-full" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="w-full h-full ">
                      <div className="relative w-11/12 m-auto h-full flex items-center">
                        {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold xl:text-sm 2xl:text-lg'>Renewal Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div> */}
                        <div className=" w-full flex flex-col gap-2">
                          {/* Select Tag That can Search */}
                          <div className="w-11/12 h-full flex flex-col pt-2 items-center justify-center ">
                            <Select
                              value={selectedOption}
                              onChange={setSelectedOption}
                              options={availableRoom}
                              isClearable
                              className="w-full"
                              placeholder="Choose an Apartment"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                                control: (base) => ({
                                  ...base,
                                  fontSize: '14px', // adjust the font size as needed
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: '2px', // adjust the padding as needed
                                  fontSize: '14px', // adjust the font size as needed
                                }),
                                menu: (base) => ({
                                  ...base,
                                  fontSize: '14px', // adjust the font size as needed
                                }),
                                singleValue: (base) => ({
                                  ...base,
                                  fontSize: '14px', // adjust the font size as needed
                                }),
                                placeholder: (base) => ({
                                  ...base,
                                  fontSize: '14px', // adjust the font size as needed
                                }),
                                input: (base) => ({
                                  ...base,
                                  fontSize: '14px', // adjust the font size as needed
                                }),
                              }}
                            />
                          </div>

                          {/* Conditionally render based on whether a room is selected */}
                          {selectedOption ? (
                            <p className="text-[#9e9e9e] text-sm ml-1 mb-1   ">
                              Available Room:{' '}
                              <span>
                                {units?.filter((unit) => !unit.occupied)
                                  .length || 0}
                                / {units?.length}
                              </span>
                            </p>
                          ) : (
                            <p className="text-[#9e9e9e] text-sm ml-1 mb-1  ">
                              No room selected
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md">
                    <div className="bg-primary-color w-full max-w-20 flex items-center justify-center">
                      <div className="rounded-full p-2 xl:p-3 bg-gray">
                        <figure className="w-full h-full max-w-16 max-h-16">
                          <img
                            src={occupancy}
                            className="w-full h-full"
                            alt=""
                          />
                        </figure>
                      </div>
                    </div>
                    <div className="w-full h-full">
                      <div className="relative w-11/12 md:py-0 py-4 m-auto h-full flex items-center">
                        {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold xl:text-sm 2xl:text-lg'>Deliquency Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div> */}
                        <div className=" w-full flex flex-col gap-2 xl:gap-5 py-2">
                          <div className="w-11/12 m-auto flex justify-between">
                            <p className="text-[#9e9e9e]  text-center font-semibold">
                              Total Occupancy
                            </p>
                            <p className="font-bold text-center text-base xl:text-2xl">
                              {totalOccupancy?.occupied}/{totalOccupancy?.total}
                            </p>
                          </div>
                          <p
                            className={`relative w-11/12 m-auto xl:w-full h-2 bg-primary-color/20 rounded-full overflow-hidden shadow-inner`}
                          >
                            <span
                              style={{
                                width: `${totalOccupancy?.percentage}%`,
                              }}
                              className={`absolute h-2 bg-primary-color animate-in slide-in-from-left-20 duration-1000`}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md">
                    <div className="bg-primary-color w-full max-w-20 flex items-center justify-center">
                      <div className="rounded-full p-2 xl:p-3 bg-gray">
                        <figure className="w-full h-full max-w-16 max-h-16">
                          <img
                            src={occupancy}
                            className="w-full h-full"
                            alt=""
                          />
                        </figure>
                      </div>
                    </div>
                    <div className="w-full h-full">
                      <div className="relative w-11/12 m-auto h-full md:py-0 py-4 flex items-center">
                        {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold xl:text-sm 2xl:text-lg'>Deliquency Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div> */}
                        <div className=" w-full flex flex-col gap-2 xl:gap-5 py-2">
                          <div className="w-11/12 m-auto flex justify-between">
                            <p className="text-[#9e9e9e] text-center font-semibold">
                              Good Payer
                            </p>
                            <p className="font-bold text-center text-base xl:text-2xl">
                              {totalPayer?.totalGoodPayer}/
                              {totalPayer?.totalPayer}
                            </p>
                          </div>
                          <p
                            className={`relative w-11/12 m-auto xl:w-full h-2 bg-primary-color/20 rounded-full overflow-hidden shadow-inner`}
                          >
                            <span
                              style={{
                                width: `${(totalPayer?.totalGoodPayer / totalPayer?.totalPayer) * 100}%`,
                              }}
                              className={`absolute h-2 bg-primary-color animate-in slide-in-from-left-20 duration-1000`}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-1 row-span-2 pb-3 bg-white rounded-md overflow-hidden shadow-md">
                  <div className="w-11/12 h-full m-auto flex flex-col">
                    <h1 className="text-[#9e9e9e] font-semibold py-2 lg:text-lg">
                      Concern and Issue
                    </h1>
                    <div className="w-full h-full flex items-center bg-white">
                      <CircularProgressbar
                        className="mx-auto lg:w-28 md:mx-auto md:w-40 w-32 mt-4 "
                        value={percentage || 0}
                        minValue={0}
                        text={
                          percentage
                            ? totalReports.totalReport +
                              '/' +
                              totalReports.total
                            : 0 + '/' + 0
                        }
                        strokeWidth={15}
                        styles={buildStyles({
                          textSize: '1rem',
                          textColor: '#183044',
                          pathColor: '#183044',
                          trailColor: '#E7E8E9',
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Dashboard
