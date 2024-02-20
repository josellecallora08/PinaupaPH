import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { toggleMenu } from '../features/toggle';
import menu from '/menu.svg'
// const pfpmenu = [
//   {
//     title: "Profile",
//     path: "/profile",
//   },
//   {
//     title: "Logout",
//     path: "/logout",

//   }
// ]
const Headbar = () => {
  const dispatch = useDispatch()
  // const menu = useSelector(state => state.menu.sidebar)
    const handleMenu = () => {
        dispatch(toggleMenu())
    }
  return (
    <div className='bg-blue w-full max-h-20 h-full flex items-center px-5 bg-blue-200'>
        <figure className='w-full h-full flex items-center'>
            <button onClick={handleMenu} className='w-fit h-full'>
                <img src={menu} alt="" className='max-w-8 max-h-8 h-full w-full active:rotate-180 duration-300' />
            </button>
        </figure>
    </div>
  )
}

export default Headbar