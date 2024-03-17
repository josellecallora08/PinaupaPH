import City from '/city.svg'
import BarChart from '../../Component/BarChart'
import RecentAct from '../../Data/RecentAct'


import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Progressbar from '../../Component/Progressbar';

const Dashboard = () => {
  const percentage = 20;
  const maxValue = 40;
  return (
   
<div className='min-[1440px]:mr-10 lg:pl-3 bg-white1  flex flex-col lg:overflow-hidden'>
{/* Top of Dashboard> */}
<h1 className='uppercase font-bold p-5'>Dashboard</h1>

<div className='lg:items-center flex mx-4 justify-between pr-3 '>
    <img src={City} alt="" className='lg:h-auto lg:w-52 w-30 h-auto   '/>
    <div className='py-2'>
      <h1 className='lg:text-4xl text-xl font-bold text-dark-blue '>Welcome Elizabeth</h1>
    </div>
</div>
{/* Center of Dashboard> */}
<div className='lg:flex lg:mt-5 mt-5 '>

  {/* center-left of Dashboard> */}
  <div className=' lg:w-7/12  lg:mb-0 bg-white pr-3 rounded-br-xl h-auto rounded-bl-xl shadow-sm shadow-dark-gray mb-5  mx-4 pt-4 pl-5   '>
    <div>
    <h1 className=' text-2xl font-black'>Revenue Overview</h1>
    <p className='text-dark-gray text-sm mb-2'>Show overview Each Month</p>
    <div className='w-full pt-5'>
      
      <BarChart/>
    </div>

    </div>
   
  </div>
  {/* center right of Dashboard recent Activity */}
  
  <div className=' lg:w-1/2  w-auto bg-white  mx-4 p-3 rounded-br-xl rounded-bl-xl shadow-sm shadow-dark-gray  '>
  <h1 className='  m-2 text-2xl font-black '>Recent Activity</h1>
    <div className=' lg:h-96 overflow-y-auto h-96 text-xs bg-white' >
      <ul className="flex flex-wrap lg:m-0">
        {RecentAct.map((act, index) => (
          <li key={index} className="flex items-center gap-10 lg:gap-15 py-2 pl-3 lg:px-3">
            <img src={act.img} alt="Profile" />
            <div>
              <div className=" text-sm font-black">{act.fname} {act.lname}</div>
              
              <div className="text-light-gray">{act.date}</div>
            </div>
              
            <div className="text-light-gray">{act.status}</div>
          </li>
        ))}
      </ul>

    </div>
   
  </div>
</div>
{/* Bottom of Dashboard> */}

 <div className='lg:flex-row lg:gap-10 flex flex-col-reverse mx-4'>
          {/* Bottom-left of Dashboard> */}
    <div className='mb-4 lg:w-1/2'>
          <Progressbar/>
    </div>
    {/* Bottom-right of Dashboard> */}
    <div className='min-[1440px]:w-[47%] lg:w-1/2 lg:ml-24  lg:mx-auto lg:pl-7  md:w-full  bg-white p-3 my-3 rounded-lg shadow-sm shadow-gray-400'>
      <h1 className='md:text-center text-xl'>Concern and Issue Resolved</h1>
      <CircularProgressbar className='mx-auto lg:w-40 md:mx-auto md:w-40 w-32 mt-4' value={percentage} minValue={0} maxValue={maxValue} text={percentage +'/'+ maxValue} strokeWidth={15} styles={buildStyles({textColor: '#183044',pathColor: '#183044', trailColor: '#E7E8E9' })} />
    </div>
 </div>

</div>

  )
}

export default Dashboard