import { Link } from 'react-router-dom'
const Notification = ({ user, data, notifBg }) => {
  return (
    <>
      <div
        ref={notifBg}
        className={`fixed left-0 md:left-auto top-20 md:right-20 w-full h-fit md:max-w-[300px] md:max-h-[300px] shadow-xl bg-white rounded-md hover:overflow-y-scroll overflow-hidden p-2`}
      >
        {(data &&
          data
            ?.filter((item) => item?.receiver_id?._id === user?.user_id._id)
            .map((val, key) => (
              <Link
                to={val?.url}
                key={key}
                className="p-2 hover:bg-gray/50 size-full md:max-w-[300px] max-h-[50px] rounded-md shadow-md m-auto my-2 flex gap-2 items-center"
              >
                <div className="flex items-center">
                  <figure className="size-full max-w-10 max-h-10 rounded-full overflow-hidden">
                    <img
                      src={val?.sender_id.profile_image.image_url}
                      className="size-full object-contain"
                      alt=""
                    />
                  </figure>
                </div>
                <div></div>
              </Link>
            ))) ||
          'No Notifications..'}
      </div>
    </>
  )
}

export default Notification
