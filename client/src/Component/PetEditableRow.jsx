import React from 'react'
import { FaCheckSquare } from "react-icons/fa";
import { MdCancel  } from "react-icons/md";


const PetEditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr className="text-center">
      <td className="pt-2">
        <input
          className="lg:w-auto w-20 lg:text-base text-xs ml-2 p-1 rounded-md border-2 border-primary-color"
          type="text"
          required="required"
          placeholder="Enter Pet Name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="pt-2">
        <input
          className="lg:w-auto w-20 lg:text-base text-xs ml-1 p-1 border-2  rounded-md border-primary-color"
          type="text"
          required="required"
          placeholder="Enter Species"
          name="species"
          value={editFormData.species}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="pt-2">
        <input
          className="lg:w-auto lg:text-base ml-1 w-20 text-xs p-1 border-2 rounded-md border-primary-color"
          type="date"
          required="required"
          placeholder="Enter Birthday"
          name="birthday"
          value={editFormData.birthday}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="flex justify-center items-center gap-1 mt-2 pt-2 ">
        <button
          type="submit"
           className='text-2xl text-lime cursor-pointer'
        >
          <FaCheckSquare />
        </button>
        <button
          onClick={handleCancelClick}
          className="text-2xl text-red cursor-pointer"
        >
          <MdCancel  />
        </button>
      </td>
    </tr>
  )
}

export default PetEditableRow
