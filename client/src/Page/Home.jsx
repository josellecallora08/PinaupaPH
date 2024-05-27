import React from 'react'
import logo from '/logo.svg'
import FirstLaptop from '/FirstLaptop.png'
import SecondLaptop from '/SecondLaptop.png'
import ThirdLaptop from '/ThirdLaptop.png'
import Icon1 from '/Icon1.svg'
import Icon2 from '/Icon2.svg'
import Icon3 from '/Icon3.svg'
import Icon4 from '/Icon4.svg'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
      <div className=" ">
        {/* Navbar */}
        <div className="flex w-full justify-between items-center mt-10 mb-20 px-40  ">
          <div className="w-40">
            <img src={logo} alt="PinaupaPh-logo" />
          </div>
          <div>
            <ul className="flex font-light gap-10 uppercase cursor-pointer">
              <li>Home</li>
              <li>About</li>
              <li>Features</li>
              <li>Our Team</li>
            </ul>
          </div>
          <div className="flex gap-10">
            <Link
              to="/contact"
              className="bg-primary-color text-white py-1 px-6 uppercase font-thin rounded-sm"
            >
              Contact Us
            </Link>
            <Link to={'/login'}>
              <button className="border border-primary-color text-primary-color uppercase py-1 px-6 font-thin rounded-sm hover:bg-primary-color hover:text-white duration-300 ">
                Login
              </button>
            </Link>
          </div>
        </div>
        {/* End of Navbar */}
        {/* First Section */}
        <div className="flex pl-40 mb-24 ">
          <div>
            <div className="text-6xl font-medium text-primary-color leading-relaxed">
              <h1>
                Experience Seamless Apartment <br /> Living with PinaupaPh.
              </h1>
            </div>
            <p className=" text-light-gray mt-4">
              Your all-in-one solution for effortless property management and
              <br />
              enhanced resident satisfaction.
            </p>
          </div>

          <div>
            <img src={FirstLaptop} alt="" />
          </div>
        </div>
        {/* End of First Section */}
        {/* Second Section */}
        <div className="flex pr-40 pl-32">
          <div className="w-1/2">
            <img src={SecondLaptop} alt="" />
          </div>
          <div className="w-1/3 ml-20 mt-16">
            <h1 className="text-2xl mb-8 uppercase">About PINAUPAPH</h1>
            <p className="font-light mt-4  text-justify ">
              PinaupaPh is a comprehensive apartment management system designed
              to streamline property management tasks and enhance the living
              experience for residents. Whether you are a property owner,
              manager, or resident, pinaupaPh offers a suite of features to make
              apartment living more efficient and enjoyable.
            </p>
          </div>
        </div>
        {/* End of Second Section */}
        {/* Third Section */}

        <div>
          <div className="text-center mt-16">
            <h1 className="text-2xl text-primary-color uppercase">
              Essential Features of pinaupaPh
            </h1>
            <p className="text-sm mt-2 text-light-gray">
              We offer a wide range of features designed to streamline your
              apartment management.
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-10 px-20">
            <div className="flex flex-col items-center w-1/4 p-4 box-border h-80">
              <img src={Icon1} alt="" className="w-16 h-16" />
              <h1 className="text-lg mb-2 font-semibold mt-4 text-center">
                Comprehensive Apartment Management
              </h1>
              <p className="mt-2 text-center font-normal">
                Easily add and update apartment units, maintain detailed tenant
                records, and manage important documents like invoices and lease
                agreements.
              </p>
            </div>
            <div className="flex flex-col items-center w-1/4 p-4 box-border h-80">
              <img src={Icon2} alt="" className="w-16 h-16" />
              <h1 className="text-lg mb-2 font-semibold mt-4 text-center">
                Financial Tracking and Reporting
              </h1>
              <p className="mt-2 text-center font-normal">
                Track financial health of apartment, monitor rental payments,
                manage real-time unit availability, and streamline communication
                and announcements with a powerful dashboard.
              </p>
            </div>
            <div className="flex flex-col items-center w-1/4 p-4 box-border h-80">
              <img src={Icon3} alt="" className="w-16 h-16" />
              <h1 className="text-lg mb-2 font-semibold mt-4 text-center">
                Communication and Announcements
              </h1>
              <p className="mt-2 text-center font-normal">
                Efficiently inform tenants of updates and events with
                announcement features, while enabling quick issue resolution
                through a streamlined communication system for tenant concerns.
              </p>
            </div>
            <div className="flex flex-col items-center w-1/4 p-4 box-border h-80">
              <img src={Icon4} alt="" className="w-16 h-16" />
              <h1 className="text-lg mb-2 font-semibold mt-4 text-center">
                Tenant Support and Interaction
              </h1>
              <p className="mt-2 text-center font-normal">
                Tenants can easily submit and track maintenance requests, while
                fostering community interaction through announcement and
                comments notifications within the system.
              </p>
            </div>
          </div>
        </div>
        {/* End of Third Section */}
        {/* Fourth Section */}
        <div className="flex px-32 my-20">
          <div className="w-1/2">
            <img src={ThirdLaptop} alt="" />
          </div>
          <div className="w-1/2 ">
            <h1 className="text-2xl uppercase  w-1/3 leading-relaxed ml-5 ">
              Our system support <br /> e-wallets.
            </h1>
            <p className="ml-5 mt-6 w-1/2 font-light text-justify text-light-gray">
              Simplify payments with cashless options like G-Cash, Maya, and
              Grab, ensuring easy and convenient transactions for residents.
            </p>
          </div>
        </div>
        {/* End of Fourtn Section */}
      </div>
    </>
  )
}

export default Home
