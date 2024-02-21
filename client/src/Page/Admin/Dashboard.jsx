import City from '/city.svg'
import BarChart from '../../Component/BarChart'
import RecentAct from '../../Data/RecentAct'



const Dashboard = () => {

  return (
   
<div className='lg:ml-3 flex flex-col lg:overflow-hidden'>
{/* Top of Dashboard> */}
<h1 className='lg:text-5xl m-4 my-7  text-4xl font-black'>Dashboard</h1>
<div className=' flex  bg-white mx-4 justify-between  pr-3 rounded-br-xl rounded-bl-xl shadow-sm shadow-dark-gray'>
    <img src={City} alt="" className=' w-40 h-auto lg:w-52 lg:h-auto '/>
    <div className='py-2'>
      <h1 className='text-3xl text-dark-blue lg:text-5xl'>Welcome Elizabeth,</h1>
      <div className='flex text-dark-blue justify-end font-medium lg:text-2xl'>
        <h3>11:03AM </h3>
        <h3>1 January 2024</h3>
      </div>
     
    </div>
</div>
{/* Center of Dashboard> */}
<div className='lg:flex lg:mt-5 mt-5 '>

  {/* center-left of Dashboard> */}
  <div className='h-auto lg:w-7/12 pr-3 rounded-br-xl rounded-bl-xl shadow-sm shadow-dark-gray  mx-4 pt-4 pl-5   '>
    <div>
    <h1 className=' text-2xl font-black'>Revenue Overview</h1>
    <p className='text-dark-gray text-sm mb-2'>Show overview Each Month</p>
    <div className='w-full'>
      <div className='flex gap-2 mb-2  '>
        <div className='px-1 py-2 border-2 w-1/2 border-light-blue rounded-md flex flex-col items-center text-dark-blue'>
          <h1 className='font-black text-xl'>31,894.20</h1>
          <p className=' text-xs'>Payment for this Jan 2014</p>
        </div>
        <div className='px-1 py-2 border-2 w-1/2 border-light-blue rounded-md flex flex-col items-center text-dark-blue'>
          <h1 className='font-black text-xl'>31,894.20</h1>
          <p className=' text-xs'>Payment for this Jan 2014</p>
        </div>
      </div>
      <BarChart/>
    </div>

    </div>
   
  </div>
  {/* center right of Dashboard recent Activity this one */}
  
  <div className=' lg:w-1/2 lg:h-full w-auto  mx-4 p-3 rounded-br-xl rounded-bl-xl shadow-sm shadow-dark-gray  '>
  <h1 className='  m-2 text-2xl font-black '>Recent Activity</h1>
    <div className=' overflow-y-auto h-96 text-xs' >
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
<div className=' flex gap-2 mx-4 m-5 h-auto  ml-4'>

        <div className='lg:w-1/4 lg:h-48 lg:text-lg p-3 w-1/2 h-auto text-xs shadow-sm shadow-dark-gray rounded-xl '>
            <h1 className=' lg:text-2xl mb-2 text-sm font-black '>Rent Status</h1>
            <div className='text-center'>
              <p className='text-light-gray '>Total Paid</p>
              <p className='lg:text-2xl text-dark-blue font-bold text-xl'>2000</p>
            </div>
            <div className='flex justify-between'>
              <div className='text-center'>
                <p className=''>20,000</p>
                <p className='text-light-gray'>Total Paid</p>
              </div>
              <div className='text-center '>
                <p className=''>20,000</p>
                <p className=' text-light-gray'>Tenant Paid</p>
              </div>
            </div>
        </div>
        
        <div className='lg:w-1/4 lg:h-48 lg:text-lg p-3 w-1/2 h-auto text-xs shadow-sm shadow-dark-gray rounded-xl '>
            <h1 className=' lg:text-2xl mb-2 text-sm font-black '>Apartment Status</h1>
            <div className='text-center'>
              <p className='text-light-gray '>Available Unit</p>
              <p className='lg:text-2xl text-dark-blue font-bold text-xl'>10</p>
            </div>
            <div className='flex justify-between'>
              <div className='text-center'>
                <p className=''>20</p>
                <p className='text-light-gray'>Total Unit</p>
              </div>
              <div className='text-center '>
                <p className=''>10</p>
                <p className=' text-light-gray'>Occupied Unit</p>
              </div>
            </div>
        </div>           
  </div>
</div>

  )
}

export default Dashboard