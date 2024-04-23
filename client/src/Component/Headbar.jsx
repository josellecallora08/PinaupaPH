import React, { useEffect, useRef } from 'react'
import pfp from '/pfp.svg'
import { useState } from 'react'
import { TbBellRinging } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCloseNotif, toggleCloseProfile, toggleNotification, toggleProfile, toggleSidebar } from '../features/menu'
import menu from '/menu.svg'
import close from '/close.svg'
import { isLogout, logout } from '../features/authentication'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'

const Headbar = () => {
  const sidebar = useSelector((state) => state.toggle.sidebar) //for sidebar ternary
  const profile = useSelector((state) => state.toggle.profile) //for profile ternary
  const notif = useSelector((state) => state.toggle.notif)
  const user = useSelector((state) => state.auth.user)
  const notifBg = useRef(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const menuBg = useRef(null)
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
    console.log("asdasd ", profile)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const closeMenu = (e) => {
      // Check if the click occurred outside the menu
      if (menuBg.current && !menuBg.current.contains(e.target)) {
        dispatch(toggleCloseProfile());
        // Call handleProfile if the click was outside the menu
      }
      
      if(notifBg.current && !notifBg.current.contains(e.target)){
        dispatch(toggleCloseNotif());
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', closeMenu);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []); // Include menu and handleProfile in the dependency array

  // const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

  const completeDate = `${monthName[Month]} ${Today < 10 ? `0${Today}` : Today}, ${Year} ${paddedHour}:${paddedMinute}:${paddedSecond} ${AMPM}`;
  const handleNotif = () => {
    dispatch(toggleNotification())
  }

  return (
    <div  className="w-full h-full max-h-20 sticky top-0 z-20 bg-primary-color">
       {notif ? <Notification notifBg = {notifBg} /> : ''}
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
            <span className="text-gray text-sm md:text-regular font-light">
              {completeDate}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={handleNotif} className='relative'>
            <TbBellRinging size={25} color="white" />
            <span className='absolute text-white bg-red/80 w-full max-w-[15px] rounded-full text-sm -top-2 -right-1'>1</span>
          </button>
         
          <img
            src={user?.image}
            alt=""
            className=" w-10 h-10 rounded-full ml-2  cursor-pointer"
            onClick={handleProfile}
          />
          {profile ? (
            <div ref={menuBg} className="absolute top-full right-2 text-black rounded-bl-md rounded-br-md shadow-2xl bg-white shadow-light-gray overflow-hidden">
              <ul>
                <li className="text-base font-regular px-5 hover:bg-gray py-2 overflow-hidden">
                  <Link to={'/profile'}>Profile</Link>
                </li>
                <li className="text-base font-regular px-5 hover:bg-gray py-2 overflow-hidden">
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Headbar
