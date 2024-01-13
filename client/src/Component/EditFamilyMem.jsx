import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const EditFamilyMem = () => {
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
    <div className="overflow-x-auto w-full">
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
            <tr key={item.id} className="">
              <td className="py-2 px-4 pl-8 ">{item.name}</td>
              <td className="py-2 px-4">{item.contact}</td>
              <td className="py-2 px-4 flex">
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
                  <MdDeleteForever color='red' size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditFamilyMem;