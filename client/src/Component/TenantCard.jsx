
import pfp from '/pfp.svg'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from 'react-router-dom';
const TenantCard = () => {

  return (
    <Link to={"/tenantprofile"}>
      <div className='lg:w-1/2 lg:h-52 lg:flex-wrap flex p-4 w-96 h-48 bg-white  ml-4 mt-5 rounded-md relative shadow-2xl shadow-light-gray'>
      <div>
        <img src={pfp} alt="" className='lg:w-20 lg:h-20 lg:mt-10 w-12 h-12 rounded-full' />
      </div>
      <div className='lg:ml-10 text-sm ml-2 mt-8 flex flex-col gap-1 '>
        <p className='font-black text-xl'>Name: Roland Angeles Jr</p>
        <p>Contacts: 09568741247</p>
        <p>Monthly Rent: ₱10,000</p>
        <p>Deposit: ₱10,000</p>
        <p>Date of Occupancy: 10/24/24</p>
      </div>
      <div className=' lg:right-8 lg:h-28 lg:w-16 h-28 w-14 absolute top-0 right-2 bg-blue   text-white font-bold text-sm'> 
        <div className='flex flex-col mt-2 items-center'>
          <span className='-ml-1 '>Unit</span>
          <span className='lg:text-xl text-xl font-black'>001</span>
        </div>
        <div className='lg:h-16 lg:top-20 lg:left-0 lg:w-full absolute w-12 h-14 right-2 top-20 rotate-45  bg-white   '></div>
      </div>
      
    </div>
    </Link>
    
  )
}

export default TenantCard