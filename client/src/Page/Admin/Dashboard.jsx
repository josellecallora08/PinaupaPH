import City from '/city.svg'
// import { BarChart, ColumnChart, LineChart, PieChart } from 'react-chartkick'
import BarChart from '../../Component/BarChart'
import 'chartkick/chart.js'
import user from '/pfp.svg'
import 'react-circular-progressbar/dist/styles.css';
import peso from '/peso.svg'
import delay from '/delay.svg'
import house from '/house.svg'
import { Progress } from 'flowbite-react'
import renew from '/renew.svg'
import { Bar, Chart } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Chart as ChartJS,Title,Legend} from 'chart.js/auto';
import rent from '/Rent.svg'
import occupancy from '/occupancy.svg'
import pay from '/PayDate.svg'

const Dashboard = () => {
  // const data = [
  //   {name: "Completed", data: {"2021-01-01": 3}},
  //   {name: "Incomplete", data: {"2021-01-01": 5}}
  // ];
  const percentage = 20;
  const maxValue = 40;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
  
    },
  }
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets:[
      {
        label:  'Sales for 2020',
        data: [40000,50000,20000,10000,25000],
        backgroundColor: '#183044',
        borderWidth: 1,
      },
      {
        label:  'Sales for 2021',
        data: [60000,70000,30000,40000,55000],
        backgroundColor:'gray',
      },
    ]
  }
  return (
    <>
      <div className="w-full h-full flex flex-col bg-gray pb-2">
        <div className='w-11/12 h-fit m-auto py-2'>
          <h1 className='uppercase font-bold py-1'>Dashboard</h1>
        </div>
        <div className="w-11/12 h-full m-auto grid grid-cols-3 gap-2 grid-rows-7">
          <div className='hidden md:flex col-span-3 row-span-1  rounded-md overflow-hidden shadow-md bg-primary/20'>
            <figure className='w-full h-full max-w-12 md:max-w-60'>
              <img src={City} className='w-full h-full object-contain' alt="" />
            </figure>
          </div>
          <div className='order-last md:order-none col-span-3 row-span-4 grid grid-cols-3 grid-rows-1 gap-2 '>
            <div className='col-span-3 md:col-span-2 row-span-1 w-full h-full bg-white flex items-center justify-center flex-col rounded-md overflow-hidden shadow-md'>
              <div className='w-11/12 m-auto py-2'>
                <p className='font-bold text-[#9e9e9e] lg:text-xl'>Revenue Overview</p>
              </div>
              <figure className='flex justify-center items-center h-auto md:h-full w-full  max-h-max lg:max-h-max max-w-[90%] m-auto'>
                {/* <LineChart data={{"2021-01-01": 11, "2021-01-02": 6}} width="100%" height="100%"/> */}
                <Bar data={data} options={options}/>
              </figure>
            </div>
            <div className='bg-white pb-3 col-span-3 md:col-span-1 rounded-md overflow-hidden shadow-md'>
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
              <div className='col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md'>
                <div className='w-full bg-primary max-w-20 flex items-center justify-center'>
                  <div className='rounded-full p-3 bg-gray'>
                    <figure className='w-full h-full max-w-16 max-h-16'>
                      <img src={pay} className='w-full h-full'  alt="" />
                    </figure>
                  </div>
                </div>
                <div className='w-full h-full'>
                  <div className='relative w-11/12 m-auto h-full flex items-center'>
                    {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold  xl:text-sm 2xl:text-lg'>Total Amount</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>9,000</span>
                    </div> */}
                    <div className=' w-full xl:flex flex-col gap-5'>
                      <div className='xl:flex justify-between'>
                        <p className='text-[#9e9e9e] text-xs text-center xl:text-base font-semibold'>Total Paid</p>
                        <p className='font-bold text-center text-xl xl:text-4xl'>9,000.00</p>
                      </div>
                      <p className={`relative w-full h-2 bg-primary/20 rounded-full overflow-hidden shadow-inner`}>
                        <span className={`absolute w-1/4 h-2 bg-primary`}></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md'>
                <div className='bg-primary w-full max-w-20 flex items-center justify-center'>
                <div className='rounded-full p-3 bg-gray'>
                    <figure className='w-full h-full max-w-16 max-h-16'>
                      <img src={rent} className='w-full h-full'  alt="" />
                    </figure>
                  </div>
                </div>
                <div className='w-full h-full'>
                  <div className='relative w-11/12 m-auto h-full flex items-center'>
                    {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold xl:text-sm 2xl:text-lg'>Occupancy Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div> */}
                    <div className=' w-full xl:flex flex-col gap-5'>
                      <div className='xl:flex justify-between'>
                        <p className='text-[#9e9e9e] text-xs text-center xl:text-base font-semibold'>Deliquency Rate</p>
                        <p className='font-bold text-center text-xl xl:text-4xl'>96%</p>
                      </div>
                      <p className={`relative w-full h-2 bg-primary/20 rounded-full overflow-hidden shadow-inner`}>
                        <span className={`absolute w-[96%] h-2 bg-primary`}></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md'>
                <div className='bg-primary w-full max-w-20 flex items-center justify-center'>
                  <div className='rounded-full p-3 bg-gray'>
                    <figure className='w-full h-full max-w-16 max-h-16'>
                      <img src={occupancy} className='w-full h-full'  alt="" />
                    </figure>
                  </div>
                </div>
                <div className='w-full h-full'>
                  <div className='relative w-11/12 m-auto h-full flex items-center'>
                    {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold xl:text-sm 2xl:text-lg'>Deliquency Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div> */}
                    <div className=' w-full xl:flex flex-col gap-5'>
                      <div className='xl:flex justify-between'>
                        <p className='text-[#9e9e9e] text-xs text-center xl:text-base font-semibold'>Occupancy Rate</p>
                        <p className='font-bold text-center text-xl xl:text-4xl'>54%</p>
                      </div>
                      <p className={`relative w-full h-2 bg-primary/20 rounded-full overflow-hidden shadow-inner`}>
                        <span className={`absolute w-[${'54'}%] h-2 bg-primary`}></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1 row-span-1 bg-white flex rounded-md overflow-hidden shadow-md'>
                <div className='bg-primary w-full max-w-20 flex items-center justify-center'>
                  <div className='rounded-full p-3 bg-gray'>
                    <figure className='w-full h-full max-w-6 max-h-6'>
                      <img src={renew} className='w-full h-full'  alt="" />
                    </figure>
                  </div>
                </div>
                <div className='w-full h-full '>
                  <div className='relative w-11/12 m-auto h-full flex items-center'>
                    {/* <span className='absolute md:top-2 right-0 text-end text-[#9e9e9e] text-xs font-semibold xl:text-sm 2xl:text-lg'>Renewal Rate</span>
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-lg md:text-4xl lg:text-5xl font-bold'>96%</span>
                    </div> */}
                    <div className=' w-full xl:flex flex-col gap-5'>
                      <div className='xl:flex justify-between'>
                        <p className='text-[#9e9e9e] text-xs text-center xl:text-base font-semibold'>Renewal Rate</p>
                        <p className='font-bold text-center text-xl xl:text-4xl'>66%</p>
                      </div>
                      <p className={`relative w-full h-2 bg-primary/20 rounded-full overflow-hidden shadow-inner`}>
                        <span className={`absolute w-[${'66'}%] h-2 bg-primary`}></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-4 md:col-span-1 row-span-2 pb-3 bg-white rounded-md overflow-hidden shadow-md'>
              <div className='w-11/12 h-full m-auto flex flex-col'>
                <h1 className='text-[#9e9e9e] font-semibold py-2 lg:text-lg'>Concern and Issue</h1>
                <div className='w-full h-full flex items-center bg-white'>
                  {/* <BarChart data={data} width="90%" height="80%"/> */}
                  <CircularProgressbar className='mx-auto lg:w-40 md:mx-auto md:w-40 w-32 mt-4' value={percentage} minValue={0} maxValue={maxValue} text={percentage +'/'+ maxValue} strokeWidth={15} styles={buildStyles({textColor: '#183044',pathColor: '#183044', trailColor: '#E7E8E9' })} />
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