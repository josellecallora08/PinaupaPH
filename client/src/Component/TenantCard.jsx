import { Link } from 'react-router-dom'
import banner from '/banner.svg'
const TenantCard = ({ data }) => {
  return (
    <Link to={`/tenantprofile/${data._id}`} className="relative">
      <div className="lg:text-base flex bg-white    w-full  h-[11rem]  rounded-md relative text-xs shadow-sm shadow-light-gray  hover:scale-105 hover:transition hover:z-10 hover:ease-in hover:duration-100 ">
        <div className='lg:ml-2 size-full max-w-28 flex items-center justify-center'>
          <figure className='size-full max-h-20 max-w-20 rounded-full overflow-hidden'>
            <img
              src={data?.image}
              className=""
              alt=""
            />
          </figure>
        </div>
        <div className="lg:-ml-2 ml-3 mt-8 flex flex-col gap-1 ">
          <p className="xl:text-lg lg:text-sm md:text-base font-semibold text-lg mr-24">
            
            <span>{data.name}</span>
          </p>
          <p className="md:text-base text-sm font-semibold">{data.phone}</p>
          <p className="bg-primary-color  text-white font-regular text-sm rounded-md p-2 w-36 mt-2 hover:opacity-70">
            Balance:  ₱ 
            <span className="font-semibold">
              {data.balance ? data.balance : 0}
            </span>
          </p>
        </div>
        <div className="absolute right-2 ">
          <figure className="relative">
            <img src={banner} className='md:h-24' alt="" />
            <figcaption className="absolute top-0 text-white font-regular flex flex-col items-center justify-center w-full h-full pb-5">
              <span className="font-semibold">UNIT</span>
              <span>123</span>
            </figcaption>
          </figure>
        </div>
        {/* <div className='min-[375px]:w-10 lg:right-8 lg:h-28 lg:w-16 h-28 w-14 absolute top-0 right-2 bg-dark-blue text-white font-bold text-sm'> 
        <div className='flex flex-col mt-2 items-center'>
          <span className='-ml-1 font-light'>Unit</span>
          <span className='min-[375px]:text-base lg:text-base lg:mb-2 text-xl font-black'>{data.unit_no}</span>
        </div>
        <div className='min-[375px]:w-10 min-[375px]:right-1 lg:h-16  lg:top-[65px] lg:left-0 lg:w-full absolute w-12 h-14 right-2 top-20 rotate-45  bg-white   '></div>
      </div> */}
      </div>
    </Link>
  )
}

export default TenantCard
