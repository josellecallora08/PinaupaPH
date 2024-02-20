import React from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import AddHousehold from './AddHousehold';
const EditFamilyMem = () => {
  const [fields, setFields] = useState({
    name: '',
    relationship: '',
    birthday: '',
    mobile: ''
  })
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ishouseFormOpen, setIsHouseFormOpen] = useState(false);
  const toggleAddHouseForm = () => {
    setIsHouseFormOpen(!ishouseFormOpen);
  }

   
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }
  const handleSubmit = () => {
    console.log('Form submitted');
 
  }

  const data = [
    { id: 1, name: 'John Doe', contact: '123-456-7890' },
    { id: 2, name: 'Jane Smith', contact: '987-654-3210' },
 
    // Add more data as needed
  ];

  const handleEdit = (id) => {
    // Handle edit action here
    console.log(`Editing item with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action here
    console.log(`Deleting item with ID ${id}`);
  };

  return (
    <div className=" lg:text-base w-full overflow-y-auto h-96 text-xs relative">
        <div className=' '>
          <form onSubmit={handleSubmit} >
            <div className='lg:justify-between lg:flex lg:items-center lg:mb-5 mb-3'>
                <div className='flex items-center mb-5 gap-4'>
                  <button className=''><IoIosArrowBack onClick={toggleForm} size={30} color='blue' /></button>
                  <h1 className="lg:text-3xl text-2xl font-bold ">Edit Household</h1>
                </div>
                <button onClick={toggleAddHouseForm} className='lg:w-32 lg:mr-10 w-1/3 p-2 ml-5 text-white rounded-lg bg-dark-blue flex items-center justify-center gap-2 '>
                <FaPlus/>
                Add Tenant
              </button>
            </div>
          
              <table className=" bg-white w-full ">
                <thead>
                  <tr className="">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Contact</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} >
                      <td className="lg:px-10 py-2 px-4 pl-8 ">{item.name}</td>
                      <td className="lg:px-20 py-2 px-4">{item.contact}</td>
                      <td className="lg:px-10 py-2 px-4 flex">
                        <button
                          className="bg-blue-500 text-white py-1 px-2 mr-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          <FaEdit color='green' size={25} />
                        </button>
                        <button
                          className="bg-red-500 text-white py-1"
                          onClick={() => handleDelete(item.id)}
                        >
                          <AiFillCloseSquare color='red' size={25} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody> 

              </table>
              <div className='flex justify-end mt-8 gap-3'>

              <button onClick={handleSubmit} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                Submit
              </button>

              <button onClick={toggleForm} className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'>
                Close
              </button>
        </div>
        
      </form>

      </div>
      {
        ishouseFormOpen && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-md'>
            <AddHousehold />
          </div>
        </div>
        )
      }
    </div>
  );
};

export default EditFamilyMem;