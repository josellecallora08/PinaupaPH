
import logo from '../Image/logo.png'
import pfp from '../Image/pfp.png'
import { useState } from 'react' 
import {FaBars,FaX} from 'react-icons/fa6'
import { MdOutlineDashboard } from "react-icons/md";
import { FaAngleDown,FaAngleUp } from 'react-icons/fa6'
import { BsPersonPlus } from "react-icons/bs";
import { BsHouses } from "react-icons/bs";
import { BiCctv } from "react-icons/bi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { BiConversation } from "react-icons/bi";
import { RxPerson } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { TbBellRinging } from "react-icons/tb";
import { RiArrowDropRightLine } from "react-icons/ri";

const Menus = [
  {
  title: "Dashboard",
  path: "/dashboard",
  icon: <MdOutlineDashboard size={30} />
  
  },
  {
    title: "Tenant",
    path: "/tenant",
    icon: <BsPersonPlus size={30}/>
  },
  {
    title: "Apartment",
    path: "/apartment",
    icon: <BsHouses size={30}/>

    
  },
  {
    title: "Security",
    path: "/security",
    icon: <BiCctv size={30}/>
    
  },  
  {
    title: 'Documents',
    path: '/document',
    icon: <HiOutlineDocumentDuplicate size={30}/>,


    subMenus: [
      {
        title: 'Least Agreement',
        path: '/document/LeastAgreement',
        cName: 'sub-nav',
      },
      {
        title: 'Invoice',
        path: '/document/invoice',

        cName: 'sub-nav',
      }
    ],
    isOpen: false},
  {
      title: "Concern and Issue",
      path: "/concern&issue",
      icon: <BiConversation size={30}/>
      
      
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <RxPerson size={30}/>
   
 }
    
]

const pfpmenu = [
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Logout",
    path: "/logout",

  }
]

const Sidebar = () => {
  const [Menu, SetMenu] = useState(Menus);
  const [isOpen, setIsOpen] = useState(true);
  const [Open, setOpen] = useState(true);
  const [MenuOpen, setMenuOpen] = useState(true);

  const setSubMenuOpen = (index) => {
    SetMenu((prevMenus) =>
      prevMenus.map((menu, i) => {
        if (i === index) {
          return { ...menu, isOpen: !menu.isOpen };
        }
        return menu;
      })
    );
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const togglepfp = () => {
    setOpen(!Open);
  };
  const toggleMenu = () => {
    setMenuOpen(!MenuOpen);
    SetMenu((prevMenus  ) => prevMenus.map((menu) => ({ ...menu, isOpen: false })));
  
  }



  const toggleDocumentsSubMenu = () => {
    toggleMenu();
    setSubMenuOpen(4); 
   ;
  };

  return (
    <>
      <div className='lg:hidden bg-light-blue text-white px-4 h-10 flex items-center '>
        <div>
        <div className='cursor-pointer'>
          {isOpen ? <FaBars onClick={toggleSidebar} /> : <FaX onClick={toggleSidebar} />}
        </div>
        </div>
     
        <div className='ml-auto flex items-center'>
          <TbBellRinging />
          <img src={pfp} alt="" className={`w-6 h-6 rounded-full ml-2 relative cursor-pointer  `} onClick={togglepfp} />
        </div>
    
        {
          Open &&(
            <div className='absolute top-10 right-2 text-black bg-red rounded-bl-md rounded-br-md    '>
          <ul>
        
           {
            pfpmenu.map((menu, index) => (
              <li key={index} className='text-sm font-medium w-32 py-1  hover:bg-gray pl-3 '><Link to={menu.path}>{menu.title}</Link></li>
            ))
           }  
          </ul>
        </div>
          )
        }

        
      </div>

      <div className={`lg:block lg:pl-6 ${isOpen ? 'hidden ' : 'w-48 px-2'}${MenuOpen ?" w-72":"w-20"} bg-white text-black shadow-xl z-[999] w-[20rem] max-w-[16rem] h-screen overflow-hidden lg:overflow-visible lg:relative  `}>
        <div className={`lg:cursor-pointer lg:absolute lg:top-1/2 lg:-right-5 lg:bg-white lg:border-2 lg:rounded-full lg:duration-200  ${!MenuOpen &&"rotate-180"}`} >
          <RiArrowDropRightLine size={30} className='hidden lg:block'onClick={toggleMenu}/>
        </div>
          {/*Desktop */}
        <Link to='/dashboard' className={`lg:items-center lg:justify-center lg:mt-10 hidden lg:block lg:italic lg:text-dark-blue`}>
        {MenuOpen ? <img src={logo} alt="logo" />:<span className='text-3xl lg:text-5xl'>P</span>}
        </Link>
        {/*mobile */}
        <Link to='/dashboard' className={` lg:items-center lg:justify-center lg:mt-10 lg:hidden`}>
        <img src={logo} alt="logo" />
        </Link>




        <div className="mt-10" >
          {Menu.map((menu, index) => (
            <div key={index}>
              <div>
                {menu.subMenus ? (
                  <div>
                    <Link
                      to={menu.path}
                      className={`flex items-center cursor-pointer p-3 pl-0 ` }
                      onClick={() => setSubMenuOpen(index)}
                    >
                      <div className="mr-2">{menu.icon}</div>
                      <div className={`lg:${!MenuOpen && "hidden"}`} >{menu.title}</div>
                      {menu.isOpen ? <FaAngleUp className='ml-10' /> : <FaAngleDown className='ml-10' />}
                    </Link>
                    {menu.isOpen && menu.subMenus && (
                      <div className="ml-4">
                        {menu.subMenus.map((subMenu, subIndex) => (
                          <Link key={subIndex} to={subMenu.path} className="flex items-center">
                            <div className="mr-6 mb-10">{subMenu.icon}</div>
                            <div>{subMenu.title}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={menu.path} className={`flex items-center cursor-pointer p-3 pl-0  `} >
                    <div className={`mr-2`}>{menu.icon}</div>
                    <div className={`lg:${!MenuOpen && "hidden"} lg:duration-200`}>{menu.title}</div>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;