import City from '/city.svg'
import { BarChart, ColumnChart, LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import user from '/pfp.svg'
import 'react-circular-progressbar/dist/styles.css';
import peso from '/peso.svg'
import delay from '/delay.svg'
import house from '/house.svg'
import renew from '/renew.svg'
const Dashboard = () => {
  const data = [
    {name: "Completed", data: {"2021-01-01": 3}},
    {name: "Incomplete", data: {"2021-01-01": 5}}
  ];
  return (
    <>
      <div className="w-full  h-full flex flex-col bg-gray pb-2">
        <div className='w-11/12 h-fit m-auto py-2'>
          <h1 className='uppercase font-bold py-1'>Dashboard</h1>
        </div>
        <div className="w-11/12 h-full m-auto grid grid-cols-3 gap-2 grid-rows-7">
          <div className='hidden md:flex col-span-3 row-span-1 bg-blue'>
          </div>
          <div className='order-last md:order-none col-span-3 row-span-4 grid grid-cols-3 grid-rows-1 gap-2'>
            <div className='col-span-3 md:col-span-2 row-span-1 w-full h-full bg-white flex flex-col'>
              <div className='w-11/12 m-auto py-2'>
                <p className='font-bold text-[#9e9e9e] lg:text-xl'>Revenue Overview</p>
              </div>
              <figure className='flex justify-center items-center h-auto md:h-full w-full pb-5 max-h-40 md:max-h-max max-w-[90%] m-auto'>
                <LineChart data={{"2021-01-01": 11, "2021-01-02": 6}} width="100%" height="100%"/>
              </figure>
            </div>
            <div className='bg-white pb-3 col-span-3 md:col-span-1'>
              <div className='w-11/12 h-full m-auto flex flex-col group'>
                <h1 className='text-[#9e9e9e] font-semibold py-2 lg:text-xl'>Recent Activity</h1>
                <div className=' w-full h-full overflow-hidden md:group-hover:overflow-y-scroll'>
                  <div className='w-full h-auto md:max-h-[200px]'>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2'>
                      <article className='flex items-center gap-2'>
                        <figure className='w-full h-full max-w-10 max-h-10 overflow-hidden'>
                          <img src={user} className='w-full h-full object-contain' alt="" />
                        </figure>
                        <div className=''>
                          <p className='font-semibold'>Joselle E. Callora</p>
                          <p className='text-xs overflow-hidden text-ellipsis max-w-40 text-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, eligendi.</p>
                        </div>
                      </article>
                      <div>
                        <span className='text-xs'>01/02/24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-3 row-span-2 grid grid-cols-4 md:grid-cols-3 grid-flow-row md:grid-rows-2 gap-2'>
            <div className='col-span-4 md:col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-2'>
              <div className='col-span-1 row-span-1 bg-white flex'>
                <div className='bg-primary w-full max-w-20 flex items-center justify-center'>
                  <figure className='w-full h-full max-w-10 max-h-10'>
                   <img src={peso} className='w-full h-full'  alt="" />
                  </figure>
                </div>
                <div className='w-full h-full'>
                  <div className='relative w-11/12 m-auto h-full'>
                    <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold lg:text-lg'>Total Amount</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>9,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1 row-span-1 bg-white flex'>
                <div className='bg-primary w-full max-w-20 flex items-center justify-center'>
                  <figure className='w-full h-full max-w-10 max-h-10'>
                   <img src={house} className='w-full h-full'  alt="" />
                  </figure>
                </div>
                <div className='w-full h-full'>
                  <div className='relative w-11/12 m-auto h-full'>
                    <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold lg:text-lg'>Occupancy Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1 row-span-1 bg-white flex'>
                <div className='bg-primary w-full max-w-20 flex items-center justify-center'>
                  <figure className='w-full h-full max-w-10 max-h-10'>
                   <img src={delay} className='w-full h-full'  alt="" />
                  </figure>
                </div>
                <div className='w-full h-full'>
                  <div className='relative w-11/12 m-auto h-full'>
                    <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold lg:text-lg'>Deliquency Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1 row-span-1 bg-white flex'>
                <div className='bg-primary w-full max-w-20 flex items-center justify-center'>
                  <figure className='w-full h-full max-w-10 max-h-10'>
                   <img src={renew} className='w-full h-full'  alt="" />
                  </figure>
                </div>
                <div className='w-full h-full'>
                  <div className='relative w-11/12 m-auto h-full'>
                    <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold lg:text-lg'>Renewal Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-4 md:col-span-1 row-span-2 pb-3 bg-white'>
              <div className='w-11/12 h-full m-auto flex flex-col'>
                <h1 className='text-[#9e9e9e] font-semibold py-2 lg:text-lg'>Concern and Issue</h1>
                <div className='w-full h-full bg-white'>
                  <BarChart data={data} width="90%" height="80%"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard