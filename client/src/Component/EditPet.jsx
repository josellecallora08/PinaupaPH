import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { AiFillCloseSquare } from 'react-icons/ai'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
const EditPet = ({ setIsEditPetForm }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isPetFormOpen, setIsPetFormOpen] = useState(false)

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }
  const handleSubmit = () => {
    console.log('Form submitted')
  }

  const data = [
    { id: 1, name: 'John Doe', birthday: 'Jan 1 2023', species: 'Dog' },
    { id: 2, name: 'Jane Smith', birthday: 'Mar 12, 2023', species: 'Cat' },

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
    <div className=" lg:text-base w-full overflow-y-auto h-96 text-xs relative ">
      <div className=" ">
        <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
          <h1 className="lg:text-xl  ml-5 text-lg font-bold ">
            Edit Pet Details
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="px-4">
          <div className="lg:justify-between lg:flex lg:items-center lg:mb-5 mb-3">
            <button className="absolute top-4 right-6">
              <IoMdClose
                onClick={() => setIsEditPetForm((prevState) => !prevState)}
                size={25}
                color="white"
              />
            </button>
          </div>

          <table className=" bg-white w-full ">
            <thead>
              <tr className="">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Birthday</th>
                <th className="py-2 px-4">Species</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="">
                  <td className="lg:px-10 py-2 px-4 pl-8 ">{item.name}</td>
                  <td className="lg:px-20 py-2 px-4">{item.birthday}</td>
                  <td className="lg:px-20 py-2 px-4">{item.species}</td>
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
              onClick={handleSubmit}
              className=" bg-primary-color text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>

            <button
              onClick={() => setIsEditPetForm((prevState) => !prevState)}
              className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPet
