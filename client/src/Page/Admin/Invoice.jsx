import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import InvoiceFormat from '../../Component/InvoiceFormat';
import { MdOutlineFileDownload } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const Invoice = () => {
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
    <div className='lg:ml-44 '>
      
      <div className='relative'>
        <div className='flex justify-between items-center mt-10'>
          <h1 className='lg:text-3xl text-xl font-black ml-10 mb-3'>View Invoice</h1>
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

      <InvoiceFormat />
    </div>
  );
};

export default Invoice;
