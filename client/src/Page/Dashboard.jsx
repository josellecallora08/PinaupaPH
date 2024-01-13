import City from '../Image/city.png'
import BarChart from '../Component/BarChart'
import RecentAct from '../Data/RecentAct'



const Dashboard = () => {

  return (
    
    <div className='lg:ml-3 flex flex-col lg:overflow-hidden'>
      {/* Top of Dashboard> */}
      <h1 className=' m-4 my-7 text-4xl font-medium'>Dashboard</h1>
      <div className=' flex  bg-white mx-4 justify-between  pr-3 rounded-br-xl rounded-bl-xl shadow-xl shadow-dark-gray'>
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
      <div className='lg:flex lg:mt-5 '>
      
        {/* center-left of Dashboard> */}
        <div className=' h-auto lg:w-7/12 pr-3 rounded-br-xl rounded-bl-xl shadow-xl shadow-dark-gray  mx-4 pt-4 pl-5   '>
          <div>
          <h1 className=' m-4 my-7 text-xl font-medium '>Revenue Overview</h1>
          <div className='w-full'>
            <div className='px-1 py-2 border-2 w-1/2 border-light-blue flex flex-col items-center text-dark-blue'>
              <h1 className='font-black text-xl'>31,894.20</h1>
              <p className=' text-sm'>Payment for this Jan 2014</p>
            </div>
           <BarChart/>
          </div>
      
          </div>
         
        </div>
        {/* center right of Dashboard> */}
        
        <div className=' lg:w-1/2 lg:h-90 w-auto  mx-4 p-3 pt-8   rounded-br-xl rounded-bl-xl shadow-xl shadow-dark-gray  '>
        <h1 className=' m-4 text-xl font-medium '>Recent Activity</h1>
          <div className='overflow-scroll h-80' >
            <ul className="flex flex-wrap lg:m-0">
              {RecentAct.map((act, index) => (
                <li key={index} className="flex items-center gap-10 lg:gap-15 py-2 pl-3 lg:px-3">
                  <img src={act.img} alt="Profile" />
                  <div>
                    <div className="">{act.fname} {act.lname}</div>
                    
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
      <div className=' flex flex-wrap gap-2 mx-4 m-5 lg:justify-evenly ml-4'>

              <div className='  lg:w-1/4 p-3 w-[13rem] h-auto text-sm shadow-xl shadow-dark-gray rounded-xl '>
                  <h1 className=' mb-2 text-xl font-bold '>Rent Status</h1>
                  <div className='text-center'>
                    <p className='text-light-gray '>Total Paid</p>
                    <p className='text-dark-blue font-bold text-3xl'>2000</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-center'>
                      <p>20,000</p>
                      <p className='text-light-gray'>Total Paid</p>
                    </div>
                    <div className='text-center'>
                      <p>20,000</p>
                      <p className='text-light-gray'>Tenant Paid</p>
                    </div>
                  </div>
              </div>

              <div className=' p-3 w-[13rem] lg:w-1/4 h-auto text-sm shadow-xl shadow-dark-gray rounded-xl'>
                  <h1 className=' mb-2 text-xl font-bold '>Apartment Status</h1>
                  <div className='text-center'>
                    <p className='text-light-gray '>Total Paid</p>
                    <p className='text-dark-blue font-bold text-3xl'>2000</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-center'>
                      <p>20,000</p>
                      <p className='text-light-gray'>Available Unit</p>
                    </div>
                    <div className='text-center'>
                      <p>20,000</p>
                      <p className='text-light-gray'>Occupied Unit</p>
                    </div>
                  </div>
              </div>

              <div className=' p-3 w-[13rem] lg:w-1/4 h-auto text-sm shadow-xl shadow-dark-gray rounded-xl'>
                  <h1 className=' mb-2 text-xl font-bold '>Tenant Status</h1>
                  <div className='text-center'>
                    <p className='text-light-gray '>Total Paid</p>
                    <p className='text-dark-blue font-bold text-3xl'>2000</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-center'>
                      <p>20,000</p>
                      <p className='text-light-gray'>Total Paid</p>
                    </div>
                    <div className='text-center'>
                      <p>20,000</p>
                      <p className='text-light-gray'>Tenant Paid</p>
                    </div>
                  </div>
              </div>




                 
      </div>
    </div>
  )
}

export default Dashboard