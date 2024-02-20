import { useState } from 'react' 
import { useSelector } from 'react-redux';
import logo from '/logo.svg'
import m_logo from '/mobile-logo.svg'
import { Link } from 'react-router-dom'
import dashboard from '/dashboard.svg'
import tenant from '/tenant.svg'
import apartment from '/apartment.svg'
import security from '/security.svg'
import document from '/document.svg'
import report from '/report.svg'
// const Menus = [
//   {
//   title: "Dashboard",
//   path: "/dashboard",
//   icon: <MdOutlineDashboard size={30} />
  
//   },
//   {
//     title: "Tenant",
//     path: "/tenant",
//     icon: <BsPersonPlus size={30}/>
//   },
//   {
//     title: "Apartment",
//     path: "/apartment",
//     icon: <BsHouses size={30}/>

    
//   },
//   {
//     title: "Security",
//     path: "/security",
//     icon: <BiCctv size={30}/>
    
//   },  
//   {
//     title: 'Documents',
//     icon: <HiOutlineDocumentDuplicate size={30}/>,


//     subMenus: [
//       {
//         title: 'Least Agreement',
//         path: '/document/LeastAgreement',
        
//       },
//       {
//         title: 'Invoice',
//         path: '/document/invoice',

       
//       }
//     ],
//     isOpen: false},
//   {
//       title: "Concern and Issue",
//       path: "/concern&issue",
//       icon: <BiConversation size={30}/>
      
      
//   },
//   {
//     title: "Profile",
//     path: "/profile",
//     icon: <RxPerson size={30}/>
   
//  }
    
// ]

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

const Sidebar = () => {

  const menu = useSelector(state => state.menu.sidebar)
  return (
    <div className={`fixed z-10 md:static w-3/5 h-full left-0 top-20 bg-white ${menu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col md:max-w-[200px] ${menu ? 'md:w-full' :  'md:w-16'} duration-150 ease-in-out shadow-xl md:shadow-md`}>
      <figure className="max-h-20 h-full w-full flex justify-center items-center">
        <Link>
          <img src={menu ? logo : m_logo} alt="" className='duration-300 ease-in-out' />
        </Link>
      </figure>
      <nav className='w-full h-full'>
        <ul className='w-3/5 m-auto flex flex-col gap-5 mt-5 md:mt-10 text-sm'>
          <li className='w-full h-full'>
            <Link to={'/dashboard'}className={`flex items-center center w-full h-full active:bg-red-900`}>
              <figure className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}>
                <img src={dashboard} alt="" className='max-w-5 max-h-5 object-contain' />
              </figure>
              {menu ? <span className=''>Dashboard</span> : ''}
            </Link>
          </li>
          <li className='w-full h-full'>
            <Link to={'/tenant'} className='flex items-center center w-full h-full'>
              <figure className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}>
                <img src={tenant} alt="" />
              </figure>
              {menu ? <span>Tenant</span> : ''}
            </Link>
          </li>
          <li className='w-full h-full'>
            <Link to={'/apartment'} className='flex items-center center w-full h-full'>
              <figure className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}>
                <img src={apartment} alt="" />
              </figure>
              {menu ? <span className=''>Apartment</span> : ''}
            </Link>
          </li>
          <li className='w-full h-full'>
            <Link to={`/security`} className='flex items-center center w-full h-full'>
              <figure className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}>
                <img src={security} alt="" />
              </figure>
              {menu ? <span>Security</span> : ''}
            </Link>
          </li>
          <li className='w-full h-full'>
            <Link className='flex items-center center w-full h-full'>
              <figure className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}>
                <img src={document} alt="" />
              </figure>
              {menu ? <span>Document</span> : ''}
            </Link>
          </li>
          <li className='w-full h-full'>
            <Link to={`/concern&issue`} className='flex items-center center w-full h-full'>
              <figure className={`${menu ? '' : 'flex justify-center'} max-w-10 w-full h-full`}>
                <img src={report} alt="" />
              </figure>
              {menu ? <span>Reports and Concern</span> : ''}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Sidebar;