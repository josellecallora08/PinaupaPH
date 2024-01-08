
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

const Menus = [
  {
  title: "Dashboard",
  path: "/dashboard",
  icon: <MdOutlineDashboard />
  },
  {
    title: "Tenant",
    path: "/tenant",
    icon: <BsPersonPlus />
  },
  {
    title: "Apartment",
    path: "/apartment",
    icon: <BsHouses />
    
  },
  {
    title: "Security",
    path: "/security",
    icon: <BiCctv />
    
  },  
  {
    title: 'Documents',
    path: '/document',
    icon: <HiOutlineDocumentDuplicate />,


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
      icon: <BiConversation />
      
      
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <RxPerson />
   
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

  const toggleDocumentsSubMenu = () => {
    // Toggle the submenu for "Documents" separately
    setSubMenuOpen(4); 
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
          <img src={pfp} alt="" className='w-6 h-6 rounded-full ml-2 relative cursor-pointer' onClick={togglepfp} />
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

      <div className={`lg:block lg:pl-6 ${isOpen ? 'hidden ' : 'w-48 px-2'}bg-white text-black shadow-xl z-[999] w-[20rem] max-w-[16rem] h-screen overflow-hidden `}>
        
        <Link to="/dashboard" className="cursor-pointer"><img src={logo} alt="" className='m-auto' /></Link>

        <h1 className="py-5 text-xl ml-20 mt-10">
          <div className="block">
            Menu
          </div>
        </h1>
        <div className="mt-4">
          {Menu.map((menu, index) => (
            <div key={index}>
              <div>
                {menu.subMenus ? (
                  <div>
                    <Link
                      to={menu.path}
                      className="flex items-center cursor-pointer p-3"
                      onClick={() => setSubMenuOpen(index)}
                    >
                      <div className="mr-2">{menu.icon}</div>
                      <div>{menu.title}</div>
                      {menu.isOpen ? <FaAngleUp className='ml-14' /> : <FaAngleDown className='ml-14' />}
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
                  <Link to={menu.path} className="flex items-center cursor-pointer p-3">
                    <div className="mr-2">{menu.icon}</div>
                    <div>{menu.title}</div>
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