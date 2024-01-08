import { MdOutlineDashboard } from "react-icons/md";
import { FaAngleDown,FaAngleUp } from 'react-icons/fa6'
import { BsPersonPlus } from "react-icons/bs";
import { BsHouses } from "react-icons/bs";
import { BiCctv } from "react-icons/bi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { BiConversation } from "react-icons/bi";
import { RxPerson } from "react-icons/rx";

const SidebarData = [
  {
  title: "Dashboard",
  path: "/dashboard",
  icon: <MdOutlineDashboard />,
  iconClosed: <FaAngleDown />,
  iconOpened: <FaAngleUp />,
  
  },
  {
    title: "Tenant",
    path: "/tenant",
    icon: <BsPersonPlus />,
    iconClosed: <FaAngleDown />,
    iconOpened: <FaAngleUp />,
    
  },
  {
    title: "Apartment",
    path: "/apartment",
    icon: <BsHouses />,
    iconClosed: <FaAngleDown />,
    iconOpened: <FaAngleUp />,
    
  },
  {
    title: "Security",
    path: "/security",
    icon: <BiCctv />,
    iconClosed: <FaAngleDown />,
    iconOpened: <FaAngleUp />,
    
  },  
  {
    title: "Document",
    path: "/document",
    icon: <HiOutlineDocumentDuplicate />,
    iconClosed: <FaAngleDown />,
    iconOpened: <FaAngleUp />,
    subNav: [
      {
        title: "Lease Agreement",
        path: "/document/Lease",
      },
      {
        title:"Invoice",
        path:"/document/invoice"
      }
    ]
    
  },
  {
      title: "Concern and Issue",
      path: "/concern&issue",
      icon: <BiConversation />,
      iconClosed: <FaAngleDown />,
      iconOpened: <FaAngleUp />,
      
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <RxPerson />,
    iconClosed: <FaAngleDown />,
    iconOpened: <FaAngleUp />,
    
 }
    
]

export default SidebarData