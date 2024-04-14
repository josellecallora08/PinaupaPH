import React, { useEffect } from 'react'
import pfp from '/pfp.svg'
import { useState } from 'react'
import { TbBellRinging } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleProfile, toggleSidebar } from '../features/menu'
import menu from '/menu.svg'
import close from '/close.svg'
import { isLogout, logout } from '../features/authentication'
import { useNavigate } from 'react-router-dom'

const Headbar = () => {
  const sidebar = useSelector((state) => state.toggle.sidebar) //for sidebar ternary
  const profile = useSelector((state) => state.toggle.profile) //for profile ternary
  const user = useSelector((state) => state.auth.user)
  const [currentDate, setCurrentDate] = useState(new Date())
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(isLogout(navigate))
  }
  //function for sidebar toggle buttons
  const handleSidebar = () => {
    dispatch(toggleSidebar())
  }

  //function for profile toggle buttons
  const handleProfile = () => {
    dispatch(toggleProfile())
  }

  const pfpmenu = [
    {
      title: 'Profile',
      path: '/profile',
    },
    {
      title: 'Logout',
      path: handleLogout,
    },
  ]
  const month = [
    'January',
    'February',
    'March',
    'Apri',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const Today = new Date().getDate();
  const Month = new Date().getMonth();
  const Year = new Date().getFullYear();
  const Day = new Date().getDay();
  const Hour = new Date().getHours();
  const timeHour = Hour > 12 ? Hour - 12 : Hour === 0 ? 12 : Hour;
  const Minute = new Date().getMinutes();
  const Second = new Date().getSeconds();
  const AMPM = Hour >= 12 ? "PM" : "AM";
  
  const paddedHour = timeHour < 10 ? `0${timeHour}` : timeHour;
  const paddedMinute = Minute < 10 ? `0${Minute}` : Minute;
  const paddedSecond = Second < 10 ? `0${Second}` : Second;
  
  const completeDate = `${dayName[Day]}, ${monthName[Month]} ${Today < 10 ? `0${Today}` : Today}, ${Year} ${paddedHour}:${paddedMinute}:${paddedSecond} ${AMPM}`;
  
  
  return (
    <div className="w-full h-full max-h-20 sticky top-0 z-20 bg-primary-color">
      <div className=" flex justify-between items-center p-5 w-full relative m-auto  ">
        <div className="flex items-center gap-5">
          <button onClick={handleSidebar} className="flex items-center">
            <figure className="w-full h-full max-w-5 max-h-5">
              <img
                src={sidebar ? close : menu}
                className="w-full h-full"
                alt=""
              />
            </figure>
          </button>
          <div>
            <span className="text-gray text-sm md:text-regular font-semibold">
              {completeDate}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <TbBellRinging size={25} color="white" />
          <img
            src={user?.image}
            alt=""
            className=" w-10 h-10 rounded-full ml-2  cursor-pointer"
            onClick={handleProfile}
          />
          {profile ? (
            <ul>
              <div className="absolute top-full right-2 text-black rounded-bl-md rounded-br-md shadow-2xl bg-white shadow-light-gray   ">
                <ul>
                  <li className="text-sm font-medium w-32 py-1  hover:bg-gray pl-3 ">
                    <Link to={'/profile'}>Profile</Link>
                  </li>
                  <li className="text-sm font-medium w-32 py-1  hover:bg-gray pl-3 ">
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Headbar
