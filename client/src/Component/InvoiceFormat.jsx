import React, { useState } from 'react';
import './Invoice.css';
import Logo from "/pinaupa-logo.svg";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowDown } from 'react-icons/io';

const InvoiceFormat = () => {

  const [open, setOpen] = useState(false);
  const dropdownItems = [
    {
      title: 'Download',
      svg: <MdOutlineFileDownload size={25} />,
    },
    {
      title: 'Print',
      svg: <FiPrinter size={25} />,
    },
    {
      title: 'Edit',
      svg: <FiEdit size={25} />,
    }
  ];

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className='lg:ml-44 '>
      
      <div className='relative'>
        <div className='flex justify-between items-center mt-10'>
          <h1 className='lg:text-3xl text-xl font-black ml-10 mb-3 tracking-wider uppercase'>View Invoice</h1>
          <button
            onClick={toggle}
            className='lg:mr-32 lg:mb-6 flex items-center border-2 border-gray  mr-4 mb-2 justify-between w-48 p-2 ml-auto text-base rounded-tr-lg rounded-tl-lg'
          >
            Select Action
            <IoIosArrowDown size={25} className={open ? 'rotate-180' : ''} />
          </button>
        </div>


        {open && (
          <div className='lg:right-32 absolute top-full right-4 w-48 bg-white shadow-sm shadow-light-gray '>
            {dropdownItems.map((item, index) => (
              <div key={index}>
                <button className='flex items-center gap-5 px-4 text-left py-2 hover:bg-gray w-full'>{item.svg}{item.title} </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="invoice-box mx-4">
        <table cellPadding="0" cellSpacing="0">
          <tr className="top">
            <td colSpan="2">
              <table>
                <tr>
                  <td className="title">
                    <img
                      src={Logo}
                      style={{ width: '100%', maxWidth: '300px' }}
                      alt="Logo"
                    />
                  </td>
                  <td>
                    Invoice #: 123<br />
                    Created: January 1, 2023<br />
                    Due: February 1, 2023
                  </td>
                </tr>
              </table>
            </td>
          </tr>



          <tr className="information">
            <td colSpan="2">
              <table>
                <tr>
                  <td>
                    Sparksuite, Inc.<br />
                    12345 Sunny Road<br />
                    Sunnyville, CA 12345
                  </td>

                  <td className='my-5'>
                  <span>Invoice To: </span><br />
                    Acme Corp.<br />
                    John Doe<br />
                    john@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="heading bill">
            <td>Billing Details</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2">
              House Number: Unit 001<br />
              House Type: PentHouse<br />
              Status: <span className='text-lime font-bold'>Paid</span>
            </td>
          </tr>

          <tr className="heading">
            <td>Item</td>
            <td>Price</td>
          </tr>

          <tr className="item">
            <td>Monthly Rent</td>
            <td>$300.00</td>
          </tr>

          <tr className="item">
            <td>Water Bill</td>
            <td>$75.00</td>
          </tr>

          <tr className="item last">
            <td>Electricity Bill</td>
            <td>$10.00</td>
          </tr>

          <tr className="total">
            <td></td>
            <td>Total: $385.00</td>
          </tr>
        </table>
      </div>
      </div>
    </div>
  );
};

export default InvoiceFormat;
