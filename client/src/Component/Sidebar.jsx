
import logo from '/mobile-pinaupa-logo.svg'
import pfp from '/pfp.svg'
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
    icon: <HiOutlineDocumentDuplicate size={30}/>,


    subMenus: [
      {
        title: 'Least Agreement',
        path: '/document/LeastAgreement',
        
      },
      {
        title: 'Invoice',
        path: '/document/invoice',

       
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

  //useState to trach the changes of properties :D
  const [Menu, SetMenu] = useState(Menus);
  const [isOpen, setIsOpen] = useState(true);
  const [Open, setOpen] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);

  //SubMenu Function to control the open and close of Sub Menu
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
  //To toggle the Sidebar for Mobile View
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  //Toggle the profiel Picture menu
  const togglepfp = () => {
    setOpen(!Open);
  };
  //To Open and Close the Sidebar for Desktop
  const toggleMenu = () => {
    setMenuOpen(!MenuOpen);
    SetMenu((prevMenus  ) => prevMenus.map((menu) => ({ ...menu, isOpen: false })));
  
  }
//It toggle to close the submenu of Documents
  const toggleDocumentsSubMenu = () => {
    toggleMenu();
    setSubMenuOpen(4); 
   ;
  };

  return (
    <>
      <div className='lg:hidden bg-dark-blue text-white px-4 h-12 flex items-center'>
        <div className='cursor-pointer lg:hidden'>
          <FaBars onClick={toggleSidebar} size={20}color='white'  /> 
        </div>
        <div className='ml-auto flex items-center'>
          <TbBellRinging color='white' size={20} />
          <img src={pfp} alt="" className={`w-8 h-auto rounded-full ml-2 relative cursor-pointer  `} onClick={togglepfp} />
        </div>
    
        {
          Open &&(
            <div className='absolute top-12 right-2 text-black bg-white rounded-bl-md rounded-br-md    '>
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


      


        <div className={`lg:block lg:pl-6 bg-white text-black shadow-xl h-screen max-h-full lg:sticky lg:top-0 lg:overflow-visible z-[99] ${isOpen ? 'hidden' : 'w-64 px-2 fixed top-0'} lg:${MenuOpen ? 'w-[10rem] duration-200' : 'w-[40rem] duration-200'}`}>
          <FaX onClick={toggleSidebar} size={20}color={`$!isOpen?'white':'black'`} className='lg:hidden cursor-pointer ml-2 mt-2'/>
        
          <div className={`lg:cursor-pointer lg:absolute lg:top-1/2 lg:-right-3 lg:bg-white lg:border-2 lg:rounded-full lg:duration-200  ${!MenuOpen &&"rotate-180"}`} >
            <RiArrowDropRightLine size={25} className='hidden lg:block' onClick={toggleMenu}/>
          </div>
            {/*Desktop */}
          <Link to='/dashboard' className={`lg:items-center lg:justify-center lg:mt-10 hidden lg:block lg:italic lg:text-dark-blue z-[999]`}>
          {MenuOpen ? <img src={logo} alt="logo" />:<span className='text-3xl lg:text-5xl'>P</span>}
          </Link>
          {/*mobile */}
          <Link to='/dashboard' className={`lg:hidden`}>
          <img src={logo} alt="logo" className='mt-10' />
          </Link>




          <div className="mt-10" >
            {/*To move inside the array called Menu*/}
            {Menu.map((menu, index) => (
              <div key={index}>
                {/*To check if the item inside the menu has submenu*/}
                <div>
                  {/*If there's submenu render it*/}
                  {menu.subMenus ? (
                    
                    <div>
                      <Link
                        to={menu.path}
                        className={`flex items-center cursor-pointer p-3 pl-0 ` }
                        onClick={() => setSubMenuOpen(index)}>
                      
                        <div className="mr-2"onClick={toggleMenu}>{menu.icon}</div>
                        <div className={`lg:${!MenuOpen && "hidden"}`} >{menu.title}</div>
                        
                        {menu.isOpen ? <FaAngleUp className={`ml-10 lg:${!MenuOpen && "hidden"}`}  /> : <FaAngleDown className={`ml-10 lg:${!MenuOpen && "hidden"}`} />}  </Link>
                      {menu.isOpen && menu.subMenus && (
                        <div className="ml-4">
                          {menu.subMenus.map((subMenu, subIndex) => (
                            <Link key={subIndex} to={subMenu.path} className={`flex items-center lg:${!MenuOpen && "hidden"} `}   >
                              <div className="mr-6 mb-10" ></div>
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