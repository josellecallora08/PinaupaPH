
import pfp from '/pfp.svg'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from 'react-router-dom';
const TenantCard = () => {

  return (
    <Link to={"/tenantprofile"}>
      <div className='lg:w-1/2 lg:h-64 lg:flex-wrap flex p-4 w-96 h-56 bg-white  ml-4 mt-5 rounded-md relative shadow-2xl shadow-light-gray'>
      <div>
        <img src={pfp} alt="" className='lg:w-20 lg:h-20 w-12 h-12 rounded-full' />
      </div>
      <div className='lg:ml-10 lg:text-lg ml-2 mt-8 flex flex-col gap-1 '>
        <p>Name:</p>
        <p>Contacts:</p>
        <p>Monthly Rent:</p>
        <p>Deposit:</p>
        <p>Date of Renewal:</p>
      </div>
      <div className='absolute top-0 right-10 bg-lime py-2 px-4 flex flex-col items-center justify-center text-white font-bold text-sm'> 
        <span>Unit</span>
        <span className='text-lg'>001</span>
      </div>
      <BiDotsHorizontalRounded className='absolute top-0 right-1' size={30}/>
      <button className='absolute bottom-2 right-2 bg-red py-1 px-3 rounded-lg text-white'>End Lease</button>
    </div>
    </Link>
    
  )
}

export default TenantCard