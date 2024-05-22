import React, { useEffect } from 'react'
import City from '/city.svg'
import renew from '/renew.svg'
import invoice_img from '/invoice__.svg'
import pfp from '/pfp.svg'
import ann from '/announcement_img.svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isLoggedin } from '../../features/authentication'
import Calendar from '../../Component/Tenant Component/Calendar'
import issue from '/Issue.svg'
import { tenantInvoice } from '../../features/invoice'
import { recentAnnouncement } from '../../features/announcement'
import { fetchReports } from '../../features/report'
const TenantHome = () => {
  const loading = useSelector((state) => state.auth.loading)
  const user = useSelector((state) => state.auth.user)
  const invoice = useSelector((state) => state.invoice.single)
  const announcement = useSelector((state) => state.announcement.single)
  const report = useSelector((state) => state.report.data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(isLoggedin())
    dispatch(tenantInvoice())
    dispatch(recentAnnouncement())
    dispatch(fetchReports())
  }, [])
  
  return (
    <>
      <style jsx>{`
        .truncate-title {
          display: block;
          max-width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      {loading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        <div className="w-full h-full md:h-auto xl:h-full overflow-y-auto xl:max-h-auto flex flex-col items-start bg-white1">
          <div className="w-11/12 h-fit  m-auto py-5 lg:py-0 ">
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
                  Hey,{' '}
                  <span className="capitalize">
                    {user?.user_id.name?.split(' ')[0]}!
                  </span>
                </span>
              </div>
            </div>

            {/* Issue Card */}
            <div className="md:order-none mt-[0.1px] col-span-2 row-span-4 bg-white order-3 ">
              <div className="w-full h-fit py-4  flex items-center gap-3 text-black p-2 ">
                <div>
                  <img src={issue} alt="" className="w-10 h-10" />
                </div>
                <div>CONCERN AND ISSUE STATUS</div>
              </div>
              <div className=" overflow-y-auto h-40">
                <table className="w-full">
                  <tbody className="text-primary-color">
                    {report &&
                    report.filter(
                      (item) =>
                        item?.sender_id?.user_id?._id === user?.user_id?._id,
                    ).length > 0 ? (
                      report
                        .filter(
                          (item) =>
                            item?.sender_id?.user_id?._id ===
                            user?.user_id?._id,
                        )
                        .map((val, key) => (
                          <tr key={key} className="border-b border-dark-gray">
                            <Link to={`/view-concern/${val?._id}`}></Link>
                            <td className="px-4 py-2" key={key}>
                              <div className="flex items-center gap-3 w-fit">
                                <div
                                  className={`md:w-2 md:h-2 w-2 h-2 rounded-full ${val?.status ? 'bg-blue' : 'bg-red'}`}
                                ></div>
                                <div className="truncate-title md:text-sm text-xs">
                                  {val?.title}
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-2 md:text-sm text-xs">
                              <span className="hidden">
                                {new Date(val?.createdAt).toDateString()}
                              </span>
                              <span className="">
                                {new Date(val?.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="px-4 py-2 flex items-center gap-3">
                              <div className="flex items-center gap-3 bg-gray rounded-full w-full md:pr-20 p-2">
                                <img
                                  src={
                                    val?.sender_id?.user_id.profile_image
                                      ?.image_url
                                  }
                                  alt="tenantlogo"
                                  className="w-6 h-6 rounded-full"
                                />
                                <div className="md:text-sm text-xs text-ellipsis text-nowrap w-52 max-w-[100px] md:max-w-[300px] overflow-hidden">
                                  {val?.description}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-lg font-semibold text-center"
                        >
                          No Data Found...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className=" md:order-none col-span-1 row-span-5 h-full bg-white flex flex-col order-3">
              {invoice ? (
                <>
                  <div className="w-full  bg-primary-color  h-[3.8rem] flex items-center text-lg  text-white p-2">
                    Payment
                  </div>
                  <div className="text-primary-color mt-5 px-2">
                    <h1 className="text-lg">Invoice Number</h1>
                    <p className="text-xl font-semibold my-5">
                      {invoice?.pdf.reference}
                    </p>
                    <div className="flex justify-between my-8 font-thin">
                      <div>Rent</div>
                      <div>
                        {invoice?.amount?.toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between my-8 font-thin">
                      <div>Balance</div>
                      <div>
                        {invoice?.tenant_id?.balance?.toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between my-8 font-thin">
                      <div>Date</div>
                      <div>{new Date(invoice?.createdAt)?.toDateString()}</div>
                    </div>
                  </div>
                  {/* buttons */}
                  <div className="flex flex-col mt-auto cursor-not-allowed">
                    {invoice?.isPaid === true &&
                    invoice?.tenant_id?.balance <= 0 ? (
                      <div>
                        <div className="flex justify-center  w-full ">
                          <div className="bg-primary-color justify-center items-center flex flex-col w-full text-white p-5 text-center text-xl">
                            <span className="flex">
                              <span className="mr-2">Paid</span>
                              {parseInt(
                                invoice?.payment?.amountPaid,
                              )?.toLocaleString('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                              })}
                            </span>
                            <span className="text-sm mt-2">
                              {new Date(invoice?.datePaid).toDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={`/tenant/payment/${invoice?._id}`}
                        className="bg-primary-color w-full text-white p-5 text-center hover:opacity-80 hover:scale-105 duration-200"
                      >
                        Pay Now
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <div className="w-full h-[3.8rem] flex items-center text-lg  bg-primary-color text-white p-2">
                      Payment
                    </div>
                    <div className=" flex items-center py-10 justify-center gap-20 flex-col">
                      <div>
                        <img className="size-full " src={invoice_img} />
                      </div>

                      <div className="h-20 text-center w-full font-regular text-xl font-semibold">
                        No existing invoice yet.
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Calendar Card */}
            <div className="md:order-none col-span-1 row-span-1 bg-white h-fit order-last ">
              <div className="flex items-center text-lg   w-full h-[3.8rem] bg-primary-color text-white p-2">
                Calendar
              </div>
              <div className="w-full h-full">
                <Calendar user={user} invoice={invoice} />
              </div>
            </div>

            {/* Announcement Card */}
            <div className="md:order-none col-span-1 row-span-1 h-[24.3rem] bg-white order-2">
              <div className="w-full flex items-center text-lg bg-primary-color text-white p-2 h-[3.8rem]">
                Announcement
              </div>
              <div className="w-full h-fit py-4">
                {(announcement && (
                  <>
                    <div className="md:mt-2 flex p-3 justify-between text-primary-color mr-5  ">
                      <div className="flex justify-between  items-center gap-4">
                        <img
                          src={announcement?.user_id?.profile_image?.image_url}
                          alt=""
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="lg:text-lg text-base mr-2">
                          <p>{announcement?.user_id?.name}</p>
                          <p className="text-dark-gray text-xs lg:text-base">
                            Landlord
                          </p>
                        </div>
                      </div>
                      <div className="text-sm lg:mt-2 mt-[0.7rem]">
                        {new Date(announcement?.createdAt).toDateString()}
                      </div>
                    </div>
                    <div className="text-primary-color  px-5">
                      <h1 className="text-center mb-2 lg:text-2xl text-xl lg:mt-0 mt-2">
                        {announcement?.title}
                      </h1>

                      <p className=" overflow-y-auto h-[200px] lg:text-base text-sm mt-5  ">
                        {announcement?.description}
                      </p>
                    </div>
                  </>
                )) || (
                  <div>
                    <img src={ann} className="size-full max-h-60" />
                    <p className='text-center font-bold'>No Announcement yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TenantHome
