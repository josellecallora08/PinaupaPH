import React from 'react';
import logo from '/logo.svg';
import FirstLaptop from '/FirstLaptop.png';
import SecondLaptop from '/SecondLaptop.png';
import ThirdLaptop from '/ThirdLaptop.png';
import FourthLaptop from '/FourthLaptop.png';
import PictureDevelopers from '/PictureDevelopers.png';
import Icon1 from '/Icon1.svg';
import Icon2 from '/Icon2.svg';
import Icon3 from '/Icon3.svg';
import Icon4 from '/Icon4.svg';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Home = () => {
  return (
    <>
      <div className=" ">
        {/* Navbar */}
        <div id="home" className="flex w-full justify-between items-center mt-10 mb-20 px-4 md:px-40">
          <div className="w-40">
            <img src={logo} alt="PinaupaPh-logo" />
          </div>
          <div>
            <ul className="flex font-light gap-4 md:gap-10 uppercase cursor-pointer">
              <li>
                <ScrollLink to="home" smooth={true} duration={500}>
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" smooth={true} duration={500}>
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="features" smooth={true} duration={500}>
                  Features
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="team" smooth={true} duration={500}>
                  Our Team
                </ScrollLink>
              </li>
            </ul>
          </div>
          <div className="flex gap-4 md:gap-10">
            <RouterLink to={'/contact'}>
              <button className="bg-primary-color text-white py-1 px-4 md:px-6 uppercase font-thin rounded-sm">
                Contact
              </button>
            </RouterLink>
            <RouterLink to={'/login'}>
              <button className="border border-primary-color text-primary-color uppercase py-1 px-4 md:px-6 font-thin rounded-sm hover:bg-primary-color hover:text-white duration-300 ">
                Login
              </button>
            </RouterLink>
          </div>
        </div>
        {/* End of Navbar */}
        {/* First Section */}
        <div  className="flex flex-col md:flex-row pl-4 md:pl-40 mb-24 ">
          <div className="w-full md:w-1/2">
            <div className="text-4xl md:text-6xl font-medium text-primary-color leading-relaxed">
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
          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <img src={FirstLaptop} alt="" />
          </div>
        </div>
        {/* End of First Section */}
        {/* Second Section */}
        <div id="about" className="flex flex-col md:flex-row pr-4 md:pr-40 pl-4 md:pl-32">
          <div className="w-full md:w-1/2">
            <img src={SecondLaptop} alt="" />
          </div>
          <div className="w-full md:w-1/3 ml-0 md:ml-20 mt-10 md:mt-16">
            <h1 className="text-2xl mb-8 uppercase">About PINAUPAPH</h1>
            <p className="font-light mt-4 text-justify ">
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

        <div id="features">
          <div className="text-center mt-16">
            <h1 className="text-2xl text-primary-color uppercase">
              Essential Features of pinaupaPh
            </h1>
            <p className="text-sm mt-2 text-light-gray">
              We offer a wide range of features designed to streamline your
              apartment management.
            </p>
          </div>

          <div className="flex lg:flex-row flex-col md:flex-wrap justify-between items-center mt-10 px-4 md:px-20">
            <div className="flex flex-col items-center w-full md:w-1/4 p-4 box-border h-80">
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
            <div className="flex flex-col items-center w-full md:w-1/4 p-4 box-border h-80">
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
            <div className="flex flex-col items-center w-full md:w-1/4 p-4 box-border h-80">
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
            <div className="flex flex-col items-center w-full md:w-1/4 p-4 box-border h-80">
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
        <div className="flex flex-col md:flex-row px-4 md:px-32 my-20">
          <div className="w-full md:w-1/2">
            <img src={ThirdLaptop} alt="" />
          </div>
          <div className="w-full md:w-1/2 ml-0 md:ml-20 mt-10 md:mt-0">
            <h1 className="text-2xl uppercase leading-relaxed">
              Our system support <br /> e-wallets.
            </h1>
            <p className="mt-6 font-light text-justify text-light-gray">
              Simplify payments with cashless options like G-Cash, Maya, and
              Grab, ensuring easy and convenient transactions for residents.
            </p>
          </div>
        </div>
        {/* End of Fourth Section */}
        {/* Fifth Section */}
        <div className="relative px-4 md:px-40 mb-10 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-4xl leading-relaxed uppercase">
              Generate and manage essential documents like invoices and lease
              agreements.
            </h1>
            <p className="mt-6 font-light text-justify text-light-gray">
              Generate, manage, and download essential documents such as
              invoices and lease agreements for seamless record-keeping and
              accessibility.
            </p>
          </div>
          <div className="w-full md:w-[30rem] mt-10 md:mt-0 md:absolute right-48 top-0">
            <img src={FourthLaptop} alt="" />
          </div>
        </div>
        {/* End of Fifth Section */}
        {/* Sixth Section */}
        <div id="team" className="mt-20 md:mt-44 text-center">
          <h1 className="text-2xl text-primary-color uppercase">
            The Developers
          </h1>
          <p className="text-sm mt-2 text-light-gray">
            Behind the PinaupaPh
          </p>
          <div className="mx-auto w-full md:w-4/6 mb-10">
            <img src={PictureDevelopers} alt="" />
          </div>
        </div>
        {/* End of Sixth Section */}
        <div>
          <div className="bg-primary-color text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <h2 className="text-xl font-semibold mb-4">CONTACT US!</h2>
                <p className="mb-6">
                  We are here to help! If you have any questions, need support,
                  or want to provide feedback, please reach out to us.
                </p>
              </div>

              <form className="md:w-1/2 space-y-4">
                <div className="mb-8">
                  <input
                    className="w-full px-3 py-2 border-b border-gray-300 bg-transparent text-white placeholder-white focus:outline-none"
                    type="text"
                    id="name"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-8">
                  <input
                    className="w-full px-3 py-2 border-b border-gray-300 bg-transparent text-white placeholder-white focus:outline-none"
                    type="email"
                    id="email"
                    placeholder="Your email"
                  />
                </div>
                <div className="">
                  <textarea
                    className="w-full mt-5 px-3 py-2 border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none"
                    id="message"
                    rows="4"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-10 py-2 bg-white text-black rounded-md hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center flex-col my-10">
              <div className="w-40">
                <img src={logo} alt="" />
              </div>
              <div className="my-5">
                <ul className="flex gap-7 font-light cursor-pointer">
                  <li>
                    <ScrollLink to="home" smooth={true} duration={500}>
                      Home
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="features" smooth={true} duration={500}>
                      Features
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="team" smooth={true} duration={500}>
                      Our Team
                    </ScrollLink>
                  </li>
                </ul>
              </div>
              <div className="">© 2024 PinaupaPH. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
