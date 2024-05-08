import {useDispatch} from 'react-redux'
import { readNotification } from '../features/notification'
import { useNavigate } from 'react-router-dom'
const Notification = ({ user, data, notifBg }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleNotif = async (id) => {
    console.log(id)
    dispatch(readNotification(id, navigate))
  }
  return (
    <>
      <div
        ref={notifBg}
        className={`fixed left-0 md:left-auto top-20 md:right-20 w-full h-fit md:max-w-[300px] md:max-h-[250px] shadow-xl bg-white rounded-md hover:overflow-y-scroll overflow-hidden p-2`}
      >
        {(data &&
          data
            ?.filter((item) => item?.receiver_id?._id === user?.user_id._id)
            .map((val, key) => (
              <button
                onClick={() => handleNotif(val._id)}
                key={key}
                className={`p-2 hover:bg-gray/50 size-full md:max-w-[300px] max-h-[50px] rounded-md overflow-hidden shadow-md m-auto my-2 flex gap-2 items-center ${!(val?.isRead) ? 'bg-primary-color/20 hover:border-primary-color hover:border' : ''}`}
              >
                <div className="flex items-center">
                  <figure className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={val?.sender_id.profile_image.image_url}
                      className="size-full object-contain"
                      alt=""
                    />
                  </figure>
                </div>
                <div className='w-full flex justify-between'>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-start text-sm md:max-w-[150px] text-ellipsis text-nowrap overflow-hidden'>New {val?.type}</span>
                    <span className='text-xs text-start max-w-[150px] lg:max-w-[150px] md:max-w-[500px] text-ellipsis text-nowrap overflow-hidden'>{val?.description}</span>
                  </div>
                  <div className='text-xs'>{new Date(val?.createdAt).toLocaleDateString()}</div>
                </div>
              </button>
            ))) ||
          'No Notifications..'}
      </div>
    </>
  )
}

export default Notification
