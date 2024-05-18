import { Link } from 'react-router-dom';
import banner from '/banner.svg';

const TenantCard = ({ data }) => {
  return (
    <Link to={`/tenantprofile/${data?.user_id?._id}`} className="relative block">
      <div className="flex lg:px-1 px-2 pl-3 lg:ml-0  flex-row bg-white h-[9.5rem] w-full rounded-md text-xs shadow-sm shadow-light-gray hover:scale-105 hover:z-10 hover:duration-300">
        <div className="flex-shrink-0 lg:ml-2 lg:mr-0 flex items-center ml-3 mr-6 lg:justify-start">
          <figure className="h-20 w-20 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={data?.user_id?.profile_image.image_url}
              className="h-full w-full object-cover"
              alt=""
            />
          </figure>
        </div>
        <div className="flex-1 lg:ml-1 py-4 px-2 flex flex-col justify-center">
          <p className="xl:text-lg lg:text-base md:text-base font-semibold text-lg">
            {data?.user_id?.name}

          </p>
          <p className="md:text-base text-sm font-semibold">
            {data?.user_id?.phone}
          </p>
          <p className="bg-primary-color text-white font-regular text-sm rounded-md p-2 mt-2 hover:opacity-70 w-fit">
            Balance: ₱ <span className="font-semibold ">{data?.balance || 0}</span>
          </p>
        </div>
        <div className="absolute lg:relative lg:right-0 top-2 right-2 lg:top-auto">
          <figure className="relative">
            <img src={banner} className="md:h-24" alt="" />
            <figcaption className="absolute top-0 text-white font-regular flex flex-col items-center justify-center w-full h-full pb-5">
              <span className="font-semibold text-sm">UNIT</span>
              <span className="font-semibold text-sm  ">{data?.unit_id?.unit_no}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </Link>
  );
};

export default TenantCard;
