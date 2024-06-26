import React, { useEffect, useRef, useState } from 'react'
import { TbBellRinging } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleCloseNotif,
  toggleCloseProfile,
  toggleNotification,
  toggleProfile,
  toggleSidebar,
} from '../features/menu'
import menu from '/menu.svg'
import close from '/close.svg'
import { isLoggedin, isLogout, logout } from '../features/authentication'
import { fetchNotifications } from '../features/notification'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import { io } from 'socket.io-client'
import { insertAnnouncementNotification } from '../features/announcement'

const socket = io(`${import.meta.env.VITE_URL}/`)
const Headbar = ({ menuBtnRef }) => {
  const sidebar = useSelector((state) => state.toggle.sidebar)
  const profile = useSelector((state) => state.toggle.profile)
  const notif = useSelector((state) => state.toggle.notif)
  const user = useSelector((state) => state.auth.user)
  const notifs = useSelector((state) => state.notif.data)
  const [currentDate, setCurrentDate] = useState(new Date())
  const notifBg = useRef(null)
  const menuBg = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const handleReceiveComment = (data) => {
      dispatch(insertAnnouncementNotification(data))
    }
    socket.on('receive-announcement', handleReceiveComment)
    return () => {
      socket.off('receive-announcement', handleReceiveComment)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [])
  const handleSidebar = () => {
    dispatch(toggleSidebar())
  }

  const handleProfile = () => {
    if (profile) {
      dispatch(toggleCloseProfile())
    } else {
      dispatch(toggleProfile())
    }
  }
  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const Today = new Date().getDate()
  const Month = new Date().getMonth()
  const Year = new Date().getFullYear()
  const Day = new Date().getDay()
  const Hour = new Date().getHours()
  const timeHour = Hour > 12 ? Hour - 12 : Hour === 0 ? 12 : Hour
  const Minute = new Date().getMinutes()
  const Second = new Date().getSeconds()
  const AMPM = Hour >= 12 ? 'PM' : 'AM'

  const paddedHour = timeHour < 10 ? `0${timeHour}` : timeHour
  const paddedMinute = Minute < 10 ? `0${Minute}` : Minute
  const paddedSecond = Second < 10 ? `0${Second}` : Second

  const completeDate = `${monthName[Month]} ${Today < 10 ? `0${Today}` : Today}, ${Year} ${paddedHour}:${paddedMinute}:${paddedSecond} ${AMPM}`
  const handleNotif = () => {
    dispatch(toggleNotification())
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    dispatch(isLoggedin())
  }, [])

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        menuBg.current &&
        !menuBg.current.contains(e.target) &&
        !e.target.classList.contains('profile-img')
      ) {
        dispatch(toggleCloseProfile())
      }

      if (notifBg.current && !notifBg.current.contains(e.target)) {
        dispatch(toggleCloseNotif())
      }
    }

    document.addEventListener('mousedown', closeMenu)

    return () => {
      document.removeEventListener('mousedown', closeMenu)
    }
  }, [])
  const handleLogout = () => {
    const isConfirmed = window.confirm('Continue Logging out?')
    if (isConfirmed) {
      dispatch(isLogout(navigate))
    }
  }
  const filteredNotif = notifs?.filter(
    (item) => item?.receiver_id?._id === user?.user_id?._id && !item?.isRead,
  )

  return (
    <div className="w-full h-full max-h-20 sticky top-0 z-20 bg-primary-color">
      {notif ? (
        <Notification user={user} data={notifs} notifBg={notifBg} />
      ) : (
        ''
      )}
      <div className="flex justify-between items-center p-5 w-full relative m-auto">
        <div className="flex items-center gap-5">
          {user?.role !== 'Superadmin' && (
            <button
              ref={menuBtnRef}
              onClick={handleSidebar}
              className="flex items-center"
            >
              <img src={sidebar ? close : menu} className="w-5 h-5" alt="" />
            </button>
          )}
          <div>
            <span className="text-gray text-sm md:text-regular font-light ml-4">
              {completeDate}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          {user?.user_id?.role === 'Tenant' && (
            <button ref={notifBg} onClick={handleNotif} className="relative">
              <TbBellRinging className="mr-2" size={25} color="white" />

              <span className="absolute text-white bg-red/80 w-full max-w-[15px] rounded-full text-sm -top-2 -right-1">
                {filteredNotif && filteredNotif?.length >= 1
                  ? filteredNotif?.length
                  : ''}
              </span>
            </button>
          )}
          <img
            src={
              user?.role === 'Admin' || user?.role === 'Superadmin'
                ? user?.profile_image.image_url
                : user?.user_id.profile_image.image_url
            }
            alt=""
            className="w-10 h-10 rounded-full ml-2 cursor-pointer profile-img"
            onClick={handleProfile}
          />
         {profile && (
        <div
          ref={menuBg}
          className={"absolute right-5 top-20  bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 w-max animate-slideIn transition-transform transform "}
        >
          <div className="py-1">
            <Link to={'/profile'}>
              <button
                className="flex items-center gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300"
                onClick={handleProfile}
              >
                Profile
              </button>
            </Link>
            <Link to={'/terms&condition'}>
              <button
                className="flex items-center gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300"
                onClick={handleProfile}
              >
                Terms and Conditions
              </button>
            </Link>
            <Link to={'/contact'}>
              <button
                className="flex items-center gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300"
                onClick={handleProfile}
              >
                Contact Us
              </button>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

export default Headbar
