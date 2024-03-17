import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { AiFillCloseSquare } from 'react-icons/ai'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import AddHousehold from './AddHousehold'
const EditFamilyMem = ({setIsEditFamilyMemForm}) => {
  const [fields, setFields] = useState({
    name: '',
    relationship: '',
    birthday: '',
    mobile: '',
  })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [ishouseFormOpen, setIsHouseFormOpen] = useState(false)
  const toggleAddHouseForm = () => {
    setIsHouseFormOpen(!ishouseFormOpen)
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }
  const handleSubmit = () => {
    console.log('Form submitted')
  }

  const data = [
    { id: 1, name: 'John Doe', contact: '123-456-7890' },
    { id: 2, name: 'Jane Smith', contact: '987-654-3210' },

    // Add more data as needed
  ]

  const handleEdit = (id) => {
    // Handle edit action here
    console.log(`Editing item with ID ${id}`)
  }

  const handleDelete = (id) => {
    // Handle delete action here
    console.log(`Deleting item with ID ${id}`)
  }

  return (
    <div className=" lg:text-base w-full overflow-y-auto h-96 text-xs relative">
      <div>
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
          <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
            Edit Family Member Details
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='px-4'>
          <div className="lg:justify-between lg:flex lg:items-center lg:mb-5 mb-3">
            <button className="absolute top-4 right-6">
              <IoMdClose
                onClick={() => setIsEditFamilyMemForm((prevState) => !prevState)}
                size={25}
                color="white"
              />
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
                <tr key={item.id}>
                  <td className="lg:px-10 py-2 px-4 pl-8 ">{item.name}</td>
                  <td className="lg:px-20 py-2 px-4">{item.contact}</td>
                  <td className="lg:px-10 py-2 px-4 flex">
                    <button
                      className=" text-white py-1 px-2 mr-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit color="green" size={25} />
                    </button>
                    <button
                      className=" text-white py-1"
                      onClick={() => handleDelete(item.id)}
                    >
                      <AiFillCloseSquare color="red" size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-8 gap-3">
            <button
              onClick={() => setIsEditFamilyMemForm((prevState) => !prevState)}
              className=" bg-dark-blue text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>

            <button
              onClick={toggleForm}
              className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      {ishouseFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <AddHousehold />
          </div>
        </div>
      )}
    </div>
  )
}

export default EditFamilyMem
